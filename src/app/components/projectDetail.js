import Link from "next/link";
import { CATEGORY_LABELS } from "../data/projects";
import BackToWorks from "./backToWorks";
import ProjectCarousel from "./projectCarousel";

// 프로젝트 상세 내용 (전체 페이지와 Works 위 시트에서 함께 사용)
// inSheet: 시트 안에서는 이전/다음 이동이 기록을 쌓지 않아 닫으면 바로 목록으로
export default function ProjectDetail({ project, prev, next, inSheet = false }) {
  // 클라이언트 작업은 클라이언트명, 전시는 전시명, 개인 작업은 "Personal work"
  const credit =
    project.kind === "personal"
      ? "Personal work"
      : project.kind === "exhibition"
        ? project.exhibition
        : project.client;

  return (
    <div className="lg:grid lg:grid-cols-[15rem_1fr] lg:gap-12">
      {/* 프로젝트 정보: 데스크톱에서는 스크롤해도 왼쪽에 고정 */}
      <aside className="lg:sticky lg:top-20 self-start mb-10 lg:mb-0">
        <h1 className="mb-6">{project.title}</h1>
        <div className="mb-6">
          {credit && <p>{credit}</p>}
          {project.year && <p>{project.year}</p>}
        </div>
        {/* 카테고리: 누르면 Works에서 해당 카테고리만 */}
        {project.category?.length > 0 && (
          <ul className="mb-6 flex flex-wrap gap-x-3">
            {project.category.map((c) => (
              <li key={c}>
                <Link href={`/works?category=${c}`}>
                  {CATEGORY_LABELS[c] ?? c} <span className="font-[Inter]">↗</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
        {project.descriptionKo && <p className="mb-4 whitespace-pre-line">{project.descriptionKo}</p>}
        {project.descriptionEn && <p className="mb-4 whitespace-pre-line">{project.descriptionEn}</p>}
        <BackToWorks className="inline-block mt-4" />
      </aside>

      {/* 미디어: Sanity에서 정한 순서대로 캐러셀 */}
      <div className="flex flex-col gap-10 lg:gap-16">
        <ProjectCarousel media={project.media} title={project.title} />

        {/* 이전 / 다음 프로젝트 */}
        <nav className="flex justify-between gap-4 pt-6">
          {prev ? (
            <Link href={`/works/${prev.slug}`} replace={inSheet}>
              <span className="font-[Inter]">←</span> {prev.title}
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link href={`/works/${next.slug}`} replace={inSheet} className="text-right">
              {next.title} <span className="font-[Inter]">→</span>
            </Link>
          )}
        </nav>
      </div>
    </div>
  );
}
