import { useState, useEffect } from "react";
import Header from "../components/Header";
import Panel from "../components/Panel";
import Dashboard from "../components/Dashboard";
import Sidebar from "../components/Sidebar";
import "./MainPage.css";

const MainPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 760);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

 

  return (
    <div className="MainPage">
      <Header onMenuClick={toggleSidebar} />

      <div className="Panel-Dashboard-Container">

        <div className="Dashboard-container">
          <Dashboard />
        </div>
      </div>

      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
    </div>
  );
};

export default MainPage;
