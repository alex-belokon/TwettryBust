import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { getUserHighlights } from "../../api/profile";
import PostCard from "../../components/Posts/PostCard/PostCard";


export default function ProfileHighlights (){
  const [userHighlights, setUserHighlights] = useState([]);
  const { id } = useParams();

  useEffect(()=>{
    const fetchData = async () => {
      try {
        const data = await getUserHighlights(id);
        setUserHighlights(data);
      } catch (error) {
        console.error("Помилка при отриманні даних:", error);
      }
    };
    fetchData();

  }, [])

  return (
    <ul>
      {userHighlights.map((item)=> <li key={item.id}><PostCard postData={item}></PostCard></li>)}
    </ul>
  )
}