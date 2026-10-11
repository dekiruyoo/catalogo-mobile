import { useCallback, useEffect } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ErrorMessage from '../components/ErrorMessage';
import Loading from '../components/Loading';
import { clearDetails, fetchProductDetails } from '../store/productsSlice';
import { colors } from '../theme/colors';
import { formatCategory, formatPrice, priceWithDiscount } from '../utils/format';

export default function ProductDetailsScreen({ route }) {
  const { id } = route.params;
  const dispatch = useDispatch();
  const { item, status, error } = useSelector((state) => state.products.details);

  const load = useCallback(() => {
    dispatch(fetchProductDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    load();
    return () => {
      dispatch(clearDetails());
    };
  }, [load, dispatch]);

  if (status === 'failed') return <ErrorMessage message={error} onRetry={load} />;
  if (status !== 'succeeded' || !item) return <Loading message="Carregando produto..." />;

  const finalPrice = priceWithDiscount(item.price, item.discountPercentage);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Image source={{ uri: item.thumbnail }} style={styles.image} resizeMode="contain" />

      <Text style={styles.category}>{formatCategory(item.category)}</Text>
      <Text style={styles.title}>{item.title}</Text>

      <View style={styles.priceRow}>
        <Text style={styles.price}>{formatPrice(finalPrice)}</Text>
        {item.discountPercentage > 0 && (
          <>
            <Text style={styles.oldPrice}>{formatPrice(item.price)}</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {item.discountPercentage.toFixed(1)}% OFF
              </Text>
            </View>
          </>
        )}
      </View>

      <Text style={styles.sectionTitle}>Descrição</Text>
      <Text style={styles.description}>{item.description}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: 16, paddingBottom: 32 },
  image: {
    width: '100%',
    height: 300,
    backgroundColor: colors.card,
    borderRadius: 12,
    marginBottom: 16,
  },
  category: { fontSize: 12, color: colors.textMuted, textTransform: 'uppercase' },
  title: { fontSize: 24, fontWeight: '700', color: colors.text, marginTop: 4 },
  priceRow: { flexDirection: 'row', alignItems: 'center', marginTop: 12, flexWrap: 'wrap' },
  price: { fontSize: 28, fontWeight: '800', color: colors.accent },
  oldPrice: {
    fontSize: 16,
    color: colors.textMuted,
    textDecorationLine: 'line-through',
    marginLeft: 10,
  },
  badge: {
    backgroundColor: colors.success,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginLeft: 10,
  },
  badgeText: { color: '#fff', fontSize: 12, fontWeight: '700' },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: colors.text, marginTop: 24 },
  description: { fontSize: 15, lineHeight: 22, color: colors.textMuted, marginTop: 6 },
});
