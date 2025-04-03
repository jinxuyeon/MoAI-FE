import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, X, Check } from "lucide-react"; 
import Reddot from "./Reddot";
import "./BellBox.css";
import axiosInstance from "./utils/AxiosInstance";

const BellBox = ({ notices, setNotices }) => {
    const [isOpen, setIsOpen] = useState(false);
    const boxRef = useRef(null);

    // ✅ 개별별 알림 읽기 처리
    const handleDelete = async (id) => {
        try {
            const response = await axiosInstance.post(`/api/notice/read/${id}`);
            if (response.status === 200) {
                console.log("알림 제거 성공", response.data);
                setNotices((prevNotices) => prevNotices.filter((notice) => notice.id !== id));
            }
        } catch (error) {
            console.error("삭제 실패:", error);
        }
    };

    // ✅ 모든 알림 읽기 처리
    const handleMarkAllAsRead = async () => {
        const noticeIds = notices.map((notice) => notice.id); // 현재 알림의 ID 목록 추출
        if (noticeIds.length === 0) return; 
        try {
            const response = await axiosInstance.post(`/api/notice/read-all`, { noticeIds });
            if (response.status === 200) {
                console.log("모든 알림 읽음 처리 성공", response.data);
                setNotices([]); 
            }
        } catch (error) {
            console.error("모든 알림 읽기 실패:", error);
        }
    };
    useEffect(() => {
        function handleClickOutside(event) {
            if (boxRef.current && !boxRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="BellBox" ref={boxRef}>
            <button className="bell-btn" onClick={() => setIsOpen(!isOpen)}>
                <Bell />
                {notices.length > 0 && <Reddot count={notices.length} />}
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="notice-dropdown"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                    >
                        {/* ✅ "모두 읽기" 버튼 추가 */}
                        {notices.length > 0 && (
                            <div className="notice-header">
                                <button className="mark-all-btn" onClick={handleMarkAllAsRead}>
                                    <Check className="check-icon" />
                                    모두 읽기
                                </button>
                            </div>
                        )}

                        {notices.length > 0 ? (
                            notices.map((notice) => (
                                <div key={notice.id} className="notice-item">
                                    {notice.content}
                                    <button className="delete-btn" onClick={() => handleDelete(notice.id)}>
                                        <X className="x" />
                                    </button>
                                </div>
                            ))
                        ) : (
                            <div className="notice-empty">새로운 알림이 없습니다.</div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default BellBox;
