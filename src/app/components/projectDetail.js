import Link from "next/link";
import { CATEGORY_LABELS } from "../data/projects";
import BackToWorks from "./backToWorks";
import Footer from "./footer";
import { DirectionLink } from "./pageDirection";
import ProjectCarousel from "./projectCarousel";

// 프로젝트 상세 내용 (전체 페이지와 Works 위 시트에서 함께 사용)
// inSheet: 시트 안에서는 이전/다음 이동이 기록을 쌓지 않아 닫으면 바로 목록으로
//          전체 페이지에서는 일반 페이지 이동
export default function ProjectDetail({ project, prev, next, inSheet = false }) {
  // 클라이언트 작업은 클라이언트명, 전시는 전시명, 개인 작업은 "Personal work"
  const credit =
    project.kind === "personal"
      ? "Personal work"
      : project.kind === "exhibition"
        ? project.exhibition
        : project.client;

  return (
    // 데스크톱: 스크롤 없이 한 화면에 (왼쪽 정보 / 오른쪽 캐러셀), 모바일: 위아래로 쌓고 스크롤
    <div className="lg:h-full lg:grid lg:grid-cols-[15rem_1fr] lg:grid-rows-[1fr_auto] lg:gap-x-12">
      {/* 프로젝트 정보: 설명이 길면 이 영역 안에서만 스크롤 */}
      <aside className="mb-10 lg:mb-0 lg:col-start-1 lg:row-start-1 lg:min-h-0 lg:overflow-y-auto scrollbar-hidden">
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

      {/* 미디어: Sanity에서 정한 순서대로 캐러셀 (남은 높이를 꽉 채움) */}
      <div className="lg:col-start-2 lg:row-start-1 lg:min-h-0">
        <ProjectCarousel media={project.media} title={project.title} />
      </div>

      {/* 이전(왼쪽 끝) / 다음(오른쪽 끝) 프로젝트 + 푸터: 화면 맨 아래 한 줄 */}
      <div className="mt-10 lg:mt-6 lg:col-span-2 lg:row-start-2">
        <nav className="flex justify-between gap-6">
          {prev ? (
            <DirectionLink direction="prev" hard={!inSheet} href={`/works/${prev.slug}`}>
              <span className="font-[Inter]">←</span> {prev.title}
            </DirectionLink>
          ) : (
            <span />
          )}
          {next && (
            <DirectionLink direction="next" hard={!inSheet} href={`/works/${next.slug}`} className="text-right">
              {next.title} <span className="font-[Inter]">→</span>
            </DirectionLink>
          )}
        </nav>
        <Footer inline className="mt-2" />
      </div>
    </div>
  );
}
