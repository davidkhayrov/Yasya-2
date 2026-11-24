# Project memory

## Product intent & audience

- Interactive romantic birthday gift website — a personal, emotionally engaging experience rather than a generic greeting.
- Audience: a single recipient (romantic partner); the site is a gift in itself.
- Core interactive moment: an on-screen cake with clickable candles for making wishes.

## Brand personality & voice

- Romantic, intimate, warm, and slightly playful.
- Visual tone leans emotional and celebratory without being cheesy.

## Visual design & UX direction

- **Color palette**: dark plum background dominant; warm accent tones for cake/flame.
- **Aesthetic**: glassmorphism cards/panels; soft glows and gradients.
- **Ambient motion**: falling petals animation as a persistent background layer.
- **Cake screen**: central focal point; multi-tier cake with candles seated into the top tier (not floating). Candles are thick (~>6px), with realistic wax treatment — melted wax base puddle, side drips, wax gradient with highlight, rounded top rim, multi-layered flame with bright white core.
- **Interactions**: candles are clickable (wish-making mechanic); flame and candle states should feel tactile and responsive.
- **Layout**: single-flow experience, likely section-based or screen-based progression.

## Decisions, constraints & rationale

- Stack: Vite + React + Tailwind CSS + lucide-react icons; `@/` path alias for `src/`.
- No extra UI/icon packages unless explicitly requested.
- Candle realism fix: candles were originally thin (6px) and floating (y=60) above the top tier (~y=119-130); corrected by thickening, lowering base into the tier, adding wax puddle/drips/shading.
- Flame redesigned as multi-layer with white core for visual depth.

## Open questions & assumptions

- Wish-making flow after candle click (modal? animation? text input?) — not yet defined.
- Overall page sequence/sections beyond the cake screen are unspecified.
- Petal type/color (rose? sakura?) and performance approach (CSS vs canvas) unconfirmed.
- Personalization details (names, date, photos, message text) not yet provided.