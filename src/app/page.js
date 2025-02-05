import Nav from "./components/nav";
import NavMobile from "./components/navMobile";
import Carousel from "./components/carousel";
import Header from "./components/header";
import Footer from "./components/footer";

export default function Home() {
  return (
    <div className="scrollbar-hidden items-center justify-items-center">
      {/* 캐러셀 섹션 */}       
      <Carousel/>
      <Header />
      <Footer />
      <Nav />
      <NavMobile />
    </div>
  );
}
