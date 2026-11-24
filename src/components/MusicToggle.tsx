import { useEffect, useRef, useState } from "react";

/** Фоновая музыка с ручным включением — браузеры блокируют автозапуск звука. */
export default function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = new Audio("/music.mp3");
    audio.loop = true;
    audio.volume = 0.4;
    audio.preload = "none";
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
      return;
    }

    try {
      await audio.play();
      setPlaying(true);
    } catch {
      setPlaying(false);
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className="fixed bottom-5 right-5 z-[60] flex h-12 w-12 items-center justify-center rounded-full border border-[#D8A0D2]/40 bg-[#24172B]/85 text-[#F2C4E4] shadow-[0_0_22px_rgba(192,82,120,0.25)] backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-[#E8AFC4] hover:shadow-[0_0_28px_rgba(232,175,196,0.45)]"
      aria-label={playing ? "Выключить музыку" : "Включить музыку"}
      title={playing ? "Выключить музыку" : "Включить музыку"}
    >
      {playing ? (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          <path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" />
        </svg>
      ) : (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" /><path d="m3 3 18 18" />
        </svg>
      )}
      {playing && <span className="absolute -inset-1 rounded-full border border-[#E8AFC4]/35 animate-pulse" />}
    </button>
  );
}
