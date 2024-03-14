import SkeletonElement from "../SkeletonElement";
// import "./skeletonPostDetails.scss";

export default function SkeletonPostDetails() {
  return (
    <div className="skeletonPostDetails__wrapper">
      <div className="skeletonPostDetails__flex">
        <SkeletonElement type="avatarLittle"></SkeletonElement>
        <SkeletonElement type="textShort"></SkeletonElement>
        <SkeletonElement type="textShort"></SkeletonElement>
        <SkeletonElement type="textShort"></SkeletonElement>
      </div>
      <div className="skeletonPostDetails__content">
        <SkeletonElement type="text"></SkeletonElement>
        <SkeletonElement type="text"></SkeletonElement>
        <SkeletonElement type="img"></SkeletonElement>
      </div>
    </div>
  );
}
