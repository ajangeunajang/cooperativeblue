import Image from "next/image";
import Link from "next/link";
import Footer from "../components/footer";
import LazyVideo from "../components/lazyVideo";
import { getProjects } from "../data/projects";

export const metadata = {
  title: "Works — (cooperative) Blue",
};

export default async function WorksPage() {
  // 프로젝트마다 첫 이미지(대표 이미지)만, 누르면 메인 화면의 해당 프로젝트로 이동
  const projects = await getProjects();
  const items = projects.map((project, pageIndex) => ({
    type: project.media[0].type,
    src: project.media[0].url,
    poster: project.media[0].poster,
    title: project.title,
    pageIndex,
  }));

  return (
    <main className="min-h-screen px-4 pt-16 lg:pt-20 pb-16 lg:pb-10">
      <ul className="columns-2 md:columns-3 lg:columns-4 gap-10 lg:gap-32">
        {items.map(({ type, src, poster, title, pageIndex }) => (
          <li key={src} className="break-inside-avoid mb-10 lg:mb-32">
            <Link href={`/#${pageIndex}`} className="block">
              {type === "video" ? (
                <LazyVideo src={src} poster={poster} className="w-full h-auto" />
              ) : (
                // 원본 비율 유지: width/height 0 + w-full h-auto
                <Image
                  src={src}
                  width={0}
                  height={0}
                  alt={title}
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                  className="w-full h-auto"
                />
              )}
            </Link>
          </li>
        ))}
      </ul>

      <Footer inline className="mt-10" />
    </main>
  );
}
