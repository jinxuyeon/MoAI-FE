import Header from "../components/Header"
import Panel from "../components/Panel"
import Dashboard from "../components/Dashboard"
import { useState, useEffect } from "react"
import { jwtDecode } from "jwt-decode";
import "./Mainpage.css"

const MainPage = () => {

    const [userName, setUserName] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                console.log("토큰:", token); //
                const decodedToken = jwtDecode(token);
                console.log(decodedToken);
                setUserName(decodedToken.username);
                console.log(userName)
            } catch (error) {
                console.error("토큰 디코딩 오류:", error);
            }
        }
    }, []);


    return (
        <div className="MainPage">
                <Header />
            <div className="Panel-Dashboard-Container">
                <Panel username = {userName}  />
                <Dashboard />
            </div>
        </div>
    )
}

export default MainPage