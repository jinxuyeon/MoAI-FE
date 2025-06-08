import { useState } from "react";
import "./LectureCreateModal.css";
import axiosInstance from "../utils/AxiosInstance";

const colorOptions = [
    { name: "Sky Blue", value: "#007bff" },
    { name: "Emerald", value: "#28a745" },
    { name: "Sunshine", value: "#ffc107" },
    { name: "Coral", value: "#fd7e14" },
    { name: "Crimson", value: "#dc3545" },
    { name: "Purple", value: "#6f42c1" },
    { name: "Teal", value: "#20c997" },
    { name: "Slate", value: "#6c757d" },
];

const LectureCreateModal = ({ onClose, onSuccess }) => {
    const [title, setTitle] = useState("");
    const [grade, setGrade] = useState(1);
    const [semester, setSemester] = useState(1);
    const [intro, setIntro] = useState("");
    const [color, setColor] = useState(colorOptions[0].value);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.post("/api/lecture-room", {
                title,
                grade,
                semester,
                intro,
                themeColor: color, // ✅ 엔티티 필드명에 맞춤
            });
            onSuccess();
            onClose();
        } catch (err) {
            alert("강의 생성 실패");
            console.error(err);
        }
    };
    return (
        <div className="modal-backdrop">
            <div className="modal-box">
                <h2>강의 생성</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        강의명 <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        placeholder="예: 영상처리 및 실습"
                    />

                    <label>학년</label>
                    <select value={grade} onChange={(e) => setGrade(Number(e.target.value))}>
                        {[1, 2, 3, 4].map((g) => (
                            <option key={g} value={g}>{g}학년</option>
                        ))}
                    </select>

                    <label>학기</label>
                    <select value={semester} onChange={(e) => setSemester(Number(e.target.value))}>
                        {[1, 2].map((s) => (
                            <option key={s} value={s}>{s}학기</option>
                        ))}
                    </select>

                    <label>강의 소개 (선택)</label>
                    <textarea
                        value={intro}
                        onChange={(e) => setIntro(e.target.value)}
                        placeholder="강의에 대한 간단한 설명을 입력하세요"
                    />

                    <label>테마 색상</label>
                    <div className="color-palette">
                        {colorOptions.map((c) => (
                            <div
                                key={c.value}
                                className={`color-box ${color === c.value ? "selected" : ""}`}
                                style={{ backgroundColor: c.value }}
                                onClick={() => setColor(c.value)}
                                title={c.name}
                            />
                        ))}
                        <label className="custom-color-picker">
                            <input
                                type="color"
                                value={color}
                                onChange={(e) => setColor(e.target.value)}
                                style={{ width: "40px", height: "30px", border: "none", padding: 0 }}
                            />
                            직접 선택
                        </label>
                    </div>

                    <div className="modal-actions">
                        <button type="submit">생성</button>
                        <button type="button" onClick={onClose}>취소</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LectureCreateModal;
