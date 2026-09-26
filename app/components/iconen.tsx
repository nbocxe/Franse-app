// Kleine lijniconen. Ze nemen de tekstkleur over (currentColor).

const basis = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export const IcoonVandaag = () => (
  <svg {...basis}>
    <path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" />
  </svg>
);
export const IcoonLeren = () => (
  <svg {...basis}>
    <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z" />
    <path d="M4 20.5A2.5 2.5 0 0 0 6.5 23H20" />
  </svg>
);
export const IcoonHerhalen = () => (
  <svg {...basis}>
    <path d="M20 12a8 8 0 1 1-2.3-5.6" />
    <path d="M20 4v5h-5" />
  </svg>
);
export const IcoonProfiel = () => (
  <svg {...basis}>
    <path d="M5 20v-9M12 20V4M19 20v-6" />
  </svg>
);
export const IcoonSluit = () => (
  <svg {...basis} strokeWidth={2}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);
export const IcoonTerug = () => (
  <svg {...basis} strokeWidth={2}>
    <path d="M19 12H5M11 6l-6 6 6 6" />
  </svg>
);
export const IcoonPijl = () => (
  <svg {...basis} width={18} height={18} strokeWidth={2}>
    <path d="m9 6 6 6-6 6" />
  </svg>
);
export const IcoonLuister = () => (
  <svg {...basis} width={20} height={20} strokeWidth={2}>
    <path d="M11 5 6 9H3v6h3l5 4z" />
    <path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13" />
  </svg>
);

export const IcoonOefenen = () => (
  <svg {...basis}>
    <path d="M4 12h3l3-8 4 16 3-8h3" />
  </svg>
);
export const IcoonNaslag = () => (
  <svg {...basis}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-4-4" />
  </svg>
);
export const IcoonMicrofoon = () => (
  <svg {...basis} width={28} height={28} strokeWidth={2}>
    <rect x="9" y="3" width="6" height="12" rx="3" />
    <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
  </svg>
);
export const IcoonSlot = () => (
  <svg {...basis} width={18} height={18} strokeWidth={2}>
    <rect x="5" y="11" width="14" height="10" rx="2" />
    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
  </svg>
);
export const IcoonVink = () => (
  <svg {...basis} width={18} height={18} strokeWidth={2.4}>
    <path d="m5 12 5 5 9-10" />
  </svg>
);
