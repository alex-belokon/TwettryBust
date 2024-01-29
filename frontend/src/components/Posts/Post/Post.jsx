import PostCard from "../PostCard/PostCard";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Post() {
  const { id } = useParams();
  const posts = useSelector((state) => state.posts);
  const postData = posts.find((postData) => postData.id === Number(id));

  if (!postData) {
    return <div>Пост не найден</div>;
  }

  return (
    <div className="post__container">
      <PostCard postData={postData} />
    </div>
  );
}
