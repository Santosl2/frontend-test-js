export function formatMoney(value) {
  return new Intl.NumberFormat("en-US", {}).format(Number(value));
}
