import { BiRepost, BiSolidHeart } from "react-icons/bi";
export function getRightIcon (type) {
    switch(type){case 'reposted': return <BiRepost className="notification__repost"/>; 
    case 'liked': return <BiSolidHeart className="notification__heart"/>};
} 