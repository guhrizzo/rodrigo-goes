// Decorative fitness / nutrition backdrop for the poster (bodybuilding niche).
export default function PosterScene() {
  return (
    <svg className="poster-scene" viewBox="0 0 640 620" preserveAspectRatio="xMinYMid slice" aria-hidden="true">
      <defs>
        <pattern id="scene-dots" width="26" height="26" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="2" fill="rgba(245,246,244,0.09)" />
        </pattern>
      </defs>

      <rect x="0" y="0" width="640" height="620" fill="url(#scene-dots)" />

      <g fill="none" stroke="rgba(245,246,244,0.15)" strokeWidth="11" strokeLinecap="round">
        {/* barbell */}
        <g transform="rotate(-15 300 360)">
          <line x1="70" y1="360" x2="520" y2="360" />
          <line x1="140" y1="318" x2="140" y2="402" />
          <line x1="450" y1="318" x2="450" y2="402" />
          <rect x="108" y="296" width="30" height="128" rx="7" />
          <rect x="74" y="314" width="24" height="92" rx="7" />
          <rect x="452" y="296" width="30" height="128" rx="7" />
          <rect x="492" y="314" width="24" height="92" rx="7" />
        </g>
        {/* weight plates */}
        <circle cx="118" cy="120" r="78" />
        <circle cx="118" cy="120" r="28" />
        <circle cx="540" cy="540" r="60" />
        <circle cx="540" cy="540" r="22" />
      </g>
    </svg>
  );
}
