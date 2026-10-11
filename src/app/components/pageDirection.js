"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

// 이전/다음 프로젝트 링크를 눌렀을 때 방향을 다음 화면에 전달 (좌우 슬라이드용)
// 시트 안 이동은 메모리로, 전체 페이지 이동(새로고침)은 sessionStorage로 전달
const KEY = "detail-direction";
let pending = null;

const readStored = () => {
  try {
    return sessionStorage.getItem(KEY);
  } catch {
    return null;
  }
};

// 새 상세 화면이 처음 그려질 때 방향을 읽음 ("prev" | "next" | null)
export function useArrivalDirection() {
  const [direction, setDirection] = useState(() => pending);
  useEffect(() => {
    if (!pending) {
      const stored = readStored();
      if (stored) setDirection(stored);
    }
    pending = null;
    try {
      sessionStorage.removeItem(KEY);
    } catch {}
  }, []);
  return direction;
}

export const slideClass = (direction) =>
  direction === "next" ? "slide-from-right" : direction === "prev" ? "slide-from-left" : "";

// hard: 전체 상세 페이지에서는 일반 이동 (Works 시트 가로채기를 피함)
export function DirectionLink({ direction, hard = false, href, children, className }) {
  if (hard) {
    return (
      <a
        href={href}
        className={className}
        onClick={() => {
          try {
            sessionStorage.setItem(KEY, direction);
          } catch {}
        }}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} replace scroll={false} className={className} onClick={() => (pending = direction)}>
      {children}
    </Link>
  );
}

// 주소로 바로 들어온 전체 상세 페이지: 처음엔 아래에서 올라오고, 이전/다음으로 오면 좌우로
export function DetailPageMotion({ className = "", children }) {
  const direction = useArrivalDirection();
  return (
    <main className={`${direction ? slideClass(direction) : "sheet-up"} ${className}`} suppressHydrationWarning>
      {/* 새로고침으로 넘어온 경우, 첫 화면이 그려지기 전에 모션 방향을 바로 적용 */}
      <script
        dangerouslySetInnerHTML={{
          __html: `try{var d=sessionStorage.getItem("${KEY}");if(d){var m=document.currentScript.parentElement;m.classList.remove("sheet-up");m.classList.add(d==="next"?"slide-from-right":"slide-from-left")}}catch(e){}`,
        }}
      />
      {children}
    </main>
  );
}
