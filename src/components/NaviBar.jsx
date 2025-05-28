import { Link } from "react-router-dom";
import "./NaviBar.css";

const NaviBar = ({ currentBoard }) => {
    const menus = [
        { name: "공지사항", path: "notice" },
        { name: "자유게시판", path: "free" },
        { name: "비밀게시판", path: "secret" },
        { name: "강의게시판", path: "lecture" },
        { name: "책장터", path: "market" },

    ];

    return (
        <div className="NaviBar">
            {menus.map(menu => (
                <Link
                    key={menu.path}
                    to={`/main/community/${menu.path}`}
                    className={`navi-link ${currentBoard === menu.path ? "active" : ""}`}
                >
                    {menu.name}
                </Link>
            ))}
        </div>
    );
};

export default NaviBar;
