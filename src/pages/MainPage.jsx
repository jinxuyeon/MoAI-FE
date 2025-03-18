import Header from "../components/Header"
import Panel from "../components/Panel"
import Dashboard from "../components/Dashboard"
import { useState, useEffect } from "react"
import { jwtDecode } from "jwt-decode";
import "./Mainpage.css"

const MainPage = () => {

    const [userName, setUserName] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                console.log(decodedToken);
                setUserName(decodedToken.username);
            } catch (error) {
                console.error("토큰 디코딩 오류:", error);
            }
        }
    }, []);


    return (
        <div className="MainPage">

            <Header title={"Dashborad"} />
            <div className="Panel-Dashboard-Container">
                    <Panel username={userName} />
                    <Dashboard />
            </div>
        </div>
    )
}

export default MainPage