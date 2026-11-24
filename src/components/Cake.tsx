import { useCallback, useState } from "react";

type Candle = {
  id: number;
  lit: boolean;
  blowing: boolean;
};

const CANDLE_COUNT = 5;

export default function Cake() {
  const [candles, setCandles] = useState<Candle[]>(
    Array.from({ length: CANDLE_COUNT }, (_, i) => ({
      id: i,
      lit: true,
      blowing: false,
    }))
  );
  const litCount = candles.filter((c) => c.lit).length;

  const handleCandleClick = useCallback((id: number) => {
    setCandles((prev) => {
      const target = prev.find((c) => c.id === id);
      if (!target || !target.lit) return prev;
      return prev.map((c) =>
        c.id === id ? { ...c, lit: false, blowing: true } : c
      );
    });
    window.setTimeout(() => {
      setCandles((prev) =>
        prev.map((c) => (c.id === id ? { ...c, blowing: false } : c))
      );
    }, 1400);
  }, []);

  const allOut = litCount === 0;

  return (
    <div className="relative flex flex-col items-center">
      {/* Glow halo */}
      <div
        className="halo absolute left-1/2 top-1/2 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(232,175,196,0.5) 0%, rgba(169,138,197,0.25) 45%, transparent 70%)",
        }}
        aria-hidden
      />

      <div className="relative breathe">
        <svg
          width="320"
          height="360"
          viewBox="0 0 320 360"
          className="drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
          style={{ maxWidth: "82vw", height: "auto" }}
        >
          <defs>
            <linearGradient id="tier1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F2E5E9" />
              <stop offset="55%" stopColor="#E8AFC4" />
              <stop offset="100%" stopColor="#C05278" />
            </linearGradient>
            <linearGradient id="tier2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#E8AFC4" />
              <stop offset="60%" stopColor="#C05278" />
              <stop offset="100%" stopColor="#8E3A5A" />
            </linearGradient>
            <linearGradient id="tier3" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#A98AC5" />
              <stop offset="100%" stopColor="#6E5290" />
            </linearGradient>
            <linearGradient id="frost" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F2E5E9" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#D8C6D9" stopOpacity="0.6" />
            </linearGradient>
            {/* Realistic flame gradient: blue base -> orange body -> yellow -> white core */}
            <linearGradient id="flameGrad" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#5B8DE0" stopOpacity="0.85" />
              <stop offset="18%" stopColor="#7BA7E5" stopOpacity="0.9" />
              <stop offset="38%" stopColor="#E8893A" />
              <stop offset="62%" stopColor="#FFB347" />
              <stop offset="82%" stopColor="#FFE08A" />
              <stop offset="100%" stopColor="#FFFCE8" />
            </linearGradient>
            <linearGradient id="flameCore" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#FFC857" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#FFF3B0" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#FFFFFF" />
            </linearGradient>
            <radialGradient id="flameGlow" cx="50%" cy="70%" r="60%">
              <stop offset="0%" stopColor="#FFD27A" stopOpacity="0.55" />
              <stop offset="60%" stopColor="#E8924A" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#C05278" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="ribbon" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#E8AFC4" />
              <stop offset="100%" stopColor="#A98AC5" />
            </linearGradient>
            <linearGradient id="candleWax" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#C9AEB8" />
              <stop offset="35%" stopColor="#F2E5E9" />
              <stop offset="65%" stopColor="#F2E5E9" />
              <stop offset="100%" stopColor="#B8949E" />
            </linearGradient>
            <radialGradient id="waxPool" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#F2E5E9" stopOpacity="0.95" />
              <stop offset="70%" stopColor="#E8AFC4" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#E8AFC4" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="candleTop" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#D8C6D9" />
              <stop offset="100%" stopColor="#B8949E" />
            </linearGradient>
          </defs>

          {/* Cake stand */}
          <ellipse cx="160" cy="340" rx="120" ry="14" fill="rgba(242,229,233,0.12)" />
          <ellipse cx="160" cy="332" rx="100" ry="10" fill="url(#frost)" opacity="0.5" />

          {/* Bottom tier */}
          <path d="M40 330 L40 250 Q160 235, 280 250 L280 330 Z" fill="url(#tier1)" />
          <path d="M40 250 Q160 235, 280 250 Q160 258, 40 250 Z" fill="#F2E5E9" opacity="0.85" />
          {/* drips */}
          <path d="M50 256 q6 14, 12 0 q6 14, 12 0 q6 14, 12 0 q6 14, 12 0 q6 14, 12 0 q6 14, 12 0 q6 14, 12 0 q6 14, 12 0 q6 14, 12 0 q6 14, 12 0 q6 14, 12 0 q6 14, 12 0 q6 14, 12 0 q6 14, 12 0 q6 14, 12 0 q6 14, 12 0 q6 14, 12 0 q6 14, 12 0 q6 14, 12 0 q6 14, 12 0" fill="#C05278" opacity="0.55" />

          {/* Middle tier */}
          <path d="M70 250 L70 185 Q160 172, 250 185 L250 250 Z" fill="url(#tier2)" />
          <path d="M70 185 Q160 172, 250 185 Q160 193, 70 185 Z" fill="#E8AFC4" opacity="0.8" />
          <path d="M78 191 q6 12, 12 0 q6 12, 12 0 q6 12, 12 0 q6 12, 12 0 q6 12, 12 0 q6 12, 12 0 q6 12, 12 0 q6 12, 12 0 q6 12, 12 0 q6 12, 12 0 q6 12, 12 0 q6 12, 12 0 q6 12, 12 0 q6 12, 12 0 q6 12, 12 0 q6 12, 12 0" fill="#F2E5E9" opacity="0.5" />

          {/* Top tier */}
          <path d="M100 185 L100 130 Q160 119, 220 130 L220 185 Z" fill="url(#tier3)" />
          <path d="M100 130 Q160 119, 220 130 Q160 137, 100 130 Z" fill="#D8C6D9" opacity="0.85" />

          {/* Ribbon bow on middle tier */}
          <g transform="translate(160,215)">
            <path d="M0 0 C-18 -12, -30 -10, -28 2 C-26 10, -10 8, 0 0 Z" fill="url(#ribbon)" />
            <path d="M0 0 C18 -12, 30 -10, 28 2 C26 10, 10 8, 0 0 Z" fill="url(#ribbon)" />
            <path d="M0 0 C-10 8, -16 20, -10 24 C-4 20, 0 12, 0 0 Z" fill="#C05278" opacity="0.7" />
            <path d="M0 0 C10 8, 16 20, 10 24 C4 20, 0 12, 0 0 Z" fill="#C05278" opacity="0.7" />
            <circle cx="0" cy="0" r="4" fill="#C05278" />
          </g>

          {/* Decorative dots */}
          {[
            [85, 280], [130, 290], [200, 285], [245, 275],
            [120, 215], [205, 215],
            [130, 155], [195, 155],
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="3" fill="#F2E5E9" opacity="0.8" />
          ))}

          {/* Candles — seated into the top tier with wax pools and drips */}
          {candles.map((c, idx) => {
            const x = 108 + idx * 26;
            const w = 13;
            const topY = 78;
            const baseY = 132;
            const bodyH = baseY - topY;
            const wickTop = topY - 7;
            const flameTip = wickTop - 34;
            return (
              <g
                key={c.id}
                style={{ cursor: c.lit ? "pointer" : "default" }}
                onClick={() => handleCandleClick(c.id)}
              >
                {/* melted wax pool around candle base on the cake */}
                <ellipse cx={x} cy={baseY} rx={w * 1.25} ry={5} fill="url(#waxPool)" />
                {/* a drip down the cake side */}
                <path
                  d={`M${x - 2} ${baseY} q-1 8, 0 14 q1 -6, 2 -14 Z`}
                  fill="#F2E5E9"
                  opacity="0.75"
                />
                {/* candle body — rounded with wax gradient */}
                <rect
                  x={x - w / 2}
                  y={topY}
                  width={w}
                  height={bodyH}
                  rx={w / 2}
                  fill="url(#candleWax)"
                />
                {/* subtle vertical sheen */}
                <rect
                  x={x - w / 2 + 2}
                  y={topY + 2}
                  width={2.5}
                  height={bodyH - 4}
                  rx={1.2}
                  fill="#FFFFFF"
                  opacity="0.45"
                />
                {/* candle top rim */}
                <ellipse
                  cx={x}
                  cy={topY}
                  rx={w / 2}
                  ry={3.2}
                  fill="url(#candleTop)"
                />
                <ellipse
                  cx={x}
                  cy={topY - 1}
                  rx={w / 2 - 2}
                  ry={2.2}
                  fill="#A98AC5"
                  opacity="0.55"
                />
                {/* a little melted lip at the top rim */}
                <path
                  d={`M${x - w / 2} ${topY + 2} q${-1} 4, 0 6 q1 -3, 2 -6 Z`}
                  fill="#F2E5E9"
                  opacity="0.7"
                />
                {/* wick */}
                <rect
                  x={x - 0.9}
                  y={wickTop - 4}
                  width={1.8}
                  height={6}
                  rx={0.9}
                  fill="#2a1f25"
                />

                {/* Realistic flame */}
                {c.lit && (
                  <g className="flame" style={{ transformOrigin: `${x}px ${wickTop}px` }}>
                    {/* outer warm glow */}
                    <ellipse
                      cx={x}
                      cy={wickTop - 16}
                      rx={14}
                      ry={24}
                      fill="url(#flameGlow)"
                    />
                    {/* outer flame — pointed teardrop */}
                    <path
                      d={`M${x} ${flameTip}
                          C${x + 9} ${wickTop - 22}, ${x + 8} ${wickTop - 4}, ${x} ${wickTop - 1}
                          C${x - 8} ${wickTop - 4}, ${x - 9} ${wickTop - 22}, ${x} ${flameTip} Z`}
                      fill="url(#flameGrad)"
                    />
                    {/* inner flame — brighter, slightly shorter */}
                    <path
                      d={`M${x} ${flameTip + 8}
                          C${x + 5.5} ${wickTop - 20}, ${x + 5} ${wickTop - 6}, ${x} ${wickTop - 3}
                          C${x - 5} ${wickTop - 6}, ${x - 5.5} ${wickTop - 20}, ${x} ${flameTip + 8} Z`}
                      fill="url(#flameCore)"
                    />
                    {/* bright white-yellow base core near the wick */}
                    <ellipse
                      cx={x}
                      cy={wickTop - 5}
                      rx={2.4}
                      ry={6}
                      fill="#FFFCE8"
                      opacity="0.95"
                    />
                  </g>
                )}
                {c.blowing && (
                  <g className="smoke">
                    {[0, 1, 2, 3].map((s) => (
                      <circle
                        key={s}
                        cx={x + (s - 1.5) * 5}
                        cy={wickTop - 14 - s * 8}
                        r={3 + s * 1.2}
                        fill="#D8C6D9"
                        opacity={0.55 - s * 0.13}
                      />
                    ))}
                  </g>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Candle counter */}
      <p className="mt-4 font-script text-2xl" style={{ color: "#F2E5E9" }}>
        {allOut ? "Все свечи задуты ♡" : `Горит свечей: ${litCount}`}
      </p>
    </div>
  );
}
