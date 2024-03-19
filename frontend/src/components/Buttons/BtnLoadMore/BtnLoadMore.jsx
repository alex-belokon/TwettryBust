import { BsArrowDown } from "react-icons/bs";
import "./BtnLoadMore.scss";

export default function BtnLoadMore({loadMore}) {

  return (
    <button className="btnLoadMore" onClick={loadMore}>
      <BsArrowDown /> <span className="btnLoadMore__text">Завантажити більше</span> 
    </button>
  );
}
