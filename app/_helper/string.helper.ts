export function translateToTitleCase(input: string): string {
  if (!input) return "";
  return input
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}
