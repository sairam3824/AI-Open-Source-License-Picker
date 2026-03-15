"use client";

import { License } from "@/lib/licenses";
import { CheckCircle, XCircle, MinusCircle } from "lucide-react";

interface Props {
  licenses: License[];
}

const FEATURES = [
  { key: "commercial", label: "Commercial use" },
  { key: "modify", label: "Modify" },
  { key: "distribute", label: "Distribute" },
  { key: "private", label: "Private use" },
  { key: "patent", label: "Patent use" },
  { key: "shareAlike", label: "Share-alike required" },
  { key: "discloseSource", label: "Disclose source" },
  { key: "noTrademark", label: "No trademark use" },
];

function hasFeature(license: License, key: string): "yes" | "no" | "partial" {
  const p = license.permissions;
  const c = license.conditions;
  const l = license.limitations;
  switch (key) {
    case "commercial": return p.includes("Commercial use") ? "yes" : "no";
    case "modify": return p.includes("Modification") ? "yes" : "no";
    case "distribute": return p.includes("Distribution") ? "yes" : "no";
    case "private": return p.includes("Private use") ? "yes" : "no";
    case "patent": return p.includes("Patent use") ? "yes" : "no";
    case "shareAlike": return c.some((x) => x.toLowerCase().includes("same license")) ? "yes" : "no";
    case "discloseSource": return c.some((x) => x.toLowerCase().includes("disclose")) ? "yes" : "no";
    case "noTrademark": return l.some((x) => x.toLowerCase().includes("trademark")) ? "yes" : "no";
    default: return "no";
  }
}

const Icon = ({ val }: { val: "yes" | "no" | "partial" }) => {
  if (val === "yes") return <CheckCircle size={18} style={{ color: "#4ade80", margin: "0 auto" }} />;
  if (val === "partial") return <MinusCircle size={18} style={{ color: "#facc15", margin: "0 auto" }} />;
  return <XCircle size={18} style={{ color: "#334155", margin: "0 auto" }} />;
};

export default function ComparisonTable({ licenses }: Props) {
  if (licenses.length < 2) return null;

  return (
    <div
      className="overflow-x-auto rounded-2xl"
      style={{ border: "1px solid #1e293b" }}
    >
      <table className="w-full text-sm">
        <thead>
          <tr style={{ borderBottom: "1px solid #1e293b" }}>
            <th
              className="text-left p-4 font-medium w-40"
              style={{ color: "#64748b" }}
            >
              Feature
            </th>
            {licenses.map((l) => (
              <th key={l.id} className="p-4 text-center font-semibold text-white">
                <div>{l.name}</div>
                <div className="text-xs font-mono" style={{ color: "#475569" }}>
                  {l.spdx}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {FEATURES.map((f, i) => (
            <tr
              key={f.key}
              style={{ background: i % 2 === 0 ? "#0f172a" : "rgba(30,41,59,0.2)" }}
            >
              <td className="p-4" style={{ color: "#64748b" }}>
                {f.label}
              </td>
              {licenses.map((l) => (
                <td key={l.id} className="p-4 text-center">
                  <Icon val={hasFeature(l, f.key)} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
