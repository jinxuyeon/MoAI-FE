import { X, User, Bell, Mail, LogOut, Shield } from "lucide-react";
import "./Sidebar.css";

const Sidebar = ({ isOpen, onClose }) => {

  const handleClick = () => {
    onClose();
  };

  return (
    <>
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="close-area">
          <button 
            className="close-btn"
            onClick={handleClick}
            aria-label="Close sidebar"
          >
            <X size={30}  />
          </button>
        </div>
           <div className="content-area">
          <ul className="sidebar-menu">
            <li >
              <User size={18} />
              <span>마이페이지</span>
            </li>
            <li >
              <Shield size={18} />
              <span>관리자 페이지</span>
            </li>
            <li >
              <Bell size={18} />
              <span>알림함</span>
            </li>
            <li >
              <Mail size={18} />
              <span>메일함</span>
            </li>
            <li >
              <LogOut size={18} />
              <span>로그아웃</span>
            </li>
          </ul>
        </div>
      </div>

      <div
        className={`sidebar-backdrop ${isOpen ? "show" : ""}`}
        onClick={onClose}
      />
    </>
  );
};

export default Sidebar;
