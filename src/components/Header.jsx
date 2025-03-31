import "./Header.css";
import { LogOut } from "lucide-react";
import Bellbox from "./BellBox";
import MailBox from "./MailBox";
import { Link } from "react-router-dom";

function Header({ title }) {
    const handleLogout = () => {
        //localStorage.removeItem("accessToken")
        //localStorage.removeItem("refreshToken")
        localStorage.clear();
        window.location.href = "/login";
    };
    return (
        <div className="header-container">
            <Link to="/main" className="text_btn"></Link>
            <h2 style={{ marginLeft: "10px" }}>{title}</h2>
            <div className="header-space">
                <div className="util-box">
                    <Bellbox />
                    <MailBox />
                </div>

                <button
                    className="logout-btn"
                    title="로그아웃"
                    onClick={handleLogout}
                >
                    <LogOut />
                </button>
            </div>
        </div>
    );
}

export default Header;
