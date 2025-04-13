import "./NoticeBoard.css";
import { Link } from "react-router-dom";
const NoticeBoard = () => {
    return (
        <section className="NormalBoard">
            <h4 className="title">학과사무실에서 알려드립니다</h4>
            <div>
                <strong>주차등록 안내</strong>
            </div>
            <div>
                <strong>수강신청 안내내</strong>
            </div>
            <div>
                <strong>{"(4학년)캡스톤 디자인 관련 안내사항항"}</strong>
            </div>
            <Link to={"/main/community/notice"}>게시글 더보기</Link>
        </section>
    );
};

export default NoticeBoard;
