import Header from "../components/Header"
import "./MyPage.css"

const MyPage = () =>{
    return(
        <div className="MyPage">
            <Header title={"Mypage"} />
            <div className="container">
                <div className="inner-container">

                    {/* 프로필 */}
                    <aside className="profile-section">
                        <div className="profile-pic"></div>
                            <label>이름</label>
                            <input type="text" placeholder="이름"/>

                            <label>자기소개</label>
                            <input type="text" placeholder="자기소개"/>

                            <label className="section-title">개인정보</label>

                            <label className="spacer-label"></label>
                            <label>학번</label>
                            <input type="text" placeholder="학번"/>

                            <label>이메일</label>
                            <input type="text" placeholder="이메일"/>

                            <label>비밀번호</label>
                            <input type="text" placeholder="비밀번호"/>

                            <button>저장</button>                        
                    </aside>
                    {/* 메인 컨텐츠 영역 */}
                    <main className="main-content">

                        <label>알림</label>
                        <div className="box large">알림</div>
                        <label className="spacer-label"></label>

                        <label>작성글, 작성댓글</label>
                        <div className="content-row">
                            <div className="box medium">작성글</div>
                            <div className="box medium">작성댓글</div>
                        </div>

                        <label className="spacer-label"></label>
                        <label>친구목록</label>
                        <div className="box large">친구목록</div>

                    </main>


                </div>
            </div>
        </div>
    );
};


export default MyPage