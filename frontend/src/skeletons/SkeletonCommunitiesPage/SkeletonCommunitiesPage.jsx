import SkeletonElement from "../SkeletonElement";
import "../SkeletonCommunitiesPage/SkeletonCommunitiesPage.scss";
// import SkeletonCommunities from "../SkeletonCommunities/SkeletonCommunities";
import SkeletonPost from "../SkeletonPost/SkeletonPost";

export default function SkeletonCommunitiesPage() {
  return (
    <div className="skeletonCommunitiesPage">
      <div className="communities__flex">
        <SkeletonElement type="icon"></SkeletonElement>
        <SkeletonElement type="title"></SkeletonElement>
      </div>
      <div className="skeletonCommunitiesPage__content">
        <SkeletonElement type="img"></SkeletonElement>
        <SkeletonElement type="title"></SkeletonElement>
        <SkeletonElement type="text"></SkeletonElement>
        <SkeletonPost></SkeletonPost>
      </div>
    </div>
  );
}
