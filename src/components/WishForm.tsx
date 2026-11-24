import { useState, type FormEvent } from "react";

type Props = {
  onSent: () => void;
};

export default function WishForm({ onSent }: Props) {
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const wish = text.trim();

    if (!wish) {
      setError("Сначала напиши своё желание ♡");
      return;
    }
    if (sending) return;

    setError("");
    setSending(true);

    try {
      const response = await fetch("/api/send-wish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ wish }),
      });

      const result = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(result.error || "Не удалось отправить желание. Попробуй ещё раз.");
      }

      onSent();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Ошибка отправки. Проверь подключение к интернету и попробуй ещё раз."
      );
      setSending(false);
    }
  };

  return (
    <div className="glass scale-in w-full max-w-lg rounded-3xl p-8 sm:p-10">
      <h2 className="font-script text-4xl sm:text-5xl text-center text-gradient leading-tight">
        Загадай самое заветное желание ♡
      </h2>
      <p className="mt-3 text-center text-lg sm:text-xl" style={{ color: "#D8C6D9" }}>
        Напиши своё желание
      </p>

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
        <textarea
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            if (error) setError("");
          }}
          placeholder="Моё самое заветное желание..."
          rows={4}
          maxLength={5000}
          disabled={sending}
          required
          className="wish-input w-full resize-none rounded-2xl px-5 py-4 text-lg font-serif-elegant"
          style={{ color: "#F2E5E9" }}
        />
        {error && (
          <p role="alert" className="text-sm text-center" style={{ color: "#E8AFC4" }}>
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={sending}
          className="glass-btn mx-auto rounded-full px-8 py-3.5 text-lg font-semibold text-white disabled:cursor-wait"
        >
          Отправить ♡
        </button>
      </form>
    </div>
  );
}
