import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { fetchComments } from "../../../../api/posts";
import { InView } from 'react-intersection-observer';

import Comments from "./Comments";

import "./PostComment.scss";
export default function PostComment({ postData, setComments, comments, page, setPage, setCountCommentDetails }) {
  const { id } = useParams();
 
  const changeComment = useSelector((state) => state.changeComment);
  const [isLoading, setIsLoading] = useState(false);

  console.log('changeComment', changeComment);

  async function getComments(page) {
    const newComments = await fetchComments(id, page);
    console.log(`Fetching comments for page ${page}`)
    setComments(newComments);
  }
  useEffect(() => {
    getComments(0);
  }, [id]);

  const loadMoreComments = async () => {
    if (!isLoading) {
      setIsLoading(true);
      try {
        const newComments = await fetchComments(id, page + 1);
        setComments(prevComments => [...prevComments, ...newComments]);
        setPage(prevPage => prevPage + 1);
        console.log(`Loading more comments for page ${page}`);
      } catch (error) {
        console.error("Error fetching comments:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (!comments || !Array.isArray(comments)) {
    return null; 
  }
console.log(comments);
  return (
    <div className="post__comments">
      {comments.map((comment) => (
        <Comments key={comment.id} comment={comment} postData={postData} setComments={setComments} setCountCommentDetails={setCountCommentDetails} />
      ))}
      <InView
        as="div"
        onChange={(inView, entry) => {
          console.log('Element is in view:', entry.isIntersecting);
          if (inView && comments.length >= 1) {
            loadMoreComments();
          }
        }}
      >
        <div style={{ height: '1px' }}></div>
      </InView>
    </div>
  );
}