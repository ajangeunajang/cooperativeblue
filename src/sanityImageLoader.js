// next/image 크기 조절을 Sanity 이미지 CDN에 맡김 (Vercel 이미지 최적화 사용 안 함)
// 로컬 파일(/img/logo.svg 등)은 그대로 사용
export default function sanityImageLoader({ src, width, quality }) {
  if (!src.startsWith("https://cdn.sanity.io/")) return src;
  // gif는 변환하면 움직임이 사라지므로 원본 그대로
  if (src.endsWith(".gif")) return src;
  const url = new URL(src);
  url.searchParams.set("w", String(width));
  url.searchParams.set("q", String(quality || 75));
  url.searchParams.set("auto", "format");
  url.searchParams.set("fit", "max");
  return url.toString();
}
