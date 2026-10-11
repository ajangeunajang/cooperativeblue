'use client'

import { useState } from "react";
import ContactForm from "./contactForm";

export default function Contact() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="pointer-events-auto inline-block pl-10 border-l border-[#00386C] focus:outline-none"
      >
        Contact
      </button>
      {/* 닫아도 입력 내용이 남도록 숨기기만 함
          폼을 드래그로 옮기면 원래 자리는 빈 상자로 남으므로 클릭이 통과하게 함 */}
      <div className={`pointer-events-none ${open ? "" : "hidden"}`}>
        <ContactForm draggable open={open} className="relative z-20 w-72 mt-2 p-3 bg-[#e9e9e9]/50 backdrop-blur-md" />
      </div>
    </>
  );
}
