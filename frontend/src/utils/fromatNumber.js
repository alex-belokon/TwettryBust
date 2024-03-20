export function formatNumber(num) {
  if (typeof num !== 'number') {
    return num;
  }
  return num >= 1000 ? (num / 1000).toFixed(1) + 'K' : num;
}