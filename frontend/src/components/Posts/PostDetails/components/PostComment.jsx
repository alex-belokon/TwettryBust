import Comments from "./Comments";

import "./PostComment.scss";

export default function PostComment({ post }) {
  // Проверяем, существуют ли комментарии
  if (!post.comments) {
    return null; // или отображаем заглушку, или сообщение о том, что комментариев нет
  }

  // Если комментарии существуют, обрабатываем их
  const comments = post.comments.map((comment) => {
    return <Comments key={comment.id} comment={comment} />;
  });

  return <div className="post__comments">{comments}</div>
}