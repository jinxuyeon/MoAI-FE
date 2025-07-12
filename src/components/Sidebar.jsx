import { useState } from "react";
import { X } from "lucide-react";
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
          <h1>사이드 바 입니다</h1>
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
