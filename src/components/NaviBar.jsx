import { Link } from "react-router-dom";
import "./NaviBar.css";
import { boardTypeList, getBoardLabel } from "./utils/boardUtils";

const NaviBar = ({ currentBoard }) => {
  return (
    <div className="NaviBar">
      {boardTypeList.map((type) => (
        <Link
          key={type}
          to={`/main/community/${type.toLowerCase()}`}
          className={`navi-link ${currentBoard === type.toLowerCase() ? "active" : ""}`}
        >
          {getBoardLabel(type)}
        </Link>
      ))}
    </div>
  );
};

export default NaviBar;
