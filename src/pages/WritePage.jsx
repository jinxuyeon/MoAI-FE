import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useEffect, useState, useRef } from "react";
import axios from "axios"; 
import axiosInstance from "../components/utils/AxiosInstance";

import "./WritePage.css";
import {
  FileImage,
  Paperclip,
  Link as LinkIcon,
  Menu,
  AArrowUp,
  AArrowDown,
} from "lucide-react";

const WritePage = () => {
  const { boardType } = useParams();
  const navigate = useNavigate();

  const [showSelect, setShowSelect] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState(null);
  const editorRef = useRef(null);
  const imageInputRef = useRef(null);
  const fileInputRef = useRef(null);

  const boardList = [
    { label: "공지사항", value: "NOTICE" },
    { label: "책장터", value: "MARKET" },
    { label: "자유게시판", value: "FREE" },
    { label: "비밀게시판", value: "SECRET" },
    { label: "강의게시판", value: "LECTURE" },
  ];

  useEffect(() => {
    if (boardType) {
      const matched = boardList.find((b) => b.value === boardType.toUpperCase());
      if (matched) setSelectedBoard(matched);
    }
  }, [boardType]);

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
      // 1. presigned URL 요청 (인증 필요하므로 axiosInstance 사용)
      const res = await axiosInstance.get("/api/aws/S3/presign", {
        params: { filename: file.name },
      });
      const { uploadUrl, fileUrl } = res.data;
      console.log("✅ presigned URL 응답:", uploadUrl);

      // 2. presigned URL로 S3에 파일 PUT 요청 (인증 X, 일반 axios 사용)
      await axios.put(uploadUrl, file, {
        headers: {
          "Content-Type": file.type,
        },
      });

      alert("✅ 업로드 성공!");
      console.log("📂 업로드된 S3 파일 URL:", fileUrl);

      const imgTag = `<img src="${fileUrl}" alt="${file.name}" style="max-width: 100%; margin: 8px 0;" />`;
      insertHTML(imgTag);
    } catch (err) {
      console.error("❌ Presigned URL 요청 또는 업로드 실패:", err);
      alert("실패");
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
    if (!selectedBoard || !title || !content) {
      alert("게시판, 제목, 내용을 모두 입력해 주세요.");
      return;
    }

    try {
      const res = await axiosInstance.post("/api/post/post-up", {
        boardType: selectedBoard.value,
        title,
        content,
      });

      if (res.status === 200 || res.status === 201) {
        alert("글이 등록되었습니다.");
        navigate(`/board/${selectedBoard.value.toLowerCase()}`);
      } else {
        alert("등록 실패. 다시 시도해주세요.");
      }
    } catch (err) {
      console.error(err);
      alert("서버 오류가 발생했습니다.");
    }
  };

  const handleTempSave = async () => {
    const { title, content } = getFormData();
    if (!selectedBoard || (!title && !content)) {
      alert("게시판을 선택하고 내용을 입력해 주세요.");
      return;
    }

    try {
      const res = await axiosInstance.post("/api/posts/temp", {
        boardType: selectedBoard.value,
        title,
        content,
      });

      if (res.status === 200 || res.status === 201) {
        alert("임시저장 완료!");
      } else {
        alert("임시저장 실패");
      }
    } catch (err) {
      console.error(err);
      alert("서버 오류가 발생했습니다.");
    }
  };

  const increaseFontSize = () => {
    const selection = window.getSelection();
    if (!selection.rangeCount || selection.isCollapsed) return;
    const range = selection.getRangeAt(0);
    const span = document.createElement("span");
    span.style.fontSize = "18px";
    span.textContent = selection.toString();
    range.deleteContents();
    range.insertNode(span);
    editorRef.current.focus();
  };

  const decreaseFontSize = () => {
    const selection = window.getSelection();
    if (!selection.rangeCount || selection.isCollapsed) return;
    const range = selection.getRangeAt(0);
    const span = document.createElement("span");
    span.style.fontSize = "12px";
    span.textContent = selection.toString();
    range.deleteContents();
    range.insertNode(span);
    editorRef.current.focus();
  };

  const applyLink = () => {
    const selection = window.getSelection();
    if (!selection.rangeCount || selection.isCollapsed) {
      alert("먼저 링크로 만들 텍스트를 드래그하세요.");
      return;
    }
    const url = prompt("링크 주소를 입력하세요 (https:// 포함)");
    if (!url || !/^https?:\/\//.test(url)) {
      alert("올바른 링크 형식을 입력해 주세요 (https://...)");
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
      <Header title="Community" />
      <div className="write-layout">
        <div className="write-main">
          <h2 className="write-title">카페 글쓰기</h2>

          <div className="write-section">
            <div className="write-box">
              <div className="custom-dropdown">
                <div
                  className="custom-select-box"
                  onClick={() => setShowSelect(!showSelect)}
                >
                  <span>
                    {selectedBoard ? selectedBoard.label : "게시판을 선택해 주세요."}
                  </span>
                  <Menu size={18} />
                </div>

                {showSelect && (
                  <div className="dropdown-menu">
                    {boardList.map((board) => (
                      <div
                        key={board.value}
                        className="dropdown-item"
                        onClick={() => {
                          setSelectedBoard(board);
                          setShowSelect(false);
                        }}
                      >
                        {board.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <input
                type="text"
                className="write-input"
                placeholder="제목을 입력해 주세요."
              />
            </div>

            <div className="editor-box flat">
              <div className="toolbar-row flat">
                <button
                  title="사진"
                  className="toolbar-button"
                  onClick={() => imageInputRef.current.click()}
                >
                  <FileImage size={24} />
                  <span className="toolbar-label">사진</span>
                </button>

                <button
                  title="파일"
                  className="toolbar-button"
                  onClick={() => fileInputRef.current.click()}
                >
                  <Paperclip size={24} />
                  <span className="toolbar-label">파일</span>
                </button>

                <button
                  title="링크"
                  className="toolbar-button"
                  onClick={applyLink}
                >
                  <LinkIcon size={24} />
                  <span className="toolbar-label">링크</span>
                </button>

                <input
                  type="file"
                  accept="image/*"
                  ref={imageInputRef}
                  style={{ display: "none" }}
                  onChange={handleImageUpload}
                />
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleFileUpload}
                />
              </div>

              <hr className="divider" />

              <div className="toolbar-row flat">
                <button title="굵게" onClick={() => applyStyle("bold")}>
                  <b>B</b>
                </button>
                <button title="기울임" onClick={() => applyStyle("italic")}>
                  <i>I</i>
                </button>
                <button title="밑줄" onClick={() => applyStyle("underline")}>
                  <u>U</u>
                </button>
                <button title="글자 키우기" onClick={increaseFontSize}>
                  <AArrowUp size={20} />
                </button>
                <button title="글자 줄이기" onClick={decreaseFontSize}>
                  <AArrowDown size={20} />
                </button>
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
            <button className="save-draft" onClick={handleTempSave}>
              임시등록
            </button>
            <button className="submit-post" onClick={handleSubmit}>
              등록
            </button>
          </div>
        </div>

        <div className="write-sidebar">
          <div className="write-setting">
            <h4>공개 설정</h4>
            <label>
              <input type="checkbox" defaultChecked /> 댓글 허용
            </label>
            <label>
              <input type="checkbox" defaultChecked /> 블로그ㆍ카페 공유 허용
            </label>
            <label>
              <input type="checkbox" defaultChecked /> 외부 공유 허용
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WritePage;
