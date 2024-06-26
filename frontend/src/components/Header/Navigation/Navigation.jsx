import { NavLink } from "react-router-dom";
import navItems from "./navItemsArr.jsx";
import "./navigation.style.scss";
import { IoSettingsOutline } from "react-icons/io5";
import { useState } from "react";
import PopupSettings from "../../Modal/Popup/PopupSettings.jsx";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import  signal from '../../../assets/new_message_tone (mp3cut.net).mp3';
import { useEffect } from "react";
import NotificationCounter from "../NotificationCounter/NotificationCounter.jsx";

export default function Navigation() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const userId = useSelector((state) => state.authUser.user.id);
  const countMessages = useSelector((state) => state.chatWebSocket.userMessages.length);
  const countNotification = useSelector((state) => state.chatWebSocket.unReadNotification);
  const [firstPlaying, setFirstPlaying] = useState(false);
  const { t } = useTranslation();

  useEffect(()=>{
    if(firstPlaying) {
      if(countMessages !== 0 ) {
        const audioElement = document.getElementById('notificationSound');
        if (audioElement) {
          audioElement.play();
        }
      } 
    } else {
      setFirstPlaying(true);
    }

  }, [countMessages])
  

  return (
    <nav>
      <ul className="list">
        {navItems.map((navItem) => {
       let countMessagesComponent =  null;
       if(navItem.link === "/messages"&&countMessages !== 0){
        countMessagesComponent = (
          <>
          <span
            className={
              countMessages > 99
                ? "newMessage__header newMessage__header--little"
                : "newMessage__header"
            }
          >
            {countMessages > 99 ? "99+" : countMessages}
          </span>
          <audio id="notificationSound" src={signal}></audio>
          </>
        ) 
       }else if(navItem.link === "/notifications" && countNotification !== 0){
        countMessagesComponent = <NotificationCounter counter = {countNotification} audioSelector = {"notificationAudio"} signal = {signal} />
       }
     
          
          
          
          
          return(
          <li className="list__item" key={navItem.link}>
            <NavLink
              className="list__navItem"
              state={{ flag: false }}
              to={
                navItem.link === "/profile"
                  ? `${navItem.link}/${userId}`
                  : navItem.link
              }
              title={navItem.title}
              alt={navItem.title}
            >
              {({ isActive }) => (
                <div className="list__navItemTitle">
                  {isActive ? navItem.activeIcon : navItem.icon}
                  <span
                    className={`${
                      isActive ? "list__navItemText--bold" : "list__navItemText"
                    }`}
                  >
                    {t(`${navItem.name}`)}
                  </span>
                </div>
              )}
            </NavLink>
            
            {(countNotification ||countMessages) ? countMessagesComponent:null}
          </li>
        )})}
        <li
          className="list__item list__navItem"
          onClick={() => setIsPopupOpen(true)}
        >
          <div className="list__navItemTitle">
            <IoSettingsOutline className="iconStyle" />
            <span className="list__navItemText">
              {t("navigation.settings")}
            </span>
          </div>
        </li>
        {isPopupOpen && (
          <PopupSettings
            closePopup={() => setIsPopupOpen(false)}
          ></PopupSettings>
        )}
      </ul>
    </nav>
  );
}
