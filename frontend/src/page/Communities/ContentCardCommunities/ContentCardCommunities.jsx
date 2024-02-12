import { useState } from "react";
import { Link } from "react-router-dom";
import BtnOpenPopup from "../../../components/Posts/BtnOpenPopup/BtnOpenPopup";
import PostActions from "../../../components/Posts/PostActions/PostActions";

export default function ContentCardCommunities({ postData, isComment = false }) {
      const [isModalOpen, setIsModalOpen] = useState(false);
    return (
    //   <div className="contentCardCom__box">
    //     <Link to={``} />
    //     <div className="contentCard__info">
    //       <div className="contentCard__infoHeader">
    //         <Link
    //           to={`/communities/${postData?.id}`}
    //           className="contentCard__userName"
    //         >
    //           {`${postData?.userName || ""} ${
    //             postData?.userLastName || ""
    //           }`.trim() || "User"}
    //         </Link>

    //         <span className="contentCard__userLogin">
    //           {postData?.userLogin || "@userLogin"}
    //         </span>
    //         <span className="contentCard__postDate">
    //           {postData?.postDate
    //             ? new Date(postData.postDate).toLocaleString("en-US", {
    //                 month: "short",
    //                 day: "numeric",
    //                 hour: "numeric",
    //                 minute: "numeric",
    //               })
    //             : new Date().toLocaleString()}
    //         </span>
    //         <div className="contentCard__btnWrapper"></div>

    //         <div className="btnOpenPopup__wrapper">
    //           {!isComment && <BtnOpenPopup></BtnOpenPopup>}
    //         </div>
    //       </div>

    //       <Link
    //         to={`/post/${postData?.id}`}
    //         className="contentCard__infoWrapper"
    //       >
    //         <p className="contentCard__text">{postData?.text}</p>
    //       </Link>
    //       {!isComment &&
    //         (postData?.imgUrl ? (
    //           <img
    //             className="contentCard__imgPost"
    //             src={postData?.imgUrl}
    //             alt="post image"
    //             onClick={() => setIsModalOpen(true)}
    //           />
    //         ) : (
    //           <div className="contentCard__imgPost--template"></div>
    //         ))}
    //       {!isComment && (
    //         <PostActions
    //           postData={postData}
    //           isInBookmark={postData?.isInBookmark}
    //         ></PostActions>
    //       )}
    //     </div>
    //   </div>
    )
}
