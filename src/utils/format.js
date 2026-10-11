export const formatPrice = (value) => `$${Number(value).toFixed(2)}`;

export const priceWithDiscount = (price, discountPercentage) =>
  price * (1 - discountPercentage / 100);

export const formatCategory = (slug) =>
  slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
