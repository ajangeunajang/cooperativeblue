"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import LazyVideo from "./lazyVideo";

// 상세 페이지 미디어 캐러셀: 왼쪽 절반 클릭 = 이전, 오른쪽 절반 = 다음 (키보드 ←/→도 가능)
export default function ProjectCarousel({ media, title }) {
  const [current, setCurrent] = useState(0);
  const count = media.length;
  const go = (step) => setCurrent((i) => (i + step + count) % count);

  useEffect(() => {
    const onKey = (e) => {
      if (e.target.closest?.("input, textarea")) return;
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [count]);

  return (
    <div className="lg:h-full lg:flex lg:flex-col">
      <div className="relative w-full h-[70vh] lg:h-auto lg:flex-1 lg:min-h-0">
        {media.map((m, index) => (
          <div
            key={m.url}
            className={`absolute inset-0 transition-opacity ease-in-out ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden={index !== current}
          >
            {m.type === "video" ? (
              <LazyVideo
                src={m.url}
                poster={m.poster}
                active={index === current}
                className="w-full h-full object-contain object-top"
              />
            ) : (
              <Image
                src={m.url}
                fill
                alt={`${title} ${index + 1}`}
                sizes="(min-width: 1024px) 80vw, 100vw"
                className="object-contain object-top"
                priority={index === 0}
              />
            )}
          </div>
        ))}

        {count > 1 && (
          <>
            <button
              onClick={() => go(-1)}
              aria-label="Previous image"
              className="cursor-arrow-left absolute left-0 top-0 w-1/2 h-full z-10"
            />
            <button
              onClick={() => go(1)}
              aria-label="Next image"
              className="cursor-arrow-right absolute right-0 top-0 w-1/2 h-full z-10"
            />
          </>
        )}
      </div>

      {count > 1 && (
        <p className="mt-3">
          {current + 1} / {count}
        </p>
      )}
    </div>
  );
}
