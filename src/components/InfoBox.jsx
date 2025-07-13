import "./InfoBox.css";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // ✅ useNavigate 추가
import axiosInstance from "./utils/AxiosInstance";
import PostTag from "./PostTag";
import { getBoardLabel } from "./utils/boardUtils"; // 🔥 boardTypeMap 재사용

const InfoBox = ({ boardTypes, title }) => {
  const navigate = useNavigate(); // ✅ useNavigate 훅 사용
  const [selectedBoard, setSelectedBoard] = useState("ALL");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const PAGE_SIZE = 5;

  // ✅ + 버튼 클릭 시 게시판으로 이동
  const handleMoreClick = () => {
    let boardToGo = selectedBoard;

    if (selectedBoard === "ALL") {
      // boardTypes 배열이 존재하면 그 중 첫 번째로 fallback
      if (boardTypes.length > 0) {
        boardToGo = boardTypes[0];
      } else {
        console.warn("이동할 게시판이 없습니다.");
        return;
      }
    }

    navigate(`/main/community/${boardToGo.toLowerCase()}`);
  };

  const fetchAllPosts = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.post(`/post/summary-multi`, {
        types: boardTypes,
        pageSize: PAGE_SIZE,
      });
      const allPosts = response.data?.Posts || [];
      setPosts(allPosts);
    } catch (error) {
      console.error("전체 게시글 요약 가져오기 실패:", error);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchSingleBoard = async (type) => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/post/${type}/summary`, {
        params: { pageSize: PAGE_SIZE },
      });
      setPosts(response.data?.Posts || []);
    } catch (error) {
      console.error("게시글 요약 가져오기 실패:", error);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedBoard === "ALL") {
      fetchAllPosts();
    } else {
      fetchSingleBoard(selectedBoard);
    }
  }, [selectedBoard]);

  return (
    <div className="InfoBox">
      <div className="inner">
        <div className="top">
          <div className="title-area">
            <h1>{title}</h1>
            <button className="more-btn" onClick={handleMoreClick}>+</button>
          </div>
          <div className="filter-area">
            <button
              onClick={() => setSelectedBoard("ALL")}
              className={selectedBoard === "ALL" ? "active" : ""}
            >
              전체
            </button>
            {boardTypes.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedBoard(type)}
                className={selectedBoard === type ? "active" : ""}
              >
                {getBoardLabel(type)}
              </button>
            ))}
          </div>
        </div>

        <div className="list-area">
          <ul className="list">
            {loading ? (
              [...Array(PAGE_SIZE)].map((_, i) => (
                <li key={i} className="item skeleton">
                  <div className="skeleton-title" />
                  <div className="skeleton-meta" />
                </li>
              ))
            ) : posts.length === 0 ? (
              <li className="item">게시글이 없습니다.</li>
            ) : (
              posts.map((post) => (
                <li key={post.id} className="item">
                  <Link
                    className="post-link"
                    to={`/main/community/${post.boardType.toLowerCase()}/post/${post.id}`}
                  >
                    <PostTag type={post.boardType} />
                    <strong>{post.title}</strong>
                  </Link>
                  <div className="meta">
                    {post.writerNickname} | {post.createdDate?.slice(0, 10)} | 댓글: {post.commentCount}
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default InfoBox;
