import Carousel from "./components/carousel";
import Footer from "./components/footer";
import { getProjects } from "./data/projects";

export default async function Home() {
  const projects = await getProjects();

  return (
    <div className="scrollbar-hidden items-center justify-items-center snap-y snap-mandatory">
      {/* 캐러셀 섹션 */}       
      <Carousel className="snap-end" projects={projects} />
      <Footer/>
    </div>
  );
}
