import { useState } from "react";
import Header from "../components/Header";
import Panel from "../components/Panel";
import Dashboard from "../components/Dashboard";
import Sidebar from "../components/Sidebar"; // 경로 맞게 수정
import "./MainPage.css";

const MainPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
        <div className="Panel-container">
          <Panel hideWidgets={false} />
        </div>

        <div className="Dashboard-container">
          <Dashboard />
        </div>
      </div>

      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
    </div>
  );
};

export default MainPage;
