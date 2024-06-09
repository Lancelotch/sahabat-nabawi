export function formatCurrencyIDR(amount: number): string {
  if (!Number.isInteger(amount) || amount < 0) {
    throw new Error("Amount must be a non-negative integer.");
  }

  const formattedNumber = amount
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return `IDR ${formattedNumber}`;
}
