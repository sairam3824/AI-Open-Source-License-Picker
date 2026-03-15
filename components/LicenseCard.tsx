"use client";

import { useState } from "react";
import { License } from "@/lib/licenses";
import { CheckCircle, XCircle, AlertCircle, ExternalLink, Copy, Check, BookOpen, Sparkles } from "lucide-react";

interface Props {
  license: License & { score?: number; whyRecommended?: string };
  rank?: number;
  eli5Mode: boolean;
  onCopyLicense: (license: License) => void;
}

const PERMISSION_ICONS: Record<string, string> = {
  "Commercial use": "💼",
  "Modification": "✏️",
  "Distribution": "📦",
  "Private use": "🔒",
  "Patent use": "🛡️",
};

const RANK_STYLES = [
  { bg: "linear-gradient(to right, #f59e0b, #d97706)", label: "#1 Best Match" },
  { bg: "linear-gradient(to right, #94a3b8, #cbd5e1)", label: "#2 Great Fit" },
  { bg: "linear-gradient(to right, #b45309, #92400e)", label: "#3 Good Option" },
];

export default function LicenseCard({ license, rank, eli5Mode, onCopyLicense }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    onCopyLicense(license);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isTop = rank === 0;

  return (
    <div
      className="rounded-2xl overflow-hidden flex flex-col transition-all duration-300"
      style={{
        background: "#0f172a",
        border: isTop ? "1px solid rgba(124,58,237,0.5)" : "1px solid #1e293b",
        boxShadow: isTop ? "0 0 32px rgba(124,58,237,0.1)" : "none",
      }}
    >
      {/* Header */}
      <div className="p-5" style={{ borderBottom: "1px solid #1e293b" }}>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            {rank !== undefined && rank < 3 && (
              <div
                className="inline-flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full text-white mb-2"
                style={{ background: RANK_STYLES[rank].bg }}
              >
                {RANK_STYLES[rank].label}
              </div>
            )}
            <h3 className="text-xl font-bold text-white">{license.name}</h3>
            <span
              className="text-xs font-mono px-2 py-0.5 rounded mt-1 inline-block"
              style={{ background: "#1e293b", color: "#475569" }}
            >
              SPDX: {license.spdx}
            </span>
          </div>
          {license.score !== undefined && (
            <div className="text-right flex-shrink-0">
              <div className="text-2xl font-bold" style={{ color: "#a78bfa" }}>
                {license.score}
              </div>
              <div className="text-xs" style={{ color: "#475569" }}>
                match score
              </div>
            </div>
          )}
        </div>

        {/* Why recommended */}
        {license.whyRecommended && (
          <div
            className="flex items-start gap-2 p-3 rounded-lg mb-3"
            style={{
              background: "rgba(124,58,237,0.08)",
              border: "1px solid rgba(124,58,237,0.2)",
            }}
          >
            <Sparkles size={14} style={{ color: "#a78bfa", marginTop: 2, flexShrink: 0 }} />
            <p className="text-sm" style={{ color: "#c4b5fd" }}>
              {license.whyRecommended}
            </p>
          </div>
        )}

        {/* Description */}
        {eli5Mode ? (
          <div className="flex items-start gap-2">
            <BookOpen size={14} style={{ color: "#facc15", marginTop: 2, flexShrink: 0 }} />
            <p className="text-sm" style={{ color: "rgba(254,240,138,0.8)" }}>
              {license.eli5}
            </p>
          </div>
        ) : (
          <p className="text-sm" style={{ color: "#64748b" }}>
            {license.tagline}
          </p>
        )}
      </div>

      {/* Permissions / Conditions / Limitations */}
      <div className="p-5 flex flex-col gap-4 flex-1">
        {/* Permissions */}
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "#4ade80" }}>
            <CheckCircle size={12} /> Permissions
          </div>
          <div className="flex flex-wrap gap-1.5">
            {license.permissions.map((p) => (
              <span
                key={p}
                className="text-xs px-2 py-1 rounded-full"
                style={{
                  background: "rgba(34,197,94,0.08)",
                  color: "#86efac",
                  border: "1px solid rgba(34,197,94,0.2)",
                }}
              >
                {PERMISSION_ICONS[p] ?? "✓"} {p}
              </span>
            ))}
          </div>
        </div>

        {/* Conditions */}
        {license.conditions.length > 0 && (
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "#facc15" }}>
              <AlertCircle size={12} /> Conditions
            </div>
            <div className="flex flex-wrap gap-1.5">
              {license.conditions.map((c) => (
                <span
                  key={c}
                  className="text-xs px-2 py-1 rounded-full"
                  style={{
                    background: "rgba(234,179,8,0.08)",
                    color: "#fde047",
                    border: "1px solid rgba(234,179,8,0.2)",
                  }}
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Limitations */}
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "#f87171" }}>
            <XCircle size={12} /> Limitations
          </div>
          <div className="flex flex-wrap gap-1.5">
            {license.limitations.map((l) => (
              <span
                key={l}
                className="text-xs px-2 py-1 rounded-full"
                style={{
                  background: "rgba(239,68,68,0.08)",
                  color: "#fca5a5",
                  border: "1px solid rgba(239,68,68,0.15)",
                }}
              >
                {l}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Popular projects */}
      <div className="px-5 pb-4">
        <div className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "#334155" }}>
          Used by
        </div>
        <div className="flex flex-wrap gap-3">
          {license.popularProjects.map((p) => (
            <a
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs transition-colors"
              style={{ color: "#64748b" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#e2e8f0")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#64748b")}
            >
              {p.name} <ExternalLink size={10} />
            </a>
          ))}
        </div>
      </div>

      {/* Copy button */}
      <div className="px-5 pb-5">
        <button
          onClick={handleCopy}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all"
          style={{
            background: "#1e293b",
            border: "1px solid #334155",
            color: "#94a3b8",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#334155";
            e.currentTarget.style.color = "#fff";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#1e293b";
            e.currentTarget.style.color = "#94a3b8";
          }}
        >
          {copied ? (
            <>
              <Check size={15} style={{ color: "#4ade80" }} /> Copied!
            </>
          ) : (
            <>
              <Copy size={15} /> Copy LICENSE text
            </>
          )}
        </button>
      </div>
    </div>
  );
}
