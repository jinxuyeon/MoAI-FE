import "./Panel.css";
import Favorites from "./Favorites";
import Friends from "./Friends";
import { Link, useNavigate } from "react-router-dom";
import Calendar from "./Calendar";
const Panel = () => {
    const name = localStorage.getItem("name");
    return (
        <div className="Panel">
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                <button className="profile-btn"></button>
                <Link className="link-mypage" to={"/mypage"}>
                    {name || "게스트"}
                </Link>
            </div>
            <Favorites />
            <Friends />
            <Calendar />
        </div>
    );
};

export default Panel;
