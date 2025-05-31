import { Link } from "react-router-dom";
import "./BasicBoardBox.css";

const BasicBoardBox = ({ data, onPageChange }) => {
  const { posts, currentPage, totalPages } = data;

  return (
    <div className="FreeBoardBox">
      <div className="free-header">
        <h2 className="Free-title">게시판</h2>
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
                    {post.writerNickname} | {post.createdDate?.slice(0, 10)}
                  </div>
                </div>
              </Link>
              <div className="free-meta-line">
                조회수 :{post.viewCount} | ❤️ {post.likeCount} | 댓글 {post.commentCount}
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
