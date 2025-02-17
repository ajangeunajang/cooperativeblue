"use client";
import { useState } from "react";
import Image from "next/image";

export default function Carousel({ className }) {
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
      "/img/brachiation/Wall_Final.png",
    ],
    ["/img/brachiation/Webflyer.gif"],
    ["/img/rapunzels/motionposter.mp4", "/img/rapunzels/photocall.jpg"],
    ["/img/rapunzels/insta.png", "/img/rapunzels/funding.mp4"],

    ["/img/haters/포토콜.jpg", "/img/haters/webflyer.gif"],
    [
      "/img/theory/posterA.jpg",
      "/img/theory/mockup.jpg",
      "/img/theory/posterB.jpg",
    ],
    [
      "/img/kartsdesign/identity.jpg",
      "/img/kartsdesign/identity2.jpg",
      "/img/kartsdesign/identity3.jpg",
      "/img/kartsdesign/identity4.jpg",
      "/img/kartsdesign/identity5.jpg",
      "/img/kartsdesign/identity6.jpg",
      "/img/kartsdesign/identity7.jpg",
      "/img/kartsdesign/identity8.jpg",
      "/img/kartsdesign/identity9.jpg",
      "/img/kartsdesign/identity10.jpg",
      "/img/kartsdesign/2 mobile_fin.mp4",
    ],
    ["/img/kartsdesign/kartscatalog.png"],
    [
      "/img/blues/231014A7403614.jpg",
      "/img/blues/230923A7402425.jpg",
      "/img/blues/img001.jpg",
      "/img/blues/img006.jpg",
      "/img/blues/img007.jpg",
      "/img/blues/img010.jpg",
      "/img/blues/img011.jpg",
      "/img/blues/img014.jpg",
      "/img/blues/img017.jpg",
      "/img/blues/img023.jpg",
    ],
    [
      "/img/newskarts/1.png",
      "/img/newskarts/2.png",
      "/img/newskarts/3.png",
      "/img/newskarts/4.png",
      "/img/newskarts/5.png",
      "/img/newskarts/6.png",
      "/img/newskarts/7.png",
    ],
    [
      "/img/spacefigure/1.png",
      "/img/spacefigure/2.png",
      "/img/spacefigure/3.png",
      "/img/spacefigure/4.png",
      "/img/spacefigure/5.png",
      "/img/spacefigure/6.png",
    ],
    ["/img/1010/poster1.png", "/img/1010/poster2.png", "/img/1010/1010.jpg",],
    ["/img/1010/card.png",],
    ["/img/fd/find/8.jpg", "/img/fd/find/8-1.jpg",],
    ["/img/fd/find/find_22.png", "/img/fd/find/find_24.png", "/img/fd/find/find_82.png"],
    ["/img/fd/factory.mp4"],
    ["/img/fd/yes24/93/01.png", "/img/fd/yes24/93/15.png", "/img/fd/yes24/93/16.png", "/img/fd/yes24/93/20.png", "/img/fd/yes24/93/21.png", "/img/fd/yes24/93/14.png",],
    ["/img/fd/tomato.mp4"],
    ["/img/fd/yes24/92/01.png", "/img/fd/yes24/92/10.png", "/img/fd/yes24/92/15.png", "/img/fd/yes24/92/19.png", "/img/fd/yes24/92/20.png", "/img/fd/yes24/92/21.png", "/img/fd/yes24/92/23.png",],
    ["/img/100films100posters/2020-37.jpg"],

  ];

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
          {page.map((src, index) => (
            <div
              key={index}
              className={`absolute w-full h-full flex items-center justify-center transition-opacity ease-in-out ${
                index === currentIndices[pageIndex]
                  ? "opacity-100"
                  : "opacity-0"
              }`}
            >
              {src.endsWith(".mp4") ? (
                <video
                  className="absolute top-0 left-1/2 -translate-x-1/2 max-w-full max-h-full p-4"
                  src={src}
                  autoPlay
                  loop
                  muted
                  disablePictureInPicture
                  playsInline
                  webkit-playsinline
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
