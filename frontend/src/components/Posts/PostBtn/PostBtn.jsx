import "./PostBtn.scss";

export default function PostBtn({ isFollowingActive, setIsFollowingActive }) {
  
  return (
    <div className="post-selector-container">
      <button
        className={`post-selector__btn ${isFollowingActive ? "" : "activeTab"}`}
        onClick={() => setIsFollowingActive(false)}
      >
        For you
      </button>
      <button
        className={`post-selector__btn ${isFollowingActive ? "activeTab" : ""}`}
        onClick={() => setIsFollowingActive(true)}
      >
        Following
      </button>
    </div>
  );
}
