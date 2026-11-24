import { useEffect, useMemo } from "react";

type Props = {
  onDone: () => void;
};

type HeartSpec = {
  left: string;
  delay: string;
  dur: string;
  drift: string;
  rot: string;
  size: number;
  hue: string;
};

export default function Celebration({ onDone }: Props) {
  const hearts: HeartSpec[] = useMemo(() => {
    const hues = ["#E8AFC4", "#C05278", "#A98AC5", "#F2E5E9", "#D8C6D9"];
    return Array.from({ length: 36 }, () => ({
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 1.2}s`,
      dur: `${3.5 + Math.random() * 3}s`,
      drift: `${(Math.random() - 0.5) * 200}px`,
      rot: `${(Math.random() - 0.5) * 60}deg`,
      size: 18 + Math.random() * 28,
      hue: hues[Math.floor(Math.random() * hues.length)],
    }));
  }, []);

  useEffect(() => {
    const t = window.setTimeout(onDone, 2000);
    return () => window.clearTimeout(t);
  }, [onDone]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
      {/* floating hearts */}
      <div className="pointer-events-none absolute inset-0">
        {hearts.map((h, i) => (
          <div
            key={i}
            className="heart-rise"
            style={
              {
                left: h.left,
                animationDelay: h.delay,
                ["--h-dur" as string]: h.dur,
                ["--h-drift" as string]: h.drift,
                ["--h-rot" as string]: h.rot,
              } as React.CSSProperties
            }
          >
            <svg width={h.size} height={h.size} viewBox="0 0 24 24" fill={h.hue}>
              <path d="M12 21s-7.5-4.6-10-9.2C.4 8.4 2 5 5.3 5c2 0 3.4 1.2 4.2 2.5l2.5 3.8 2.5-3.8C15.3 6.2 16.7 5 18.7 5 22 5 23.6 8.4 22 11.8 19.5 16.4 12 21 12 21z" />
            </svg>
          </div>
        ))}
      </div>

      <h1 className="fade-up font-script text-5xl sm:text-7xl text-center px-6 text-gradient leading-tight">
        Пусть все твои желания сбудутся ♡
      </h1>
    </div>
  );
}
