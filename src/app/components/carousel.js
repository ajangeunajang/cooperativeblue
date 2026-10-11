"use client";
import { useState } from "react";
import Image from "next/image";
import LazyVideo from "./lazyVideo";

export default function Carousel({ className, projects }) {
  // 프로젝트 하나 = 캐러셀 한 화면
  const images = projects.map((project) => project.media);

  // 각 페이지마다 currentIndex를 따로 관리하도록
  const [currentIndices, setCurrentIndices] = useState(
    new Array(images.length).fill(0)
  );

  const prevSlide = (pageIndex) => {
    setCurrentIndices((prev) => {
      const updated = [...prev];
      updated[pageIndex] =
        updated[pageIndex] === 0
          ? images[pageIndex].length - 1
          : updated[pageIndex] - 1;
      return updated;
    });
  };

  const nextSlide = (pageIndex) => {
    setCurrentIndices((prev) => {
      const updated = [...prev];
      updated[pageIndex] =
        updated[pageIndex] === images[pageIndex].length - 1
          ? 0
          : updated[pageIndex] + 1;
      return updated;
    });
  };

  if (!images || images.length === 0) {
    return <div>No media available</div>;
  }

  return (
    <div
      id="carousel"
      className={`${className} fixed top-0 left-0 scrollbar-hidden relative w-screen h-screen scroll-smooth overflow-x-hidden overflow-y-auto snap-y snap-mandatory`}
      onMouseEnter={() => {
        const target = document.getElementById("carousel");
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }}
    >
      {images.map((page, pageIndex) => (
        <section
          id={pageIndex}
          key={pageIndex}
          className="relative w-full h-screen flex snap-center flex-col"
        >
          {page.map(({ type, url: src, poster }, index) => (
            <div
              key={index}
              className={`absolute w-full h-full flex items-center justify-center transition-opacity ease-in-out ${
                index === currentIndices[pageIndex]
                  ? "opacity-100"
                  : "opacity-0"
              }`}
            >
              {type === "video" ? (
                <LazyVideo
                  className="absolute top-0 left-1/2 -translate-x-1/2 max-w-full max-h-full p-4"
                  src={src}
                  poster={poster}
                  active={index === currentIndices[pageIndex]}
                />
              ) : (
                <Image
                  src={src}
                  fill
                  alt={`${projects[pageIndex].title} ${index + 1}`}
                  className="object-contain object-top p-4"
                />
              )}
            </div>
          ))}

          {/* 이전/다음 버튼 */}
          <button
            onClick={() => prevSlide(pageIndex)}
            className="cursor-arrow-left absolute left-0 top-1/2 transform -translate-y-1/2 z-10 w-[45vw] h-[50vh]"
          ></button>
          <button
            onClick={() => nextSlide(pageIndex)}
            className="cursor-arrow-right absolute right-0 top-1/2 transform -translate-y-1/2 z-10 w-[45vw] h-[50vh]"
          ></button>
        </section>
      ))}
    </div>
  );
}
