import React, { useState } from "react";
import axiosInstance from "../utils/AxiosInstance"; // presign 요청용
import axios from "axios";
import "./MarketUploadModal.css";

const MarketUploadModal = ({ onClose }) => {
    const [imgFile, setImgFile] = useState(null);
    const [imgUrl, setImgUrl] = useState(null); // ✅ 실제 업로드된 이미지 URL
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            const res = await axiosInstance.get("/api/aws/S3/presign", {
                params: { filename: file.name },
            });
            const { uploadUrl, fileUrl } = res.data;

            // ✅ 2. 이미지 S3 업로드
            await axios.put(uploadUrl, file, {
                headers: { "Content-Type": file.type },
            });

            setImgFile(file);
            setImgUrl(fileUrl); // ✅ 미리보기 + 최종 저장용

        } catch (err) {
            alert("이미지 업로드 실패");
            console.error(err);
        }
    };
    const handleSubmit = async () => {
    if (!title || !price || !description || !imgUrl) {
        alert("모든 항목을 입력하세요.");
        return;
    }

    try {
        const res = await axiosInstance.post("/api/post/post-up", {
            boardType: "MARKET",
            title,
            content: `<p>${description}</p>`.trim(),  // ✅ 가격은 content에서 제거
            imageUrls: imgUrl,
            price: Number(price),                    // ✅ price 필드에 따로 전달
        });

        if (res.status === 200 || res.status === 201) {
            alert("물품이 등록되었습니다.");
            onClose();
            window.location.href = "/main/community/market";
        } else {
            alert("등록 실패. 다시 시도해주세요.");
        }
    } catch (err) {
        console.error("등록 오류:", err);
        alert("서버 오류가 발생했습니다.");
    }
};



    return (
        <div className="modal-backdrop">
            <div className="modal-container horizontal">
                <div className="left-box">
                    <label htmlFor="fileInput" className="image-placeholder">
                        {imgUrl ? (
                            <img src={imgUrl} alt="preview" className="preview-image" />
                        ) : (
                            <span>이미지 업로드</span>
                        )}
                    </label>
                    <input
                        id="fileInput"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        hidden
                    />
                </div>

                <div className="right-box">
                    <h2>📚 물품 등록</h2>
                    <label>
                        물품 이름
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </label>
                    <label>
                        가격 (원)
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </label>
                    <label>
                        설명
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </label>
                    <div className="modal-buttons">
                        <button onClick={handleSubmit}>등록</button>
                        <button onClick={onClose}>취소</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MarketUploadModal;
