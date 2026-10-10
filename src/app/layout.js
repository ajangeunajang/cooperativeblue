import { Xanh_Mono } from "next/font/google";

import "./globals.css";
import Header from "./components/header";
import Nav from "./components/nav";
import NavMobile from "./components/navMobile";

const xanhMono = Xanh_Mono({
  variable: "--font-xanh-mono",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
});

// 입력칸 포커스 시 iOS 자동 확대 방지 (iOS는 손가락 확대는 계속 허용)
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata = {
  metadataBase: new URL("https://www.cooperativeblue.kr"),
  title: "(cooperative) Blue",
  description: "Design + Graphic + Web",
  keywords: ["장은아", "전시디자인", "전시웹사이트", "전시", "그래픽", "웹개발", "웹", "그래픽디자이너", "그래픽디자인", "공연", "XR", "미디어아트", "AI", "디자인", "도록 디자인", "리플렛디자인", "한국예술종합학교", "디자이너", "협조적블루", "cooperative", "blue", "graphic", "design", "euna", "한예종", "현대무용", "공연", "씨어터", "무용", "퍼포먼스", "시각예술"],
  openGraph: {
    title: "(cooperative) Blue",
    description: "Design + Graphic + Web",
    images: [
      {
        url: "/img/og.jpg",
        width: 1200,
        height: 630,
        alt: "(cooperative) Blue — Graphic & Web Design Studio based in Seoul & Daejeon",
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko" className={xanhMono.variable}>
      <body
        className={`text-[#00386C] scrollbar-hidden break-keep leading-snug font-[500] font-sans font-pretendard antialiased`}
      >
        {/* 앞에 있는 서체 sans 가 적용됨.. */}
        {children}
        {/* 페이지를 이동해도 유지되도록 공통 레이아웃에 둠 (Contact 폼 상태 포함) */}
        <Header />
        <Nav />
        <NavMobile />
      </body>
    </html>
  );
}
