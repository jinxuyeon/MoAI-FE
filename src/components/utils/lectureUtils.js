export const lectureList = [
  { id: 1, title: "영상처리및실습", professor: "박현준" },
  { id: 2, title: "데이터분석과 시각화", professor: "윤병수" },
  { id: 3, title: "네트워크보안", professor: "이광일" },
  { id: 4, title: "캡스톤디자인", professor: "김재훈" },
  { id: 5, title: "비판적사고와 논리", professor: "안현수" },
];

export const findLectureById = (id) => {
  return lectureList.find((lec) => String(lec.id) === String(id));
};
