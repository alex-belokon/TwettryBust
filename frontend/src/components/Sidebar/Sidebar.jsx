import { useState } from "react";
import { useEffect } from "react";
import { getRecommendUsers } from "../../api/profile";
import Recommended from "./Recommended/Recommended";
import { useSelector } from "react-redux";
import "./Sidebar.scss";
import SidebarSearch from "./SidebarSearch/SidebarSearch";

export default function Sidebar() {
  const [recommendUsers, setRecommendUsers] = useState(null);
  const currentUserId = useSelector((state) => state.authUser.user.id);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getRecommendUsers();
        console.log(data);
        setRecommendUsers(data);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <SidebarSearch></SidebarSearch>
      {recommendUsers && (
        <div>
          <h3 className="recommendUsers__title">Рекомендовані</h3>
          <ul className="recommendUsers__list">
            {recommendUsers.map(
              (item) =>
                !item.following &&
                item.id !== currentUserId && (
                  <li key={item.id}>
                    <Recommended recommendUser={item}></Recommended>
                  </li>
                )
            )}
          </ul>
        </div>
      )}
    </>
  );
}
