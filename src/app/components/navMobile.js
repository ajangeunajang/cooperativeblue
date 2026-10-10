'use client'

import { useState } from "react";
import Link from "next/link";

export default function NavMobile() {
  const [active, setActive] = useState(null);

  const toggleContent = (section) => {
    setActive(active === section ? null : section);
  };

  return (
    <ol className="lg:hidden w-screen h-screen fixed text-[0.8rem]">
      <li className="fixed bottom-0 pl-4">
        <div>
          <button
            onClick={() => toggleContent("contact")}
            className="z-2 pl-8 border-l border-[#00386C] focus:outline-none"
          >
            Contact
          </button>
        </div>
      </li>
      <li className="fixed bottom-0 left-[35%] z-3">
        {active === "about" && (
          <div className="opacity-100 transition-opacity duration-500">
            <p>Graphic + Web + Design</p>
            <div className="mt-[1lh] whitespace-nowrap">
              <a href="mailto:cooperativeblue@gmail.com" className="block">
                <span className="font-[Inter]">↗</span> cooperativeblue@gmail.com
              </a>
              <Link href="https://www.instagram.com/ajangeunajang/" passHref>
                <span className="font-[Inter]">↗</span> instagram
              </Link>
            </div>
          </div>
        )}
        <button
          onClick={() => toggleContent("about")}
          className="pl-8 border-l border-[#00386C] focus:outline-none"
        >
          About
        </button>
      </li>
      <li className="fixed bottom-0 right-0 pr-4 z-4">
        <Link href='/index' className="pl-8 border-l border-[#00386C]">Index</Link>
      </li>
    </ol>
  );
}
