import ProjectDetail from "../../../components/projectDetail";
import ProjectSheet from "../../../components/projectSheet";
import { getProject } from "../../../data/projects";

// Works 목록에서 썸네일을 누르면 목록 위에 시트로 열림 (/works/[slug] 가로채기)
export default async function ProjectSheetPage({ params }) {
  const { slug } = await params;
  const data = await getProject(slug);
  if (!data) return null;

  return (
    <ProjectSheet key={slug} slug={slug}>
      <div className="min-h-full lg:h-full px-4 pt-16 lg:pt-20 pb-16 lg:pb-6 text-[0.8rem]">
        <ProjectDetail {...data} inSheet />
      </div>
    </ProjectSheet>
  );
}
