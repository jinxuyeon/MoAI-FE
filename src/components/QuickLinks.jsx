import "./QuickLinks.css";
import { ExternalLink,ShieldCheck, GraduationCap, Laptop, BookOpen } from "lucide-react";

const links = [
  {
    title: "종정시",
    url: "https://tis.kmou.ac.kr/nxui/index.html",
    icon: <GraduationCap size={28} />,
    className: "jongjeong",
  },
  {
    title: "LMS",
    url: "https://lms.kmou.ac.kr/",
    icon: <Laptop size={28} />,
    className: "lms",
  },
  {
    title: "학교홈페이지",
    url: "https://www.kmou.ac.kr/ca/main.do",
    icon: <ExternalLink size={28} />,
    className: "homepage",
  },
  {
    title: "증명서발급",
    url: "https://kmou.certpia.com/",
    icon: <ShieldCheck size={28} />,
    className: "calendar",
  },
];

const QuickLinks = () => {
  return (
    <div className="QuickLinks">
      {links.map((link, index) => (
        <a
          key={index}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`quick-link ${link.className}`}
        >
          <div className="icon">{link.icon}</div>
          <div className="label">{link.title}</div>
        </a>
      ))}
    </div>
  );
};

export default QuickLinks;
