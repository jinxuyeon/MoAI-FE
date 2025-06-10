import React, { useState, useEffect } from "react";
import "./TimerWidget.css";

const TimerWidget = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            const nextIsBreak = !isBreak;
            setIsBreak(nextIsBreak);
            setMinutes(nextIsBreak ? 5 : 25);
            setSeconds(0);
          } else {
            setMinutes((prev) => prev - 1);
            setSeconds(59);
          }
        } else {
          setSeconds((prev) => prev - 1);
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, seconds, minutes, isBreak]);

  const resetTimer = () => {
    setIsActive(false);
    setMinutes(25);
    setSeconds(0);
    setIsBreak(false);
  };

  return (
    <div className="timer-widget">
      <h3>⏳ 집중 타이머</h3>
      <div className="time-display">
        {`${minutes.toString().padStart(2, "0")}:${seconds
          .toString()
          .padStart(2, "0")}`}
      </div>
      <div className="button-group">
        <button onClick={() => setIsActive(!isActive)}>
          {isActive ? "일시정지" : "시작"}
        </button>
        <button onClick={resetTimer}>초기화</button>
      </div>
      <div className="status">{isBreak ? "🍵 휴식 중" : "📚 집중 중"}</div>
    </div>
  );
};

export default TimerWidget;
