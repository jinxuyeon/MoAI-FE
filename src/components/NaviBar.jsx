import { Link } from "react-router-dom";
import {
  Megaphone,
  Users,
  ShieldCheck,
  BookOpen,
  Bell,
  MessageCircle,
  MessagesSquare,
} from "lucide-react";
import "./NaviBar.css";

const boardData = [
  { type: "NOTICE", label: "조교알림", icon: <Bell size={22} />, color: "blue" },
  { type: "NOTICE_C", label: "공지사항", icon: <Megaphone size={22} />, color: "orange" }, // 변경됨!
  { type: "FREE", label: "자유게시판", icon: <MessagesSquare size={22} />, color: "green" }, // 변경됨!
  { type: "SECRET", label: "비밀게시판", icon: <ShieldCheck size={22} />, color: "purple" },
  { type: "REVIEW", label: "후기", icon: <MessageCircle size={22} />, color: "rose" },
  { type: "MARKET", label: "책장터", icon: <BookOpen size={22} />, color: "indigo" },
];

const NaviBar = ({ currentBoard }) => {
  return (
    <div className="circle-nav">
      {boardData.map(({ type, label, icon, color }) => (
        <Link
          key={type}
          to={`/main/community/${type.toLowerCase()}`}
          className={`circle-nav-item ${color} ${
            currentBoard === type.toLowerCase() ? "active" : ""
          }`}
        >
          <div className="icon">{icon}</div>
          <span>{label}</span>
        </Link>
      ))}
    </div>
  );
};

export default NaviBar;
