import Image from "next/image";
import Nav from "./components/nav";
import NavMobile from "./components/navMobile";
import Carousel from "./components/carousel";

export default function Home() {
  return (
    <div className="scrollbar-hidden items-center justify-items-center">
      {/* 캐러셀 섹션 */}       
          <Carousel/>
      

      {/* 로고 & 네비게이션 */}
      <a href="#" className="w-full flex justify-center">
        <Image
          src="/img/logo.svg"
          width={300}
          height={100}
          alt="Logo"
          className="fixed top-0"
        />
      </a>
      <Nav />
      <NavMobile />
    </div>
  );
}
