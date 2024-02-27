import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getGroupMedia } from "../../api/groups";
import ImgModal from "../../components/Modal/ImgModal/ImgModal";
import './CommunitiesMedia.scss'

export default function CommunitiesMedia() {
  const [userMedia, setUserMedia] = useState([]);
  const [isModalImgOpen, setIsModalImgOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getGroupMedia(id);
        setUserMedia(data);
      } catch (e) {
        console.error("Помилка при отриманні даних:", error);
      }
    };
    fetchData();
  }, []);

  function openModalImg(elem) {
    setIsModalImgOpen(true);
    setCurrentImage(elem);
  }

  return (
    <>
      <ul className="mediaCommunities__list">
        {userMedia.map((elem) => (
          <li key={elem.imgUrl}>
            <img
              className="mediaCommunities__img"
              src={elem.imgUrl}
              onClick={() => openModalImg(elem)}
            />
          </li>
        ))}
      </ul>
      {isModalImgOpen && (
        <ImgModal
          img={currentImage}
          setIsModalImgOpen={() => setIsModalImgOpen(false)}
        ></ImgModal>
      )}
    </>
  );
}
