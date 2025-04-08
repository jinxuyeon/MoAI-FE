import { useState, useRef, useEffect } from "react";
import { Camera } from "lucide-react";
import "./Myprofile.css";

const MyProfile = ({ profileImageUrl }) => {
  const [selectedImage, setSelectedImage] = useState(profileImageUrl);
  const fileInputRef = useRef(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showEditOptions, setShowEditOptions] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const menuRef = useRef(null); // ✅ 메뉴 참조

  const toggleMenu = () => {
    setShowProfileMenu((prev) => !prev);
    setShowEditOptions(false);
  };

  const handleProfileView = () => {
    setShowProfileModal(true);
    setShowProfileMenu(false);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
    setShowProfileMenu(false);
    setShowEditOptions(false);
  };

  const openFilePicker = () => {
    fileInputRef.current.click();
  };

  const handleDeleteImage = () => {
    setSelectedImage(null);
    setShowProfileMenu(false);
    setShowEditOptions(false);
  };

  // ✅ 메뉴 바깥 클릭 시 자동 닫기
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };

    if (showProfileMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showProfileMenu]);

  return (
    <div className="profile-pic-container">
      {selectedImage ? (
        <img className="profile-pic" src={selectedImage} alt="프로필" />
      ) : (
        <div className="profile-pic empty">No Image</div>
      )}

      <Camera className="camera-icon" onClick={toggleMenu} />

      {/* 프로필 수정 메뉴 */}
      {showProfileMenu && (
        <div className="profile-menu" ref={menuRef}>
          {!showEditOptions ? (
            <>
              <div onClick={handleProfileView}>프로필 보기</div>
              <div onClick={() => setShowEditOptions(true)}>프로필 수정</div>
            </>
          ) : (
            <>
              <div onClick={openFilePicker}>라이브러리에서 선택</div>
              <div onClick={handleDeleteImage}>현재 사진 삭제</div>
            </>
          )}
        </div>
      )}

      {/* 숨겨진 파일 선택 input */}
      <input 
        type="file" 
        accept="image/*" 
        ref={fileInputRef} 
        style={{ display: "none" }} 
        onChange={handleFileChange} 
      />

      {/* 모달: 프로필 보기 */}
      {showProfileModal && (
        <div className="modal-backdrop" onClick={() => setShowProfileModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {selectedImage ? (
              <img src={selectedImage} alt="프로필 확대" />
            ) : (
              <div className="profile-pic modal-empty">No Image</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProfile;
