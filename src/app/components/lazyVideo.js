"use client";

import { useEffect, useRef, useState } from "react";

// 화면에 보이고(active) 현재 슬라이드일 때만 영상을 내려받아 재생
// → 페이지를 열 때 모든 영상이 한꺼번에 로딩되어 느려지는 것을 방지
export default function LazyVideo({ src, active = true, className = "" }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      rootMargin: "50% 0px", // 화면에 들어오기 조금 전부터 미리 로딩
    });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const shouldPlay = inView && active;

  useEffect(() => {
    const video = ref.current;
    if (shouldPlay) {
      video.preload = "auto";
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [shouldPlay]);

  return (
    <video
      ref={ref}
      className={className}
      src={src}
      loop
      muted
      playsInline
      webkit-playsinline="true"
      disablePictureInPicture
      preload="none"
    />
  );
}
