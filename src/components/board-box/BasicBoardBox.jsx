import { useEffect, useState } from "react";
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

const BasicBoardBox = ({ boardType, handleWriteClick }) => {
  const [postData, setPostData] = useState({
    posts: [],
    totalCount: 0,
    totalPages: 0,
    currentPage: 0,
    pageSize: 10,
  });
  const [marked, setMarked] = useState(false);

  const boardTitle = getBoardTitle(boardType);

  const fetchData = async (page = 0) => {
    try {
      const res = await axiosInstance.get("/api/post", {
        params: {
          boardType,
          page,
          size: postData.pageSize,
        },
      });

      const { pageResponse, isMarked } = res.data;
      setPostData({
        ...pageResponse,
        pageSize: postData.pageSize,
      });
      setMarked(isMarked);
    } catch (err) {
      console.error("❌ 게시글 로딩 실패:", err);
    }
  };

  useEffect(() => {
    fetchData(0);
  }, [boardType]);

  const handlePageChange = (page) => {
    fetchData(page);
  };

  const handleToggleFavorite = async () => {
    const boardName = getBoardTitle(boardType);
    try {
      if (marked) {
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
          <h1 className="Free-title">{boardTitle}</h1>
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
              fill={marked ? "#facc15" : "none"}
              stroke="#f59e0b"
            />
          </button>
        </div>
      </div>
      <div>
        <button className="create-btn" onClick={handleWriteClick}>글쓰기</button>
      </div>

      <div className="free-list">
        {postData.posts.length === 0 ? (
          <p>게시글이 없습니다.</p>
        ) : (
          postData.posts.map((post) => (
            <div key={post.id} className="free-list-item">
              <div className="free-list-content-with-thumbnail">
                {post.imageUrls && (
                  <img
                    src={post.
                      thumbNailUrl}
                    alt="썸네일"
                    className="free-thumbnail"
                    loading="lazy"
                  />
                )}
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
            </div>
          ))
        )}
      </div>

      <div className="pagination">
        {postData.currentPage > 0 && (
          <button onClick={() => handlePageChange(postData.currentPage - 1)}>
            &lt; 이전
          </button>
        )}
        {Array.from({ length: postData.totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index)}
            className={postData.currentPage === index ? "active-page" : ""}
          >
            {index + 1}
          </button>
        ))}
        {postData.currentPage < postData.totalPages - 1 && (
          <button onClick={() => handlePageChange(postData.currentPage + 1)}>
            다음 &gt;
          </button>
        )}
      </div>
    </div>
  );
};

export default BasicBoardBox;
