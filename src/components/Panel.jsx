
import "./Panel.css"
import Favorites from "./Favorites"
import Friends from "./Friends"
const Panel = ({ username }) => {


    return (
        <div className="Panel-Container">

            <div style={{display:"flex", alignItems:"center", gap:"20px"}}>
                <button className="profile-btn"></button>
                <h2>{username}</h2>
            </div>


            <Favorites />
            <hr />
            <Friends />
            <hr />
            <div>캘린더</div>
        </div>
    )

}


export default Panel