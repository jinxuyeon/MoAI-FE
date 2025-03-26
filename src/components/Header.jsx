import "./Header.css";
import { LogOut } from "lucide-react";
import { Bell } from "lucide-react";
import { Mails } from "lucide-react";

function Header({ title }) {
    const handleLogout = () => {
        //localStorage.removeItem("accessToken")
        //localStorage.removeItem("refreshToken")
        localStorage.clear();
        window.location.href = "/login";
    };
    return (
        <div className="header-container">
            <h2 style={{ marginLeft: "28px" }}>{title}</h2>
            <div className="header-space">
                <div className="util-box">
                    <Bell />
                    <Mails />
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
