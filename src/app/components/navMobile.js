'use client'

import { useState } from "react";
import Link from "next/link";
import CopyEmail from "./copyEmail";
import ContactForm from "./contactForm";

export default function NavMobile() {
  const [active, setActive] = useState(null);

  const toggleContent = (section) => {
    setActive(active === section ? null : section);
  };

  return (
    <ol className="lg:hidden w-screen h-screen fixed z-20 pointer-events-none text-[0.8rem]">
      <li className="fixed bottom-0 pointer-events-auto pl-4 z-20">
        <div>
          {active === "contact" && (
            <ContactForm className="fixed inset-x-0 top-0 bottom-[1lh] overflow-y-auto p-4 bg-[#e9e9e9]/50 backdrop-blur-md" />
          )}
          <button
            onClick={() => toggleContent("contact")}
            className="z-2 pl-8 border-l border-[#00386C] focus:outline-none"
          >
            Contact
          </button>
        </div>
      </li>
      <li className="fixed bottom-0 pointer-events-auto left-[35%] z-3">
        {active === "about" && (
          <div className="opacity-100 transition-opacity duration-500">
            <p className="whitespace-nowrap">
              Graphic + Web + Design
              <br />
              based in Seoul and Daejeon, KR
            </p>
            <div className="mt-[1lh] whitespace-nowrap">
              <CopyEmail />
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
      <li className="fixed bottom-0 pointer-events-auto right-0 pr-4 z-4">
        <Link href='/index' className="pl-8 border-l border-[#00386C]">Index</Link>
      </li>
    </ol>
  );
}
