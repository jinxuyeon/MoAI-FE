
// 여기만고치면돼 게시판 개설
const boardTypeMap = { //게시판 페이지 네이게이션 바 용
    NOTICE: "조교알림",
    NOTICE_C: "공지사항",
    FREE: "자유게시판",
    SECRET: "비밀게시판",
    REVIEW: "후기",
    MARKET: "책장터",
};





export const getBoardLabel = (type = "") => {
    return boardTypeMap[type.toUpperCase()] || "게시판";
};

export const boardTypeList = Object.keys(boardTypeMap);