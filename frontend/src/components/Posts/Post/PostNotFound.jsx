import { useNavigate } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useScrollToTop } from "../../../utils/useScrollToTop";

import "./PostNotFound.scss";
export default function PostNotFound() {
    const navigate = useNavigate();

    useScrollToTop()

  return (
    <div className="post__wrapper">
      <div className="post__header">
        <span className="post__backBtn" onClick={() => navigate(-1)}>
          <IoIosArrowRoundBack className="profileHeader__btn" />
        </span>
        <h3>Post</h3>
      </div>
      <div className="postNotFound__wrapper">
        <div className="postNotFound__emoji">😞</div>
        <h2 className="postNotFound__title">Post Not Found</h2>
        <p className="postNotFound__text">Извините, но пост, который вы ищете, не существует или был удален.</p>
        <button className="postNotFound__button" onClick={() => navigate(-1)}>Вернуться назад</button>
      </div>
    </div>
  );
}
