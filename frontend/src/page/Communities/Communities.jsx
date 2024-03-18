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
 const [deletedGroupIds, setDeletedGroupIds] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getGroups();
        setGroupData(
          data.filter((group) => !deletedGroupIds.includes(group.id))
        );
        console.log(data);
      } catch (error) {
        console.error("Error fetching groups:", error.message);
      }
    };
    fetchData();
  }, [deletedGroupIds]);

  const handleDeleteGroup = (groupId) => {
  setDeletedGroupIds((prevIds) => [...prevIds, groupId]);
    
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
            <button
              className="titlePage__addGroup"
              onClick={() => setIsModalOpen(true)}
            >
              <IoCreateOutline className="titlePage__addGroup_img" />
            </button>
          </div>
          {groupsData.map((group) => (
            <CommunitiCard key={group.id} group={group} />
          ))}
        </div>
      )}
      {isModalOpen && (
        <CreateGroup
          closeModal={() => setIsModalOpen(false)}
          setGroupData={setGroupData}
          onClick={handleDeleteGroup}
        />
      )}
    </>
  );
}
