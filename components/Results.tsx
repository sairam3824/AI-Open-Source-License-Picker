"use client";

import { useState } from "react";
import { License, WizardAnswers, recommendLicenses } from "@/lib/licenses";
import LicenseCard from "./LicenseCard";
import ComparisonTable from "./ComparisonTable";
import CompatibilityMatrix from "./CompatibilityMatrix";
import { RotateCcw, BookOpen, BarChart2, Grid3X3, Copy, Check, X } from "lucide-react";

interface Props {
  answers: WizardAnswers;
  onReset: () => void;
}

type Tab = "recommendations" | "comparison" | "compatibility";

export default function Results({ answers, onReset }: Props) {
  const [eli5, setEli5] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("recommendations");
  const [copyModal, setCopyModal] = useState<License | null>(null);
  const [copied, setCopied] = useState(false);

  const recommendations = recommendLicenses(answers);

  const copyToClipboard = () => {
    if (!copyModal) return;
    navigator.clipboard.writeText(copyModal.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "recommendations", label: "Recommendations", icon: <BookOpen size={15} /> },
    { id: "comparison", label: "Compare", icon: <BarChart2 size={15} /> },
    { id: "compatibility", label: "Compatibility", icon: <Grid3X3 size={15} /> },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Top bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white">Your License Matches</h2>
          <p className="text-sm mt-1" style={{ color: "#64748b" }}>
            Based on your answers, here are the best fits
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setEli5((v) => !v)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all"
            style={
              eli5
                ? {
                    background: "rgba(234,179,8,0.12)",
                    border: "1px solid rgba(234,179,8,0.3)",
                    color: "#fde047",
                  }
                : {
                    background: "#1e293b",
                    border: "1px solid #334155",
                    color: "#94a3b8",
                  }
            }
          >
            <BookOpen size={15} />
            {eli5 ? "ELI5 On" : "Explain like I'm 5"}
          </button>
          <button
            onClick={onReset}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all"
            style={{
              background: "#1e293b",
              border: "1px solid #334155",
              color: "#94a3b8",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#e2e8f0")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#94a3b8")}
          >
            <RotateCcw size={15} /> Start over
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div
        className="flex gap-1 p-1 rounded-xl w-fit mb-8"
        style={{
          background: "rgba(15,23,42,0.6)",
          border: "1px solid #1e293b",
        }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all"
            style={
              activeTab === tab.id
                ? { background: "#1e293b", color: "#fff" }
                : { color: "#64748b" }
            }
            onMouseEnter={(e) => {
              if (activeTab !== tab.id) e.currentTarget.style.color = "#e2e8f0";
            }}
            onMouseLeave={(e) => {
              if (activeTab !== tab.id) e.currentTarget.style.color = "#64748b";
            }}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === "recommendations" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {recommendations.map((license, i) => (
            <LicenseCard
              key={license.id}
              license={license}
              rank={i}
              eli5Mode={eli5}
              onCopyLicense={setCopyModal}
            />
          ))}
        </div>
      )}

      {activeTab === "comparison" && (
        <ComparisonTable licenses={recommendations} />
      )}

      {activeTab === "compatibility" && (
        <CompatibilityMatrix />
      )}

      {/* Copy modal */}
      {copyModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)" }}
        >
          <div
            className="w-full max-w-2xl flex flex-col rounded-2xl shadow-2xl"
            style={{
              background: "#0f172a",
              border: "1px solid #1e293b",
              maxHeight: "80vh",
            }}
          >
            <div
              className="flex items-center justify-between p-5"
              style={{ borderBottom: "1px solid #1e293b" }}
            >
              <div>
                <h3 className="text-lg font-bold text-white">{copyModal.name}</h3>
                <p className="text-sm" style={{ color: "#64748b" }}>
                  Ready to copy into your project
                </p>
              </div>
              <button
                onClick={() => { setCopyModal(null); setCopied(false); }}
                className="p-2 rounded-lg transition-colors"
                style={{ color: "#64748b" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#1e293b";
                  e.currentTarget.style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "#64748b";
                }}
              >
                <X size={18} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-5">
              <pre
                className="text-xs font-mono whitespace-pre-wrap leading-relaxed p-4 rounded-xl"
                style={{
                  background: "rgba(30,41,59,0.5)",
                  border: "1px solid #1e293b",
                  color: "#cbd5e1",
                }}
              >
                {copyModal.text}
              </pre>
            </div>
            <div className="p-5" style={{ borderTop: "1px solid #1e293b" }}>
              <button
                onClick={copyToClipboard}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition-all"
                style={{
                  background: "linear-gradient(to right, #7c3aed, #4f46e5)",
                  color: "#fff",
                  boxShadow: "0 8px 24px rgba(124,58,237,0.25)",
                }}
              >
                {copied ? (
                  <><Check size={18} /> Copied to clipboard!</>
                ) : (
                  <><Copy size={18} /> Copy LICENSE text</>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
