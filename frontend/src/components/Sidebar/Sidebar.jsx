import { useState } from "react";
import { useEffect } from "react";
import { getRecommendUsers } from "../../api/profile";
import Recommended from "./Recommended/Recommended";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import SidebarSearch from "./SidebarSearch/SidebarSearch";
import "./Sidebar.scss";
import BtnLoadMore from "../Buttons/BtnLoadMore/BtnLoadMore";

export default function Sidebar({ noFixed = false }) {
  const [recommendUsers, setRecommendUsers] = useState(null);
  const currentUserId = useSelector((state) => state.authUser.user.id);
  const { token } = useSelector((state) => state.authUser);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const changeFollow = useSelector((state) => state.changeFollow);
  const [numberPage, setNumberPage] = useState(0);
  const [showArrow, setShowArrow] = useState(false);

  useEffect(() => {
    fetchData(0);
  }, [changeFollow]);

  async function fetchData(number) {
    try {
      const data = await getRecommendUsers(token, number);
      if (data.length === 8) {
        setShowArrow(true);
      } else {
        setShowArrow(false);
      }
      setRecommendUsers((prevState) =>
        number !== 0 ? [...prevState, ...data] : data
      );
    } catch (e) {
      // navigate('/error')
      console.log(e);
    }
  }

  function arrowClick() {
    fetchData(numberPage + 1);
    setNumberPage((prevState) => prevState + 1);
  }

  return (
    <div style={{ position: noFixed ? "static" : "fixed" }}>
      <SidebarSearch></SidebarSearch>
      {recommendUsers && (
        <div>
          <h3 className="recommendUsers__title">{t("sidebar.recommended")}</h3>
          {recommendUsers.length === 0 ? (
            <p className="popupSidebar__text">
              {t("sidebar.willRecommendations")}
            </p>
          ) : (
            <>
              <ul className={noFixed ? "recommendUsers__list" : "recommendUsers__list--noFixed"}>
                {recommendUsers.map(
                  (item) =>
                    !item.following &&
                    item.id !== currentUserId && (
                      <li key={item.userName}>
                        <Recommended
                          recommendUser={item}
                          recommendUsers={recommendUsers}
                          setRecommendUsers={setRecommendUsers}
                        ></Recommended>
                      </li>
                    )
                )}
              </ul>
              {showArrow && (
                <BtnLoadMore loadMore={() => arrowClick()}></BtnLoadMore>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
