import { useContext, useState, useEffect } from "react";
import axiosInstance from "../utils/AxiosInstance";
import "./LectureCategoryBox.css";
import { UserContext } from "../utils/UserContext";
import LectureCreateModal from "../modals/LectureCreateModal";
import LectureCard from "../LectureCard";
import SearchBar from "../SearchBar";

const LectureCategoryBox = () => {
    const { user } = useContext(UserContext);
    const [lectures, setLectures] = useState([]);
    const [filteredLectures, setFilteredLectures] = useState([]);
    const [searchParams, setSearchParams] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const itemsPerPage = 12;
    const boardTitle = "강의목록";

    const isProfessorOrAdmin = user?.roles?.some((role) =>
        ["PROFESSOR", "ADMIN"].includes(role)
    );

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
    }, []);

    const handleSearch = ({ filter, query }) => {
        const lowerQuery = query.toLowerCase();

        const filtered = lectures.filter((lecture) => {
            if (filter === "title") {
                return lecture.title?.toLowerCase().includes(lowerQuery);
            } else if (filter === "writer") {
                return lecture.writerNickname?.toLowerCase().includes(lowerQuery);
            }
            return true;
        });

        setSearchParams({ filter, query });
        setFilteredLectures(filtered);
        setCurrentPage(1);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const activeLectures = searchParams ? filteredLectures : lectures;
    const totalPages = Math.ceil(activeLectures.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const visibleLectures = activeLectures.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="LectureCategoryBox">
            <div className="lecture-category-header" style={{ marginBottom: "10px" }}>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        gap: "8px",
                        width: "100%",
                    }}
                >
                    <h1 className="lecture-category-title">{boardTitle}</h1>
                    <SearchBar onSearch={handleSearch} />
                </div>
            </div>

            {isProfessorOrAdmin && (
                <>
                    <div style={{ marginTop: "10px" }}>
                        <button
                            className="create-btn"
                            onClick={() => setShowModal(true)}
                        >
                            강의 생성
                        </button>
                    </div>
                    {showModal && (
                        <LectureCreateModal
                            onClose={() => setShowModal(false)}
                            onSuccess={() => {
                                setCurrentPage(1);
                                fetchLectures();
                            }}
                        />
                    )}
                </>
            )}

            <div className="lecture-card-grid">
                {visibleLectures.map((lecture) => (
                    <LectureCard key={lecture.id} lecture={lecture} />
                ))}
            </div>

            <div className="pagination">
                {currentPage > 1 && (
                    <button onClick={() => handlePageChange(currentPage - 1)}>
                        &lt; 이전
                    </button>
                )}
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        className={currentPage === index + 1 ? "active-page" : ""}
                    >
                        {index + 1}
                    </button>
                ))}
                {currentPage < totalPages && (
                    <button onClick={() => handlePageChange(currentPage + 1)}>
                        다음 &gt;
                    </button>
                )}
            </div>
        </div>
    );
};

export default LectureCategoryBox;
