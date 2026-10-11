'use client'

import { useEffect, useRef, useState } from "react";

const MAX_FILE_SIZE = 4 * 1024 * 1024;

// iOS는 16px 미만 입력칸에 포커스하면 화면을 확대해서 모바일에선 16px
const inputClass =
  "w-full text-base lg:text-[0.8rem] bg-transparent border-b border-[#00386C] py-1 placeholder:text-[#00386C]/50 focus:outline-none rounded-none";

export default function ContactForm({ className = "", draggable = false, open }) {
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error | tooLarge
  const [fileName, setFileName] = useState("");
  // 제목("Project Inquiry")을 잡고 끌어서 폼 위치 이동
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const dragStart = useRef(null);

  // Contact를 누를 때(열기/닫기)마다 기본 위치로
  useEffect(() => {
    setOffset({ x: 0, y: 0 });
  }, [open]);

  const dragHandleProps = draggable
    ? {
        className: "cursor-move select-none touch-none",
        onPointerDown: (e) => {
          e.currentTarget.setPointerCapture(e.pointerId);
          dragStart.current = { x: e.clientX - offset.x, y: e.clientY - offset.y };
        },
        onPointerMove: (e) => {
          if (!dragStart.current) return;
          setOffset({ x: e.clientX - dragStart.current.x, y: e.clientY - dragStart.current.y });
        },
        onPointerUp: () => {
          dragStart.current = null;
        },
      }
    : {};

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const file = formData.get("attachment");
    if (file && file.size > MAX_FILE_SIZE) {
      setStatus("tooLarge");
      return;
    }
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      setStatus("sent");
      setFileName("");
      e.target.reset();
    } catch {
      setStatus("error");
    }
  };

  // 회전(slow-spin)과 겹치지 않도록 이동은 바깥 래퍼에 적용
  const wrap = (content) =>
    draggable ? (
      <div className="pointer-events-auto" style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}>
        {content}
      </div>
    ) : (
      content
    );

  if (status === "sent") {
    return wrap(
      <div className={`slow-spin ${className}`}>
        <p>
          Thank you.
          <br />
          We&apos;ll get back to you soon.
        </p>
        <button onClick={() => setStatus("idle")} className="mt-[1lh]">
          <span className="font-[Inter]">↗</span> Send another
        </button>
      </div>
    );
  }

  return wrap(
    <form onSubmit={onSubmit} className={`slow-spin flex flex-col gap-2 ${className}`}>
      <p {...dragHandleProps} className={`mb-2 ${dragHandleProps.className ?? ""}`}>
        Project Inquiry
      </p>
      <input name="name" required placeholder="Name *" className={inputClass} />
      <input name="company" placeholder="Company" className={inputClass} />
      <input name="email" type="email" required placeholder="Email *" className={inputClass} />
      <input name="budget" required placeholder="Budget *" className={inputClass} />
      <input name="schedule" placeholder="Timeline" className={inputClass} />
      <input name="link" type="url" placeholder="Reference link (Drive, Dropbox…)" className={inputClass} />
      <textarea name="message" required rows={4} placeholder="Message *" className={`${inputClass} resize-none`} />
      <label className={`${inputClass} cursor-pointer truncate ${fileName ? "" : "text-[#00386C]/50"}`}>
        {fileName || "Attach file (max 4MB)"}
        <input
          type="file"
          name="attachment"
          className="hidden"
          onChange={(e) => setFileName(e.target.files[0]?.name ?? "")}
        />
      </label>
      {/* 스팸 방지용 숨김 필드 */}
      <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />
      <button
        type="submit"
        disabled={status === "sending"}
        className="self-end mt-2 disabled:opacity-50"
      >
        <span className="font-[Inter]">↗</span> {status === "sending" ? "Sending…" : "Send"}
      </button>
      {status === "tooLarge" && (
        <p className="text-[#8A8A8A]">File is over 4MB. Please share a link instead.</p>
      )}
      {status === "error" && (
        <p className="text-[#8A8A8A]">Failed to send. Please email cooperativeblue@gmail.com</p>
      )}
    </form>
  );
}
