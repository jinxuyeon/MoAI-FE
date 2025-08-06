import "./StudyNavi.css";
import { Link } from "react-router-dom";
import { LayoutDashboard, Search, Plus } from "lucide-react";
import { useState } from "react";
import LectureCreateModal from "./modals/LectureCreateModal";

const StudyNavi = ({ onToggleLectureBox }) => {  // ✅ props 받기
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSuccess = () => {
        alert("강의가 성공적으로 생성되었습니다");
    };

    return (
        <div className="StudyNavi">
            <button className="study-link" onClick={onToggleLectureBox}>
                <Search size={18} style={{ marginRight: "6px" }} />
                강의실 찾아보기
            </button>

            <button className="study-link" onClick={handleOpenModal}>
                <Plus size={18} style={{ marginRight: "6px" }} />
                직접 추가
            </button>

            {isModalOpen && (
                <LectureCreateModal onClose={handleCloseModal} onSuccess={handleSuccess} />
            )}
        </div>
    );
};

export default StudyNavi;