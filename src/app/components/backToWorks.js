"use client";

import Link from "next/link";
import { useSheet } from "./projectSheet";

// 상세 → Works: 시트면 내려가며 닫히고, 일반 페이지면 Works로 이동
export default function BackToWorks({ className = "" }) {
  const closeSheet = useSheet();
  const label = (
    <>
      <span className="font-[Inter]">←</span> Works
    </>
  );
  return closeSheet ? (
    <button onClick={closeSheet} className={className}>
      {label}
    </button>
  ) : (
    <Link href="/works" className={className}>
      {label}
    </Link>
  );
}
