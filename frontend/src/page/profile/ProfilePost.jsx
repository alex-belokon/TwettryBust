import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserPosts } from "../../api/profile";
import PostCard from "../../components/Posts/PostCard/PostCard";

export default function ProfilePost() {
  const [userPosts, setUserPosts] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserPosts(id);
        setUserPosts(data);
      } catch (error) {
        console.error("Помилка при отриманні даних:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <ul>
      {userPosts.map((item) => (
        <li key={item.id}>
          <PostCard postData={item}></PostCard>{" "}
        </li>
      ))}
    </ul>
  );
}
