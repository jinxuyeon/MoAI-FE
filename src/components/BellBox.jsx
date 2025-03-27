import { Bell } from "lucide-react";
import Reddot from "./Reddot";
import "./BellBox.css"

const BellBox = () => {
    return (
        <div className="BellBox">
            <button className="bell-btn">
                <Bell />
                <Reddot count={2}/>
            </button>
        </div>
    );
};

export default BellBox;
