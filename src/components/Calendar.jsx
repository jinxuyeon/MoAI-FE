import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // 기본 스타일
import "./Calendar.css";


const CalendarPanel = () => {
    const [date, setDate] = useState(new Date());  // 선택한 날짜
    const [isOpen, setIsOpen] = useState(false);  // 캘린더 열림/닫힘 상태

    return (
        <div className="calendar-Container">
            <div style={{ display: "flex", width: "100%", alignItems: "center" }}>
                <button className="Calendar-Button" onClick={() => setIsOpen(!isOpen)}>
                    📅 캘린더   {isOpen ? "🔺" : "🔻"}
                </button>
            </div>

            {isOpen && (
                <div className="calendar">
                    <Calendar onChange={setDate} value={date}  />
                    {/* <p>선택한 날짜: <strong>{date.toLocaleDateString()}</strong></p> */}
                </div>
            )}
        </div>
    );
};

export default CalendarPanel;
