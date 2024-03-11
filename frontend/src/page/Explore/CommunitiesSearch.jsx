import { useEffect, useState } from "react";
import SidebarSearch from "../../components/Sidebar/SidebarSearch/SidebarSearch";
import CommunitiCard from "../Communities/CommunitiCard";
import { searchGroups } from "../../api/groups";


export default function CommunitiesSearch() {
  
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
