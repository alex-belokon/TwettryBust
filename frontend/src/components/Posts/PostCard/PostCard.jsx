import "./PostCard.scss";
import ContentCard from "../ContentCard/ContentCard";

export default function PostCard({ postData }) {
  
  return (
    <div className="postCard__box">
      <ContentCard postData={postData}></ContentCard>
    </div>
  );
}
