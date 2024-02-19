import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserHighlights } from "../../api/profile";
import PostCard from "../../components/Posts/PostCard/PostCard";
import SkeletonPost from "../../skeletons/SkeletonPost/SkeletonPost";
import NoPosts from "./NoPosts";

export default function ProfileHighlights() {
  const [userHighlights, setUserHighlights] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserHighlights(id);
        console.log(data);
        setUserHighlights(data);
      } catch (error) {
        console.error("Помилка при отриманні даних:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {!userHighlights && <SkeletonPost></SkeletonPost>}
      {userHighlights && userHighlights.length > 0 && (
        <ul>
          {userHighlights.map((item) => (
            <li key={item.id}>
              <PostCard postData={item}></PostCard>
            </li>
          ))}
        </ul>
      )}
      {userHighlights && userHighlights.length === 0 && (
        <NoPosts elemName="вибраних">
          Щоб показувати у своєму профілі вибрані додайте його в пості. Коли ви
          це зробите, він з’явиться тут.
        </NoPosts>
      )}
    </>
  );
}
