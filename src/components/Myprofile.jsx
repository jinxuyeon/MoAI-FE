import { useState, useRef, useEffect } from "react";
import { Camera } from "lucide-react";
import "./Myprofile.css";

const MyProfile = ({ profileImageUrl, onImageSelect }) => {
  const [selectedImage, setSelectedImage] = useState(profileImageUrl);
  const fileInputRef = useRef(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showEditOptions, setShowEditOptions] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const menuRef = useRef(null);

  
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
      onImageSelect?.(file); // 상위에 파일 전달
    }
    setShowProfileMenu(false);
    setShowEditOptions(false);
  };

  const openFilePicker = () => {
    fileInputRef.current.click();
  };

  const handleDeleteImage = () => {
    // 이미지 시각적 제거만, 실제 삭제는 저장할 때 수행
    setSelectedImage(null);
    onImageSelect?.(null); // 상위에 "삭제된 상태" 전달
    setShowProfileMenu(false);
    setShowEditOptions(false);
  };

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

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

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
