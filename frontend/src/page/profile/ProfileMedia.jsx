import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserPosts } from "../../api/profile";
import ImgModal from "../../components/Modal/ImgModal/ImgModal";
import "./ProfileMedia.scss";

export default function ProfileMedia() {
  const [userMedia, setUserMedia] = useState([]);
  const [isModalImgOpen, setIsModalImgOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState('')
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserPosts(id);
        setUserMedia(data);
      } catch (e) {
        console.error("Помилка при отриманні даних:", error);
      }
    };
    fetchData();
  }, []);

  function openModalImg (elem){
    setIsModalImgOpen(true)
    setCurrentImage(elem)
  }

  return (
    <>
      <ul className="media__list">
        {userMedia.map((elem) => (
          <li key={elem.imgUrl}>
            <img className="media__img" src={elem.imgUrl} onClick={()=> openModalImg(elem)}/>
          </li>
        ))}
      </ul>
      {isModalImgOpen && <ImgModal img={currentImage} setIsModalImgOpen={()=>setIsModalImgOpen(false)}></ImgModal>}
    </>
  );
}
