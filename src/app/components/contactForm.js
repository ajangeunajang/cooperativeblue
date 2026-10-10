'use client'

import { useState } from "react";

// web3forms.com 에서 cooperativeblue@gmail.com 으로 발급받은 Access Key
const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

const inputClass =
  "w-full bg-transparent border-b border-[#00386C] py-1 placeholder:text-[#00386C]/50 focus:outline-none rounded-none";

export default function ContactForm({ className = "" }) {
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    const formData = new FormData(e.target);
    formData.append("access_key", ACCESS_KEY);
    formData.append("subject", `[프로젝트 문의] ${formData.get("name")}`);
    formData.append("from_name", "cooperative Blue website");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      setStatus("sent");
      e.target.reset();
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className={className}>
        <p>Thank you. We&apos;ll get back to you soon.</p>
        <button onClick={() => setStatus("idle")} className="mt-[1lh] underline">
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className={`flex flex-col gap-2 ${className}`}>
      <p className="mb-2">Project Inquiry</p>
      <input name="name" required placeholder="Name *" className={inputClass} />
      <input name="company" placeholder="Company" className={inputClass} />
      <input name="email" type="email" required placeholder="Email *" className={inputClass} />
      <input name="budget" required placeholder="Budget *" className={inputClass} />
      <input name="schedule" placeholder="Timeline" className={inputClass} />
      <input name="link" type="url" placeholder="Reference link (Drive, WeTransfer…)" className={inputClass} />
      <textarea name="message" required rows={4} placeholder="Message *" className={`${inputClass} resize-none`} />
      {/* 스팸 방지용 숨김 필드 */}
      <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />
      <button
        type="submit"
        disabled={status === "sending"}
        className="self-start mt-2 disabled:opacity-50"
      >
        <span className="font-[Inter]">↗</span> {status === "sending" ? "Sending…" : "Send"}
      </button>
      {status === "error" && (
        <p className="text-[#8A8A8A]">Failed to send. Please email cooperativeblue@gmail.com</p>
      )}
    </form>
  );
}
