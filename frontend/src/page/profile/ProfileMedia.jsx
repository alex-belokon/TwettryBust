import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUserPosts } from "../../api/profile";
import ImgModal from "../../components/Modal/ImgModal/ImgModal";
import SkeletonPost from "../../skeletons/SkeletonPost/SkeletonPost";
import NoPosts from "./NoPosts";
import "./ProfileMedia.scss";

export default function ProfileMedia() {
  const [userMedia, setUserMedia] = useState([]);
  const [isModalImgOpen, setIsModalImgOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState("");
  const changePost = useSelector(state => state.changePost);
  const { id } = useParams();

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
  }, [changePost]);

  function openModalImg(elem) {
    setIsModalImgOpen(true);
    setCurrentImage(elem);
  }

  console.log(userMedia);

  return (
    <>
      {!userMedia && <SkeletonPost></SkeletonPost>}
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
        <NoPosts elemName="медіафайлів">
          Коли ви публікуєте фотографії чи відео, вони відображатимуться тут.
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
