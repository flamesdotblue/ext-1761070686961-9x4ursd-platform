import React from "react";

export default function Wordmark({ text = "Developers" }) {
  return (
    <div className="text-center">
      <div className="text-[11px] uppercase tracking-[0.3em] text-cyan-300/70">CSS</div>
      <h1 className="mt-1 text-3xl font-semibold tracking-wide text-slate-100 md:text-4xl">
        {text}
      </h1>
      <div className="mx-auto mt-3 h-px w-32 bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />
    </div>
  );
}
