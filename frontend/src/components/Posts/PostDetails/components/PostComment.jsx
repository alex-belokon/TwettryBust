// import{ useEffect, useState, useRef } from "react";
// import { useParams } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { fetchComments } from "../../../../api/posts";
// import Comments from "./Comments";
// import "./PostComment.scss";

// const PostComment = ({ postData }) => {
//   const { id } = useParams();
//   const [comments, setComments] = useState([]);
//   const changeComment = useSelector((state) => state.changeComment);
//   const observerRef = useRef(null);
//   const [hasMore, setHasMore] = useState(true);
//   const [page, setPage] = useState(0); // начинаем с первой страницы

//   useEffect(() => {
//     const getComments = async () => {
//       const newComments = await fetchComments(id, page);
//       setComments((prevComments) => [...prevComments, ...newComments]); // добавляем новые комментарии в начало списка
//       if (newComments.length === 0) {
//         setHasMore(false);
//       }
//     };
//     if (hasMore) {
//       getComments();
//     }
//   }, [id, page, hasMore, changeComment]);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         if (entries[0].isIntersecting && hasMore) {
//           setPage((prevPage) => prevPage + 1);
//         }
//       },
//       { threshold: 1 }
//     );

//     if (observerRef.current) {
//       observer.observe(observerRef.current);
//     }

//     return () => {
//       if (observerRef.current) {
//         observer.unobserve(observerRef.current);
//       }
//     };
//   }, [observerRef, hasMore]);

//   if (!comments || !Array.isArray(comments)) {
//     return null;
//   }

//   return (
//     <div className="post__comments">
//       <div ref={observerRef}></div>
//       {comments.map((comment) => (
//         <Comments key={comment.id} comment={comment} postData={postData} />
//       ))}
//     </div>
//   );
// };

// export default PostComment;






// import { useEffect, useState, useRef } from "react";
// import { useParams } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { fetchComments } from "../../../../api/posts";

// import Comments from "./Comments";

// import "./PostComment.scss";

// export default function PostComment({ postData }) {
//   const { id } = useParams();
//   const [comments, setComments] = useState([]);
//   const changeComment = useSelector((state) => state.changeComment);
//   const observerRef = useRef(null);
//   const [hasMore, setHaMore] = useState(true);
//   const [page, setPage] = useState(0);

//   useEffect(() => {
//     async function getComments() {
//       const newComments = await fetchComments(id, page);
//       setComments(prevComments => [...prevComments, ...newComments]);
//       if (newComments.length === 0) {
//         setHaMore(false);
//       }
//     }
//     if (hasMore)
//     getComments();
//   }, [id, page, changeComment, hasMore]);

//   useEffect(() => {
//     const observer = new IntersectionObserver((entries) => {
//       if (entries[0].isIntersecting && hasMore) {
//         setPage(prevPage => prevPage + 1);
//       }
//     });
  
//     if (observerRef.current) {
//       observer.observe(observerRef.current);
//     }
  
//     return () => {
//       if (observerRef.current) {
//         observer.unobserve(observerRef.current);
//       }
//     };
//   }, [observerRef, hasMore]);

//   if (!comments || !Array.isArray(comments)) {
//     return null; 
//   }

//   const commentsElements = comments.map((comment) => {
//     return <Comments key={comment.id} comment={comment} postData={postData} />;
//   });

//   return (
//     <div className="post__comments">
//       {commentsElements}
//       <div ref={observerRef}></div>
//     </div>
//   );
// }






import { useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { fetchComments } from "../../../../api/posts";

import Comments from "./Comments";

import "./PostComment.scss";


export default function PostComment({ postData }) {
  const { id } = useParams();
  const [comments, setComments] = useState([]);
  const changeComment = useSelector((state) => state.changeComment);
  const [page, setPage] = useState(0);

  async function getComments() {
    const newComments = await fetchComments(id, page);
    setComments(newComments);
  }
  useEffect(() => {
    getComments();
  }, [id, page, changeComment]);

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
    async function getComments() {
      const newComments = await fetchComments(id, page);
      setComments(prevState => [...prevState, ...newComments]);
    }
    getComments();
  };

  if (!comments || !Array.isArray(comments)) {
    return null; 
  }

  const commentsElements = comments.map((comment) => {
    return <Comments key={comment.id} comment={comment} postData={postData} />;
  });

  return (
    <div className="post__comments">
      {commentsElements}
      <button onClick={handleLoadMore}>Загрузить еще</button>
    </div>
  );
}

