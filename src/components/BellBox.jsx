import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell } from "lucide-react";
import Reddot from "./Reddot";
import "./BellBox.css";

const BellBox = () => {
    const [isOpen, setIsOpen] = useState(false);
    const boxRef = useRef(null);

    const notifications = [
        { id: 1, text: "Alice님이 댓글을 남겼습니다." },
        { id: 2, text: "Bob님이 게시글에 좋아요를 눌렀습니다." },
        { id: 3, text: "Charlie님이 팔로우했습니다." },
        { id: 4, text: "Charlie님이 팔로우했습니다." },
        { id: 5, text: "Charlie님이 팔로우했습니다." },
        { id: 6, text: "Charlie님이 팔로우했습니다." },
        { id: 7, text: "Charlie님이 팔로우했습니다." },
    ];
    

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
                {notifications.length > 0 && <Reddot count={notifications.length} />}
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div  //리스트 열리는 모션주기
                        className="notification-dropdown"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                    >
                        {notifications.length > 0 ? (
                            notifications.map((notification) => (
                                <div key={notification.id} className="notification-item">
                                    {notification.text}
                                </div>
                            ))
                        ) : (
                            <div className="notification-empty">새로운 알림이 없습니다.</div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default BellBox;
