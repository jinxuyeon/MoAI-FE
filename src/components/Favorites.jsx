import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import axiosInstance from "./utils/AxiosInstance";
import "./Favorites.css";
import { getBoardLabel } from "./utils/boardUtils";

const Favorites = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [favoriteBoards, setFavoriteBoards] = useState([]);
  const fetchFavorites = async () => {
    try {
      const { data } = await axiosInstance.get("/api/post/favorites");
      if (Array.isArray(data.favorites)) {
        setFavoriteBoards(data.favorites);
      } else {
        setFavoriteBoards([]);
      }
    } catch (err) {
      console.error("즐겨찾기 불러오기 실패", err);
    }
  };

  useEffect(() => {
    fetchFavorites();
    const handler = () => fetchFavorites();
    window.addEventListener("favoritesUpdated", handler);
    return () => window.removeEventListener("favoritesUpdated", handler);
  }, []);

  useEffect(() => {
    if (isOpen) fetchFavorites();
  }, [isOpen]);

  return (
    <div className="Favorites-Container">
      <div className="Favorites-Header">
        <button className="Favorites-Button" onClick={() => setIsOpen(!isOpen)}>
          <span className="Favorites-Text">즐겨찾기</span>
          <Star size={22}  stroke="black" fill="none" style={{ marginLeft: "6px" }} />
        </button>
      </div>

      {isOpen && (
        favoriteBoards.length > 0 ? (
          <ul className="Favorites-List">
            {favoriteBoards.map((board) => (
              board.boardType && (
                <li key={board.id} className="Favorites-Item">
                  <Link
                    to={`/main/community/${board.boardType.toLowerCase()}`}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    {getBoardLabel(board.boardType)}
                  </Link>
                </li>
              )
            ))}
          </ul>
        ) : (
          <div style={{ marginTop: "10px", color: "#666", fontSize: "14px" }}>
            즐겨찾기한 게시판이 없습니다.
          </div>
        )
      )}
    </div>
  );
};

export default Favorites;
