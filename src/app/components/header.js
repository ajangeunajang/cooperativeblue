"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  return (
    <Link
      href="/"
      className="w-full flex justify-center"
      onClick={(e) => {
        // 메인에서는 페이지 이동 대신 첫 작품으로 부드럽게 스크롤
        if (pathname !== "/") return;
        e.preventDefault();
        const carousel = document.getElementById("0");
        if (carousel) {
          carousel.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }}
    >
      <Image
        src="/img/logo.svg"
        width={300}
        height={100}
        alt="Logo"
        className="fixed top-0 z-10"
        priority
      />
    </Link>
  );
}
