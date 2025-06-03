import React, { useState } from "react";
import { EllipsisVertical } from "lucide-react";
import "./MenuButton.css"; // 스타일은 따로 관리

const MenuButton = ({ onEdit, onDelete }) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="menu-button-container">
      <button
        className="menu-button-icon"
        onClick={() => setShowMenu(prev => !prev)}
      >
        <EllipsisVertical size={17} color="grey"/>
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
