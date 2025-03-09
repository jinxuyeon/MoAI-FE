
import "./Panel.css"
import Favorites from "./Favorites"
import Friends from "./Friends"
import { Link } from "react-router-dom"
const Panel = ({ username }) => {


    return (
        <div className="Panel">
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                <button className="profile-btn"></button>
                <Link className="link-mypage" to={"/mypage"}>{username}</Link>
            </div>

            <Favorites />
            <hr />
            <Friends />
            <hr />
            <div>캘린더</div>
        </div>
    )

}


export default Panel