import { Mails } from "lucide-react";
import Reddot from "./Reddot";
import "./MailBox.css"
const MailBox = () => {
    return (
        <div className="MailBox">
            <button className="mail-btn">
                <Mails />
                <Reddot count={5}/>
            </button>
        </div>
    );
};

export default MailBox;
