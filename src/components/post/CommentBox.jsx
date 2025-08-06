import "./CommentBox.css";
import ProfileTemplate from "../ProfileTemplate";
import axiosInstance from "../utils/AxiosInstance";
import MenuButton from "./MenuButton";
import { ChevronDown, ChevronUp } from "lucide-react";
import { getRelativeTime } from "../utils/dateUtils";

// 멘션 파싱 함수
const parseMentions = (text, isChild) => {
    if (!text) return null;
    // @ 다음에 영어, 숫자, 언더스코어, 한글까지 포함
    const mentionRegex = /(@[a-zA-Z0-9_가-힣]+)/g;
    const parts = text.split(mentionRegex);

    return parts.map((part, index) =>
        mentionRegex.test(part) ? (
            <span key={index} className="mention-tag">
                {part}
            </span>
        ) : (
            <span key={index}>{part}</span>
        )
    );
};
const CommentBox = ({
    comment,
    boardType,
    onDeleteSuccess,
    onReplyClick,
    isReplying,
    replyContent,
    setReplyContent,
    onSubmitReply,
    onToggleReplies, // 대댓글 토글 함수
    showReplies, // 현재 열린 상태
    children, // 대댓글 컴포넌트들
    isNestedReply = false, // 👈 추가된 props
}) => {
    const formattedDate = getRelativeTime(comment.createdDate);

    const handleDelete = async () => {
        const confirmed = window.confirm("정말로 이 댓글을 삭제하시겠습니까?");
        if (!confirmed) return;

        try {
            await axiosInstance.delete(`/comment/${comment.id}`);
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
                    {parseMentions(comment.text || comment.content, isNestedReply)}
                </div>

                <div className="comment-actions">
                    <button
                        className="reply-btn"
                        onClick={() =>
                            onReplyClick(comment.id, comment.writerNickname, isNestedReply)
                        }
                    >
                        답글
                    </button>
                    {onToggleReplies && comment.countChildren > 0 && (
                        <button
                            className="reply-toggle"
                            onClick={onToggleReplies}
                        >
                            {`답글 ${comment.countChildren}개`}
                            {showReplies ? (
                                <ChevronUp className="chevron-icon" />
                            ) : (
                                <ChevronDown className="chevron-icon" />
                            )}
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
                                    onSubmitReply();
                                }
                            }}
                        />
                        <button onClick={onSubmitReply}>작성</button>
                    </div>
                )}
                {children}
            </div>
        </div>
    );
};

export default CommentBox;
