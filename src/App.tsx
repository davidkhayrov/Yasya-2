import { useCallback, useState } from "react";
import Background from "@/components/Background";
import Cake from "@/components/Cake";
import WishForm from "@/components/WishForm";
import Celebration from "@/components/Celebration";
import MusicToggle from "@/components/MusicToggle";

type Stage = "cake" | "wish" | "celebrate";

const REDIRECT_URL = "https://yasya-3.vercel.app/";

export default function App() {
  const [stage, setStage] = useState<Stage>("cake");

  const handleMakeWish = useCallback(() => setStage("wish"), []);
  const handleSent = useCallback(() => setStage("celebrate"), []);
  const handleCelebrateDone = useCallback(() => {
    window.location.href = REDIRECT_URL;
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      <Background />
      <MusicToggle />

      {/* ---------- Screen 1: Cake ---------- */}
      {stage === "cake" && (
        <main className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-16">
          <div className="fade-up text-center">
            <h1 className="font-script text-5xl sm:text-7xl text-gradient leading-tight">
              С Днём Рождения
            </h1>
            <p
              className="mt-5 max-w-md mx-auto text-xl sm:text-2xl font-serif-elegant italic"
              style={{ color: "#D8C6D9" }}
            >
              Задуй столько свечей, сколько хочешь загадать желаний
            </p>
          </div>

          <div className="fade-up mt-10" style={{ animationDelay: "0.2s" }}>
            <Cake />
          </div>

          <button
            onClick={handleMakeWish}
            className="glass-btn fade-up mt-12 rounded-full px-10 py-4 text-xl font-semibold text-white"
            style={{ animationDelay: "0.4s" }}
          >
            Загадать желание ♡
          </button>
        </main>
      )}

      {/* ---------- Screen 2: Wish form ---------- */}
      {stage === "wish" && (
        <main className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-16">
          <WishForm onSent={handleSent} />
        </main>
      )}

      {/* ---------- Screen 3: Celebration ---------- */}
      {stage === "celebrate" && <Celebration onDone={handleCelebrateDone} />}
    </div>
  );
}
