import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import Comments from "./Comments";

import "./PostComment.scss";

export default function PostComment({ postData }) {
  const { id } = useParams();
  const [comments, setComments] = useState([]);
  const changeComment = useSelector((state) => state.changeComment);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`http://localhost:9000/posts/${id}/comments?page=0&size=10`);
        const data = await response.json();
  
        console.log(data); // Добавьте эту строку
  
        if (Array.isArray(data.content)) {
          setComments(data.content);
        } else {
          console.error('Error: expected an array of comments, but got', data);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchComments();
  }, [id, changeComment]);


  if (!comments || !Array.isArray(comments)) {
    return null; 
  }

  const commentsElements = [...comments].reverse().map((comment) => {
    return <Comments key={comment.id} comment={comment} postData={postData} />;
  });

  return <div className="post__comments">{commentsElements}</div>
}