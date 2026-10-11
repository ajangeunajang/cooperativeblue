"use client";

import { usePathname, useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { slideClass, useArrivalDirection } from "./pageDirection";

const SheetContext = createContext(null);

// 시트 안에서는 닫기 함수, 일반 페이지에서는 null
export const useSheet = () => useContext(SheetContext);

// Works 목록 위로 아래에서 올라오는 상세 시트. 닫으면 아래로 내려간 뒤 이전 화면(목록)으로
export default function ProjectSheet({ slug, children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [closing, setClosing] = useState(false);
  // 이전/다음으로 넘어온 경우: 시트는 그대로, 내용만 좌우로
  const direction = useArrivalDirection();
  const open = pathname === `/works/${slug}`;
  // 시트를 연 순간의 목록 스크롤 위치 (닫은 뒤 되돌리기)
  const listScroll = useRef(typeof window === "undefined" ? 0 : window.scrollY);

  const closed = useRef(false);

  // 내려가는 모션이 끝나면 목록으로 돌아가고, 원래 스크롤 위치로
  const finishClose = () => {
    if (closed.current) return;
    closed.current = true;
    const y = listScroll.current;
    router.back();
    for (const delay of [0, 50, 150, 300]) setTimeout(() => window.scrollTo(0, y), delay);
  };

  const close = () => {
    setClosing(true);
    // 탭이 백그라운드라 애니메이션이 멈춘 경우 등을 대비
    setTimeout(finishClose, 600);
  };

  // 시트가 열려 있는 동안 뒤의 목록은 스크롤되지 않게
  useEffect(() => {
    if (!open) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // 시트 안에서 이전/다음 프로젝트로 넘기면 시트 내용은 맨 위부터
  const sheetRef = useRef(null);
  useEffect(() => {
    sheetRef.current?.scrollTo(0, 0);
  }, [slug]);

  // 다른 페이지(카테고리 목록 등)로 이동하면 시트는 숨김
  if (!open) return null;

  return (
    <SheetContext.Provider value={close}>
      <div
        ref={sheetRef}
        className={`fixed inset-0 z-[5] overflow-y-auto overflow-x-hidden lg:overflow-hidden bg-[#e9e9e9]/50 backdrop-blur-md ${closing ? "sheet-down" : direction ? "" : "sheet-up"}`}
        onAnimationEnd={(e) => closing && e.target === e.currentTarget && finishClose()}
      >
        <div className={`min-h-full lg:h-full ${slideClass(direction)}`}>{children}</div>
      </div>
    </SheetContext.Provider>
  );
}
