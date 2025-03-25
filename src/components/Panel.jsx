import "./Panel.css";
import Favorites from "./Favorites";
import Friends from "./Friends";
import { Link , useNavigate} from "react-router-dom";
import axiosInstance from "./utils/AxiosInstance";
import handleApiError from "./utils/handleApiError";
import Calendar from "./Calendar";



import { Link } from "react-router-dom";
const Panel = () => {
    const name = localStorage.getItem("name")
    return (
        <div className="Panel">
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                <button className="profile-btn"></button>
                <Link className="link-mypage" to={"/mypage"}>{name}</Link>
            </div>
            <Favorites />
            <Friends />
            <hr />        
            <Calendar />
            <hr />
        </div>
    );
};

export default Panel;
