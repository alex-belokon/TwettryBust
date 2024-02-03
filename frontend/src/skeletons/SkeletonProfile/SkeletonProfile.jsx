import SkeletonElement from "../SkeletonElement";
import "./SkeletonProfile.scss";

export default function SkeletonProfile() {
  return (
    <div className="skeletonProfile__wrapper">
      <div className="skeletonProfile__header">
        <SkeletonElement type="icon"></SkeletonElement>
        <div style={{ width: "100%" }}>
          <SkeletonElement type="title"></SkeletonElement>
          <SkeletonElement type="text"></SkeletonElement>
        </div>
      </div>
      <SkeletonElement type="banner"></SkeletonElement>
      <div className="avatar__wrapper">
        <SkeletonElement type="avatar"></SkeletonElement>
        <SkeletonElement type="btn"></SkeletonElement>
      </div>
      <div className="skeletonProfile__userName">
        <SkeletonElement type="title"></SkeletonElement>
        <SkeletonElement type="text"></SkeletonElement>
      </div>

      <SkeletonElement type="text"></SkeletonElement>
      <SkeletonElement type="text"></SkeletonElement>
      <SkeletonElement type="text"></SkeletonElement>
      <SkeletonElement type="text"></SkeletonElement>
      <SkeletonElement type="textShort"></SkeletonElement>

      <div className="skeletonProfile__btnWrapper">
        <SkeletonElement type="textShort"></SkeletonElement>
        <SkeletonElement type="textShort"></SkeletonElement>
      </div>
    </div>
  );
}
