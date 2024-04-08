import { BiRepost, BiSolidHeart } from "react-icons/bi";
export function getRightIcon (type) {
    switch(type){case 'notification.repost': return <BiRepost className="notification__repost"/>; 
    case 'notification.like': return <BiSolidHeart className="notification__heart"/>};
} 