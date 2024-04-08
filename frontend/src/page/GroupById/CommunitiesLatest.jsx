import PostCard from "../../components/Posts/PostCard/PostCard";
import { getGroupTop } from "../../api/groups";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function CommunitiesLatest() {
  const [latest, setLatest] = useState([]);
  const { id } = useParams();
  const [numberPage, setNumberPage] = useState(0);
  const currentUserId = useSelector((state) => state.authUser.user.id);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getGroupTop(id, numberPage, currentUserId);
        data.sort((a, b) => new Date(b.postDate) - new Date(a.postDate));
        const latestTwoPosts = data.slice(0, 2);
        setLatest(latestTwoPosts);
      } catch (error) {
        console.error("Помилка при отриманні даних:", error);
      }
    };
    fetchData();
  }, [id, currentUserId, numberPage]);
  return (
    <ul>
      {latest.map((item) => (
        <li key={item.id}>
          <PostCard postData={item}></PostCard>
        </li>
      ))}
    </ul>
  );
}
