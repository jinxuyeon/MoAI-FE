import "./Dashboard.css"
import NormalBoard from "./NormalBoard"
import BookMarketBoard from "./BookMarketBoard"
const Dashboard = () => {

    return (
        <div className="Dashboard">
            <div className="Content-container">
                <NormalBoard/>
                <BookMarketBoard/>
                
            </div>
        </div>
    )
}


export default Dashboard