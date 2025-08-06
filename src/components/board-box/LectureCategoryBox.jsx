import { useContext, useState, useEffect } from "react";
import axiosInstance from "../utils/AxiosInstance";
import { UserContext } from "../utils/UserContext";
import "./LectureCategoryBox.css";

const dowMap = {
    MONDAY: '월',
    TUESDAY: '화',
    WEDNESDAY: '수',
    THURSDAY: '목',
    FRIDAY: '금',
    SATURDAY: '토',
    SUNDAY: '일'
};

const formatSchedule = (schedules) => {
    if (!schedules || schedules.length === 0) return "시간 미정";

    return schedules.map(schedule => {
        const dow = dowMap[schedule.dow] || schedule.dow;
        const startPeriod = schedule.startTime - 8;  // 9시 → 1교시
        const endPeriod = schedule.endTime - 8;
        return `${dow} ${startPeriod}~${endPeriod}`;
    }).join(", ");
};

const LectureCategoryBox = () => {
    const { user } = useContext(UserContext);
    const [lectures, setLectures] = useState([]);
    const [isVisible, setIsVisible] = useState(true);
    const [timetableBlocks, setTimetableBlocks] = useState([]);
    const [markedLectureIds, setMarkedLectureIds] = useState([]);
    const [showConflictModal, setShowConflictModal] = useState(false);
    const [showAlreadyAddedModal, setShowAlreadyAddedModal] = useState(false);

    const fetchLectures = async () => {
        try {
            const res = await axiosInstance.get("/lecture-room/list");
            setLectures(res.data.data || []);
        } catch (err) {
            console.error("강의 목록 불러오기 실패:", err);
        }
    };

    useEffect(() => {
        fetchLectures();

        const handler = async () => {
            try {
                const res = await axiosInstance.get("/lecture-room/mark");
                const lectures = res.data?.markedLecture ?? [];
                const newBlocks = [];
                const newMarkedIds = [];

                lectures.forEach((lec) => {
                    newMarkedIds.push(lec.id);
                    const schedules = lec.schedules;
                    if (!schedules || !Array.isArray(schedules)) return;
                    schedules.forEach(({ dow, startTime, endTime }) => {
                        for (let i = startTime; i < endTime; i++) {
                            newBlocks.push(`${dow}-${i}`);
                        }
                    });
                });

                setTimetableBlocks(newBlocks);
                setMarkedLectureIds(newMarkedIds);
            } catch (err) {
                console.error("시간표 데이터 불러오기 실패:", err);
            }
        };

        window.addEventListener("favoritesUpdated", handler);
        handler();

        return () => window.removeEventListener("favoritesUpdated", handler);
    }, []);

    const addToFavorites = async (lecture) => {
        if (markedLectureIds.includes(lecture.id)) {
            setShowAlreadyAddedModal(true);
            return;
        }

        const schedules = lecture.schedules;
        if (!schedules || schedules.length === 0) return;

        const hasConflict = schedules.some(({ dow, startTime, endTime }) => {
            for (let i = startTime; i < endTime; i++) {
                if (timetableBlocks.includes(`${dow}-${i}`)) {
                    return true;
                }
            }
            return false;
        });

        if (hasConflict) {
            setShowConflictModal(true);
            return;
        }

        try {
            await axiosInstance.post("/lecture-room/mark", null, {
                params: { lectureRoomId: lecture.id }
            });
            console.log("즐겨찾기 추가 성공");
            window.dispatchEvent(new Event("favoritesUpdated"));
        } catch (err) {
            console.error("즐겨찾기 추가 실패:", err.response || err);
        }
    };

    const handleLectureClick = (lecture) => {
        addToFavorites(lecture);
    };

    if (!isVisible) return null;

    return (
        <div className="LectureCategoryBox">
            <div className="table-header">
                <div>강의명</div>
                <div>학년</div>
                <div>교수명</div>
                <div>강의소개</div>
                <div>강의시간</div>
                <div>담은 수</div>
                <button className="close-button" onClick={() => setIsVisible(false)}>
                    닫기
                </button>
            </div>

            <div className="table-body">
                {lectures.map((lecture) => (
                    <div
                        key={lecture.id}
                        className="table-row"
                        onClick={() => handleLectureClick(lecture)}
                        style={{ cursor: "pointer" }}
                    >
                        <div className="title">{lecture.title}</div>
                        <div>{lecture.grade}학년</div>
                        <div>{lecture.professorName || "미정"}</div>
                        <div>{lecture.intro || "강의 소개가 없습니다."}</div>
                        <div>{formatSchedule(lecture.schedules)}</div>
                        <div>{lecture.markedCount}명</div>
                    </div>
                ))}
            </div>

            {showConflictModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <p>강의 시간이 중복됩니다.</p>
                        <button onClick={() => setShowConflictModal(false)}>확인</button>
                    </div>
                </div>
            )}

            {showAlreadyAddedModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <p>이미 추가한 강의입니다.</p>
                        <button onClick={() => setShowAlreadyAddedModal(false)}>확인</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LectureCategoryBox;
