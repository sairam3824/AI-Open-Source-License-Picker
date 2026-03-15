"use client";

import { useState } from "react";
import Wizard from "@/components/Wizard";
import Results from "@/components/Results";
import CompareAllModal from "@/components/CompareAllModal";
import { WizardAnswers } from "@/lib/licenses";
import { Scale, Sparkles, BarChart2 } from "lucide-react";

export default function Home() {
  const [answers, setAnswers] = useState<WizardAnswers | null>(null);
  const [compareOpen, setCompareOpen] = useState(false);

  return (
    <div className="min-h-screen" style={{ background: "#0a0a0f" }}>
      {compareOpen && <CompareAllModal onClose={() => setCompareOpen(false)} />}
      {/* Background glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full blur-3xl"
          style={{ background: "rgba(124, 58, 237, 0.12)" }}
        />
        <div
          className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-3xl"
          style={{ background: "rgba(79, 70, 229, 0.06)" }}
        />
      </div>

      {/* Nav */}
      <nav
        className="relative z-10 backdrop-blur-sm"
        style={{ borderBottom: "1px solid rgba(51,65,85,0.5)" }}
      >
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className="p-1.5 rounded-lg"
              style={{
                background: "rgba(139,92,246,0.15)",
                border: "1px solid rgba(139,92,246,0.3)",
              }}
            >
              <Scale size={18} style={{ color: "#a78bfa" }} />
            </div>
            <span className="font-bold text-white">License Picker</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCompareOpen(true)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all"
              style={{
                background: "rgba(124,58,237,0.12)",
                border: "1px solid rgba(124,58,237,0.3)",
                color: "#c4b5fd",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(124,58,237,0.22)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(124,58,237,0.12)"; }}
            >
              <BarChart2 size={14} />
              Compare all licenses
            </button>
            <a
              href="https://choosealicense.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs transition-colors"
              style={{ color: "#475569" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#94a3b8")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#475569")}
            >
              choosealicense.com ↗
            </a>
          </div>
        </div>
      </nav>

      <main className="relative z-10 max-w-6xl mx-auto px-4 py-12">
        {!answers ? (
          <>
            {/* Hero */}
            <div className="text-center mb-12">
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-6"
                style={{
                  background: "rgba(139,92,246,0.1)",
                  border: "1px solid rgba(139,92,246,0.25)",
                  color: "#c4b5fd",
                }}
              >
                <Sparkles size={12} />
                Rules-based · No signup · Instant results
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
                Which open source license
                <br />
                <span
                  style={{
                    background: "linear-gradient(to right, #a78bfa, #818cf8)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  should you use?
                </span>
              </h1>
              <p className="text-lg max-w-xl mx-auto" style={{ color: "#94a3b8" }}>
                Answer 5 quick questions. Get your top 3 license matches with
                plain-English explanations, side-by-side comparison, and
                one-click copy.
              </p>
            </div>

            {/* Wizard card */}
            <div
              className="rounded-2xl p-6 md:p-10 shadow-2xl"
              style={{
                background: "rgba(15,23,42,0.7)",
                border: "1px solid rgba(51,65,85,0.6)",
                backdropFilter: "blur(12px)",
              }}
            >
              <Wizard onComplete={setAnswers} />
            </div>

            {/* Trust signals */}
            <div className="mt-8 grid grid-cols-3 gap-4 text-center">
              {[
                { label: "8 licenses covered", sub: "MIT, GPL, Apache & more" },
                { label: "Compatibility matrix", sub: "See what works together" },
                { label: "ELI5 mode", sub: "Plain English explanations" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="p-4 rounded-xl"
                  style={{
                    background: "rgba(15,23,42,0.5)",
                    border: "1px solid rgba(51,65,85,0.5)",
                  }}
                >
                  <div className="text-sm font-semibold" style={{ color: "#e2e8f0" }}>
                    {item.label}
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: "#475569" }}>
                    {item.sub}
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <Results answers={answers} onReset={() => setAnswers(null)} />
        )}
      </main>

      {/* Footer */}
      <footer
        className="relative z-10 mt-16"
        style={{ borderTop: "1px solid rgba(51,65,85,0.4)" }}
      >
        <div className="max-w-6xl mx-auto px-4 py-6 flex flex-wrap items-center justify-between gap-3 text-xs" style={{ color: "#334155" }}>
          <span>Not legal advice. Consult a lawyer for complex licensing decisions.</span>
          <span>Built with Next.js · All logic is rules-based, no AI APIs</span>
        </div>
      </footer>
    </div>
  );
}
