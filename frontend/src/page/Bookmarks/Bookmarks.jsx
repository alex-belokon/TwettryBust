import "../Bookmarks/bookmarks.style.scss";
import '../../components/Profile/profile.style.scss';
import BookmarksSection from "../../components/Bookmarks/BookmarksSection";

export default function Bookmarks() {
  return (
    <div className="bookmarksWrapper">
      <div className="bookmarks__title">
        <h2>Bookmarks</h2>
        <p class="profileInfo__userMail">@userNameAnna</p>
        </div>

      <BookmarksSection />
    </div>
  );
}
