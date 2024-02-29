import { MdOutlinePeopleAlt, MdPeopleAlt } from "react-icons/md";
import { IoNotificationsOutline, IoNotificationsSharp, IoHomeOutline, IoHomeSharp, IoNewspaperOutline, IoBookmarks, IoBookmarksOutline, IoNewspaperSharp } from "react-icons/io5";
import { PiMagnifyingGlassBold, PiMagnifyingGlass } from "react-icons/pi";
import { FaEnvelope } from "react-icons/fa6";
import { FaRegUser, FaUser, FaRegEnvelope} from "react-icons/fa";

const navItems = [
  {
    name: 'navigation.home',
    link: "/",
    icon: <IoHomeOutline className="iconStyle"/>,
    activeIcon: <IoHomeSharp className="iconStyle"/>,
  },
  {
    name: "navigation.explore",
    link: "/explore",
    icon: <PiMagnifyingGlass className="iconStyle"/>,
    activeIcon: <PiMagnifyingGlassBold className="iconStyle"/>,
  },
  {
    name: "navigation.notifications",
    link: "/notifications",
    icon: <IoNotificationsOutline className="iconStyle"/>,
    activeIcon: <IoNotificationsSharp className="iconStyle"/>,
  },
  {
    name: "navigation.messages",
    link: "/messages",
    icon: <FaRegEnvelope className="iconStyle"/>,
    activeIcon: <FaEnvelope className="iconStyle"/>,
  },
  // {
  //   name: "navigation.lists",
  //   link: "/lists",
  //   icon: <IoNewspaperOutline className="iconStyle"/>,
  //   activeIcon: <IoNewspaperSharp className="iconStyle"/>,
  // },
  {
    name: "navigation.bookmarks",
    link: "/bookmarks",
    icon: <IoBookmarksOutline className="iconStyle"/>,
    activeIcon: <IoBookmarks className="iconStyle"/>,
  },
  {
    name: "navigation.communities",
    link: "/communities",
    icon: <MdOutlinePeopleAlt className="iconStyle"/>,
    activeIcon: <MdPeopleAlt className="iconStyle"/>,
  },
  {
    name: "navigation.profile",
    link: "/profile",
    icon: <FaRegUser className="iconStyle"/>,
    activeIcon: <FaUser className="iconStyle"/>,
  },
];

export default navItems;