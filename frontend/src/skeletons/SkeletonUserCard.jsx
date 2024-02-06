import SkeletonElement from "./SkeletonElement";

export default function SkeletonUserCard() {
  return (
    <>
      <div className="skeleton__flex">
        <SkeletonElement type="avatarLittle"></SkeletonElement>
        <SkeletonElement type="title"></SkeletonElement>
      </div>
      <SkeletonElement type="text"></SkeletonElement>
    </>
  );
}
