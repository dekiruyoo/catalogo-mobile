import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import { formatPrice, priceWithDiscount } from '../utils/format';

export default function ProductCard({ product, onPress }) {
  const finalPrice = priceWithDiscount(product.price, product.discountPercentage);

  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
      onPress={onPress}
    >
      <Image source={{ uri: product.thumbnail }} style={styles.image} resizeMode="contain" />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {product.title}
        </Text>
        <Text style={styles.brand} numberOfLines={1}>
          {product.brand || product.category}
        </Text>
        <View style={styles.priceRow}>
          <Text style={styles.price}>{formatPrice(finalPrice)}</Text>
          {product.discountPercentage > 0 && (
            <Text style={styles.oldPrice}>{formatPrice(product.price)}</Text>
          )}
        </View>
      </View>
      {product.discountPercentage > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>-{Math.round(product.discountPercentage)}%</Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  pressed: { opacity: 0.7 },
  image: { width: 90, height: 90, borderRadius: 8, backgroundColor: colors.background },
  info: { flex: 1, marginLeft: 12 },
  title: { fontSize: 15, fontWeight: '600', color: colors.text },
  brand: { fontSize: 12, color: colors.textMuted, marginTop: 2 },
  priceRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  price: { fontSize: 16, fontWeight: '700', color: colors.accent },
  oldPrice: {
    fontSize: 12,
    color: colors.textMuted,
    textDecorationLine: 'line-through',
    marginLeft: 8,
  },
  badge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: colors.accent,
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  badgeText: { color: '#fff', fontSize: 11, fontWeight: '700' },
});
