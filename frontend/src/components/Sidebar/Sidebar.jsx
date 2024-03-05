import { useState } from "react";
import { useEffect } from "react";
import { getRecommendUsers } from "../../api/profile";
import Recommended from "./Recommended/Recommended";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import SidebarSearch from "./SidebarSearch/SidebarSearch";
import "./Sidebar.scss";

export default function Sidebar() {
  const [recommendUsers, setRecommendUsers] = useState(null);
  const currentUserId = useSelector((state) => state.authUser.user.id);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const changeFollow = useSelector(state => state.changeFollow)

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getRecommendUsers(currentUserId);
        setRecommendUsers(data);
      } catch (e) {
        navigate('/error')
      }
    }
    fetchData();
  }, [changeFollow]);

  return (
    <>
      <SidebarSearch></SidebarSearch>
      {recommendUsers && (
        <div>
          <h3 className="recommendUsers__title">{t('sidebar.recommended')}</h3>
          {recommendUsers.length === 0 ? (
            <p className="popupSidebar__text">{t('sidebar.willRecommendations')}</p>
          ) : (
            <ul className="recommendUsers__list">
              {recommendUsers.map(
                (item) =>
                  !item.following &&
                  item.id !== currentUserId && (
                    <li key={item.userName}>
                      <Recommended recommendUser={item} recommendUsers={recommendUsers} setRecommendUsers={setRecommendUsers}></Recommended>
                    </li>
                  )
              )}
            </ul>
          )}
        </div>
      )}
    </>
  );
}
