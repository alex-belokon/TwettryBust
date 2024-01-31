export function formatNumber(num) {
    console.log("formatNumber", num);
    if (typeof num !== 'number') {
      console.log('Ошибка: переданное значение не является числом');
      return num;
    }
  console.log("num", num);
    return num >= 1000 ? (num / 1000).toFixed(1) + 'K' : num;
  }