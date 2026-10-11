import { notFound } from "next/navigation";
import Footer from "../../components/footer";
import ProjectDetail from "../../components/projectDetail";
import { getProject, getProjects } from "../../data/projects";

// Sanity에서 수정하면 60초 안에 반영, 새로 추가한 프로젝트도 바로 열림
export const revalidate = 60;

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const data = await getProject(slug);
  if (!data) return {};
  const { project } = data;
  const cover = project.media.find((m) => m.type === "image")?.url ?? project.media[0].poster;
  const description = project.descriptionEn || project.descriptionKo || undefined;
  return {
    title: `${project.title} — (cooperative) Blue`,
    description,
    openGraph: {
      title: project.title,
      description,
      ...(cover && { images: [{ url: `${cover}?w=1200&h=630&fit=crop&auto=format` }] }),
    },
  };
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const data = await getProject(slug);
  if (!data) notFound();

  // 주소로 바로 들어오거나 새로고침했을 때의 전체 페이지
  return (
    <main className="sheet-up min-h-screen px-4 pt-16 lg:pt-20 pb-16 lg:pb-10 text-[0.8rem]">
      <ProjectDetail {...data} />
      <Footer inline className="mt-10" />
    </main>
  );
}
