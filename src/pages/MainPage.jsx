import { useEffect, useState } from "react";
import Header from "../components/Header";
import Panel from "../components/Panel";
import Dashboard from "../components/Dashboard";
import "./MainPage.css";

const MainPage = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 760);

  useEffect(() => { //화면 작을때 걍 패널 안보여주고 사이드바에다 넣을것임
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 760);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="MainPage">
      <Header title={""} />
      <div className="Panel-Dashboard-Container">
        {!isMobile && (
          <div className="Panel-container">
            <Panel hideWidgets={false} />
          </div>
        )}
        <div className="Dashboard-container">
          <Dashboard />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
