import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
// import getUserBookmarks from "../../api/bookmarks.js";
import "./bookmarksSection.style.scss";

export default function BookmarksSection() {
  const { id } = useParams();
  const currentUserId = useSelector((state) => state.authUser.user.id);
  const bookmarksList = useRef(50);
  const bookmarksContainer = useRef(0);
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const [bookmarks, setBookmarks] = useState([]);
 

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (bookmarksContainer.current) {
      bookmarksContainer.current.scrollTop = bookmarksList.current.scrollHeight;
    }
  }, [bookmarks]);

  return viewportWidth > 1030 ? (
    <section className="bookmarksSection">
      <div className="bookmarksSection__header">
        <h2 className="bookmarksSection__title">Bookmarks</h2>
      </div>
      
    </section>
  ) : (
    viewportWidth < 1030 && !id && (
      <section className="bookmarksSection">
        <div className="bookmarksSection__header">
          <h2 className="bookmarksSection__title">Bookmarks</h2>
        </div>
        
      </section>
    )
  );
}
