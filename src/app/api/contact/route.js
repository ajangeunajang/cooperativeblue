// 프로젝트 문의 폼 → Resend로 cooperativeblue@gmail.com 에 메일 전송
// RESEND_API_KEY 환경변수 필요 (Vercel 및 .env.local)

const TO = "cooperativeblue@gmail.com";
const FROM = "cooperative Blue <onboarding@resend.dev>";
const MAX_FILE_SIZE = 4 * 1024 * 1024; // Vercel 요청 본문 한도(4.5MB) 안쪽

export async function POST(request) {
  const form = await request.formData();

  // 스팸 방지용 숨김 필드가 채워져 있으면 조용히 성공 처리
  if (form.get("botcheck")) return Response.json({ success: true });

  const field = (key) => String(form.get(key) ?? "").trim();
  const name = field("name");
  const email = field("email");
  const budget = field("budget");
  const message = field("message");

  if (!name || !email || !budget || !message) {
    return Response.json({ success: false, message: "Missing required fields" }, { status: 400 });
  }

  const attachments = [];
  const file = form.get("attachment");
  if (file && typeof file === "object" && file.size > 0) {
    if (file.size > MAX_FILE_SIZE) {
      return Response.json({ success: false, message: "File too large" }, { status: 413 });
    }
    attachments.push({
      filename: file.name,
      content: Buffer.from(await file.arrayBuffer()).toString("base64"),
    });
  }

  const text = [
    `Name: ${name}`,
    `Company: ${field("company") || "-"}`,
    `Email: ${email}`,
    `Budget: ${budget}`,
    `Timeline: ${field("schedule") || "-"}`,
    `Reference link: ${field("link") || "-"}`,
    "",
    message,
  ].join("\n");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM,
      to: [TO],
      reply_to: email,
      subject: `[프로젝트 문의] ${name}`,
      text,
      attachments,
    }),
  });

  if (!res.ok) {
    console.error("Resend error", res.status, await res.text());
    return Response.json({ success: false }, { status: 502 });
  }
  return Response.json({ success: true });
}
