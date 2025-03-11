import "./Modal.css"

const Modal = ({ openModal, setOpenModal }) => {
    return(
        <div className="Modal">
        <div className="Overlay">
            <div className="container">
                <button
                    className="cancle"
                    type="button"
                    onClick={() => {
                        setOpenModal(false); // 클릭 이벤트로 모달창 닫히게 하기
                    }}
                >
                    취소
                </button>

                친구검색기능 추가해야함
                {!openModal ? setOpenModal(true) : null}
            </div>
        </div>
    </div>
    )
}

export default Modal