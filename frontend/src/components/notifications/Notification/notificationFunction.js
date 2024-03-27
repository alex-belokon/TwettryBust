export function getDataWithoutSeconds (dataString) {
  // Припустима дата з секундами
    var dateWithSeconds = new Date(dataString);
    
    // Видалення секунд
    dateWithSeconds.setSeconds(0);
    
    // Отримання строкового представлення дати без секунд
    var formattedDate = dateWithSeconds.toISOString().slice(0, 16).replace('T', ' ');
    
    return formattedDate;
}