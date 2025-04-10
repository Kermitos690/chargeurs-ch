
// Formatter les prix
export const formatPrice = (price: number, locale = 'fr-CH', currency = 'CHF') => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
};

// Formatter les dates
export const formatDate = (date: Date | null, locale = 'fr-CH') => {
  if (!date) return '';
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
};

// Convertir Timestamp Supabase
export const fromTimestamp = (timestamp: string | null) => {
  return timestamp ? new Date(timestamp) : null;
};

// Convertir date vers timestamp
export const toTimestamp = (date: Date) => {
  return date ? date.toISOString() : null;
};
