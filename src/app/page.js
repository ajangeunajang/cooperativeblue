import Nav from "./components/nav";
import NavMobile from "./components/navMobile";
import Carousel from "./components/carousel";
import Header from "./components/header";

export default function Home() {
  return (
    <div className="scrollbar-hidden items-center justify-items-center">
      {/* 캐러셀 섹션 */}       
      <Carousel/>
      <Header />
      <footer className="text-[0.8rem] p-4 w-full">
        © 2023 Cooperative Blue. All rights reserved.
      </footer>
      <Nav />
      <NavMobile />
    </div>
  );
}
