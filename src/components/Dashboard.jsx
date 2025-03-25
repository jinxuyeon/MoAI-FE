import "./Dashboard.css"
import NormalBoard from "./NormalBoard"
import BookMarketBoard from "./BookMarketBoard"
const Dashboard = () => {

    return (
        <div className="Dashboard">
            <div className="Content-container">

                <div className="main-container">메인컨테이너
                    <section className="board-area">
                    영역1
                    <NormalBoard/>
                    </section>

                    <section className="board-area">
                    영역2

                    <div>자유게시판</div>
                    <div>강의게시판판</div>

                    </section>


                    <section className="board-area">
                    영역3

                    <div>인기게시판판</div>
                    <div>익명게시판판</div>

                    </section>

                </div>
                <div className="rightside-container">취업정보컨테이너너</div>

            </div>
        </div>
    )
}


export default Dashboard