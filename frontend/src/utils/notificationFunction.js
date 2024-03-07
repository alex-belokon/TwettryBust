export function getNotificationTitle (action) {
    switch(action){
        case  "USER_SUBSCRIPTION": return "subscription";
        case  "NEW_POST": return "post";
        case "LIKE_POST" : return "like";
        case "REPOST_POST" : return "repost"
    }

}  
export function isEmpty(obj) {
    return Object.keys(obj).length === 0; // true, если объект пустой
  }

