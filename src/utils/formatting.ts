export const formatCurrencyWithSign = (value: number | null | undefined): string => {
  const num = value ?? 0;
  return `${num >= 0 ? '+' : ''}$${num.toFixed(2)}`;
};

export const formatPercentageWithSign = (value: number | null | undefined): string => {
  const num = value ?? 0;
  return `${num >= 0 ? '+' : ''}${num.toFixed(2)}%`;
};

export const formatCurrency = (value: number | null | undefined): string => {
    const num = value ?? 0;
    return `$${num.toFixed(2)}`;
} 