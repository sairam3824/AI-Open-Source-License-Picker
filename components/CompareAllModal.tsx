"use client";

import { useState, Fragment } from "react";
import { LICENSES, License } from "@/lib/licenses";
import { X, CheckCircle, XCircle, AlertCircle, ExternalLink, BookOpen } from "lucide-react";

const ALL_LICENSES = Object.values(LICENSES);

const FEATURES: { key: string; label: string; section: "permissions" | "conditions" | "limitations" }[] = [
  { key: "Commercial use",    label: "Commercial use",     section: "permissions" },
  { key: "Modification",      label: "Modification",       section: "permissions" },
  { key: "Distribution",      label: "Distribution",       section: "permissions" },
  { key: "Private use",       label: "Private use",        section: "permissions" },
  { key: "Patent use",        label: "Patent use",         section: "permissions" },
  { key: "Disclose source",   label: "Disclose source",    section: "conditions" },
  { key: "Same license",      label: "Share-alike",        section: "conditions" },
  { key: "State changes",     label: "Document changes",   section: "conditions" },
  { key: "License notice",    label: "License notice",     section: "conditions" },
  { key: "Liability",         label: "No liability",       section: "limitations" },
  { key: "Warranty",          label: "No warranty",        section: "limitations" },
  { key: "Trademark use",     label: "No trademark use",   section: "limitations" },
];

function hasFeature(license: License, key: string, section: "permissions" | "conditions" | "limitations") {
  const list = license[section];
  return list.some((item) => item.toLowerCase().includes(key.toLowerCase()));
}

const SECTION_COLORS = {
  permissions: { label: "Permissions", color: "#4ade80", bg: "rgba(34,197,94,0.08)" },
  conditions:  { label: "Conditions",  color: "#facc15", bg: "rgba(234,179,8,0.08)" },
  limitations: { label: "Limitations", color: "#f87171", bg: "rgba(239,68,68,0.08)" },
};

interface Props {
  onClose: () => void;
}

