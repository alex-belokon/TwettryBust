import { MdOutlinePeopleAlt, MdPeopleAlt } from "react-icons/md";
import { IoNotificationsOutline, IoSettingsOutline, IoNotificationsSharp, IoHomeOutline, IoHomeSharp, IoNewspaperOutline, IoBookmarks, IoBookmarksOutline, IoNewspaperSharp } from "react-icons/io5";
import { PiMagnifyingGlassBold, PiMagnifyingGlass } from "react-icons/pi";
import { FaEnvelope } from "react-icons/fa6";
import { FaRegUser, FaUser, FaRegEnvelope} from "react-icons/fa";

const navItems = [
  {
    name: "Home",
    link: "/",
    icon: <IoHomeOutline className="iconStyle"/>,
    activeIcon: <IoHomeSharp className="iconStyle"/>,
  },
  {
    name: "Explore",
    link: "/explore",
    icon: <PiMagnifyingGlass className="iconStyle"/>,
    activeIcon: <PiMagnifyingGlassBold className="iconStyle"/>,
  },
  {
    name: "Notifications",
    link: "/notifications",
    icon: <IoNotificationsOutline className="iconStyle"/>,
    activeIcon: <IoNotificationsSharp className="iconStyle"/>,
  },
  {
    name: "Messages",
    link: "/messages",
    icon: <FaRegEnvelope className="iconStyle"/>,
    activeIcon: <FaEnvelope className="iconStyle"/>,
  },
  {
    name: "Lists",
    link: "/lists",
    icon: <IoNewspaperOutline className="iconStyle"/>,
    activeIcon: <IoNewspaperSharp className="iconStyle"/>,
  },
  {
    name: "Bookmarks",
    link: "/bookmarks",
    icon: <IoBookmarksOutline className="iconStyle"/>,
    activeIcon: <IoBookmarks className="iconStyle"/>,
  },
  {
    name: "Communities",
    link: "/communities",
    icon: <MdOutlinePeopleAlt className="iconStyle"/>,
    activeIcon: <MdPeopleAlt className="iconStyle"/>,
  },
  {
    name: "Profile",
    link: "/profile",
    icon: <FaRegUser className="iconStyle"/>,
    activeIcon: <FaUser className="iconStyle"/>,
  },
  {
    name: "Settings and privacy",
    link: "/settings",
    icon: <IoSettingsOutline className="iconStyle"/>,
    activeIcon: <IoSettingsOutline className="iconStyle"/>,
  },
];

export default navItems;