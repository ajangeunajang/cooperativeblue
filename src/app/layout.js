import { Oswald } from "next/font/google";

import "./globals.css";

const inter = Oswald({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "(cooperative) Blue",
  description: "Design + Graphic + Web",
  keywords: ["장은아", "전시디자인", "전시웹사이트", "전시", "그래픽", "웹개발", "웹", "그래픽디자이너", "그래픽디자인", "공연", "XR", "미디어아트", "AI", "디자인", "도록 디자인", "리플렛디자인", "한국예술종합학교", "디자이너", "협조적블루", "cooperative", "blue", "graphic", "design", "euna", "한예종", "현대무용", "공연", "씨어터", "무용", "퍼포먼스", "시각예술"],
  openGraph: {
    title: "(cooperative) Blue",
    description: "Design + Graphic + Web",
    images: [
      {
        url: "/img/ogimg.png", // 실제 이미지 URL로 변경
        width: 600,
        height: 315,
        alt: "Graphic Design Studio Based in Seoul",
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body
        className={`text-[#00386C] scrollbar-hidden break-keep leading-snug font-[500] font-sans font-pretendard antialiased`}
      >
        {/* 앞에 있는 서체 sans 가 적용됨.. */}
        {children}
      </body>
    </html>
  );
}
