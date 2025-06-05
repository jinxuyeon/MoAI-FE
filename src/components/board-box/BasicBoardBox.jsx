import { useState } from "react";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import axiosInstance from "../utils/AxiosInstance";
import "./BasicBoardBox.css";

const getBoardTitle = (boardType) => {
  switch (boardType.toLowerCase()) {
    case "free":
      return "자유 게시판";
    case "notice_c":
      return "학과 공지사항";
    case "secret":
      return "비밀 게시판";
    case "review":
      return "후기 게시판";
    default:
      return "게시판";
  }
};

const BasicBoardBox = ({ postsArr, onPageChange, boardType, isMarked }) => {

  console.log(`${isMarked}`)
  const { posts, currentPage, totalPages } = postsArr;
  const boardTitle = getBoardTitle(boardType);

  // ✅ 로컬 즐겨찾기 상태
  const [marked, setMarked] = useState(isMarked);

  const handleToggleFavorite = async () => {
    if (!posts.length) return;

    const boardName = getBoardTitle(boardType);
    try {
      if (isMarked) {
        await axiosInstance.delete("/api/post/favorites", {
          params: { boardType },
        });
        setMarked(false);
      } else {
        await axiosInstance.post("/api/post/favorites", {
          boardType,
          boardName,
        });
        setMarked(true);
      }
    } catch (e) {
      console.error("❌ 즐겨찾기 토글 실패", e);
    }
  };

  return (
    <div className="FreeBoardBox">
      <div className="free-header">
        <div style={{ display: "flex", alignItems: "center" }}>
          <h2 className="Free-title">{boardTitle}</h2>
          <button
            onClick={handleToggleFavorite}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              marginLeft: "8px",
              padding: 0,
            }}
            title="즐겨찾기 추가/제거"
          >
            <Star
              size={20}
              fill={isMarked ? "#facc15" : "none"}
              stroke="#f59e0b"
            />
          </button>
        </div>
      </div>

      <div className="free-list">
        {posts.map((post) => (
          <div key={post.id} className="free-list-item">
            <div className="free-list-content">
              <Link
                to={`/main/community/${post.boardType.toLowerCase()}/post/${post.id}`}
                className="free-link"
              >
                <div className="free-title-line">
                  <div className="free-title-wrapper">
                    <h3 className="free-title">{post.title}</h3>
                  </div>
                  <div className="free-author-date">
                    {post.boardType === "SECRET" ? "익명" : post.writerNickname} |{" "}
                    {post.createdDate?.slice(0, 10)}
                  </div>
                </div>
              </Link>
              <div className="free-meta-line">
                조회수 : {post.viewCount} | ❤️ {post.likeCount} | 댓글 {post.commentCount}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        {currentPage > 0 && (
          <button onClick={() => onPageChange(currentPage - 1)}>&lt; 이전</button>
        )}
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => onPageChange(index)}
            className={currentPage === index ? "active-page" : ""}
          >
            {index + 1}
          </button>
        ))}
        {currentPage < totalPages - 1 && (
          <button onClick={() => onPageChange(currentPage + 1)}>다음 &gt;</button>
        )}
      </div>
    </div>
  );
};

export default BasicBoardBox;
