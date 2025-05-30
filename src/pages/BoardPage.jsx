import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import NaviBar from "../components/NaviBar";
import NoticeBoardBox from "../components/board-box/NoticeBoardBox";
import MarketBox from "../components/board-box/MarketBox";
import FreeBoardBox from "../components/board-box/FreeBoardBox";
import SecretBoardBox from "../components/board-box/SecretBoardBox";
import LectureCategoryBox from "../components/board-box/LectureCategoryBox";
import "./BoardPage.css";

const BoardPage = () => {
    const { boardType } = useParams();
    const navigate = useNavigate();

    const renderBoard = () => {
        switch (boardType) {
            case "notice":
                return <NoticeBoardBox />;
            case "market":
                return <MarketBox />;
            case "free":
                return <FreeBoardBox />;
            case "popular":
                return <div>인기게시판 컴포넌트</div>;
            case "secret":
                return <SecretBoardBox />;
            case "lecture":
                return <LectureCategoryBox />;
            default:
                return <div>존재하지 않는 게시판입니다.</div>;
        }
    };

    const handleWriteClick = () => {
        // 현재 게시판 타입으로 write 페이지 이동
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
                        {/* boardType이 "lecture"인 경우 글쓰기 버튼 숨김 */}
                        {boardType === "lecture" ? (
                            <button className="write-button" onClick={() => navigate("/create-lecture")}>
                                생성
                            </button>
                        ) : (
                            <button className="write-button" onClick={handleWriteClick}>
                                글쓰기
                            </button>
                        )}
                    </div>
                    <div className="board-container">{renderBoard()}</div>
                </div>
            </div>
        </div>
    );

};

export default BoardPage;
