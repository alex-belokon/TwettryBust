import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserMedia } from "../../api/profile";
import ImgModal from "../../components/Modal/ImgModal/ImgModal";
import "./ProfileMedia.scss";

export default function ProfileMedia() {
  const [userMedia, setUserMedia] = useState([]);
  const [isModalImgOpen, setIsModalImgOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState('')
  const { id } = useParams();

  console.log(userMedia);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserMedia(id);
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
   console.log('currentImage', currentImage);
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