export default function CompareAllModal({ onClose }: Props) {
  const [eli5, setEli5] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(
    new Set(ALL_LICENSES.map((l) => l.id))
  );

  const visibleLicenses = ALL_LICENSES.filter((l) => selected.has(l.id));

  const toggleLicense = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        if (next.size > 2) next.delete(id); // keep at least 2
      } else {
        next.add(id);
      }
      return next;
    });
  };

  let lastSection = "";

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col"
      style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)" }}
    >
      <div
        className="flex flex-col w-full h-full max-w-7xl mx-auto"
        style={{ maxHeight: "100vh" }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-4 flex-shrink-0"
          style={{
            background: "#0f172a",
            borderBottom: "1px solid #1e293b",
          }}
        >
          <div>
            <h2 className="text-xl font-bold text-white">Compare All Licenses</h2>
            <p className="text-xs mt-0.5" style={{ color: "#64748b" }}>
              Toggle licenses to show/hide columns · minimum 2
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setEli5((v) => !v)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
              style={
                eli5
                  ? { background: "rgba(234,179,8,0.12)", border: "1px solid rgba(234,179,8,0.3)", color: "#fde047" }
                  : { background: "#1e293b", border: "1px solid #334155", color: "#94a3b8" }
              }
            >
              <BookOpen size={13} />
              {eli5 ? "ELI5 On" : "ELI5"}
            </button>
            <button
              onClick={onClose}
              className="flex items-center justify-center w-8 h-8 rounded-lg transition-colors"
              style={{ background: "#1e293b", border: "1px solid #334155", color: "#94a3b8" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#334155"; e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "#1e293b"; e.currentTarget.style.color = "#94a3b8"; }}
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* License toggles */}
        <div
          className="flex flex-wrap gap-2 px-6 py-3 flex-shrink-0"
          style={{ background: "#0a0a14", borderBottom: "1px solid #1e293b" }}
        >
          {ALL_LICENSES.map((l) => {
            const on = selected.has(l.id);
            return (
              <button
                key={l.id}
                onClick={() => toggleLicense(l.id)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                style={{
                  background: on ? "rgba(124,58,237,0.15)" : "#1e293b",
                  border: `1px solid ${on ? "rgba(124,58,237,0.4)" : "#334155"}`,
                  color: on ? "#c4b5fd" : "#475569",
                }}
              >
                {l.spdx}
              </button>
            );
          })}
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto" style={{ background: "#0a0a0f" }}>
          <table className="w-full text-sm border-collapse" style={{ minWidth: 700 }}>
            <thead className="sticky top-0 z-10" style={{ background: "#0f172a" }}>
              <tr style={{ borderBottom: "2px solid #1e293b" }}>
                <th
                  className="text-left p-4 font-medium sticky left-0 z-20"
                  style={{ background: "#0f172a", color: "#64748b", minWidth: 160, borderRight: "1px solid #1e293b" }}
                >
                  Feature
                </th>
                {visibleLicenses.map((l) => (
                  <th key={l.id} className="p-4 text-center font-semibold" style={{ minWidth: 120 }}>
                    <div className="text-white">{l.name}</div>
                    <div className="text-xs font-mono mt-0.5" style={{ color: "#475569" }}>{l.spdx}</div>
                  </th>
                ))}
              </tr>
              {/* Description / ELI5 row */}
              <tr style={{ borderBottom: "1px solid #1e293b", background: "rgba(15,23,42,0.8)" }}>
                <td
                  className="p-3 text-xs font-semibold sticky left-0"
                  style={{ color: "#475569", background: "rgba(15,23,42,0.95)", borderRight: "1px solid #1e293b" }}
                >
                  {eli5 ? "Plain English" : "Summary"}
                </td>
                {visibleLicenses.map((l) => (
                  <td key={l.id} className="p-3 text-center">
                    <span className="text-xs leading-relaxed" style={{ color: "#64748b" }}>
                      {eli5 ? l.eli5 : l.tagline}
                    </span>
                  </td>
                ))}
              </tr>
            </thead>
            <tbody>
              {FEATURES.map((f, i) => {
                const showSectionHeader = f.section !== lastSection;
                lastSection = f.section;
                const sc = SECTION_COLORS[f.section];

                return (
                  <Fragment key={f.key}>
                    {showSectionHeader && (
                      <tr>
                        <td
                          colSpan={visibleLicenses.length + 1}
                          className="px-4 py-2 text-xs font-bold uppercase tracking-widest sticky left-0"
                          style={{ background: sc.bg, color: sc.color, borderTop: "1px solid #1e293b", borderBottom: "1px solid #1e293b" }}
                        >
                          {f.section === "permissions" && <CheckCircle size={11} className="inline mr-1.5" />}
                          {f.section === "conditions" && <AlertCircle size={11} className="inline mr-1.5" />}
                          {f.section === "limitations" && <XCircle size={11} className="inline mr-1.5" />}
                          {sc.label}
                        </td>
                      </tr>
                    )}
                    <tr
                      style={{ background: i % 2 === 0 ? "#0a0a0f" : "rgba(15,23,42,0.5)", borderBottom: "1px solid rgba(30,41,59,0.5)" }}
                    >
                      <td
                        className="p-4 font-medium sticky left-0"
                        style={{ color: "#94a3b8", background: i % 2 === 0 ? "#0a0a0f" : "rgba(15,23,42,0.95)", borderRight: "1px solid #1e293b" }}
                      >
                        {f.label}
                      </td>
                      {visibleLicenses.map((l) => {
                        const has = hasFeature(l, f.key, f.section);
                        return (
                          <td key={l.id} className="p-4 text-center">
                            {has ? (
                              <CheckCircle size={18} style={{ color: "#4ade80", margin: "0 auto" }} />
                            ) : (
                              <XCircle size={18} style={{ color: "#1e293b", margin: "0 auto" }} />
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  </Fragment>
                );
              })}

              {/* Popular projects row */}
              <tr style={{ borderTop: "2px solid #1e293b", background: "#0a0a0f" }}>
                <td
                  className="p-4 font-medium sticky left-0"
                  style={{ color: "#94a3b8", background: "#0a0a0f", borderRight: "1px solid #1e293b" }}
                >
                  Used by
                </td>
                {visibleLicenses.map((l) => (
                  <td key={l.id} className="p-4 text-center">
                    <div className="flex flex-col gap-1 items-center">
                      {l.popularProjects.slice(0, 3).map((p) => (
                        <a
                          key={p.name}
                          href={p.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-xs transition-colors"
                          style={{ color: "#475569" }}
                          onMouseEnter={(e) => (e.currentTarget.style.color = "#e2e8f0")}
                          onMouseLeave={(e) => (e.currentTarget.style.color = "#475569")}
                        >
                          {p.name} <ExternalLink size={9} />
                        </a>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
