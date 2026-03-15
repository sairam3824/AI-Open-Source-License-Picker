"use client";

import { COMPATIBILITY } from "@/lib/licenses";
import { useState } from "react";

const LICENSE_IDS = ["mit", "apache2", "gpl3", "lgpl3", "mpl2", "bsd2", "agpl3", "unlicense"];
const SHORT_NAMES: Record<string, string> = {
  mit: "MIT", apache2: "Apache 2", gpl3: "GPL 3", lgpl3: "LGPL 3",
  mpl2: "MPL 2", bsd2: "BSD 2", agpl3: "AGPL 3", unlicense: "Unlicense",
};

export default function CompatibilityMatrix() {
  const [hovered, setHovered] = useState<{ row: string; col: string } | null>(null);

  const getCell = (from: string, to: string) => COMPATIBILITY[from]?.[to] ?? "no";

  const cellStyle = (val: "yes" | "no" | "partial", isHighlighted: boolean) => {
    const base: React.CSSProperties = {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: 32,
      height: 32,
      borderRadius: 8,
      fontSize: 13,
      fontWeight: 700,
      transition: "transform 0.15s",
      transform: isHighlighted ? "scale(1.15)" : "scale(1)",
    };
    if (val === "yes") return { ...base, background: "rgba(34,197,94,0.15)", color: "#4ade80", border: "1px solid rgba(34,197,94,0.25)" };
    if (val === "partial") return { ...base, background: "rgba(234,179,8,0.15)", color: "#facc15", border: "1px solid rgba(234,179,8,0.25)" };
    return { ...base, background: "rgba(239,68,68,0.06)", color: "rgba(239,68,68,0.4)", border: "1px solid rgba(239,68,68,0.12)" };
  };

  return (
    <div>
      <p className="text-sm mb-4" style={{ color: "#64748b" }}>
        Can code licensed as{" "}
        <span style={{ color: "#a78bfa" }}>row</span> be included in a project
        licensed as <span style={{ color: "#818cf8" }}>column</span>?
      </p>
      <div
        className="overflow-x-auto rounded-2xl"
        style={{ border: "1px solid #1e293b" }}
      >
        <table className="text-xs w-full">
          <thead>
            <tr style={{ borderBottom: "1px solid #1e293b" }}>
              <th
                className="p-3 text-left w-24"
                style={{ color: "#334155" }}
              >
                From ↓ Into →
              </th>
              {LICENSE_IDS.map((id) => (
                <th
                  key={id}
                  className="p-3 text-center font-semibold transition-colors"
                  style={{ color: hovered?.col === id ? "#818cf8" : "#94a3b8" }}
                >
                  {SHORT_NAMES[id]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {LICENSE_IDS.map((rowId, ri) => (
              <tr
                key={rowId}
                style={{ background: ri % 2 === 0 ? "#0f172a" : "rgba(30,41,59,0.2)" }}
              >
                <td
                  className="p-3 font-semibold transition-colors"
                  style={{ color: hovered?.row === rowId ? "#a78bfa" : "#94a3b8" }}
                >
                  {SHORT_NAMES[rowId]}
                </td>
                {LICENSE_IDS.map((colId) => {
                  const val = getCell(rowId, colId);
                  const isHighlighted =
                    hovered?.row === rowId || hovered?.col === colId;
                  return (
                    <td
                      key={colId}
                      className="p-3 text-center cursor-default"
                      onMouseEnter={() => setHovered({ row: rowId, col: colId })}
                      onMouseLeave={() => setHovered(null)}
                    >
                      <span style={cellStyle(val, isHighlighted)}>
                        {val === "yes" ? "✓" : val === "partial" ? "~" : "✗"}
                      </span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex gap-4 mt-3 text-xs" style={{ color: "#475569" }}>
        <span className="flex items-center gap-1">
          <span style={{ color: "#4ade80" }}>✓</span> Compatible
        </span>
        <span className="flex items-center gap-1">
          <span style={{ color: "#facc15" }}>~</span> Partially compatible
        </span>
        <span className="flex items-center gap-1">
          <span style={{ color: "rgba(239,68,68,0.5)" }}>✗</span> Incompatible
        </span>
      </div>
    </div>
  );
}
