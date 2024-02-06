import SkeletonUserCard from "./SkeletonUserCard";
import "./Skeleton.scss";

export default function SkeletonMessage() {
  return (
    <div className="skeleton__relative">
      <div className="skeleton__wrapper">
        {[1, 2, 3, 4, 5].map((item) => (
          <SkeletonUserCard key={item}></SkeletonUserCard>
        ))}
      </div>
    </div>
  );
}
