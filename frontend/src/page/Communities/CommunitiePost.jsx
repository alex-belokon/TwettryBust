// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import SkeletonPost from "../../skeletons/SkeletonPost/SkeletonPost";
// import PageNoPosts from "../../components/Posts/PageNoPosts/PageNoPosts";
// // import { FaArrowLeftLong } from "react-icons/fa6";
// // import { FaArrowRightLong } from "react-icons/fa6";
// import { getGroupTop } from "../../api/groups";
// import PostContent from "../../components/Posts/PostContent/PostContent";
// import PostCard from "../../components/Posts/PostCard/PostCard";
// import "./CommunitiePost.scss";
// import BtnLoadMore from "../../components/Buttons/BtnLoadMore/BtnLoadMore";
// export default function CommunitiePost() {
//   const [numberPage, setNumberPage] = useState(0);
//   const [posts, setPosts] = useState(null);
//   const { id } = useParams();
//   const [showArrow, setShowArrow] = useState(false);
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const data = await getGroupTop(id, numberPage);
//         if (data.length === 8) {
//           setShowArrow(true);
//         } else {
//           setShowArrow(false);
//         }
//         setPosts((prevState) =>
//           number !== 0 ? [...prevState, ...data] : data);
//       } catch (error) {
//         console.error("Помилка при отриманні даних:", error);
//       }
//     };
//    fetchData();
//   }, [id, numberPage]);
//  function arrowClick() {
//       fetchData(numberPage + 1);
//       setNumberPage((prevState)=>prevState+1)
//     }
    

//   return (
//     <>
//       <div className="postContentCommunitie__wrapper">
//         <PostContent groupId={id}></PostContent>
//       </div>

//       <div className="post-create-container">
//         {!posts && (
//           <div className="skeletonPosts__wrapper">
//             {[1, 2, 3].map((item) => (
//               <SkeletonPost key={item}></SkeletonPost>
//             ))}
//           </div>
//         )}
//         {posts && posts.length === 0 && <PageNoPosts></PageNoPosts>}
//         {posts && posts.length > 0 && (
//           <>
//             {posts.map((postData) => (
//               <PostCard postData={postData} key={postData.id} />
//             ))}
//             <div className="arrowBtnWrapper">
//               <button className="arrowBtn" onClick={() => arrowClick("prev")}>
//                 <FaArrowLeftLong /> Prev
//               </button>
//               <button className="arrowBtn" onClick={() => arrowClick("next")}>
//                 Next <FaArrowRightLong />
//               </button>
//             </div>
//             {showArrow && (
//               <BtnLoadMore loadMore={() => arrowClick()}></BtnLoadMore>
//             )}
//
//           </>
//         )}
//       </div>
//     </>
//   );
// }

// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import SkeletonPost from "../../skeletons/SkeletonPost/SkeletonPost";
// import PageNoPosts from "../../components/Posts/PageNoPosts/PageNoPosts";
// import { FaArrowLeftLong } from "react-icons/fa6";
// import { FaArrowRightLong } from "react-icons/fa6";
// import { getGroupTop } from "../../api/groups";
// import PostContent from "../../components/Posts/PostContent/PostContent";
// import PostCard from "../../components/Posts/PostCard/PostCard";
// import "./CommunitiePost.scss";
// export default function CommunitiePost() {
//   const [numberPage, setNumberPage] = useState(0);
//   const [posts, setPosts] = useState(null);
//   const { id } = useParams();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const data = await getGroupTop(id, numberPage);
//         setPosts(data);
//       } catch (error) {
//         console.error("Помилка при отриманні даних:", error);
//       }
//     };
//     fetchData();
//   }, [id, numberPage]);

//   function arrowClick(param) {
//     if (param === "prev" && numberPage !== 0) {
//       setNumberPage((prevState) => prevState - 1);
//       window.scrollTo(0, 0);
//     } else if (param === "next" && posts.length >= 8) {
//       setNumberPage((prevState) => prevState + 1);
//       window.scrollTo(0, 0);
//     }
//   }

//   return (
//     <>
//       <div className="postContentCommunitie__wrapper">
//         <PostContent groupId={id}></PostContent>
//       </div>

//       <div className="post-create-container">
//         {!posts && (
//           <div className="skeletonPosts__wrapper">
//             {[1, 2, 3].map((item) => (
//               <SkeletonPost key={item}></SkeletonPost>
//             ))}
//           </div>
//         )}
//         {posts && posts.length === 0 && <PageNoPosts></PageNoPosts>}
//         {posts && posts.length > 0 && (
//           <>
//             {posts.map((postData) => (
//               <PostCard postData={postData} key={postData.id} />
//             ))}
//             <div className="arrowBtnWrapper">
//               <button className="arrowBtn" onClick={() => arrowClick("prev")}>
//                 <FaArrowLeftLong /> Prev
//               </button>
//               <button className="arrowBtn" onClick={() => arrowClick("next")}>
//                 Next <FaArrowRightLong />
//               </button>
//             </div>
//           </>
//         )}
//       </div>
//     </>
//   );
// }

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

