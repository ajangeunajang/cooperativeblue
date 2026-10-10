'use client'

import { useState } from "react";
import ContactForm from "./contactForm";

export default function Contact() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="inline-block pl-10 border-l border-[#00386C] focus:outline-none"
      >
        Contact
      </button>
      {/* 닫아도 입력 내용이 남도록 숨기기만 함 */}
      <div className={open ? "" : "hidden"}>
        <ContactForm draggable open={open} className="relative z-20 w-72 mt-2 p-3 bg-[#e9e9e9]/50 backdrop-blur-md" />
      </div>
    </>
  );
}
