// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { getGroupMedia, getGroupTop } from "../../api/groups";
// import ImgModal from "../../components/Modal/ImgModal/ImgModal";
import "./CommunitiesMedia.scss";

// export default function CommunitiesMedia() {
//   const [userMedia, setUserMedia] = useState([]);
//   const [isModalImgOpen, setIsModalImgOpen] = useState(false);
//   const [currentImage, setCurrentImage] = useState("");
//   const { id } = useParams();

//   useEffect(() => {
//     //   const fetchData = async () => {
//     //     try {
//     //       const data = await getGroupMedia(id);
//     //       setUserMedia(data);
//     //     } catch (e) {
//     //       console.error("Помилка при отриманні даних:", error);
//     //     }
//     //   };
//     //   fetchData();
//     // }, []);
//     const fetchData = async () => {
//       try {
//         console.log(id, numberPage, currentUserId);

//         const data = await getGroupTop(id, numberPage, currentUserId);
//         console.log(data);
//         setPosts(data);
//       } catch (error) {
//         console.error("Помилка при отриманні даних:", error);
//       }
//     };
//     fetchData();
//   }, [id, currentUserId, numberPage]);

//   // function openModalImg(elem) {
//   //   setIsModalImgOpen(true);
//   //   setCurrentImage(elem);
//   // }

//   return (
//     <>
//       <p>media</p>
//        {/* <ul className="mediaCommunities__list">
//         {userMedia.map((elem) => (
//           <li key={elem.imgUrl}>
//             <img
//               className="mediaCommunities__img"
//               src={elem.imgUrl}
//               onClick={() => openModalImg(elem)}
//             />
//           </li>
//         ))}
//       </ul>
//       {isModalImgOpen && (
//         <ImgModal
//           img={currentImage}
//           setIsModalImgOpen={() => setIsModalImgOpen(false)}
//         ></ImgModal>
//       )}  */}
//     </>
//   );
// }
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getGroupTop } from "../../api/groups";
import { useSelector } from "react-redux";

export default function CommunitiesMedia() {
  const [media, setMedia] = useState([]);
  const { id } = useParams();
  const [numberPage, setNumberPage] = useState(0);
  const currentUserId = useSelector((state) => state.authUser.user.id);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getGroupTop(id, numberPage, currentUserId);
        const mediaData = data.filter((item) => item.attachment);
        setMedia(mediaData);
      } catch (error) {
        console.error("Помилка при отриманні даних:", error);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div className="media">
      <div className="mediaCommunities__list">
        {media.map((item) => (
          <img
            key={item.id}
            src={item.attachment}
            alt="media"
            className="mediaCommunities__img "
          />
        ))}
      </div>
    </div>
  );
}
