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
  if (!wish) return res.status(400).json({ error: "Пустое желание отправить нельзя." });
  if (wish.length > 5000) {
    return res.status(400).json({ error: "Желание слишком длинное (максимум 5000 символов)." });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;

  if (!apiKey || !from) {
    console.error("Missing RESEND_API_KEY or RESEND_FROM_EMAIL environment variable");
    return res.status(500).json({ error: "Отправка пока не настроена. Попробуй позже." });
  }

  try {
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: recipients,
        subject: "Новое загаданное желание ♡",
        text: `Кто-то загадал желание:\n\n${wish}`,
      }),
    });

    const data = await emailResponse.json().catch(() => ({}));
    if (!emailResponse.ok) {
      console.error("Resend API error:", data);
      return res.status(502).json({ error: "Не удалось отправить письмо. Попробуй ещё раз." });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Wish email error:", error);
    return res.status(500).json({ error: "Ошибка соединения при отправке письма." });
  }
}
