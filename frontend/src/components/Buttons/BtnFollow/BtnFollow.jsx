import './BtnFollow.scss';

export default function BtnFollow({btnName, toggleFollowClick}) {

  return (
    <button className="btnStyle" onClick={toggleFollowClick}>
      {!btnName ? "Слідкувати" : "Відписатись"}
    </button>
  );
}
