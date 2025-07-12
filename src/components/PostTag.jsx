// components/PostTag.jsx
import "./PostTag.css";

const tagStyles = {
  FREE: { label: "자유", color: "#4caf50" },
  SECRET: { label: "비밀", color: "#9c27b0" },
  REVIEW: { label: "후기", color: "#2196f3" },
  NOTICE_C: { label: "공지", color: "#f44336" },
  NOTICE: { label: "조교", color: "#ff9800" },
};

const PostTag = ({ type }) => {
  const tag = tagStyles[type];

  if (!tag) return null;

  return (
    <span className="PostTag" style={{ backgroundColor: tag.color }}>
      {tag.label}
    </span>
  );
};

export default PostTag;
