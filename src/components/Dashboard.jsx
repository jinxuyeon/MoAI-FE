import "./Dashboard.css"
import NormalBoard from "./NormalBoard"
import BookMarketBoard from "./BookMarketBoard"

const Dashboard = () => {

    return (
        <div className="Dashboard">
            <div className="Content-Container">
                <NormalBoard />

                <div className="market-container">
                    <BookMarketBoard />
                </div>
            </div>
        </div>
    )
}


export default Dashboard