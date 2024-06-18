export function extractDate(dateTime: string) {
  const [date] = dateTime.split(" ");
  return date;
}
