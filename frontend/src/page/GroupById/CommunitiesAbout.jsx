// import './CommunitiesAbout.scss';
// import { useTranslation } from "react-i18next";

// export default function CommunitiesAbout({ groupData }) {
//   const { t } = useTranslation();
//   console.log(groupData);
//   return (
//     <div className="communitiesAbout">
//       <h1>about</h1>
      {/* <p>{groupData.about}</p> */}
      {/* Додайте інші дані про групу, які вам потрібні */}

    // </div>
 
//   );
// }
import "./CommunitiesAbout.scss";
import { useTranslation } from "react-i18next";
import { getGroupById } from "../../api/groups";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
export default function CommunitiesAbout() {
  const { t } = useTranslation();
  const { id } = useParams();
  const [about, setAbout] = useState(null);
   useEffect(() => {
     const fetchGroupData = async () => {
       try {
         const groupData = await getGroupById(id);
      setAbout(groupData.about);
       } catch (error) {
         console.error("Error fetching group data:", error.message);
       }
     };

     fetchGroupData();
   }, [id]);
  
  return (
    <div className="communitiesAbout">
      <p>{about}</p>
    </div>
  );
}
 