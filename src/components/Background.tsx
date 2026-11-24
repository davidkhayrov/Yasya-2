import { useMemo } from "react";

type StarSpec = {
  left: string;
  top: string;
  size: number;
  delay: string;
  dur: string;
};

type PetalSpec = {
  left: string;
  size: number;
  delay: string;
  dur: string;
  drift: string;
  hue: string;
};

type ButterflySpec = {
  startY: string;
  pathDur: string;
  delay: string;
  scale: number;
  hue: string;
};

function useStars(count: number): StarSpec[] {
  return useMemo(
    () =>
      Array.from({ length: count }, () => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: 1 + Math.random() * 2.5,
        delay: `${Math.random() * 5}s`,
        dur: `${3 + Math.random() * 4}s`,
      })),
    [count]
  );
}

function usePetals(count: number): PetalSpec[] {
  const hues = ["#E8AFC4", "#F2E5E9", "#D8C6D9", "#C05278"];
  return useMemo(
    () =>
      Array.from({ length: count }, () => ({
        left: `${Math.random() * 100}%`,
        size: 10 + Math.random() * 12,
        delay: `${Math.random() * 12}s`,
        dur: `${9 + Math.random() * 8}s`,
        drift: `${(Math.random() - 0.5) * 240}px`,
        hue: hues[Math.floor(Math.random() * hues.length)],
      })),
    [count]
  );
}

function useButterflies(count: number): ButterflySpec[] {
  const hues = ["#E8AFC4", "#A98AC5", "#C05278", "#F2E5E9"];
  return useMemo(
    () =>
      Array.from({ length: count }, () => ({
        startY: `${20 + Math.random() * 55}%`,
        pathDur: `${18 + Math.random() * 14}s`,
        delay: `${Math.random() * 20}s`,
        scale: 0.6 + Math.random() * 0.5,
        hue: hues[Math.floor(Math.random() * hues.length)],
      })),
    [count]
  );
}

function Petal({ spec }: { spec: PetalSpec }) {
  return (
    <div
      className="petal"
      style={
        {
          left: spec.left,
          width: spec.size,
          height: spec.size * 0.85,
          animationDelay: spec.delay,
          animationDuration: spec.dur,
          ["--drift" as string]: spec.drift,
        } as React.CSSProperties
      }
    >
      <svg viewBox="0 0 20 17" width="100%" height="100%">
        <path
          d="M10 0 C14 4, 18 7, 19 12 C15 14, 11 15, 10 17 C9 15, 5 14, 1 12 C2 7, 6 4, 10 0 Z"
          fill={spec.hue}
          opacity="0.85"
        />
      </svg>
    </div>
  );
}

function Star({ spec }: { spec: StarSpec }) {
  return (
    <div
      className="star"
      style={
        {
          left: spec.left,
          top: spec.top,
          animationDelay: spec.delay,
          animationDuration: spec.dur,
        } as React.CSSProperties
      }
    >
      <svg
        width={spec.size * 2}
        height={spec.size * 2}
        viewBox="0 0 10 10"
        fill="#F2E5E9"
      >
        <path d="M5 0 L6 4 L10 5 L6 6 L5 10 L4 6 L0 5 L4 4 Z" />
      </svg>
    </div>
  );
}

function Butterfly({ spec }: { spec: ButterflySpec }) {
  return (
    <div
      className="butterfly"
      style={
        {
          ["--start-y" as string]: spec.startY,
          ["--path-dur" as string]: spec.pathDur,
          animationDelay: spec.delay,
          transform: `scale(${spec.scale})`,
        } as React.CSSProperties
      }
    >
      <svg width="44" height="36" viewBox="0 0 44 36">
        <g className="wings" fill={spec.hue} opacity="0.92">
          <path d="M22 18 C12 4, 2 6, 4 16 C5 22, 12 24, 22 18 Z" />
          <path d="M22 18 C32 4, 42 6, 40 16 C39 22, 32 24, 22 18 Z" />
          <path d="M22 18 C14 24, 8 30, 12 33 C18 34, 22 26, 22 18 Z" opacity="0.8" />
          <path d="M22 18 C30 24, 36 30, 32 33 C26 34, 22 26, 22 18 Z" opacity="0.8" />
        </g>
        <ellipse cx="22" cy="18" rx="1.4" ry="9" fill="#2a2030" opacity="0.8" />
      </svg>
    </div>
  );
}

export default function Background() {
  const stars = useStars(70);
  const petals = usePetals(22);
  const butterflies = useButterflies(4);

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>
      {/* Soft gradient orbs */}
      <div
        className="absolute -top-32 -left-24 h-[42rem] w-[42rem] rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(circle, #A98AC5 0%, transparent 70%)" }}
      />
      <div
        className="absolute top-1/3 -right-32 h-[38rem] w-[38rem] rounded-full opacity-25 blur-3xl"
        style={{ background: "radial-gradient(circle, #C05278 0%, transparent 70%)" }}
      />
      <div
        className="absolute -bottom-40 left-1/4 h-[40rem] w-[40rem] rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, #E8AFC4 0%, transparent 70%)" }}
      />

      {stars.map((s, i) => (
        <Star key={`s${i}`} spec={s} />
      ))}
      {petals.map((p, i) => (
        <Petal key={`p${i}`} spec={p} />
      ))}
      {butterflies.map((b, i) => (
        <Butterfly key={`b${i}`} spec={b} />
      ))}
    </div>
  );
}
