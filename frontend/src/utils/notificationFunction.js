export function getNotificationTitle (action) {
    switch(action){
        case  "USER_SUBSCRIPTION": return "subscription";
        case  "NEW_POST": return "post";
        case "LIKE_POST" : return "like";
        case "REPOST_POST" : return "repost"
    }

}  

