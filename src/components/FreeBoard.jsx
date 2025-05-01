import "./NoticeBoard.css";
import { Link } from "react-router-dom";

const FreeBoard = () => {

    return (
            <section className="NormalBoard">
                <h4 className="title">자유게시판</h4>
                <div>
                    <strong>주차등록 안내</strong>
                </div>
                <div>
                    <strong>수강신청 안내내</strong>
                </div>
                <div>
                    <strong>{"(4학년)캡스톤 디자인 관련 안내사항항"}</strong>
                </div>
                <Link to={"/main/community/free"}>게시글 더보기</Link>
            </section>
    )
}


export default FreeBoard