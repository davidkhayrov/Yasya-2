import nodemailer from "nodemailer";

type VercelRequest = {
  method?: string;
  body?: { wish?: unknown };
};
type VercelResponse = {
  setHeader(name: string, value: string): void;
  status(code: number): VercelResponse;
  json(body: Record<string, unknown>): VercelResponse;
};

const recipients = [
  "lesnovrostislav45@gmail.com",
  "david.khayrov@gmail.com",
];

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const wish = typeof req.body?.wish === "string" ? req.body.wish.trim() : "";
  if (!wish) return res.status(400).json({ error: "Сначала напиши своё желание ♡" });
  if (wish.length > 5000) {
    return res.status(400).json({ error: "Желание слишком длинное." });
  }

  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;

  if (!user || !pass) {
    console.error("Missing GMAIL_USER or GMAIL_APP_PASSWORD");
    return res.status(500).json({ error: "Отправка пока не настроена. Попробуй позже." });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user, pass },
    });

    await transporter.sendMail({
      from: `"Пожелания Yasya" <${user}>`,
      to: recipients.join(", "),
      subject: "Новое загаданное желание ♡",
      text: `Кто-то загадал желание:\n\n${wish}`,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Gmail SMTP error:", error);
    return res.status(502).json({ error: "Не удалось отправить письмо. Попробуй ещё раз." });
  }
}
