import React from "react";

export default function ExportControls({ svgId }) {
  const downloadSVG = () => {
    const svg = document.getElementById(svgId);
    if (!svg) return;
    const serializer = new XMLSerializer();
    let source = serializer.serializeToString(svg);
    if (!source.match(/^<svg[^>]+xmlns=/)) {
      source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
    }
    const url = URL.createObjectURL(new Blob([source], { type: 'image/svg+xml;charset=utf-8' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = 'css-developers-logo.svg';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const downloadPNG = async () => {
    const svg = document.getElementById(svgId);
    if (!svg) return;
    const serializer = new XMLSerializer();
    let source = serializer.serializeToString(svg);
    if (!source.match(/^<svg[^>]+xmlns=/)) {
      source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
    }
    const svgBlob = new Blob([source], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    const img = new Image();
    const viewBox = svg.getAttribute('viewBox')?.split(' ').map(Number) || [0, 0, 900, 420];
    const [, , w = 900, h = 420] = viewBox;

    const scale = Math.min(2, Math.max(1, Math.floor(1600 / w))); // scale up modestly
    const canvas = document.createElement('canvas');
    canvas.width = w * scale;
    canvas.height = h * scale;
    const ctx = canvas.getContext('2d');

    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob) => {
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'css-developers-logo.png';
        document.body.appendChild(a);
        a.click();
        a.remove();
      }, 'image/png');
      URL.revokeObjectURL(url);
    };
    img.onerror = () => URL.revokeObjectURL(url);
    img.src = url;
  };

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={downloadSVG}
        className="rounded-lg border border-white/15 bg-white/10 px-4 py-2 text-sm text-white/90 shadow-sm shadow-black/30 backdrop-blur hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
      >
        Download SVG
      </button>
      <button
        onClick={downloadPNG}
        className="rounded-lg border border-white/15 bg-cyan-500/20 px-4 py-2 text-sm text-cyan-100 shadow-sm shadow-black/30 backdrop-blur hover:bg-cyan-500/30 focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
      >
        Download PNG
      </button>
    </div>
  );
}
