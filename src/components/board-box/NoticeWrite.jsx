import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./NoticeWrite.css";

const NoticeWrite = () => {
    const [board, setBoard] = useState("공지사항");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [attachedFile, setAttachedFile] = useState(null);
    const navigate = useNavigate();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) setAttachedFile(file);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("글이 등록되었습니다.");
        navigate("/main/notice");
    };

    return (
        <div className="notice-write-container">
            <form onSubmit={handleSubmit} className="notice-write-form">
                <label>
                    게시판:
                    <select value={board} onChange={(e) => setBoard(e.target.value)}>
                        <option value="공지사항">공지사항</option>
                        <option value="자유게시판">자유게시판</option>
                        <option value="책 장터">책 장터</option>
                    </select>
                </label>

                <input
                    className="title-input"
                    type="text"
                    placeholder="제목을 입력하세요."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />

                <div className="toolbar">
                    <label className="file-upload-btn" title="이미지 첨부">
                        사진
                        <input type="file" accept="image/*" onChange={handleImageChange} hidden />
                    </label>
                    <label className="file-upload-btn" title="파일 첨부">
                        파일
                        <input type="file" onChange={handleFileChange} hidden />
                    </label>
                </div>

                {imagePreview && (
                    <div className="preview-image">
                        <img src={imagePreview} alt="미리보기" />
                    </div>
                )}

                {attachedFile && (
                    <p className="file-info">첨부된 파일: {attachedFile.name}</p>
                )}

                <textarea
                    className="content-textarea"
                    placeholder="내용을 입력하세요."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />

                <div className="submit-buttons">
                    <button type="button" disabled>저장</button>
                    <button type="submit">등록</button>
                </div>
            </form>
        </div>
    );
};

export default NoticeWrite;
