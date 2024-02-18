import SkeletonUserCard from "./SkeletonUserCard";

export default function SkeletonFollow() {
  return (
    <div className="skeleton__wrapper">
      {[1,2,3,4,5,6].map((item)=> <SkeletonUserCard key={item}></SkeletonUserCard>)}
    </div>
  );
}
