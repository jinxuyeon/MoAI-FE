import { Link } from "react-router-dom";
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

const BasicBoardBox = ({ data, onPageChange, boardType }) => {
  const { posts, currentPage, totalPages } = data;

  return (
    <div className="FreeBoardBox">
      <div className="free-header">
        <h2 className="Free-title">{getBoardTitle(boardType)}</h2>
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
