'use client'

import { useState } from "react";
import Link from "next/link";

export default function NavMobile() {
  const [active, setActive] = useState(null);

  const toggleContent = (section) => {
    setActive(active === section ? null : section);
  };

  return (
    <ol className="md:hidden w-screen h-screen fixed text-[0.8rem]">
      <li className="fixed bottom-0 pl-4">
        <div>
          {active === "contact" && (
            <div className="opacity-100 transition-opacity duration-500">
              <a href="mailto:cooperativeblue@gmail.com" className="block">
                cooperativeblue@gmail.com
              </a>
              <Link href="https://www.instagram.com/ajangeunajang/" passHref>
                instagram
              </Link>
            </div>
          )}
          <button
            onClick={() => toggleContent("contact")}
            className="z-2 pl-8 border-l-[1.5px] border-[#00386C] focus:outline-none"
          >
            Contact
          </button>
        </div>
      </li>
      <li className="fixed bottom-0 left-[35%] z-3">
        {active === "about" && (
          <div className="opacity-100 transition-opacity duration-500">
            <p>
              협조적 블루는 그래픽 디자인과 웹 퍼블리싱을 합니다. 다양한 매체를
              통해 가치있는 이야기를 전달합니다.
            </p>
            <p>
              cooperative Blue specializes in graphic design and web publishing.
              They convey valuable stories through various media.
            </p>
          </div>
        )}
        <button
          onClick={() => toggleContent("about")}
          className="pl-8 border-l-[1.5px] border-[#00386C] focus:outline-none"
        >
          About
        </button>
      </li>
      <li className="fixed bottom-0 right-4 z-4">
        <Link href='/index' className="pl-8 border-l-[1.5px] border-[#00386C]">Index</Link>
      </li>
    </ol>
  );
}
