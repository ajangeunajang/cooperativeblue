"use client";
import { useEffect, useRef, useState } from "react";

export default function Footer({ className }) {
  const footerRef = useRef(null);
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setFooterVisible(true);
        }
      },
      { threshold: 0.5 } // footer가 50% 이상 보일 때 감지
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (footerVisible) {
      const timeout = setTimeout(() => {
        const target = document.getElementById("carousel");
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 2000);
    //   2초 후 id 0인 테그 상단 위치

      return () => clearTimeout(timeout);
    }
  }, [footerVisible]);

  return (
    <footer ref={footerRef} className={`${className} absolute top-[100%] left-0 text-[0.8rem] p-4 w-full`}>
      © 2023 Cooperative Blue. All rights reserved.
    </footer>
  );
}
