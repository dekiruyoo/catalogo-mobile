import { useCallback, useEffect, useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CategoryChips from '../components/CategoryChips';
import ErrorMessage from '../components/ErrorMessage';
import Loading from '../components/Loading';
import ProductCard from '../components/ProductCard';
import { fetchCategory, resetCategory } from '../store/productsSlice';
import { colors } from '../theme/colors';
import { formatCategory } from '../utils/format';

const ALL = 'all';

// Tela reutilizada nas duas abas (masculino/feminino): recebe as categorias por parâmetro.
export default function ProductListScreen({ categories, navigation }) {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState(ALL);
  const byCategory = useSelector((state) => state.products.byCategory);

  const options = useMemo(
    () => [
      { value: ALL, label: 'Todos' },
      ...categories.map((c) => ({ value: c, label: formatCategory(c) })),
    ],
    [categories]
  );

  const activeCategories = selected === ALL ? categories : [selected];

  const load = useCallback(() => {
    activeCategories.forEach((c) => dispatch(fetchCategory(c)));
  }, [activeCategories, dispatch]);

  useEffect(() => {
    load();
  }, [load]);

  const states = activeCategories.map((c) => byCategory[c]);
  const isLoading = states.some((s) => !s || s.status === 'loading');
  const failed = states.find((s) => s?.status === 'failed');
  const products = states.flatMap((s) => s?.items ?? []);

  const handleRetry = () => {
    activeCategories.forEach((c) => {
      if (byCategory[c]?.status === 'failed') dispatch(resetCategory(c));
    });
    // Aguarda o reset ser aplicado antes de buscar novamente.
    setTimeout(load, 0);
  };

  let content;
  if (failed) {
    content = <ErrorMessage message={failed.error} onRetry={handleRetry} />;
  } else if (isLoading) {
    content = <Loading message="Carregando produtos..." />;
  } else {
    content = (
      <FlatList
        data={products}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onPress={() => navigation.navigate('ProductDetails', { id: item.id })}
          />
        )}
        ListEmptyComponent={<Text style={styles.empty}>Nenhum produto encontrado.</Text>}
      />
    );
  }

  return (
    <View style={styles.container}>
      <CategoryChips options={options} selected={selected} onSelect={setSelected} />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  list: { paddingHorizontal: 16, paddingBottom: 24 },
  empty: { textAlign: 'center', color: colors.textMuted, marginTop: 32 },
});
