import { useParams } from "react-router-dom";
import Header from "../components/Header";
import NaviBar from "../components/NaviBar";
import NoticeBoardBox from "../components/board-box/NoticeBoardBox";
import MarketBox from "../components/board-box/MarketBox";
import "./BoardPage.css";

const BoardPage = () => {
    const { boardType } = useParams(); // <- URL에서 현재 게시판 종류 추출

    const renderBoard = () => {
        switch (boardType) {
            case "notice":
                return <NoticeBoardBox />;
            case "market":
                return <MarketBox />;
            case "free":
                return <div>자유게시판 컴포넌트</div>;
            case "popular":
                return <div>인기게시판 컴포넌트</div>;
            case "lecture":
                return <div>강의게시판 컴포넌트</div>;
            default:
                return <div>존재하지 않는 게시판입니다.</div>;
        }
    };

    return (
        <div className="BoardPage">
            <div>
                <Header title={"Community"} />
            </div>
            <div className="layout-container">
                <div className="navibar-container">
                    <NaviBar currentBoard={boardType} />
                </div>
                <div className="board-container">{renderBoard()}</div>
            </div>
        </div>
    );
};

export default BoardPage;
