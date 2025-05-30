import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./FreePostDetail.css";

const dummyPosts = [
  {
    id: 1,
    title: "자유게시판 첫 번째 글",
    content: "이건 자유게시판 테스트용 내용입니다.",
    author: "홍길동",
    date: "2025-05-26",
    views: 42,
    imgUrl:  "https://i.kym-cdn.com/photos/images/original/001/389/404/a2b.jpg", // 썸네일 예시
    comments: [
      { id: 1, author: "익명", text: "잘 봤어요!", likes: 0, liked: false },
      { id: 2, author: "익명", text: "감사합니다!", likes: 0, liked: false }
    ]
  },
  {
    id: 2,
    title: "두 번째 글입니다",
    content: "이건 두 번째 글의 내용이에요!",
    author: "이몽룡",
    date: "2025-05-25",
    views: 35,
    imgUrl: "",
    comments: []
  },
];

const FreePostDetail = () => {
  const { postId } = useParams();
  const post = dummyPosts.find((p) => p.id === parseInt(postId));

  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState(post?.comments || []);
  const [newComment, setNewComment] = useState("");

  if (!post) return <div className="post-detail-container">게시글을 찾을 수 없습니다.</div>;

  const handleLike = () => {
    setLiked(!liked);
  };

  const handleCommentLike = (commentId) => {
    setComments(prev =>
      prev.map(c =>
        c.id === commentId
          ? { ...c, liked: !c.liked, likes: (c.likes || 0) + (c.liked ? -1 : 1) }
          : c
      )
    );
  };

  const handleCommentSubmit = () => {
    if (!newComment.trim()) return;
    const newId = comments.length + 1;
    setComments([
      ...comments,
      { id: newId, author: "익명", text: newComment, likes: 0, liked: false }
    ]);
    setNewComment("");
  };

  return (
    <div className="post-detail-container">
      <div className="post-title-with-like">
        <h2 className="post-title">{post.title}</h2>
        <button className="like-toggle-button" onClick={handleLike}>
          {liked ? "❤️" : "🤍"}
        </button>
      </div>

      <div className="post-meta">
        {post.author} | {post.date} | 조회 {post.views}
      </div>

      {post.imgUrl && <img src={post.imgUrl} alt="썸네일" className="post-image" />}

      <p className="post-content">{post.content}</p>

      <div className="comment-header-line">
        <span className="comment-header">💬 댓글 {comments.length}</span>
      </div>

      <ul className="comment-list">
        {comments.map((c) => (
          <li key={c.id} className="comment-item">
            <div className="comment-info">
              <strong>{c.author}</strong>: {c.text}
            </div>
            <button
              className="comment-like-button"
              onClick={() => handleCommentLike(c.id)}
            >
               {c.liked ? "❤️" : "🤍"}
            </button>
          </li>
        ))}
      </ul>

      <div className="comment-form">
        <input
          type="text"
          placeholder="댓글을 입력하세요"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button onClick={handleCommentSubmit}>작성</button>
      </div>
    </div>
  );
};

export default FreePostDetail;
