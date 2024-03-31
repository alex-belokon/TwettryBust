import "./CommunitiesMedia.scss";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getGroupTop } from "../../api/groups";
import ImgModal from "../../components/Modal/ImgModal/ImgModal";

export default function CommunitiesMedia() {
  const [media, setMedia] = useState([]);
  const { id } = useParams();
  const [numberPage, setNumberPage] = useState(0);
  const [isModalImgOpen, setIsModalImgOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getGroupTop(id, numberPage);
        const mediaData = data.filter((item) => item.attachment);
        setMedia(mediaData);
      } catch (error) {
        console.error("Помилка при отриманні даних:", error);
      }
    };
    fetchData();
  }, [id]);

  function openModalImg(img) {
    setIsModalImgOpen(true);
    setCurrentImage(img);
  }

  return (
    <div className="media">
      <div className="mediaCommunities__list">
        {media.map((item) => (
          <img
            key={item.id}
            src={item.attachment}
            alt="media"
            className="mediaCommunities__img"
            onClick={() => openModalImg(item)}
          />
        ))}
      </div>
      {isModalImgOpen && (
        <ImgModal
          img={currentImage}
          setIsModalImgOpen={() => setIsModalImgOpen(false)}
        />
      )}
    </div>
  );
}
