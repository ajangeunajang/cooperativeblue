// Sanity(편집: https://cooperativeblue.sanity.studio)에서 프로젝트를 읽어옴
// 편집 후 최대 60초 안에 사이트에 반영 (재배포 불필요)

const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

// 프로젝트 목록에서 끌어서 정한 순서(orderRank)대로
const QUERY = `*[_type == "project" && defined(slug.current)] | order(orderRank) {
  "slug": slug.current,
  title,
  client,
  year,
  category,
  descriptionKo,
  descriptionEn,
  "media": media[] {
    "type": _type,
    "url": select(_type == "video" => file.asset->url, asset->url),
    "poster": poster.asset->url
  }
}`;

export async function getProjects() {
  // Sanity CDN(apicdn)은 수정 후에도 예전 응답을 한동안 줄 수 있어 실시간 API 사용
  // (Next가 60초 캐시하므로 요청은 많아야 1분에 한 번)
  const url = `https://${PROJECT_ID}.api.sanity.io/v2025-01-01/data/query/${DATASET}?query=${encodeURIComponent(QUERY)}`;
  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error(`Sanity query failed: ${res.status}`);
  const { result } = await res.json();
  // 미디어가 없는 프로젝트는 화면에 낼 수 없으니 제외
  return result.filter((project) => project.media?.length);
}
