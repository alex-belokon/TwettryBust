import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUserPosts } from "../../api/profile";
import ImgModal from "../../components/Modal/ImgModal/ImgModal";
import SkeletonElement from "../../skeletons/SkeletonElement";
import NoPosts from "./NoPosts";
import "./ProfileMedia.scss";
import { useTranslation } from "react-i18next";
import BtnLoadMore from "../../components/Buttons/BtnLoadMore/BtnLoadMore";

export default function ProfileMedia() {
  const [userMedia, setUserMedia] = useState(null);
  const [isModalImgOpen, setIsModalImgOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState("");
  const changePost = useSelector((state) => state.changePost);
  const { id } = useParams();
  const { t } = useTranslation();
  const [showArrow, setShowArrow] = useState(false);
  const [numberPage, setNumberPage] = useState(0);

  useEffect(() => {
    fetchData(0);
  }, [changePost, id]);

  const fetchData = async (number) => {
    try {
      let data = await getUserPosts(id, number);
      data = data.filter((elem) => elem.attachment);
      if (data.length === 8) {
        setShowArrow(true);
      } else {
        setShowArrow(false);
      }
      setUserMedia((prevState) => number !== 0 ? [...prevState, ...data] : data);
    } catch (e) {
      console.error("Помилка при отриманні даних:", error);
    }
  };

  function openModalImg(elem) {
    setIsModalImgOpen(true);
    setCurrentImage(elem);
  }

  function arrowClick () {
    fetchData(numberPage+1);
    setNumberPage((prevState) => prevState + 1);
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
        <>
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
          {showArrow && (<BtnLoadMore loadMore={() => arrowClick()}></BtnLoadMore>)}
        </>
      )}
      {userMedia && userMedia.length === 0 && (
        <NoPosts elemName={t("profile.media")}>
          {t("profile.mediaText")}
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
