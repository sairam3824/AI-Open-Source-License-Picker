"use client";

import { useState, useRef } from "react";
import { WizardAnswers } from "@/lib/licenses";
import { ChevronRight, ChevronLeft, Zap, Info } from "lucide-react";

const QUESTIONS = [
  {
    key: "commercial" as const,
    question: "Can others use your code commercially?",
    hint: "Think: can a company build a paid product using your code?",
    tooltip: "Commercial use means someone can take your code, build a product or service with it, and charge money for it. If you say Yes, a startup could use your library in their paid SaaS. If No, only hobbyists and non-profits can use it freely. 'With conditions' usually means things like requiring attribution or a revenue share — though most standard licenses don't support that directly.",
    options: [
      { value: "yes", label: "Yes", desc: "Anyone can use it in commercial products" },
      { value: "no", label: "No", desc: "Only non-commercial use allowed" },
      { value: "conditions", label: "With conditions", desc: "Commercial use allowed but with restrictions" },
    ],
  },
  {
    key: "shareAlike" as const,
    question: "Must derivative works share their source code?",
    hint: "If someone modifies your code, must they open-source their version?",
    tooltip: "A 'derivative work' is any software that's based on or includes your code. Share-alike (also called copyleft) means if someone modifies your code and distributes it, they must release their modified version under the same open-source license. This prevents companies from taking your open-source work, improving it, and keeping those improvements private. GPL is the classic example.",
    options: [
      { value: "yes", label: "Yes, always", desc: "All derivatives must be open source" },
      { value: "no", label: "No", desc: "Derivatives can stay private" },
      { value: "only-if-distributed", label: "Only if distributed", desc: "Only if they share the software publicly" },
    ],
  },
  {
    key: "documentChanges" as const,
    question: "Must changes to your code be documented?",
    hint: "Should contributors be required to note what they changed?",
    tooltip: "Some licenses (like Apache 2.0) require that anyone who modifies your code must include a notice describing what they changed and when. This creates an audit trail so users of the modified version know it differs from your original. It's a transparency requirement — not about code comments, but about a CHANGES file or similar notice.",
    options: [
      { value: "yes", label: "Yes", desc: "Changes must be clearly documented" },
      { value: "no", label: "No", desc: "No documentation requirement" },
    ],
  },
  {
    key: "proprietary" as const,
    question: "Can your code be used in proprietary software?",
    hint: "Can companies include your code in closed-source products?",
    tooltip: "Proprietary (closed-source) software is software where the source code is not made available to users — think Microsoft Office or most mobile apps. If you allow this, companies can bundle your code into their closed products without releasing their source. If you disallow it (like GPL does), anyone using your code must also open-source their entire project.",
    options: [
      { value: "yes", label: "Yes", desc: "Fine to use in closed-source software" },
      { value: "no", label: "No", desc: "Must remain open source" },
    ],
  },
  {
    key: "patentProtection" as const,
    question: "Do you want explicit patent protection?",
    hint: "Prevents contributors from later suing users over patents in the code",
    tooltip: "Without explicit patent protection, a contributor could theoretically contribute code to your project, then later sue users of that code for patent infringement. Licenses like Apache 2.0 and GPL 3 include a patent grant — contributors automatically license any relevant patents to all users — plus a retaliation clause that terminates their rights if they sue. MIT and BSD don't include this, which is a risk for enterprise users.",
    options: [
      { value: "yes", label: "Yes", desc: "Include patent grant and retaliation clause" },
      { value: "no", label: "No", desc: "Keep it simple, skip patent clauses" },
    ],
  },
];

interface Props {
  onComplete: (answers: WizardAnswers) => void;
}

