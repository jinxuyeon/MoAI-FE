import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import axios from "axios"; // axios 사용
import "./Favorites.css";

const boardRoutes = {
  "학과사무실에서 알려드립니다": "notice_c",
  "자유게시판": "free",
  "선배님 고민있어으예 ~": "free",
  "비밀게시판": "secret",
  "취업, 면접 후기": "review"
};

const Favorites = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [favoriteBoards, setFavoriteBoards] = useState([]);

  const fetchFavorites = async () => {
    try {
      const { data } = await axios.get("/api/favorites");
      if (Array.isArray(data)) {
        setFavoriteBoards(data);
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
          <Star size={18} stroke="black" fill="none" style={{ marginLeft: "6px" }} />
        </button>
      </div>

      {isOpen && (
        favoriteBoards.length > 0 ? (
          <ul className="Favorites-List">
            {favoriteBoards.map((board, index) => {
              const route = boardRoutes[board];
              return route ? (
                <li key={index} className="Favorites-Item">
                  <Link
                    to={`/main/community/${route}`}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    {board}
                  </Link>
                </li>
              ) : null;
            })}
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
