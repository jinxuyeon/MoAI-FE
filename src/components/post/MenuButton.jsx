import React, { useEffect, useRef, useState } from "react";
import { EllipsisVertical } from "lucide-react";
import "./MenuButton.css";

const MenuButton = ({ onEdit, onDelete }) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    // cleanup
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu]);

  return (
    <div className="menu-button-container" ref={menuRef}>
      <button
        className="menu-button-icon"
        onClick={() => setShowMenu((prev) => !prev)}
      >
        <EllipsisVertical size={17} color="grey" />
      </button>

      {showMenu && (
        <div className="menu-button-dropdown">
          <button className="menu-button-item" onClick={onEdit}>수정</button>
          <button className="menu-button-item" onClick={onDelete}>삭제</button>
        </div>
      )}
    </div>
  );
};

export default MenuButton;
