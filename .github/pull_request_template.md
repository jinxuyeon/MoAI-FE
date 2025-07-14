## Summary

**헤더 알림 디자인 수정**

## Tasks

- 알림 내용이 명확하게 표시되도록 수정 (Bellbox.jsx랑 Bellbox.css 건드림)
- 

## To Reviewer

_제가 수정한 부분이 잘 나오려면 백엔드에
  {
    "id": 1,
    "type": "comment",           // 알림 유형: "comment" | "like" | "friend"
    "content": "S님이 댓글을 남겼습니다.",
    "targetUrl": "/post/123",    // 클릭 시 이동할 주소
    "createdAt": "2025-07-14T18:03:12.000Z", // 생성 시간 (ISO 형식)
    "read": false                // 읽음 여부
  }
이런 구조여야합니담_
그리고 npm install date-fns 해야합니다!

## Screenshot

