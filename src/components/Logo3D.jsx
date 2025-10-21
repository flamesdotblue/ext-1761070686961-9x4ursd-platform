import React from "react";

function Building({ x, y, h = 80, hue = 200 }) {
  const width = 34;
  const depth = 18;
  const height = h;
  const topY = y - height;
  const colorBase = `hsl(${hue} 70% 52%)`;
  const colorLight = `hsl(${hue} 85% 64%)`;
  const colorDark = `hsl(${hue - 10} 70% 28%)`;
  const glass = `hsl(${hue + 10} 80% 75% / 0.75)`;

  return (
    <g>
      {/* Shadow */}
      <ellipse
        cx={x + width * 0.7}
        cy={y + 10}
        rx={width * 0.8}
        ry={10}
        fill="#000"
        opacity="0.25"
        filter="url(#softBlur)"
      />

      {/* Right face */}
      <polygon
        points={`
          ${x + width},${y}
          ${x + width + depth},${y - depth * 0.5}
          ${x + width + depth},${topY - depth * 0.5}
          ${x + width},${topY}
        `}
        fill={colorDark}
      />
      {/* Left/front face */}
      <rect x={x} y={topY} width={width} height={height} fill={`url(#front-${hue})`} />
      {/* Top face */}
      <polygon
        points={`
          ${x},${topY}
          ${x + width},${topY}
          ${x + width + depth},${topY - depth * 0.5}
          ${x + depth},${topY - depth * 0.5}
        `}
        fill={colorLight}
      />

      {/* Window stripes */}
      {Array.from({ length: Math.max(2, Math.floor(height / 16)) }).map((_, i) => {
        const yStripe = topY + 10 + i * 14;
        return (
          <rect
            key={i}
            x={x + 3}
            y={yStripe}
            width={width - 6}
            height={3}
            rx={1}
            fill={glass}
          />
        );
      })}
    </g>
  );
}

export default function Logo3D({ id = "css-logo-svg" }) {
  // Grid cell size for positioning towers
  const cell = 44;
  const baseY = 340; // ground line

  // Define letter layouts as arrays of [col,row,heightMultiplier]
  // Coordinates build stylized C, S, S with negative space and stepped heights for depth.
  const C = [
    // left spine
    [0, 0, 3.2],
    [0, 1, 3.6],
    [0, 2, 4.0],
    [0, 3, 3.6],
    [0, 4, 3.2],
    // top arm
    [1, 0, 2.2],
    [2, 0, 2.4],
    [3, 0, 2.2],
    // bottom arm
    [1, 4, 2.0],
    [2, 4, 2.2],
    [3, 4, 2.0],
  ];

  const S1 = [
    // top bar
    [0, 0, 2.6],
    [1, 0, 2.8],
    [2, 0, 2.6],
    // diagonal middle
    [0, 1, 2.2],
    [0, 2, 2.0],
    [1, 2, 2.2],
    [2, 3, 2.4],
    // bottom bar
    [0, 4, 2.6],
    [1, 4, 2.8],
    [2, 4, 2.6],
  ];

  const S2 = [
    // top bar
    [0, 0, 2.8],
    [1, 0, 3.0],
    [2, 0, 2.8],
    // middle bend
    [2, 1, 2.4],
    [1, 2, 2.2],
    [0, 3, 2.4],
    // bottom bar
    [0, 4, 2.8],
    [1, 4, 3.0],
    [2, 4, 2.8],
  ];

  // Offsets for each letter
  const offsetC = { x: 100, y: baseY };
  const offsetS1 = { x: 100 + 5 * cell + 40, y: baseY };
  const offsetS2 = { x: 100 + 10 * cell + 80, y: baseY };

  return (
    <svg
      id={id}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 900 420"
      width="900"
      height="420"
      role="img"
      aria-labelledby="title desc"
    >
      <title id="title">CSS Developers Logo</title>
      <desc id="desc">A modern 3D cityscape logo where buildings form the letters C S S with Developers as the wordmark.</desc>

      <defs>
        <filter id="softBlur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0b1220" />
          <stop offset="100%" stopColor="#0b1220" stopOpacity="0" />
        </linearGradient>
        {/* Front face gradients parametric by hue to add specular line */}
        {[160, 190, 205, 210, 215, 225, 235, 245, 255, 265, 275, 285, 295].map((h) => (
          <linearGradient key={h} id={`front-${h}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={`hsl(${h} 70% 58%)`} />
            <stop offset="55%" stopColor={`hsl(${h} 70% 46%)`} />
            <stop offset="100%" stopColor={`hsl(${h} 70% 38%)`} />
          </linearGradient>
        ))}
      </defs>

      {/* Subtle stage gradient */}
      <rect x="0" y="0" width="900" height="420" fill="url(#sky)" />

      {/* Glow behind letters */}
      <g opacity="0.35" filter="url(#softBlur)">
        <ellipse cx="160" cy="240" rx="120" ry="60" fill="#60a5fa" />
        <ellipse cx="445" cy="240" rx="120" ry="60" fill="#22d3ee" />
        <ellipse cx="730" cy="240" rx="120" ry="60" fill="#34d399" />
      </g>

      {/* Letter C */}
      <g>
        {C.map(([cx, cy, hm], i) => (
          <Building
            key={`C-${i}`}
            x={offsetC.x + cx * cell}
            y={offsetC.y + cy * cell * 0.9}
            h={hm * 26}
            hue={200 + (i % 3) * 15}
          />
        ))}
      </g>

      {/* Letter S1 */}
      <g>
        {S1.map(([cx, cy, hm], i) => (
          <Building
            key={`S1-${i}`}
            x={offsetS1.x + cx * cell}
            y={offsetS1.y + cy * cell * 0.9}
            h={hm * 26}
            hue={190 + (i % 4) * 15}
          />
        ))}
      </g>

      {/* Letter S2 */}
      <g>
        {S2.map(([cx, cy, hm], i) => (
          <Building
            key={`S2-${i}`}
            x={offsetS2.x + cx * cell}
            y={offsetS2.y + cy * cell * 0.9}
            h={hm * 26}
            hue={205 + (i % 4) * 15}
          />
        ))}
      </g>

      {/* Ground line */}
      <g opacity="0.25">
        <rect x="80" y={baseY + 14} width="740" height="2" fill="#94a3b8" />
      </g>
    </svg>
  );
}
