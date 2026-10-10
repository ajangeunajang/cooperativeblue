import Carousel from "./components/carousel";
import Footer from "./components/footer";

export default function Home() {
  return (
    <div className="scrollbar-hidden items-center justify-items-center snap-y snap-mandatory">
      {/* 캐러셀 섹션 */}       
      <Carousel className="snap-end"/>
      <Footer/>
    </div>
  );
}
