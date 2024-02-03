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
      </div>
    </div>
  );
}
