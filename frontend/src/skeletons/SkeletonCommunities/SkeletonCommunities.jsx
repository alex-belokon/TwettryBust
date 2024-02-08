import SkeletonElement from "../SkeletonElement";

export default function SkeletonCommunities() {
  return (
    <div className="skeletonCommunities__wrapper">
      <div className="skeletonCommunities__header">
        <SkeletonElement type="icon"></SkeletonElement>
        <div style={{ width: "100%" }}>
          <SkeletonElement type="title"></SkeletonElement>
          <SkeletonElement type="icon"></SkeletonElement>
          <SkeletonElement type="icon"></SkeletonElement>
        </div>
      </div>
      <div className="skeletonCommunities__content">
        <SkeletonElement type="title"></SkeletonElement>
        <SkeletonElement type="icon"></SkeletonElement>
        <SkeletonElement type="titleShort"></SkeletonElement>
        <SkeletonElement type="titleShort"></SkeletonElement>
        <SkeletonElement type="titleShort"></SkeletonElement>
        <SkeletonElement type="icon"></SkeletonElement>
      </div>
    </div>
  );
}
