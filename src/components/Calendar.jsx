import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // 기본 스타일
import "./Calendar.css";

const CalendarPanel = () => {
    const [date, setDate] = useState(new Date()); // 선택한 날짜

    console.log("선택한 날짜", date);

    return (
        <div className="calendar-container">
            <h4>🗓️캘린더</h4>
            <div className="calendar">
                <Calendar
                    onChange={setDate}
                    value={date}
                    formatDay={(locale, date) => date.getDate()}
                />
                {/* <p>선택한 날짜: <strong>{date.toLocaleDateString()}</strong></p> */}
            </div>
        </div>
    );
};

export default CalendarPanel;
