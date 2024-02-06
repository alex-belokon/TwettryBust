import Comments from "./Comments";

import "./PostComment.scss";

export default function PostComment({ post }) {
  const comments = post.comments.map((comment) => {
    return <Comments key={comment.id} comment={comment} />;
  });
  return <div className="post__comments">{comments}</div>;
}
