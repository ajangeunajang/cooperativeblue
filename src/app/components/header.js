"use client";

import Image from "next/image";

export default function Header() {
  return (
    <a
      href="#"
      className="w-full flex justify-center"
      onClick={(e) => {
        e.preventDefault(); // 기본 동작인 페이지 리로드를 방지
        const carousel = document.getElementById("0"); // 아이디가 'carousel'인 요소 선택
        if (carousel) {
          carousel.scrollIntoView({
            behavior: "smooth", // 부드럽게 스크롤
            block: "start", // 해당 요소의 상단으로 맞춰서 스크롤
          });
        }
      }}
    >
      <Image
        src="/img/logo.svg"
        width={300}
        height={100}
        alt="Logo"
        className="fixed top-0"
      />
    </a>
  );
}
