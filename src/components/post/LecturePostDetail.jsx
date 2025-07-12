import "./LecturePostDetail.css";
import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axiosInstance from "../utils/AxiosInstance";
import "./PostDetail.css";
import CommentBox from "./CommentBox";
import ProfileTemplate from "../ProfileTemplate";
import MenuButton from "./MenuButton";

const LecturePostDetail = () => {
    const { postId, lectureId } = useParams();
    const [post, setPost] = useState(null);
    const [liked, setLiked] = useState(false);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [replyingTo, setReplyingTo] = useState(null);
    const [replyContent, setReplyContent] = useState("");
    const [childComments, setChildComments] = useState({});
    const [expandedReplies, setExpandedReplies] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const lastSubmitTime = useRef(0);

    const navigate = useNavigate();

    useEffect(() => {
        fetchPost();
        fetchComments();
    }, [postId]);

    const fetchPost = async () => {
        try {
            const res = await axiosInstance.get(`/post/${lectureId}/${postId}`);
            setPost(res.data);
        } catch (err) {
            console.error("❌ 게시글 상세 불러오기 실패:", err);
        }
    };

    const fetchComments = async () => {
    try {
        const res = await axiosInstance.get(`/post/lecture/${postId}/comments`);
        const commentList = res.data.comments || [];
        const sorted = [...commentList].sort( // 여기 수정
            (a, b) => new Date(a.createdDate) - new Date(b.createdDate)
        );
        setComments(sorted);
    } catch (err) {
        console.error("❌ 댓글 불러오기 실패:", err);
    }
};

    const fetchReplies = async (parentId) => {
        try {
            const res = await axiosInstance.get(`/post/${parentId}/replies`);
            setChildComments((prev) => ({ ...prev, [parentId]: res.data.replies || [] }));
            setExpandedReplies((prev) => ({ ...prev, [parentId]: true }));
        } catch (err) {
            console.error("❌ 대댓글 불러오기 실패:", err);
        }
    };

    const toggleReplies = async (parentId) => {
        if (expandedReplies[parentId]) {
            setExpandedReplies((prev) => ({ ...prev, [parentId]: false }));
        } else {
            if (!childComments[parentId]) {
                await fetchReplies(parentId);
            } else {
                setExpandedReplies((prev) => ({ ...prev, [parentId]: true }));
            }
        }
    };

    const handleReplySubmit = async (parentId) => {
        if (!replyContent.trim()) return;
        try {
            await axiosInstance.post(`/lecture-room/${postId}/comments`, {
                content: replyContent,
                parentId,
            });
            setReplyContent("");
            setReplyingTo(null);
            await fetchReplies(parentId);
        } catch (err) {
            console.error("❌ 답글 등록 실패:", err);
            alert("답글 등록 실패");
        }
    };

    const handleLike = () => {
        setLiked(!liked);
    };

    const handleCommentLike = (commentId) => {
        setComments((prev) =>
            prev.map((c) =>
                c.id === commentId
                    ? {
                          ...c,
                          liked: !c.liked,
                          likes: (c.likes || 0) + (c.liked ? -1 : 1),
                      }
                    : c
            )
        );
    };

    const handlePostDelete = async () => {
        const confirmed = window.confirm("정말로 이 게시글을 삭제하시겠습니까?");
        if (!confirmed) return;

        try {
            await axiosInstance.delete(`/post/${postId}`);
            navigate(`/main/study-dashboard/${post.lectureRoomId}`);
        } catch (err) {
            console.error("❌ 게시글 삭제 실패:", err);
            alert("게시글 삭제 중 오류가 발생했습니다.");
        }
    };

    const handleCommentSubmit = async () => {
        const now = Date.now();
        if (!newComment.trim() || isSubmitting || now - lastSubmitTime.current < 1000) return;

        setIsSubmitting(true);
        lastSubmitTime.current = now;

        try {
            await axiosInstance.post(`/lecture-room/${postId}/comments`, {
                content: newComment,
            });
            setNewComment("");
            await fetchComments();
        } catch (err) {
            console.error("❌ 댓글 등록 실패:", err);
            alert("댓글 등록 실패");
        } finally {
            setIsSubmitting(false);
        }
    };

    const renderCommentTree = (comment) => (
        <CommentBox
            key={comment.id}
            comment={comment}
            boardType={post.lecturePostType}
            handleCommentLike={handleCommentLike}
            onDeleteSuccess={(deletedId) => {
                setComments((prev) => prev.filter((c) => c.id !== deletedId));
                setChildComments((prev) => {
                    const updated = { ...prev };
                    Object.keys(updated).forEach((key) => {
                        updated[key] = updated[key].filter((r) => r.id !== deletedId);
                    });
                    return updated;
                });
            }}
            onReplyClick={(id) => {
                setReplyingTo(id === replyingTo ? null : id);
                setReplyContent("");
            }}
            isReplying={replyingTo === comment.id}
            replyContent={replyContent}
            setReplyContent={setReplyContent}
            onSubmitReply={handleReplySubmit}
            showReplies={expandedReplies[comment.id]}
            onToggleReplies={() => toggleReplies(comment.id)}
        >
            {expandedReplies[comment.id] &&
                (childComments[comment.id] || []).map((child) => (
                    <div key={child.id} className="nested-reply" style={{ marginLeft: "20px" }}>
                        {renderCommentTree(child)}
                    </div>
                ))}
        </CommentBox>
    );

    if (!post)
        return <div className="LecturePostDetail">게시글을 찾을 수 없습니다.</div>;

    return (
        <div className="LecturePostDetail">
            <div className="post-title-with-like">
                <h2 className="post-title">{post.title}</h2>
                {post.isAuthor && (
                    <MenuButton onEdit={() => {}} onDelete={handlePostDelete} />
                )}
            </div>

            <div className="post-meta">
                {post.lecturePostType === "SECRET" ? (
                    <div className="anonymous-writer">익명</div>
                ) : (
                    <ProfileTemplate
                        profileImageUrl={post.writerProfileThumbnails}
                        name={post.writerNickname}
                        id={post.writerId}
                    />
                )}
                {post.createdDate?.slice(0, 10)} | 조회 {post.viewCount}
            </div>

            <section className="lecture-qna-box">
                <div className="question-box">
                    <h4>🧑 질문</h4>
                    <div dangerouslySetInnerHTML={{ __html: post.content }} />
                </div>

                {post.answer && (
                    <div className="answer-box">
                        <h4>👨‍🏫 교수님 답변</h4>
                        <div dangerouslySetInnerHTML={{ __html: post.answer }} />
                    </div>
                )}
            </section>

            <div
                style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    gap: "8px",
                    marginTop: "20px",
                }}
            >
                <div className="like-container">
                    <button className="like-toggle-button" onClick={handleLike}>
                        {liked ? "❤️" : "🤍"}
                    </button>
                </div>
                <Link
                    to={`/main/study-dashboard/${post.lectureRoomId}`}
                    className="back-to-list-button"
                >
                    목록으로
                </Link>
            </div>

            <div className="comment-header-line">
                <span className="comment-header">💬 댓글 {comments.length}</span>
            </div>

            <div className="comment-form">
                <input
                    type="text"
                    placeholder="댓글을 입력하세요"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            e.stopPropagation();
                            handleCommentSubmit();
                        }
                    }}
                />
                <button onClick={handleCommentSubmit} disabled={isSubmitting}>
                    {isSubmitting ? "작성 중..." : "작성"}
                </button>
            </div>

            <ul className="comment-list">
                {comments.map((c) => (
                    <li key={c.id} className="comment-item">
                        {renderCommentTree(c)}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LecturePostDetail;
