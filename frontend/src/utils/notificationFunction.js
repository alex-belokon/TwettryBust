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
    let currentDate = new Date();
    let timeDifference = currentDate - inputDate;
    let hoursPassed = timeDifference / (1000 * 60 * 60);
    let minutesPassed = timeDifference / (1000 * 60);
    
    if (hoursPassed >= 24) {
        return inputDate.toDateString();
    } else if (hoursPassed >= 1) {
        return hoursPassed.toFixed(2) + " hours";
    } else  if (Math.floor(minutesPassed) >= 1) { 
        
     return Math.floor(minutesPassed) + " min";
    } else {
        return "now"
    }
}



  


