export function getNotificationTitle (action) {
    switch(action){
        case  "USER_SUBSCRIPTION": return "subscription";
        case  "NEW_POST": return "Replying";
        case "LIKE_POST" : return "like";
        case "REPOST_POST" : return "repost"
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
    // Отримуємо поточну дату та час
    let currentDate = new Date();

    // Перетворюємо введену дату на локальний час користувача
    let localInputDate = convertUTCDateToLocalDate(inputDate);

    // Отримуємо різницю між поточною датою та введеною датою
    let timeDifference = currentDate - localInputDate;

    // Отримуємо кількість годин та хвилин, які пройшли
    let hoursPassed = timeDifference / (1000 * 60 * 60);
    let minutesPassed = timeDifference / (1000 * 60);

    if (hoursPassed >= 24) {
        // Якщо пройшло більше 24 годин, виводимо дату
        return localInputDate.toDateString();
    } else if (hoursPassed >= 1) {
        // Якщо пройшло від 1 години до 24 годин, виводимо кількість годин
        return hoursPassed.toFixed(2) + " годин";
    } else if (Math.floor(minutesPassed) >= 1) {
        // Якщо пройшло менше 1 години, але більше 1 хвилини, виводимо кількість хвилин
        return Math.floor(minutesPassed) + " хвилин";
    } else {
        // Якщо менше 1 хвилини, виводимо "зараз"
        return "зараз";
    }
}

function convertUTCDateToLocalDate(date) {
    var newDate = new Date(date.getTime() - date.getTimezoneOffset()*60*1000);
    return newDate;   
}


  


