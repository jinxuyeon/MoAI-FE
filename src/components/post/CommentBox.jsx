import ProfileTemplate from "../ProfileTemplate";
import axiosInstance from "../utils/AxiosInstance";
import "./CommentBox.css";
import MenuButton from "./MenuButton";
axiosInstance

const CommentBox = ({
  comment,
  handleCommentLike,
  boardType,
  onDeleteSuccess,
  onReplyClick,
  isReplying,
  replyContent,
  setReplyContent,
  onSubmitReply,
  onToggleReplies, // 🔽 대댓글 토글 함수
  showReplies, // 🔽 현재 열린 상태
  children, // 🔽 대댓글 컴포넌트들
}) => {
  const formattedDate = new Date(comment.createdDate).toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const handleDelete = async () => {
    const confirmed = window.confirm("정말로 이 댓글을 삭제하시겠습니까?");
    if (!confirmed) return;

    try {
      await axiosInstance.delete(`/api/comment/${comment.id}`);
      if (onDeleteSuccess) onDeleteSuccess(comment.id);
    } catch (error) {
      console.error("❌ 댓글 삭제 실패:", error);
      alert("댓글 삭제 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className={`CommentBox ${comment.isAuthor ? "my-comment" : ""}`}>
      <div className="comment-content-left">
        {boardType === "SECRET" ? (
          <div className="anonymous-nickname">익명</div>
        ) : (
          <ProfileTemplate
            profileImageUrl={comment.writerProfileThumbnails}
            name={comment.writerNickname}
            id={comment.writerId}
          />
        )}
      </div>

      <div className="comment-body-wrapper">
        <div className="comment-header-row">
          <p className="comment-date">{formattedDate}</p>
          {comment.isAuthor && (
            <MenuButton onEdit={() => {}} onDelete={handleDelete} />
          )}
        </div>

        <div className="content-box">
          {comment.text || comment.content}
        </div>

        <div className="comment-actions">
          <button onClick={() => onReplyClick(comment.id)}>답글</button>

          {comment.hasChildren && (
            <button className="toggle-replies-btn" onClick={onToggleReplies}>
              {showReplies ? "🔽 숨기기" : "▶ 답글 보기"}
            </button>
          )}
        </div>

        {isReplying && (
          <div className="reply-input-form">
            <input
              type="text"
              placeholder="답글을 입력하세요"
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  onSubmitReply(comment.id);
                }
              }}
            />
            <button onClick={() => onSubmitReply(comment.id)}>작성</button>
          </div>
        )}

        {showReplies && children}
      </div>
    </div>
  );
};

export default CommentBox;
