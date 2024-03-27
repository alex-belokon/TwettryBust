import { BiRepost, BiSolidHeart } from "react-icons/bi";
export function getRightIcon (type) {
    switch(type){case 'repost': return <BiRepost className="notification__repost"/>; 
    case 'like': return <BiSolidHeart className="notification__heart"/>};
} 