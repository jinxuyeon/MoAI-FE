import "./Modal.css";
import { useState } from "react";

const Modal = ({ openModal, setOpenModal }) => {
    return (
        <div className="Modal">
            <div className="Overlay">
                <div className="container">
                    <section>
                        <div className="search-box">
                            <input
                                type="text"
                                className="search-input"
                                placeholder="email로 검색하세요요"
                            />
                            <button className="search-button">검색</button>
                        </div>
                        
                        <div className="search-results">
                            <p>검색 결과가 여기에 표시됩니다.</p>
                        </div>
                    </section>

                    <button
                        className="cancel"
                        type="button"
                        onClick={() => {
                            setOpenModal(false); // 클릭 이벤트로 모달창 닫히게 하기
                        }}
                    >
                        닫기
                    </button>

                   
                    {!openModal ? setOpenModal(true) : null}
                </div>
            </div>
        </div>
    );
};

export default Modal;