export default function Wizard({ onComplete }: Props) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<WizardAnswers>>({});
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const current = QUESTIONS[step];
  const progress = (step / QUESTIONS.length) * 100;
  const selected = answers[current.key];

  // close tooltip when step changes
  const handleStepChange = (newStep: number) => {
    setTooltipOpen(false);
    setStep(newStep);
  };

  const handleSelect = (value: string) => {
    setAnswers((prev) => ({ ...prev, [current.key]: value }));
  };

  const handleNext = () => {
    if (!selected) return;
    setTooltipOpen(false);
    if (step === QUESTIONS.length - 1) {
      onComplete(answers as WizardAnswers);
    } else {
      setStep((s) => s + 1);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex justify-between text-sm mb-2" style={{ color: "#64748b" }}>
          <span>Question {step + 1} of {QUESTIONS.length}</span>
          <span>{Math.round(progress)}% complete</span>
        </div>
        <div className="h-2 rounded-full overflow-hidden" style={{ background: "#1e293b" }}>
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${progress}%`,
              background: "linear-gradient(to right, #7c3aed, #4f46e5)",
            }}
          />
        </div>
        <div className="flex mt-3 gap-1">
          {QUESTIONS.map((_, i) => (
            <div
              key={i}
              className="flex-1 h-1 rounded-full transition-all duration-300"
              style={{
                background:
                  i < step ? "#7c3aed" : i === step ? "#818cf8" : "#1e293b",
              }}
            />
          ))}
        </div>
      </div>

      {/* Question */}
      <div className="mb-8">
        <div className="flex items-start gap-3 mb-2">
          <h2 className="text-2xl font-bold text-white leading-snug">{current.question}</h2>
          {/* Info tooltip */}
          <div className="relative flex-shrink-0 mt-1" ref={tooltipRef}>
            <button
              onMouseEnter={() => setTooltipOpen(true)}
              onMouseLeave={() => setTooltipOpen(false)}
              onFocus={() => setTooltipOpen(true)}
              onBlur={() => setTooltipOpen(false)}
              aria-label="More information about this question"
              className="flex items-center justify-center w-6 h-6 rounded-full transition-colors"
              style={{
                background: tooltipOpen ? "rgba(139,92,246,0.2)" : "rgba(100,116,139,0.15)",
                border: `1px solid ${tooltipOpen ? "rgba(139,92,246,0.5)" : "rgba(100,116,139,0.3)"}`,
                color: tooltipOpen ? "#a78bfa" : "#64748b",
              }}
            >
              <Info size={13} />
            </button>
            {tooltipOpen && (
              <div
                className="absolute z-50 rounded-xl p-4 text-sm leading-relaxed"
                style={{
                  top: "calc(100% + 10px)",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: 320,
                  background: "#1e293b",
                  border: "1px solid #334155",
                  color: "#cbd5e1",
                  boxShadow: "0 16px 40px rgba(0,0,0,0.5)",
                }}
              >
                {/* Arrow */}
                <div
                  style={{
                    position: "absolute",
                    top: -6,
                    left: "50%",
                    transform: "translateX(-50%) rotate(45deg)",
                    width: 10,
                    height: 10,
                    background: "#1e293b",
                    borderTop: "1px solid #334155",
                    borderLeft: "1px solid #334155",
                  }}
                />
                {current.tooltip}
              </div>
            )}
          </div>
        </div>
        <p className="text-sm flex items-center gap-1" style={{ color: "#64748b" }}>
          <Zap size={14} style={{ color: "#facc15" }} />
          {current.hint}
        </p>
      </div>

      {/* Options */}
      <div className="space-y-3 mb-8">
        {current.options.map((opt) => {
          const isSelected = selected === opt.value;
          return (
            <button
              key={opt.value}
              onClick={() => handleSelect(opt.value)}
              className="w-full text-left p-4 rounded-xl transition-all duration-200"
              style={{
                border: isSelected
                  ? "2px solid #7c3aed"
                  : "2px solid #1e293b",
                background: isSelected
                  ? "rgba(124,58,237,0.12)"
                  : "rgba(15,23,42,0.6)",
                color: isSelected ? "#fff" : "#cbd5e1",
              }}
              onMouseEnter={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.borderColor = "#334155";
                  e.currentTarget.style.background = "rgba(30,41,59,0.8)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.borderColor = "#1e293b";
                  e.currentTarget.style.background = "rgba(15,23,42,0.6)";
                }
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                  style={{
                    borderColor: isSelected ? "#7c3aed" : "#334155",
                    background: isSelected ? "#7c3aed" : "transparent",
                  }}
                >
                  {isSelected && (
                    <div className="w-2 h-2 rounded-full bg-white" />
                  )}
                </div>
                <div>
                  <div className="font-semibold">{opt.label}</div>
                  <div className="text-sm" style={{ color: "#64748b" }}>
                    {opt.desc}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Navigation */}
      <div className="flex gap-3">
        {step > 0 && (
          <button
            onClick={() => handleStepChange(step - 1)}
            className="flex items-center gap-2 px-5 py-3 rounded-xl transition-colors"
            style={{
              border: "1px solid #1e293b",
              color: "#94a3b8",
              background: "transparent",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#0f172a")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            <ChevronLeft size={18} /> Back
          </button>
        )}
        <button
          onClick={handleNext}
          disabled={!selected}
          className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold transition-all duration-200"
          style={
            selected
              ? {
                  background: "linear-gradient(to right, #7c3aed, #4f46e5)",
                  color: "#fff",
                  boxShadow: "0 8px 24px rgba(124,58,237,0.25)",
                  cursor: "pointer",
                }
              : {
                  background: "#1e293b",
                  color: "#334155",
                  cursor: "not-allowed",
                }
          }
        >
          {step === QUESTIONS.length - 1 ? "Find My License" : "Next"}
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
