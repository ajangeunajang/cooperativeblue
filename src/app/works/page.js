import Image from "next/image";
import Link from "next/link";
import Footer from "../components/footer";
import LazyVideo from "../components/lazyVideo";
import { CATEGORY_LABELS, getProjects } from "../data/projects";

export const metadata = {
  title: "Works — (cooperative) Blue",
};

export default async function WorksPage({ searchParams }) {
  // ?category=graphic 이면 해당 카테고리 프로젝트만 (상세 페이지의 키워드 링크)
  const { category } = await searchParams;
  const activeCategory = CATEGORY_LABELS[category] ? category : null;

  // 프로젝트마다 'Works에 보이기'를 체크한 미디어(없으면 첫 번째), 누르면 프로젝트 상세 페이지로
  const projects = (await getProjects()).filter(
    (project) => !activeCategory || project.category?.includes(activeCategory)
  );
  const items = projects.flatMap((project) => {
    const featured = project.media.filter((m) => m.featured);
    return (featured.length ? featured : [project.media[0]]).map((m) => ({
      type: m.type,
      src: m.url,
      poster: m.poster,
      width: m.width,
      height: m.height,
      title: project.title,
      slug: project.slug,
    }));
  });

  return (
    <main className="min-h-screen px-4 pt-16 lg:pt-20 pb-16 lg:pb-10">
      {activeCategory && (
        <p className="mb-10 text-[0.8rem]">
          {CATEGORY_LABELS[activeCategory]}{" "}
          <Link href="/works" className="text-[#00386C]/50">
            × All works
          </Link>
        </p>
      )}
      <ul className="columns-2 md:columns-3 lg:columns-4 gap-10 lg:gap-32">
        {items.map(({ type, src, poster, width, height, title, slug }) => (
          <li key={src} className="break-inside-avoid mb-10 lg:mb-32">
            {/* scroll={false}: 시트가 화면 아래에서 올라오는 동안 목록 스크롤이 움직이지 않게 */}
            <Link href={`/works/${slug}`} scroll={false} className="block">
              {type === "video" ? (
                <LazyVideo src={src} poster={poster} width={width} height={height} className="w-full h-auto" />
              ) : (
                // 원본 크기로 자리를 미리 잡고 화면 폭에 맞춤
                <Image
                  src={src}
                  width={width ?? 0}
                  height={height ?? 0}
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
