export const formatCEP = (value?: string): string => {
  if (!value) return '';

  const digits = value.replace(/\D/g, '');

  if (digits.length <= 5) return digits;

  if (digits.length <= 8)
    return `${digits.slice(0, 5)}-${digits.slice(5)}`;

  return `${digits.slice(0, 5)}-${digits.slice(5, 8)}`;
};
