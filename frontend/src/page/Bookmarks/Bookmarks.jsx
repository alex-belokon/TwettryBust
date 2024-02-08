import Header from "../../components/Header/Header";
import "../Bookmarks/bookmarks.style.scss";
import BookmarksSection from "../../components/Bookmarks/BookmarksSection";
import BookmarksSidebar from "../../components/Bookmarks/BookmarksSidebar";
// useEffect(() => {
//   async function fetchData() {
//     try {
//       const data = await getUserBookmarks(id, currentUserId);
//       setDialog(data);
//     } catch (e) {
//       console.log(e);
//     }
//   }
//   fetchData();
// }, [id]);

export default function Bookmarks() {
  return (
    <div className="bookmarksWrapper">
      {/* <Header></Header> */}
      <div className="bookmarksMain">
        <BookmarksSection />
        <BookmarksSidebar />
      </div>
    </div>
  );
}
