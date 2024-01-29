import { createPortal } from "react-dom";
import PostActions from "../../Posts/PostActions/PostActions";
import "./ImgModal.scss";

export default function ImgModal({ img, setIsModalImgOpen }) {
  const modalRoot = document.getElementById("modal-root");

  function closeModal(event){
    if(event.target === event.currentTarget){
      setIsModalImgOpen()
    }
  }

  return createPortal(
    <div className="imgModal__bg" onClick={(e)=>closeModal(e)}>
      <img src={img.imgUrl} className='imgModal__img' />
      <PostActions reply={img.reply} repost={img.repost} likes={img.likes} view={img.view}></PostActions>
    </div>,
    modalRoot
  );
}
