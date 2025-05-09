export const formatPhone = (value?: string): string => {
  if (!value) return '';

  const digits = value.replace(/\D/g, '').slice(0, 11);

  const ddd = digits.slice(0, 2);
  const firstPart =
    digits.length > 6 ? digits.slice(2, 7) : digits.slice(2, 6);
  const lastPart =
    digits.length > 6
      ? digits.slice(7, 11)
      : digits.slice(6, 10);

  if (digits.length <= 2) return `(${ddd}`;

  if (digits.length <= 6) return `(${ddd}) ${digits.slice(2)}`;

  if (digits.length <= 10)
    return `(${ddd}) ${digits.slice(2, 6)}-${digits.slice(6)}`;

  return `(${ddd}) ${firstPart}-${lastPart}`;
};
