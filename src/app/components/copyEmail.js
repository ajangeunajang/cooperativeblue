'use client'

import { useState } from "react";

const EMAIL = "cooperativeblue@gmail.com";

export default function CopyEmail() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
    } catch {
      // clipboard API가 막힌 환경용 대체 방식
      const textarea = document.createElement("textarea");
      textarea.value = EMAIL;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      textarea.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button onClick={copy} className="block text-left focus:outline-none">
      <span className="font-[Inter]">↗</span> {copied ? <span className="text-[#8A8A8A]">copied!</span> : EMAIL}
    </button>
  );
}
