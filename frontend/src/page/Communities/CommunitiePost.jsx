import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import SkeletonPost from "../../skeletons/SkeletonPost/SkeletonPost";
import PageNoPosts from "../../components/Posts/PageNoPosts/PageNoPosts";
import { getGroupTop } from "../../api/groups";
import PostContent from "../../components/Posts/PostContent/PostContent";
import PostCard from "../../components/Posts/PostCard/PostCard";
import "./CommunitiePost.scss";
import { useSelector } from "react-redux";
import BtnLoadMore from "../../components/Buttons/BtnLoadMore/BtnLoadMore";

export default function CommunitiePost() {
  const [numberPage, setNumberPage] = useState(0);
  const [posts, setPosts] = useState([]);
  const { id } = useParams();
  const changePost = useSelector((state) => state.changePost);

  useEffect(() => {
    setNumberPage(0);
    fetchData(0);
  }, [id, changePost]);

  const fetchData = async (pageNumber) => {
    try {
      const data = await getGroupTop(id, pageNumber);
      setPosts((prevPosts) => {
        if (pageNumber === 0) {
          return data;
        } else {
          const newPosts = data.filter(
            (newPost) =>
              !prevPosts.some((prevPost) => prevPost.id === newPost.id)
          );
          return [...prevPosts, ...newPosts];
        }
      });
    } catch (error) {
      console.error("Помилка при отриманні даних:", error);
    }
  };

  const arrowClick = () => {
    fetchData(numberPage + 1);
    setNumberPage((prevNumberPage) => prevNumberPage + 1);
  };

  return (
    <>
      <div className="postContentCommunitie__wrapper">
        <PostContent groupId={id}></PostContent>
      </div>

      <div className="post-create-container">
        {!posts.length && (
          <div className="skeletonPosts__wrapper">
            {[1, 2, 3].map((item) => (
              <SkeletonPost key={item}></SkeletonPost>
            ))}
          </div>
        )}
        {posts.length === 0 && <PageNoPosts></PageNoPosts>}
        {posts.length > 0 && (
          <>
            {posts.map((postData) => (
              <PostCard postData={postData} key={postData.id} />
            ))}
            <BtnLoadMore loadMore={arrowClick}></BtnLoadMore>
          </>
        )}
      </div>
    </>
  );
}

