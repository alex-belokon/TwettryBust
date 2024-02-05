import SkeletonElement from "../SkeletonElement";
import "./SkeletonPost.scss";

export default function SkeletonPost() {
  return (
    <div className="skeletonPost__wrapper">
      <div className="skeletonPost__flex">
        <SkeletonElement type="avatarLittle"></SkeletonElement>
        <SkeletonElement type="textShort"></SkeletonElement>
        <SkeletonElement type="textShort"></SkeletonElement>
        <SkeletonElement type="textShort"></SkeletonElement>
      </div>
      <div className="skeletonPost__content">
        <SkeletonElement type="text"></SkeletonElement>
        <SkeletonElement type="text"></SkeletonElement>
        <SkeletonElement type="img"></SkeletonElement>
      </div>
    </div>
  );
}
