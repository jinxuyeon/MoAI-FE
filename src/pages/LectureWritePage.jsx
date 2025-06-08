import { useParams, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import axiosInstance from "../components/utils/AxiosInstance";
import axios from "axios";
import "./WritePage.css";

import {
  FileImage,
  Paperclip,
  Link as LinkIcon,
  Menu,
  AArrowUp,
  AArrowDown,
} from "lucide-react";

// 프론트 카테고리 → 백엔드 enum 매핑
const boardTypeMap = {
  질문: "LECTURE_Q",
  공지사항: "LECTURE_N",
  자료실: "LECTURE_REF",
  후기: "LECTURE_R",
};

const tabList = Object.keys(boardTypeMap);

const LectureWritePage = () => {
  const { lectureId } = useParams();
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("질문");
  const [showTabSelect, setShowTabSelect] = useState(false);

  const editorRef = useRef(null);
  const imageInputRef = useRef(null);
  const fileInputRef = useRef(null);

  const applyStyle = (command) => {
    document.execCommand(command, false, null);
    editorRef.current.focus();
  };

  const insertHTML = (html) => {
    editorRef.current.focus();
    document.execCommand("insertHTML", false, html);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const res = await axiosInstance.get("/api/aws/S3/presign", {
        params: { filename: file.name, contentType: file.type },
      });
      const { uploadUrl, fileUrl } = res.data;

      await axios.put(uploadUrl, file, {
        headers: {
          "Content-Type": file.type,
          Authorization: undefined,
        },
      });

      const imgTag = `<img src="${fileUrl}" alt="${file.name}" style="max-width: 500px; width: 100%; height: auto; margin: 8px 0;" />`;
      insertHTML(imgTag);
    } catch (err) {
      console.error("❌ 이미지 업로드 실패:", err);
      alert("이미지 업로드 실패: 콘솔 로그를 확인하세요.");
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileTag = `<a href="#" style="color: #3498db;">📎 ${file.name}</a>`;
    insertHTML(fileTag);
  };

  const getFormData = () => {
    const title = document.querySelector(".write-input").value.trim();
    const content = editorRef.current.innerHTML.trim();
    return { title, content };
  };

  const handleSubmit = async () => {
    const { title, content } = getFormData();
    if (!selectedTab || !title || !content) {
      alert("카테고리, 제목, 내용을 모두 입력해 주세요.");
      return;
    }

    const boardTypeEnum = boardTypeMap[selectedTab];
    if (!boardTypeEnum) {
      alert("올바르지 않은 게시판 카테고리입니다.");
      return;
    }

    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = content;
    const firstImg = tempDiv.querySelector("img");
    const imageUrls = firstImg ? firstImg.src : null;

    try {
      const res = await axiosInstance.post("/api/post/lecture-post-up", {
        lectureId: Number(lectureId),
        boardType: boardTypeEnum,
        title,
        content,
        imageUrls,
      });

      if (res.status === 200 || res.status === 201) {
        alert("글이 등록되었습니다.");
        navigate(`/main/study-dashboard/${lectureId}`);
      } else {
        alert("등록 실패. 다시 시도해주세요.");
      }
    } catch (err) {
      console.error("❌ 등록 오류:", err);
      alert("서버 오류가 발생했습니다.");
    }
  };

  const changeFontSize = (delta) => {
    const selection = window.getSelection();
    if (!selection.rangeCount || selection.isCollapsed) return;

    const range = selection.getRangeAt(0);
    const span = document.createElement("span");
    span.appendChild(range.extractContents());
    span.style.fontSize = `${Math.max(1, delta + 16)}px`;
    range.insertNode(span);
    selection.removeAllRanges();
    const newRange = document.createRange();
    newRange.selectNodeContents(span);
    selection.addRange(newRange);
  };

  const increaseFontSize = () => changeFontSize(1);
  const decreaseFontSize = () => changeFontSize(-1);

  const applyLink = () => {
    const selection = window.getSelection();
    if (!selection.rangeCount || selection.isCollapsed) {
      alert("먼저 링크로 만들 텍스트를 드래그하세요.");
      return;
    }
    const url = prompt("링크 주소를 입력하세요 (https:// 포함)");
    if (!url || !/^https?:\/\//.test(url)) {
      alert("올바른 링크 형식을 입력해 주세요.");
      return;
    }
    const range = selection.getRangeAt(0);
    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = selection.toString();
    range.deleteContents();
    range.insertNode(link);
    editorRef.current.focus();
  };

  return (
    <div className="WritePage">
      <div className="write-layout">
        <div className="write-main">
          <h2 className="write-title">강의 게시판 글쓰기</h2>

          <div className="write-section">
            <div className="write-box">
              <div className="custom-dropdown">
                <div className="custom-select-box" onClick={() => setShowTabSelect(!showTabSelect)}>
                  <span>{selectedTab}</span>
                  <Menu size={18} />
                </div>
                {showTabSelect && (
                  <div className="dropdown-menu">
                    {tabList.map((tab) => (
                      <div
                        className="dropdown-item"
                        key={tab}
                        onClick={() => {
                          setSelectedTab(tab);
                          setShowTabSelect(false);
                        }}
                      >
                        {tab}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <input type="text" className="write-input" placeholder="제목을 입력해 주세요." />
            </div>

            <div className="editor-box flat">
              <div className="toolbar-row flat">
                <button className="toolbar-button" onClick={() => imageInputRef.current.click()} title="사진">
                  <FileImage size={24} />
                  <span className="toolbar-label">사진</span>
                </button>
                <button className="toolbar-button" onClick={() => fileInputRef.current.click()} title="파일">
                  <Paperclip size={24} />
                  <span className="toolbar-label">파일</span>
                </button>
                <button className="toolbar-button" onClick={applyLink} title="링크">
                  <LinkIcon size={24} />
                  <span className="toolbar-label">링크</span>
                </button>
                <input type="file" accept="image/*" ref={imageInputRef} style={{ display: "none" }} onChange={handleImageUpload} />
                <input type="file" ref={fileInputRef} style={{ display: "none" }} onChange={handleFileUpload} />
              </div>

              <hr className="divider" />

              <div className="toolbar-row flat">
                <button title="굵게" onClick={() => applyStyle("bold")}><b>B</b></button>
                <button title="기울임" onClick={() => applyStyle("italic")}><i>I</i></button>
                <button title="밑줄" onClick={() => applyStyle("underline")}><u>U</u></button>
                <button title="글자 키우기" onClick={increaseFontSize}><AArrowUp size={20} /></button>
                <button title="글자 줄이기" onClick={decreaseFontSize}><AArrowDown size={20} /></button>
              </div>

              <hr className="divider" />

              <div
                ref={editorRef}
                className="write-textarea editable"
                contentEditable={true}
                suppressContentEditableWarning={true}
              ></div>
            </div>
          </div>

          <div className="write-actions">
            <button className="submit-post" onClick={handleSubmit}>등록</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LectureWritePage;
