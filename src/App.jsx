import React from "react";
import BackgroundGrid from "./components/BackgroundGrid";
import Logo3D from "./components/Logo3D";
import Wordmark from "./components/Wordmark";
import ExportControls from "./components/ExportControls";

export default function App() {
  return (
    <div className="relative min-h-screen w-full bg-slate-950 text-slate-100 antialiased">
      <BackgroundGrid />
      <main className="relative z-10 flex min-h-screen flex-col items-center justify-center gap-8 p-6">
        <div className="flex flex-col items-center gap-6">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md shadow-xl shadow-black/40">
            <Logo3D id="css-logo-svg" />
          </div>
          <Wordmark text="Developers" />
        </div>
        <ExportControls svgId="css-logo-svg" />
      </main>
    </div>
  );
}
