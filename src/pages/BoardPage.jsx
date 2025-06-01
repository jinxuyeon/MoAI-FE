import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Header from "../components/Header";
import NaviBar from "../components/NaviBar";
import MarketBox from "../components/board-box/MarketBox";
import LectureCategoryBox from "../components/board-box/LectureCategoryBox";
import BasicBoardBox from "../components/board-box/BasicBoardBox";
import PostDetail from "../components/post/PostDetail";
import "./BoardPage.css";
import axiosInstance from "../components/utils/AxiosInstance";
import MarketUploadModal from "../components/board-box/MarketUploadModal";

const BoardPage = () => {
    const { boardType } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const isPostDetail = location.pathname.includes("/post/");
    const [showUploadModal, setShowUploadModal] = useState(false);

    const [postData, setPostData] = useState({
        posts: [],
        totalCount: 0,
        totalPages: 0,
        currentPage: 0,
        pageSize: 8,
    });

    useEffect(() => {
        if (!isPostDetail) {
            handleSearch(boardType);
        }
    }, [boardType, isPostDetail]);

    const handleSearch = async (type, page = 0) => {
        try {
            const res = await axiosInstance.get("/api/post", {
                params: {
                    boardType: type,
                    page,
                    size: 10,
                },
            });
            setPostData(res.data);
        } catch (err) {
            console.error("❌ 게시글 불러오기 실패:", err);
        }
    };

    const renderBoard = () => {
        switch (boardType) {
            case "free":
            case "notice_c":
            case "secret":
                return (
                    <BasicBoardBox
                        data={postData}
                        onPageChange={(page) => handleSearch(boardType, page)}
                    />
                );
            case "market":
                return (
                    <MarketBox
                        data={postData}
                        onPageChange={(page) => handleSearch(boardType, page)}
                    />
                );
            case "popular":
                return <div>인기게시판 컴포넌트</div>;
            case "lecture":
                return <LectureCategoryBox />;
            default:
                return <div>존재하지 않는 게시판입니다.</div>;
        }
    };

    const handleWriteClick = () => {
        navigate(`/write/${boardType}`);
    };

    return (
        <div className="BoardPage">
            <div className="header-with-button">
                <Header title={"Community"} />
            </div>
            <div className="layout-container">
                <div className="content-container">
                    <div className="navibar-container">
                        <NaviBar currentBoard={boardType} />
                        {boardType === "lecture" ? (
                            <button
                                className="write-button"
                                onClick={() => navigate("/create-lecture")}
                            >
                                생성
                            </button>
                        ) : boardType === "market" ? (
                            <button
                                className="write-button"
                                onClick={() => setShowUploadModal(true)}
                            >
                                물품등록
                            </button>
                        ) : (
                            <button
                                className="write-button"
                                onClick={handleWriteClick}
                            >
                                글쓰기
                            </button>
                        )}
                    </div>

                    <div className="board-container">
                        {isPostDetail ? <PostDetail /> : renderBoard()}
                    </div>
                </div>
            </div>

            {/* 모달 렌더링 */}
            {showUploadModal && (
                <MarketUploadModal onClose={() => setShowUploadModal(false)} />
            )}
        </div>
    );
};

export default BoardPage;
