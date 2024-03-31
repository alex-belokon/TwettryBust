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
        const newComments = await fetchComments(id, page + 1); // Загружаем следующую страницу комментариев
        setComments(prevComments => [...prevComments, ...newComments]); // Добавляем новые комментарии к текущему списку
        setPage(prevPage => prevPage + 1); // Увеличиваем значение page после успешной загрузки
        console.log(`Loading more comments for page ${page}`);
      } catch (error) {
        console.error("Error fetching comments:", error);
      } finally {
        setIsLoading(false); // Устанавливаем isLoading в false после завершения загрузки
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
          if (inView && comments.length >= 1) { // Проверяем, что на странице есть хотя бы 10 комментариев
            loadMoreComments(); // Загружаем дополнительные комментарии
          }
        }}
      >
        <div style={{ height: '1px' }}></div> {/* Заглушка */}
      </InView>
    </div>
  );
}