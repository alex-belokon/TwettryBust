import { useEffect, useState } from "react";
import SidebarSearch from "../../components/Sidebar/SidebarSearch/SidebarSearch";
import CommunitiCard from "../Communities/CommunitiCard";
import { searchGroups } from "../../api/groups";
import { useTranslation } from "react-i18next";

export default function CommunitiesSearch() {
  const { t } = useTranslation();
  const [groupsData, setGroupData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await searchGroups();
        setGroupData(data);
      } catch (error) {
        console.error("Error fetching groups:", error.message);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="explore__wrapper">
      <SidebarSearch></SidebarSearch>
      {groupsData && groupsData.map((group) => (
        <CommunitiCard
          key={group.id}
          group={group}
        />
      ))}
    </div>
  );
}
