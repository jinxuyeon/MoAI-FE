import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // 기본 스타일
import "./Calendar.css";


const CalendarPanel = () => {
    const [date, setDate] = useState(new Date()); // 선택한 날짜

    return (
        <div className="calendar-container">
            {/* <header className="calendar-header">
            </header> */}

            <div className="calendar">
                <Calendar
                    onChange={setDate}
                    value={date}
                    formatDay={(locale, date) => date.getDate()}
                    locale="ko-KR"
                />
                {/* <p>선택한 날짜: <strong>{date.toLocaleDateString()}</strong></p> */}
            </div>
        </div>
    );
};

export default CalendarPanel;
