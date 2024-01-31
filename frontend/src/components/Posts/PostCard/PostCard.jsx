import "./PostCard.scss";
import PostActions from "../PostActions/PostActions";
import ContentCard from "../ContentCard/ContentCard";

export default function PostCard({ postData }) {
  
  return (
    <div className="postCard__box">
      <ContentCard postData={postData}></ContentCard>
      <div style={{ maxWidth: "516px", marginLeft: "auto" }}>
        <PostActions
          reply={postData?.reply}
          repost={postData?.repost}
          likes={postData?.likes}
          view={postData?.view}
          isInBookmark={postData?.isInBookmark}
        ></PostActions>
      </div>
    </div>
  );
}
