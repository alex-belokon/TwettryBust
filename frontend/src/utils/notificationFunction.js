export function getNotificationTitle (action) {
    switch(action){
        case  "USER_SUBSCRIPTION": return 'notification.sub';
        case  "NEW_POST": return 'notification.rep';
        case "LIKE_POST" : return 'notification.like';
        case "REPOST_POST" : return 'notification.repost'
    }

}  

export function isEmpty(obj) {
    return Object.keys(obj).length === 0; // true, если объект пустой
  }
  export function hideEmail (text) {
    let index = text.indexOf("@");
  if (index !== -1) {  
      text = text.substring(0, index);  
  }
  
  return text;
  }
  
  export function calculateTimePassed(inputDate) {
    // Конвертація вхідної дати з UTC в локальний час
    let userTimezoneOffset = new Date().getTimezoneOffset() * 60000;
    let localInputDate = new Date(inputDate.getTime() - userTimezoneOffset);
  
    // Отримання поточної дати в локальному часі
    let currentDate = new Date();
    let localCurrentDate = new Date(currentDate.getTime() - userTimezoneOffset);
  
    // Обчислення різниці у часі
    let timeDifference = localCurrentDate - localInputDate;
    let hoursPassed = timeDifference / (1000 * 60 * 60);
    let minutesPassed = timeDifference / (1000 * 60);
  
    // Повернення різниці у часі з урахуванням часового поясу
    if (hoursPassed >= 24) {
      return [localInputDate, ""];
    } else if (hoursPassed >= 1) {
      return [Math.floor(hoursPassed), 'notification.time.hour'];
    } else if (Math.floor(minutesPassed) >= 1) {
      return [Math.floor(minutesPassed), 'notification.time.min'];
    } else {
      return ["",'notification.time.now'];
    }
  }

// function convertUTCDateToLocalDate(date) {
//     var newDate = new Date(date.getTime() - date.getTimezoneOffset()*60*1000);
//     return newDate;   
// }
// export function calculateTimePassed(inputDate) { console.log(inputDate);
//     let currentDate = new Date();
//     let localInputDate = convertUTCDateToLocalDate(inputDate);
//     let timeDifference = currentDate - localInputDate;
//     let hoursPassed = timeDifference / (1000 * 60 * 60);
//     let minutesPassed = timeDifference / (1000 * 60);
    
//     if (hoursPassed >= 24) {
//         return localInputDate.toDateString();
//     } else if (hoursPassed >= 1) {
//         return hoursPassed.toFixed(2) + " hours";
//     } else  if (Math.floor(minutesPassed) >= 1) { 
        
//      return Math.floor(minutesPassed) + " min";
//     } else {
//         return "now"
//     }
// }


  


