import { useNavigate } from "react-router-dom";
import "./Communities.style.scss";
import { IoIosArrowRoundBack } from "react-icons/io";
import BtnOpenPopup from "../../components/Posts/BtnOpenPopup/BtnOpenPopup";
import SkeletonCommunities from "../../skeletons/SkeletonCommunities/SkeletonCommunities";
import { useEffect, useState } from "react";
import { getGroups } from "../../api/groups";
import { useTranslation } from "react-i18next";
import CommunitiCard from "./CommunitiCard";

export default function Communities(){
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [groupsData, setGroupData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getGroups();
        setGroupData(data);
      } catch (error) {
        console.error("Error fetching groups:", error.message);
      }
    };
    fetchData();
  }, []);

  const handleGroupClick = (groupId) => {
    navigate(`/communities/${groupId}`);
  };

  return (
    <>
      {!groupsData && <SkeletonCommunities />}
      {groupsData && (
        <div className="communities">
          <div className="communities__header">
            <IoIosArrowRoundBack
              className="profileHeader__btn"
              onClick={() => navigate(-1)}
            />
            <h2 className="communities__header_title">
              {t("communities.title")}
            </h2>
          </div>
          <div className="titlePage">
            <h2 className="titlePage__title"> {t("communities.titlePage")}</h2>
            <BtnOpenPopup />
          </div>
          {groupsData.map((group) => (
            <CommunitiCard
              key={group.id}
              group={group}
              onClick={() => handleGroupClick(group.id)}
            />
          ))}
        </div>
      )}
    </>
  );
};

