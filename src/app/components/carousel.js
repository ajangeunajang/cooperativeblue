"use client";
import { useState } from "react";
import Image from "next/image";

export default function Carousel() {
  const images = [
    [
      "/img/swiss/SWISS_XR-18.jpg",
      "/img/swiss/Emotions at Play poster.jpg",
      "/img/swiss/SWISS_XR-10.jpg",
    ],
    [
      "/img/swiss/web/Emotions at Play- web.mp4",
      "/img/swiss/web/Emotions at Play- mobile ver.mp4",
    ],
    [
      "/img/brachiation/brachiation_poster.png",
      "/img/brachiation/Webflyer.gif",
      "/img/brachiation/Wall_Final.png",
    ],
    ["/img/rapunzels/motionposter.mp4",],
  ];

  // 각 페이지마다 currentIndex를 따로 관리하도록
  const [currentIndices, setCurrentIndices] = useState(
    new Array(images.length).fill(0)
  );

  const prevSlide = (pageIndex) => {
    setCurrentIndices((prev) => {
      const updated = [...prev];
      updated[pageIndex] = updated[pageIndex] === 0 ? images[pageIndex].length - 1 : updated[pageIndex] - 1;
      return updated;
    });
  };

  const nextSlide = (pageIndex) => {
    setCurrentIndices((prev) => {
      const updated = [...prev];
      updated[pageIndex] = updated[pageIndex] === images[pageIndex].length - 1 ? 0 : updated[pageIndex] + 1;
      return updated;
    });
  };

  if (!images || images.length === 0) {
    return <div>No media available</div>;
  }

  return (
    <div className="scrollbar-hidden relative w-screen h-screen scroll-smooth overflow-x-hidden overflow-y-auto snap-y snap-mandatory">
      {images.map((page, pageIndex) => (
        <section key={pageIndex} className="relative w-full h-screen flex snap-center flex-col">
          {page.map((src, index) => (
            <div
              key={index}
              className={`absolute w-full h-full flex items-center justify-center transition-opacity ease-in-out ${
                index === currentIndices[pageIndex] ? "opacity-100" : "opacity-0"
              }`}
            >
              {src.endsWith(".mp4") ? (
                <video
                  className="absolute top-0 left-1/2 -translate-x-1/2 max-w-full max-h-full p-4"
                  src={src}
                  autoPlay
                  loop
                  muted
                ></video>
              ) : (
                <Image
                  src={src}
                  fill
                  alt={`swiss-${index}`}
                  className="object-contain object-top p-4"
                />
              )}
            </div>
          ))}

          {/* 이전/다음 버튼 */}
          <button
            onClick={() => prevSlide(pageIndex)}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 w-[45vw] h-[50vh]"
            style={{
              cursor: "url('/img/left.png') 16 16, pointer",
            }}
          ></button>
          <button
            onClick={() => nextSlide(pageIndex)}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 w-[45vw] h-[50vh]"
            style={{
              cursor: "url('/img/right.png') 16 16, pointer",
            }}
          ></button>

        </section>
      ))}
    </div>
  );
}
