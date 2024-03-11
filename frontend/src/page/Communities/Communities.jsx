import { useNavigate } from "react-router-dom";
import "./Communities.style.scss";
import { IoIosArrowRoundBack } from "react-icons/io";
import SkeletonCommunities from "../../skeletons/SkeletonCommunities/SkeletonCommunities";
import { useEffect, useState } from "react";
import { getGroups } from "../../api/groups";
import { useTranslation } from "react-i18next";
import CommunitiCard from "./CommunitiCard";
import { IoCreateOutline } from "react-icons/io5";
import CreateGroup from "../../components/Modal/CreateGroup/CreateGroup.jsx";
export default function Communities() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [groupsData, setGroupData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getGroups();
        setGroupData(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching groups:", error.message);
      }
    };
    fetchData();
  }, []);

  // const handleGroupClick = (groupId) => {
  //   navigate(`/communities/${groupId}`);
  // };

  const openModal = () => {
    setIsModalOpen(true);
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
            <IoCreateOutline
              className="titlePage__addGroup"
              onClick={openModal}
            />
            {isModalOpen && (
              <CreateGroup closeModal={() => setIsModalOpen(false)} />
            )}
          </div>
          {groupsData.map((group) => (
            <CommunitiCard
              key={group.id}
              group={group}
              // onClick={() => handleGroupClick(group.id)}
            />
          ))}
        </div>
      )}
    </>
  );
}
