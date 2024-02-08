import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import { PropTypes } from "prop-types";
import { formatNumber } from "../../../utils/fromatNumber";

import PostActions from "../PostActions/PostActions";
import BtnOpenPopup from "../BtnOpenPopup/BtnOpenPopup";
import PostNotFound from "./components/PostNotFound";
import PostContent from "../PostContent/PostContent";
import PostComments from "./components/PostComment";

import "./PostDetails.scss";

export default function PostDetails() {
  const { id } = useParams(); // получение id из URL
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const url = `http://localhost:5173/post/${id}`;
  useEffect(() => {
    async function getPost() {
      try {
        const resp = await fetch(url);

        let dataArr = [];

        if (resp.ok) {
          //     dataArr = await resp.json();
          //     console.log("DataArr", dataArr);
          //   } else {
          // Временные данные
          dataArr = [
            {
              imgPost:
                "https://res.cloudinary.com/dfrps0cby/image/upload/v1706292731/ronx3qzcgcif1loe6mor.jpg",
              userScreensaver:
                "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663684/samples/smile.jpg",
              text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus inventore illo ratione quo placeat. Veritatis autem unde incidunt iste asperiores.",
              userName: "QQQQQ",
              userLastName: "QQQQQ",
              postDate: new Date(),
              userLogin: "@login",
              reply: 1345,
              repost: 0,
              likes: 555,
              view: 10000,
              isInBookmark: true,
              id: 2,
              comments: [
                {
                  id: 1,
                  text: "Comment 1",
                  user: "User 1",
                  isInBookmark: true,
                },
                {
                  id: 2,
                  text: "Comment 2",
                  user: "User 2"
                },
                {
                  id: 3,
                  text: "Comment 3",
                  user: "User 3"
                }
              ]
            },
            {
              imgPost:
                "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663683/samples/balloons.jpg",
              userScreensaver:
                "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663682/samples/two-ladies.jpg",
              text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus inventore illo ratione quo placeat. Veritatis autem unde incidunt iste asperiores.",
              userName: "userName",
              userLastName: "userLastName",
              postDate: new Date(),
              userLogin: "@login",
              reply: 2,
              repost: 10,
              likes: 5,
              view: 10,
              isInBookmark: false,
              id: 6,
            },
            {
              imgPost:
                "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663664/samples/bike.jpg",
              userScreensaver:
                "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663667/samples/people/bicycle.jpg",
              text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus inventore illo ratione quo placeat. Veritatis autem unde incidunt iste asperiores.",
              userName: "userName",
              userLastName: "userLastName",
              postDate: new Date(),
              userLogin: "@login",
              reply: 12,
              repost: 0,
              likes: 10,
              view: 2,
              isInBookmark: true,
              id: 4,
              comments: [
                {
                  imgUrl:
                  "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663664/samples/bike.jpg",
                  userScreensaver:
                  "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663684/samples/smile.jpg",
                  text: "commet1",
                  userName: "Olav",
                  userLastName: "Pzitcski",
                  postDate: new Date(),
                  userLogin: "@login",
                  likes: 10,
                  reply: 12,
                  repost: 0,
                  isInBookmark: true,
                  id: 1,
                },
                {
                  id: 2,
                  text: "Comment 2",
                  user: "User 2",
                  isInBookmark: true,
                },
                {
                  id: 3,
                  text: "Comment 3",
                  user: "User 3",
                  isInBookmark: true,
                }
              ]
            },
          ];
        }
        const post = dataArr.find((postData) => postData.id === Number(id));
        setPost(post);
      } catch (error) {
        console.error("Ошибка:", error);
      }
    }

    getPost();
  }, [id]);

  // Если пост не найден, отображаем сообщение
  if (!post) {
    return <PostNotFound/>;
  }

  return (
    <>
    <div className="post__wrapper">
      <div className="post__header">
        <span className="post__backBtn" onClick={() => navigate(-1)}>
          <IoIosArrowRoundBack className="profileHeader__btn" />
        </span>
        <h3>Post</h3>
      </div>
      <div className="post__box">
        {post?.userScreensaver ? (
          <img
            src={post?.userScreensaver}
            className="post__userScreensaver"
            alt={post?.userName || "User" + " " + post?.userLastName || ""}
          />
        ) : (
          <div className="post__userScreensaver post__userScreensaver--template"></div>
        )}
        <div className="post__infoHeader">
          <div className="post__infoHeaderTop">
            <Link to={`/profile/${post?.id}`} className="post__userName">
              {`${post?.userName || ""} ${post?.userLastName || ""}`.trim() ||
                "User"}
            </Link>
            <span className="post__userLogin">
              {post?.userLogin || "@userLogin"}
            </span>
          </div>
        </div>
        <BtnOpenPopup/>
      </div>
      <p className="post__text">{post?.text}</p>
      {post?.imgPost ? (
        <img className="post__imgPost" src={post?.imgPost} alt="post image" />
      ) : (
        <div className="post__imgPost--template"></div>
      )}
      <div className="post__postDate">
        <span className="post__time">
          {post?.postDate
            ? new Date(post.postDate).toLocaleString("en-US", {
                hour: "numeric",
                minute: "numeric",
              })
            : new Date().toLocaleTimeString()}
        </span>
        <span className="post__date">
          {post?.postDate
            ? new Date(post.postDate).toLocaleString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })
            : new Date().toLocaleDateString()}
        </span>
        <span>
          <span className="post__views">{formatNumber(post?.view)} Views</span>
        </span>
      </div>
      <div className="post__actions">
        <PostActions
          additionalClass="post__actions--bottom"
          postData={post}
          isInBookmark={post?.isInBookmark}
        />
      </div>
      <PostContent
      showReplyingTo={true}
      showExtraContentOnFocus={true}
      additionalClass={"btnContainerComments"}
      classPostList={"post__list--comments"}
      postFooterClass={"post__footer--comments"}
      postItemClass={"post__item--comments"}
      textAreaClass={"post__textArea--comments"}
       />
    </div>
    <PostComments 
    post={post}
    />
    </>
  );
}

PostDetails.propTypes = {
  formatNumber: PropTypes.func,
};