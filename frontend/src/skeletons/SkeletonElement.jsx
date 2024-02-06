import './Skeleton.scss';

export default function SkeletonElement ({ type }) {

  return (
    <div className={`skeleton ${type}`}></div>
  )
}