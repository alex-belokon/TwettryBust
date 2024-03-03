import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUserPosts } from "../../api/profile";
import ImgModal from "../../components/Modal/ImgModal/ImgModal";
import SkeletonElement from "../../skeletons/SkeletonElement";
import NoPosts from "./NoPosts";
import "./ProfileMedia.scss";
import { useTranslation } from "react-i18next";

export default function ProfileMedia() {
  const [userMedia, setUserMedia] = useState(null);
  const [isModalImgOpen, setIsModalImgOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState("");
  const changePost = useSelector((state) => state.changePost);
  const { id } = useParams();
  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let data = await getUserPosts(id);
        data = data.filter((elem) => elem.attachment);
        setUserMedia(data);
      } catch (e) {
        console.error("Помилка при отриманні даних:", error);
      }
    };
    fetchData();
  }, [changePost, id]);

  function openModalImg(elem) {
    setIsModalImgOpen(true);
    setCurrentImage(elem);
  }

  return (
    <>
      {!userMedia && (
        <div
          className="skeletonPosts__wrapper"
          style={{
            display: "flex",
            columnGap: "8px",
            flexWrap: "wrap",
            padding: "6px",
          }}
        >
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <SkeletonElement
              type="skeleton__media"
              key={item}
            ></SkeletonElement>
          ))}
        </div>
      )}
      {userMedia && userMedia.length > 0 && (
        <ul className="media__list">
          {userMedia.map((elem, index) => (
            <li key={index}>
              <img
                className="media__img"
                src={elem.attachment}
                onClick={() => openModalImg(elem)}
              />
            </li>
          ))}
        </ul>
      )}
      {userMedia && userMedia.length === 0 && (
        <NoPosts elemName={t('profile.media')}>
          {t('profile.mediaText')}
        </NoPosts>
      )}

      {isModalImgOpen && (
        <ImgModal
          img={currentImage}
          setIsModalImgOpen={() => setIsModalImgOpen(false)}
        ></ImgModal>
      )}
    </>
  );
}
