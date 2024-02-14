import SkeletonElement from "../SkeletonElement";
import "../SkeletonCommunities/SkeletonCommunities.scss";
export default function SkeletonCommunities() {
  return (
    <div className="skeletonCommunities">
      <div className="communities__flex">
        <SkeletonElement type="icon"></SkeletonElement>
        <div style={{ width: "100%" }}>
          <SkeletonElement type="titleShort"></SkeletonElement>
        </div>
      </div>
      <div className="skeletonCommunities__content">
        <div className="communities__flex">
          <SkeletonElement type="textShort"></SkeletonElement>
          <SkeletonElement type="icon"></SkeletonElement>
        </div>
        <div className="communities__flex">
          <SkeletonElement type="img__post"></SkeletonElement>
          <div>
            <SkeletonElement type="textShort"></SkeletonElement>
            <SkeletonElement type="icon"></SkeletonElement>
          </div>
        </div>
        <div className="communities__flex">
          <SkeletonElement type="img__post"></SkeletonElement>
          <div>
            <SkeletonElement type="textShort"></SkeletonElement>
            <SkeletonElement type="icon"></SkeletonElement>
          </div>
        </div>
        <div className="communities__flex">
          <SkeletonElement type="img__post"></SkeletonElement>
          <div>
            <SkeletonElement type="textShort"></SkeletonElement>
            <SkeletonElement type="icon"></SkeletonElement>
          </div>
        </div>
      </div>
    </div>
  );
}
