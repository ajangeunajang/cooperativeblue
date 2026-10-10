import Image from "next/image";
import Link from "next/link";
import { works } from "../data/works";

export const metadata = {
  title: "Index — (cooperative) Blue",
};

export default function IndexPage() {
  // 프로젝트마다 첫 이미지(대표 이미지)만, 누르면 메인 화면의 해당 프로젝트로 이동
  const items = works.map((page, pageIndex) => ({ src: page[0], pageIndex }));

  return (
    <main className="min-h-screen px-4 pt-16 pb-16 lg:pb-8">
      <ul className="columns-2 md:columns-3 lg:columns-5 gap-2 lg:gap-4">
        {items.map(({ src, pageIndex }) => (
          <li key={src} className="break-inside-avoid mb-2 lg:mb-4">
            <Link href={`/#${pageIndex}`} className="block">
              {src.endsWith(".mp4") ? (
                <video
                  src={src}
                  className="w-full h-auto"
                  autoPlay
                  loop
                  muted
                  playsInline
                  disablePictureInPicture
                  preload="metadata"
                />
              ) : (
                // 원본 비율 유지: width/height 0 + w-full h-auto
                <Image
                  src={src}
                  width={0}
                  height={0}
                  alt=""
                  sizes="(min-width: 1024px) 20vw, (min-width: 768px) 33vw, 50vw"
                  className="w-full h-auto"
                />
              )}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
