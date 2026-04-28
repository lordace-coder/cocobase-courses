import { useParams, useNavigate } from "react-router-dom";
import {
  useState,
  useEffect,
  useCallback,
  useRef,
  createContext,
  useContext,
} from "react";
import { ALL_COURSES } from "../data/courses";
import {
  updateCourseProgress,
  resetCourseProgress,
  getProgress,
} from "../utils/progressStorage";
import type { CourseStep } from "../types/course";

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
const T = {
  // Base surfaces
  bg: "#0A0A0F",
  surface: "#111118",
  surface2: "#16161F",
  surface3: "#1C1C27",
  surfaceHover: "#1F1F2C",

  // Borders
  border: "#2A2A3A",
  borderLight: "#333344",
  borderFocus: "#6366F1",

  // Primary — electric indigo
  primary: "#6366F1",
  primaryLight: "rgba(99,102,241,0.12)",
  primaryMid: "rgba(99,102,241,0.25)",
  primaryDark: "#4F52C8",
  primaryGlow: "rgba(99,102,241,0.35)",

  // States
  success: "#22C55E",
  successBg: "rgba(34,197,94,0.1)",
  successBorder: "rgba(34,197,94,0.35)",
  successText: "#4ADE80",
  danger: "#F87171",
  dangerBg: "rgba(248,113,113,0.1)",
  dangerBorder: "rgba(248,113,113,0.35)",
  dangerText: "#FCA5A5",
  amber: "#F59E0B",
  amberBg: "rgba(245,158,11,0.1)",
  amberText: "#FCD34D",

  // Text
  text: "#F0F0F8",
  textBody: "#A8A8C0",
  textMuted: "#5A5A72",

  // Fonts
  fontSans: "'DM Sans', 'Inter', sans-serif",
  fontSerif: "'Playfair Display', 'Georgia', serif",
  fontMono: "'JetBrains Mono', 'Fira Code', monospace",
};

// ─── GLOBAL STYLES ────────────────────────────────────────────────────────────
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Playfair+Display:wght@500;600&family=JetBrains+Mono:wght@400;500&display=swap');

  @keyframes slideIn {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0.4; }
  }
  @keyframes shimmer {
    0%   { background-position: -200% 0; }
    100% { background-position:  200% 0; }
  }
  @keyframes popIn {
    0%   { transform: scale(0.92); opacity: 0; }
    60%  { transform: scale(1.03); }
    100% { transform: scale(1);    opacity: 1; }
  }
  @keyframes trophy {
    0%   { transform: scale(0.5) rotate(-15deg); opacity: 0; }
    60%  { transform: scale(1.15) rotate(5deg); }
    80%  { transform: scale(0.95) rotate(-2deg); }
    100% { transform: scale(1) rotate(0deg); opacity: 1; }
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .course-option-btn {
    transition: transform 120ms ease, border-color 150ms ease, background 150ms ease !important;
  }
  .course-option-btn:hover:not(:disabled) {
    transform: translateY(-1px);
  }
  .course-option-btn:active:not(:disabled) {
    transform: translateY(0) scale(0.99);
  }

  .course-input:focus {
    outline: none;
    border-color: ${T.primary} !important;
    box-shadow: 0 0 0 3px ${T.primaryGlow};
  }

  .course-primary-btn:hover:not(:disabled) {
    background: ${T.primaryDark} !important;
    transform: translateY(-1px);
    box-shadow: 0 8px 24px ${T.primaryGlow};
  }
  .course-primary-btn:active:not(:disabled) {
    transform: translateY(0);
  }

  .word-chip:hover:not(:disabled) {
    border-color: ${T.primary} !important;
    background: ${T.primaryLight} !important;
    color: ${T.primary} !important;
    transform: translateY(-1px);
  }

  ::-webkit-scrollbar { width: 4px; height: 4px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: ${T.border}; border-radius: 4px; }
  ::-webkit-scrollbar-thumb:hover { background: ${T.borderLight}; }
`;

function GlobalStyles() {
  return <style dangerouslySetInnerHTML={{ __html: globalStyles }} />;
}

// ─── COURSE STORE ─────────────────────────────────────────────────────────────
const CourseStoreCtx = createContext<any>(null);

interface CourseStoreType {
  steps: CourseStep[];
  step: CourseStep;
  stepIdx: number;
  setStepIdx: (idx: number) => void;
  hearts: number;
  answer: any;
  setAnswer: (ans: any) => void;
  checked: boolean;
  setChecked: (c: boolean) => void;
  result: boolean | null;
  setResult: (r: boolean | null) => void;
  xp: number;
  setXp: (x: number) => void;
  correctCt: number;
  setCorrectCt: (c: number) => void;
  done: boolean;
  setDone: (d: boolean) => void;
  reset: () => void;
  totalSteps: number;
  courseId: string;
  saveProgress: () => void;
}

function CourseStoreProvider({ children, courseId, steps }: any) {
  const initialProgress = getProgress(courseId);
  const [stepIdx, setStepIdx] = useState(initialProgress.currentStepIndex);
  const [answer, setAnswer] = useState(null);
  const [checked, setChecked] = useState(false);
  const [result, setResult] = useState<boolean | null>(null);
  const [xp, setXp] = useState(initialProgress.totalXp);
  const [correctCt, setCorrectCt] = useState(
    initialProgress.completedSteps.length,
  );
  const [done, setDone] = useState(initialProgress.isComplete);

  const reset = useCallback(() => {
    resetCourseProgress(courseId);
    setStepIdx(0);
    setAnswer(null);
    setChecked(false);
    setResult(null);
    setXp(0);
    setCorrectCt(0);
    setDone(false);
  }, [courseId]);

  const saveProgress = useCallback(() => {
    if (steps[stepIdx]) {
      updateCourseProgress(
        courseId,
        stepIdx,
        steps[stepIdx].xp || 0,
        steps[stepIdx].id,
        result === true,
        steps.length,
      );
    }
  }, [courseId, stepIdx, result, steps]);

  const store: CourseStoreType = {
    steps,
    step: steps[stepIdx],
    stepIdx,
    setStepIdx,
    hearts: 0,
    answer,
    setAnswer,
    checked,
    setChecked,
    result,
    setResult,
    xp,
    setXp,
    correctCt,
    setCorrectCt,
    done,
    setDone,
    reset,
    totalSteps: steps.length,
    courseId,
    saveProgress,
  };

  return (
    <CourseStoreCtx.Provider value={store}>{children}</CourseStoreCtx.Provider>
  );
}

const useCourseStore = () => {
  const ctx = useContext(CourseStoreCtx);
  if (!ctx) throw new Error("Must use CourseStoreProvider");
  return ctx;
};

// ─── VALIDATION ───────────────────────────────────────────────────────────────
function validate(step: CourseStep, answer: any): boolean {
  switch (step.type) {
    case "quiz":
    case "quiz_code":
      return answer === (step as any).correct;
    case "true_false":
      return answer === (step as any).correct;
    case "fill_code":
      return (
        Array.isArray(answer) &&
        answer.every((a, i) => a === (step as any).blankAnswers[i])
      );
    case "match":
      return (
        answer !== null &&
        typeof answer === "object" &&
        Object.keys(answer).length === (step as any).pairs.length
      );
    case "reorder":
      return (
        Array.isArray(answer) &&
        answer.every((a, i) => a === (step as any).correct[i])
      );
    case "short_answer": {
      const v = (step as any).caseSensitive ? answer : answer?.toLowerCase();
      const c = (step as any).caseSensitive
        ? (step as any).correct
        : (step as any).correct.toLowerCase();
      return v?.trim() === c;
    }
    default:
      return true;
  }
}

// ─── STYLE HELPERS ────────────────────────────────────────────────────────────
function optionStyle(state: string): React.CSSProperties {
  if (state === "correct")
    return {
      background: T.successBg,
      border: `1.5px solid ${T.successBorder}`,
      boxShadow: `0 0 16px rgba(34,197,94,0.12)`,
    };
  if (state === "wrong")
    return {
      background: T.dangerBg,
      border: `1.5px solid ${T.dangerBorder}`,
      boxShadow: `0 0 16px rgba(248,113,113,0.12)`,
    };
  if (state === "selected")
    return {
      background: T.primaryLight,
      border: `1.5px solid ${T.primary}`,
      boxShadow: `0 0 16px ${T.primaryGlow}`,
    };
  return {
    background: T.surface2,
    border: `1.5px solid ${T.border}`,
  };
}

// ─── SHARED COMPONENTS ────────────────────────────────────────────────────────
function OptionLabel({ char, state }: any) {
  const bg =
    state === "correct"
      ? T.success
      : state === "wrong"
        ? T.danger
        : state === "selected"
          ? T.primary
          : T.surface3;
  const color =
    state === "correct" || state === "wrong" || state === "selected"
      ? "#fff"
      : T.textMuted;
  return (
    <span
      style={{
        minWidth: 26,
        height: 26,
        background: bg,
        borderRadius: 6,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 11,
        fontWeight: 600,
        color,
        flexShrink: 0,
        fontFamily: T.fontMono,
        letterSpacing: "0.02em",
        transition: "background .2s, color .2s",
      }}
    >
      {char}
    </span>
  );
}

function StepBadge({ text, icon }: any) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        background: T.primaryLight,
        border: `1px solid ${T.primaryMid}`,
        borderRadius: 9999,
        padding: "4px 12px",
        marginBottom: 8,
        width: "fit-content",
      }}
    >
      <span style={{ fontSize: 12 }}>{icon}</span>
      <span
        style={{
          fontSize: 10,
          fontWeight: 600,
          letterSpacing: "0.1em",
          color: T.primary,
          textTransform: "uppercase",
          fontFamily: T.fontSans,
        }}
      >
        {text}
      </span>
    </div>
  );
}

function QuestionText({ children }: any) {
  return (
    <p
      style={{
        fontFamily: T.fontSerif,
        fontSize: 21,
        fontWeight: 500,
        lineHeight: 1.5,
        color: T.text,
        marginBottom: 24,
        letterSpacing: "-0.01em",
      }}
    >
      {children}
    </p>
  );
}

function XpBadge({ xp }: any) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        background: "rgba(245,158,11,0.08)",
        border: "1px solid rgba(245,158,11,0.25)",
        borderRadius: 9999,
        padding: "6px 14px",
        width: "fit-content",
        marginTop: 4,
      }}
    >
      <span style={{ fontSize: 14 }}>⚡</span>
      <span
        style={{
          fontSize: 12,
          fontWeight: 600,
          color: T.amberText,
          fontFamily: T.fontSans,
        }}
      >
        +{xp} XP earned
      </span>
    </div>
  );
}

// ─── STEP COMPONENTS ──────────────────────────────────────────────────────────
function LessonStep({ step, onReady }: any) {
  useEffect(() => {
    onReady(true);
  }, [onReady, step.id]);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 20,
        animation: "slideIn 0.4s ease",
      }}
    >
      <StepBadge text="Lesson" icon="📖" />
      {step.icon && (
        <div
          style={{
            width: 56,
            height: 56,
            background: T.surface3,
            borderRadius: 16,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 28,
            border: `1px solid ${T.border}`,
          }}
        >
          {step.icon}
        </div>
      )}
      <h2
        style={{
          fontFamily: T.fontSerif,
          fontSize: 26,
          fontWeight: 600,
          color: T.text,
          lineHeight: 1.3,
          letterSpacing: "-0.02em",
        }}
      >
        {step.title}
      </h2>
      <div
        style={{
          background: T.surface2,
          border: `1px solid ${T.border}`,
          borderRadius: 16,
          padding: "22px 24px",
          fontFamily: T.fontSerif,
          fontSize: 15.5,
          lineHeight: 1.85,
          color: T.textBody,
        }}
        dangerouslySetInnerHTML={{ __html: step.content }}
      />
      {step.xp ? <XpBadge xp={step.xp} /> : null}
    </div>
  );
}

function CodeLessonStep({ step, onReady }: any) {
  useEffect(() => {
    onReady(true);
  }, [onReady, step.id]);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 20,
        animation: "slideIn 0.4s ease",
      }}
    >
      <StepBadge text="Code Lesson" icon="💻" />
      <h2
        style={{
          fontFamily: T.fontSerif,
          fontSize: 26,
          fontWeight: 600,
          color: T.text,
          lineHeight: 1.3,
          letterSpacing: "-0.02em",
        }}
      >
        {step.title}
      </h2>
      <p
        style={{
          fontFamily: T.fontSerif,
          fontSize: 15.5,
          color: T.textBody,
          lineHeight: 1.8,
        }}
      >
        {step.content}
      </p>
      <div
        style={{
          background: "#0D0D14",
          border: `1px solid #252535`,
          borderRadius: 14,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px 18px",
            background: "#0A0A10",
            borderBottom: "1px solid #252535",
          }}
        >
          <div style={{ display: "flex", gap: 6 }}>
            {["#FF5F57", "#FFBD2E", "#28C941"].map((c, i) => (
              <div
                key={i}
                style={{
                  width: 11,
                  height: 11,
                  borderRadius: "50%",
                  background: c,
                  opacity: 0.8,
                }}
              />
            ))}
          </div>
          <span
            style={{
              fontFamily: T.fontMono,
              fontSize: 10.5,
              color: "#4A4A6A",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            typescript
          </span>
        </div>
        <pre style={{ margin: 0, padding: "20px 22px", overflowX: "auto" }}>
          <code
            style={{
              fontFamily: T.fontMono,
              fontSize: 13,
              lineHeight: 1.8,
              color: "#C8C8F4",
            }}
          >
            {step.codeSnippet}
          </code>
        </pre>
      </div>
      {step.xp ? <XpBadge xp={step.xp} /> : null}
    </div>
  );
}

function QuizStepComponent({ step, onAnswer, checked }: any) {
  const [sel, setSel] = useState<number | null>(null);
  const isCode = step.type === "quiz_code";
  const labels = ["A", "B", "C", "D", "E"];

  useEffect(() => {
    setSel(null);
    onAnswer(null);
  }, [step.id, onAnswer]);
  useEffect(() => {
    if (sel !== null) onAnswer(sel);
  }, [sel, onAnswer]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 20,
        animation: "slideIn 0.4s ease",
      }}
    >
      <StepBadge
        text={isCode ? "Code Challenge" : "Quiz"}
        icon={isCode ? "💻" : "🧠"}
      />
      <QuestionText>{step.question}</QuestionText>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {step.options.map((opt: string, i: number) => {
          const state =
            checked && i === step.correct
              ? "correct"
              : checked && i === sel && sel !== step.correct
                ? "wrong"
                : !checked && i === sel
                  ? "selected"
                  : "idle";
          const os = optionStyle(state);
          return (
            <button
              key={i}
              type="button"
              className="course-option-btn"
              disabled={checked}
              onClick={() => setSel(i)}
              style={{
                width: "100%",
                ...os,
                borderRadius: 14,
                padding: isCode ? "14px 16px" : "16px 18px",
                color: T.text,
                fontFamily: isCode ? T.fontMono : T.fontSans,
                fontSize: isCode ? 12.5 : 14.5,
                fontWeight: isCode ? 400 : 500,
                cursor: checked ? "default" : "pointer",
                textAlign: "left",
                display: "flex",
                alignItems: "flex-start",
                gap: 14,
              }}
            >
              <OptionLabel char={labels[i]} state={state} />
              <span style={{ flex: 1, lineHeight: 1.5 }}>{opt}</span>
              {state === "correct" && (
                <span
                  style={{
                    color: T.success,
                    fontSize: 16,
                    marginLeft: "auto",
                    flexShrink: 0,
                  }}
                >
                  ✓
                </span>
              )}
              {state === "wrong" && (
                <span
                  style={{
                    color: T.danger,
                    fontSize: 16,
                    marginLeft: "auto",
                    flexShrink: 0,
                  }}
                >
                  ✗
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function TrueFalseStepComponent({ step, onAnswer, checked }: any) {
  const [sel, setSel] = useState<boolean | null>(null);

  useEffect(() => {
    setSel(null);
    onAnswer(null);
  }, [step.id, onAnswer]);
  useEffect(() => {
    if (sel !== null) onAnswer(sel);
  }, [sel, onAnswer]);

  const opts = [
    {
      val: true,
      label: "True",
      icon: "✓",
      color: T.success,
      dimColor: "rgba(34,197,94,0.15)",
    },
    {
      val: false,
      label: "False",
      icon: "✗",
      color: T.danger,
      dimColor: "rgba(248,113,113,0.15)",
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 20,
        animation: "slideIn 0.4s ease",
      }}
    >
      <StepBadge text="True or False" icon="⚖️" />
      <QuestionText>{step.question}</QuestionText>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        {opts.map((o) => {
          const state =
            checked && o.val === step.correct
              ? "correct"
              : checked && o.val === sel && sel !== step.correct
                ? "wrong"
                : !checked && o.val === sel
                  ? "selected"
                  : "idle";
          const os = optionStyle(state);
          const isActive = state !== "idle";
          return (
            <button
              key={String(o.val)}
              type="button"
              className="course-option-btn"
              disabled={checked}
              onClick={() => setSel(o.val)}
              style={{
                ...os,
                borderRadius: 16,
                padding: "28px 16px",
                cursor: checked ? "default" : "pointer",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 12,
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  background: isActive ? "transparent" : T.surface3,
                  border: `1.5px solid ${isActive ? "transparent" : T.border}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 22,
                  color:
                    state === "correct"
                      ? T.success
                      : state === "wrong"
                        ? T.danger
                        : T.textMuted,
                }}
              >
                {o.icon}
              </div>
              <span
                style={{
                  fontFamily: T.fontSans,
                  fontSize: 15,
                  fontWeight: 600,
                  color:
                    state === "correct"
                      ? T.successText
                      : state === "wrong"
                        ? T.dangerText
                        : state === "selected"
                          ? T.primary
                          : T.text,
                  letterSpacing: "0.02em",
                }}
              >
                {o.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function FillCodeStepComponent({ step, onAnswer, checked }: any) {
  const blankIndices = step.blanks;
  const totalBlanks = blankIndices.length;
  const [fills, setFills] = useState(Array(totalBlanks).fill(null));
  const [active, setActive] = useState(0);
  const [used, setUsed] = useState<number[]>([]);

  useEffect(() => {
    setFills(Array(totalBlanks).fill(null));
    setUsed([]);
    setActive(0);
    onAnswer(null);
  }, [step.id, onAnswer]);

  useEffect(() => {
    if (fills.every((f) => f !== null)) onAnswer(fills);
    else onAnswer(null);
  }, [fills, onAnswer]);

  const pick = (word: string, wi: number) => {
    if (used.includes(wi) || checked) return;
    const nf = [...fills];
    nf[active] = word;
    setFills(nf);
    setUsed([...used, wi]);
    if (active < totalBlanks - 1) setActive(active + 1);
  };

  const clear = (blankIdx: number) => {
    if (checked) return;
    const word = fills[blankIdx];
    const wi = step.wordBank.indexOf(word);
    const nf = [...fills];
    nf[blankIdx] = null;
    setFills(nf);
    setUsed(used.filter((u: number) => u !== wi));
    setActive(blankIdx);
  };

  const renderCode = () => {
    const elements: React.ReactNode[] = [];
    step.codeTemplate.forEach((part: string, idx: number) => {
      const hasBlank = blankIndices.includes(idx);
      const blankIdx = blankIndices.indexOf(idx);
      const lines = part.split("\n");
      lines.forEach((line: string, lineIdx: number) => {
        if (lineIdx > 0) elements.push(<br key={`br-${idx}-${lineIdx}`} />);
        if (hasBlank && line.includes("______")) {
          const [beforeBlank, afterBlank] = line.split("______");
          const isCorrect =
            checked && fills[blankIdx] === step.blankAnswers[blankIdx];
          const isWrong =
            checked && fills[blankIdx] !== step.blankAnswers[blankIdx];
          elements.push(
            <span key={`line-${idx}-${lineIdx}`}>
              <span>{beforeBlank}</span>
              <span
                onClick={() => fills[blankIdx] && clear(blankIdx)}
                style={{
                  display: "inline-block",
                  minWidth: 80,
                  borderBottom: `2px solid`,
                  borderColor: checked
                    ? isCorrect
                      ? T.success
                      : T.danger
                    : active === blankIdx
                      ? T.primary
                      : T.border,
                  color: fills[blankIdx]
                    ? checked
                      ? isCorrect
                        ? T.success
                        : T.danger
                      : T.primary
                    : T.textMuted,
                  fontWeight: 600,
                  textAlign: "center",
                  padding: "0 6px",
                  cursor: fills[blankIdx] ? "pointer" : "default",
                  borderRadius: 2,
                  transition: "border-color .2s, color .2s",
                  background: fills[blankIdx]
                    ? checked
                      ? isCorrect
                        ? T.successBg
                        : T.dangerBg
                      : T.primaryLight
                    : "transparent",
                }}
              >
                {fills[blankIdx] || (active === blankIdx ? "▌" : "　　")}
              </span>
              <span>{afterBlank}</span>
            </span>,
          );
        } else {
          elements.push(<span key={`line-${idx}-${lineIdx}`}>{line}</span>);
        }
      });
    });
    return elements;
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 20,
        animation: "slideIn 0.4s ease",
      }}
    >
      <StepBadge text="Fill in the Code" icon="✏️" />
      <QuestionText>{step.question}</QuestionText>
      <div
        style={{
          background: "#0D0D14",
          border: `1px solid #252535`,
          borderRadius: 14,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px 18px",
            background: "#0A0A10",
            borderBottom: "1px solid #252535",
          }}
        >
          <div style={{ display: "flex", gap: 6 }}>
            {["#FF5F57", "#FFBD2E", "#28C941"].map((c, i) => (
              <div
                key={i}
                style={{
                  width: 11,
                  height: 11,
                  borderRadius: "50%",
                  background: c,
                  opacity: 0.8,
                }}
              />
            ))}
          </div>
          <span
            style={{
              fontFamily: T.fontMono,
              fontSize: 10.5,
              color: "#4A4A6A",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            fill in the blanks
          </span>
        </div>
        <pre
          style={{
            margin: 0,
            padding: "20px 22px",
            fontFamily: T.fontMono,
            fontSize: 13,
            lineHeight: 2,
            color: "#C8C8F4",
            overflowX: "auto",
            whiteSpace: "pre-wrap",
          }}
        >
          {renderCode()}
        </pre>
      </div>
      <div>
        <p
          style={{
            fontSize: 11.5,
            color: T.textMuted,
            marginBottom: 10,
            fontFamily: T.fontSans,
            letterSpacing: "0.02em",
          }}
        >
          Tap a word to place it · Tap a filled blank to clear it
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {step.wordBank.map((w: string, wi: number) => (
            <button
              key={wi}
              type="button"
              className="word-chip"
              disabled={used.includes(wi) || checked}
              onClick={() => pick(w, wi)}
              style={{
                background: used.includes(wi) ? T.surface3 : T.surface2,
                border: `1.5px solid ${T.border}`,
                borderRadius: 9999,
                padding: "7px 16px",
                fontFamily: T.fontMono,
                fontSize: 12.5,
                fontWeight: 500,
                color: used.includes(wi) ? T.textMuted : T.textBody,
                cursor: used.includes(wi) || checked ? "default" : "pointer",
                transition: "all .15s ease",
                opacity: used.includes(wi) ? 0.35 : 1,
                letterSpacing: "0.01em",
              }}
            >
              {w}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function MatchStepComponent({ step, onAnswer, checked }: any) {
  const [selTerm, setSelTerm] = useState<string | null>(null);
  const [matched, setMatched] = useState<Record<string, string>>({});
  const [wrongPair, setWrongPair] = useState<{
    term: string | null;
    def: string;
  } | null>(null);

  useEffect(() => {
    setSelTerm(null);
    setMatched({});
    setWrongPair(null);
    onAnswer(null);
  }, [step.id, onAnswer]);

  useEffect(() => {
    if (Object.keys(matched).length === step.pairs.length) onAnswer(matched);
  }, [matched, step.pairs.length, onAnswer]);

  const clickDef = (def: string) => {
    if (!selTerm || checked) return;
    const pair = step.pairs.find((p: any) => p.term === selTerm);
    if (pair?.def === def) {
      setMatched((m: any) => ({ ...m, [selTerm]: def }));
      setSelTerm(null);
    } else {
      setWrongPair({ term: selTerm, def });
      setTimeout(() => {
        setWrongPair(null);
        setSelTerm(null);
      }, 550);
    }
  };

  const getTermStyle = (term: string): React.CSSProperties => {
    const isMatched = matched[term] !== undefined;
    const isActive = selTerm === term;
    if (isMatched)
      return {
        background: T.successBg,
        border: `1.5px solid ${T.successBorder}`,
        color: T.successText,
        cursor: "default",
        opacity: 0.85,
      };
    if (isActive)
      return {
        background: T.primaryLight,
        border: `1.5px solid ${T.primary}`,
        color: T.primary,
        cursor: "pointer",
        boxShadow: `0 0 16px ${T.primaryGlow}`,
      };
    return {
      background: T.surface2,
      border: `1.5px solid ${T.border}`,
      color: T.text,
      cursor: checked ? "default" : "pointer",
    };
  };

  const getDefStyle = (def: string): React.CSSProperties => {
    const isMatched = Object.values(matched).includes(def);
    const isWrongFlash = wrongPair?.def === def;
    if (isWrongFlash && !checked)
      return {
        background: T.dangerBg,
        border: `1.5px solid ${T.dangerBorder}`,
        color: T.dangerText,
        cursor: "default",
      };
    if (isMatched)
      return {
        background: T.successBg,
        border: `1.5px solid ${T.successBorder}`,
        color: T.successText,
        cursor: "default",
        opacity: 0.85,
      };
    if (!checked && selTerm && !isMatched)
      return {
        background: T.primaryLight,
        border: `1.5px solid ${T.primary}`,
        color: T.primary,
        cursor: "pointer",
      };
    return {
      background: T.surface2,
      border: `1.5px solid ${T.border}`,
      color: T.text,
      cursor: !selTerm || checked ? "default" : "pointer",
    };
  };

  const colLabel: React.CSSProperties = {
    fontSize: 10,
    fontWeight: 600,
    letterSpacing: "0.1em",
    color: T.textMuted,
    textTransform: "uppercase",
    marginBottom: 10,
    textAlign: "center",
    fontFamily: T.fontSans,
  };

  const itemBase: React.CSSProperties = {
    borderRadius: 10,
    padding: "12px 10px",
    fontSize: 12.5,
    fontWeight: 500,
    textAlign: "center",
    transition: "all .2s ease",
    minHeight: 54,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: T.fontSans,
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 20,
        animation: "slideIn 0.4s ease",
      }}
    >
      <StepBadge text="Match" icon="🔗" />
      <QuestionText>{step.question}</QuestionText>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div>
          <p style={colLabel}>Method</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {step.pairs.map((pair: any, i: number) => (
              <div
                key={i}
                onClick={() =>
                  !checked && !matched[pair.term] && setSelTerm(pair.term)
                }
                style={{ ...itemBase, ...getTermStyle(pair.term) }}
              >
                {pair.term}
              </div>
            ))}
          </div>
        </div>
        <div>
          <p style={colLabel}>Meaning</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {step.pairs.map((pair: any, i: number) => (
              <div
                key={i}
                onClick={() => clickDef(pair.def)}
                style={{ ...itemBase, ...getDefStyle(pair.def) }}
              >
                {pair.def}
              </div>
            ))}
          </div>
        </div>
      </div>
      {selTerm && (
        <p
          style={{
            fontSize: 12,
            color: T.primary,
            textAlign: "center",
            fontFamily: T.fontSans,
            animation: "fadeIn 0.2s ease",
          }}
        >
          Now tap a meaning for{" "}
          <strong style={{ fontWeight: 600 }}>{selTerm}</strong>
        </p>
      )}
    </div>
  );
}

function ReorderStepComponent({ step, onAnswer, checked }: any) {
  const init = useRef([...step.items].sort(() => Math.random() - 0.5));
  const [items, setItems] = useState(init.current);

  useEffect(() => {
    init.current = [...step.items].sort(() => Math.random() - 0.5);
    setItems(init.current);
    onAnswer(null);
  }, [step.id, onAnswer]);

  useEffect(() => {
    onAnswer(items.map((i: any) => i.id));
  }, [items, onAnswer]);

  const move = (idx: number, dir: number) => {
    if (checked) return;
    const arr = [...items];
    const swap = idx + dir;
    if (swap < 0 || swap >= arr.length) return;
    [arr[idx], arr[swap]] = [arr[swap], arr[idx]];
    setItems(arr);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 20,
        animation: "slideIn 0.4s ease",
      }}
    >
      <StepBadge text="Reorder" icon="↕️" />
      <QuestionText>{step.question}</QuestionText>
      <p style={{ fontSize: 12, color: T.textMuted, fontFamily: T.fontSans }}>
        Use arrows to rearrange into the correct order
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {items.map((item: any, idx: number) => {
          const isCorrect = checked && step.correct[idx] === item.id;
          const isWrong = checked && step.correct[idx] !== item.id;
          return (
            <div
              key={item.id}
              style={{
                background: isCorrect
                  ? T.successBg
                  : isWrong
                    ? T.dangerBg
                    : T.surface2,
                border: `1.5px solid ${isCorrect ? T.successBorder : isWrong ? T.dangerBorder : T.border}`,
                borderRadius: 12,
                padding: "14px 16px",
                fontFamily: T.fontMono,
                fontSize: 12.5,
                display: "flex",
                alignItems: "center",
                gap: 12,
                transition: "all .2s ease",
                boxShadow: isCorrect
                  ? `0 0 12px rgba(34,197,94,0.1)`
                  : isWrong
                    ? `0 0 12px rgba(248,113,113,0.1)`
                    : "none",
              }}
            >
              <span
                style={{
                  minWidth: 26,
                  height: 26,
                  background: T.surface3,
                  borderRadius: 6,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 11,
                  fontWeight: 600,
                  color: T.textMuted,
                  fontFamily: T.fontSans,
                  flexShrink: 0,
                  border: `1px solid ${T.border}`,
                }}
              >
                {idx + 1}
              </span>
              <span
                style={{
                  flex: 1,
                  color: T.text,
                  fontSize: 12.5,
                  lineHeight: 1.5,
                }}
              >
                {item.text}
              </span>
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {(
                  [
                    [-1, "▲"],
                    [1, "▼"],
                  ] as [number, string][]
                ).map(([d, lbl]) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => move(idx, d)}
                    disabled={checked}
                    style={{
                      background: "none",
                      border: "none",
                      color: T.textMuted,
                      cursor: checked ? "default" : "pointer",
                      fontSize: 11,
                      padding: "3px 6px",
                      lineHeight: 1,
                      borderRadius: 4,
                      opacity:
                        (d === -1 && idx === 0) ||
                        (d === 1 && idx === items.length - 1)
                          ? 0.2
                          : 0.7,
                      transition: "opacity .15s, background .15s",
                    }}
                    onMouseOver={(e) => {
                      if (!checked)
                        e.currentTarget.style.background = T.surface3;
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.background = "none";
                    }}
                  >
                    {lbl}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ShortAnswerStepComponent({ step, onAnswer, checked }: any) {
  const [val, setVal] = useState("");
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    setVal("");
    onAnswer(null);
  }, [step.id, onAnswer]);
  useEffect(() => {
    onAnswer(val.trim() || null);
  }, [val, onAnswer]);

  const isCorrect = checked && validate(step, val);
  const isWrong = checked && !validate(step, val);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 20,
        animation: "slideIn 0.4s ease",
      }}
    >
      <StepBadge text="Short Answer" icon="⌨️" />
      <QuestionText>{step.question}</QuestionText>
      {step.hint && (
        <div
          style={{
            background: T.surface2,
            border: `1px solid ${T.border}`,
            borderRadius: 10,
            padding: "10px 14px",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span style={{ color: T.amber, fontSize: 14 }}>💡</span>
          <p
            style={{
              fontSize: 13,
              color: T.textBody,
              fontStyle: "italic",
              fontFamily: T.fontMono,
            }}
          >
            {step.hint}
          </p>
        </div>
      )}
      <input
        className="course-input"
        value={val}
        placeholder={step.placeholder || "Type your answer here..."}
        disabled={checked}
        onChange={(e) => setVal(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onKeyDown={(e) =>
          e.key === "Enter" && !checked && val.trim() && onAnswer(val)
        }
        style={{
          width: "100%",
          background: isCorrect
            ? T.successBg
            : isWrong
              ? T.dangerBg
              : T.surface2,
          border: `1.5px solid ${isCorrect ? T.successBorder : isWrong ? T.dangerBorder : focused ? T.primary : T.border}`,
          borderRadius: 14,
          padding: "16px 18px",
          color: T.text,
          fontFamily: T.fontSans,
          fontSize: 15.5,
          outline: "none",
          transition: "all .2s ease",
          boxShadow:
            focused && !checked
              ? `0 0 0 3px ${T.primaryGlow}`
              : isCorrect
                ? `0 0 12px rgba(34,197,94,0.15)`
                : isWrong
                  ? `0 0 12px rgba(248,113,113,0.15)`
                  : "none",
        }}
      />
    </div>
  );
}

// ─── UI COMPONENTS ────────────────────────────────────────────────────────────
function ProgressBar({ value }: any) {
  return (
    <div
      style={{
        flex: 1,
        height: 4,
        background: T.surface3,
        borderRadius: 9999,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          height: "100%",
          background: `linear-gradient(90deg, ${T.primary}, #818CF8)`,
          borderRadius: 9999,
          width: `${value}%`,
          transition: "width 400ms cubic-bezier(.4,0,.2,1)",
          boxShadow: `0 0 8px ${T.primaryGlow}`,
        }}
      />
    </div>
  );
}

function TopBar({ onClose }: any) {
  const { stepIdx, totalSteps } = useCourseStore();
  const progress = (stepIdx / totalSteps) * 100;
  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: `${T.surface}EE`,
        backdropFilter: "blur(12px)",
        borderBottom: `1px solid ${T.border}`,
        padding: "14px 20px",
        display: "flex",
        alignItems: "center",
        gap: 16,
      }}
    >
      <button
        type="button"
        onClick={onClose}
        style={{
          background: T.surface2,
          border: `1px solid ${T.border}`,
          color: T.textMuted,
          cursor: "pointer",
          fontSize: 13,
          padding: "6px 10px",
          borderRadius: 8,
          lineHeight: 1,
          transition: "all .15s ease",
          fontFamily: T.fontSans,
          flexShrink: 0,
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.color = T.text;
          e.currentTarget.style.borderColor = T.borderLight;
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.color = T.textMuted;
          e.currentTarget.style.borderColor = T.border;
        }}
      >
        ✕
      </button>
      <ProgressBar value={progress} />
      <span
        style={{
          fontFamily: T.fontMono,
          fontSize: 11,
          color: T.textMuted,
          flexShrink: 0,
          letterSpacing: "0.04em",
        }}
      >
        {stepIdx}/{totalSteps}
      </span>
    </div>
  );
}

function FeedbackBanner({ result, explanation }: any) {
  return (
    <div
      style={{
        borderRadius: 14,
        padding: "16px 18px",
        display: "flex",
        alignItems: "flex-start",
        gap: 14,
        background: result ? T.successBg : T.dangerBg,
        border: `1px solid ${result ? T.successBorder : T.dangerBorder}`,
        animation: "slideUp 0.35s cubic-bezier(.4,0,.2,1) both",
        boxShadow: result
          ? `0 0 24px rgba(34,197,94,0.1)`
          : `0 0 24px rgba(248,113,113,0.1)`,
      }}
    >
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 9999,
          background: result ? "rgba(34,197,94,0.2)" : "rgba(248,113,113,0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          fontSize: 16,
          color: result ? T.success : T.danger,
        }}
      >
        {result ? "✓" : "✗"}
      </div>
      <div style={{ flex: 1 }}>
        <p
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: result ? T.successText : T.dangerText,
            marginBottom: 6,
            fontFamily: T.fontSans,
            letterSpacing: "0.01em",
          }}
        >
          {result ? "Correct!" : "Incorrect!"}
        </p>
        <p
          style={{
            fontFamily: T.fontSerif,
            fontSize: 13.5,
            color: T.textBody,
            lineHeight: 1.65,
            marginBottom: result ? 0 : 10,
          }}
        >
          {explanation}
        </p>
        {!result && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(248,113,113,0.08)",
              border: `1px solid ${T.dangerBorder}`,
              borderRadius: 8,
              padding: "8px 12px",
              marginTop: 2,
            }}
          >
            <span style={{ fontSize: 14, flexShrink: 0 }}>↩</span>
            <p
              style={{
                fontFamily: T.fontSans,
                fontSize: 12.5,
                fontWeight: 500,
                color: T.dangerText,
                lineHeight: 1.4,
              }}
            >
              You'll restart from the beginning — don't worry, you've got this.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function BottomBar({ canCheck, onAction }: any) {
  const { checked, result, stepIdx, totalSteps, step } = useCourseStore();
  const isLast = stepIdx + 1 >= totalSteps;
  const isLessonType = step.type === "lesson" || step.type === "code_lesson";
  const label =
    checked && result === false
      ? "↩ Restart from Beginning"
      : checked
        ? isLast
          ? "Finish Course"
          : "Continue →"
        : isLessonType
          ? "Next →"
          : "Check Answer";
  const btnBg =
    checked && !isLessonType ? (result ? T.success : T.danger) : T.primary;

  return (
    <div
      style={{
        position: "sticky",
        bottom: 0,
        background: `${T.surface}EE`,
        backdropFilter: "blur(12px)",
        borderTop: `1px solid ${T.border}`,
        padding: "16px 20px",
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      {checked && !isLessonType && (
        <FeedbackBanner result={result} explanation={step.explanation} />
      )}
      <button
        type="button"
        className="course-primary-btn"
        disabled={!canCheck}
        onClick={onAction}
        style={{
          width: "100%",
          border: "none",
          borderRadius: 12,
          padding: "14px 20px",
          fontFamily: T.fontSans,
          fontSize: 14.5,
          fontWeight: 600,
          letterSpacing: "0.02em",
          cursor: canCheck ? "pointer" : "default",
          background: btnBg,
          color: "#ffffff",
          opacity: !canCheck ? 0.22 : 1,
          transition: "all .2s ease",
        }}
      >
        {label}
      </button>
    </div>
  );
}

function CompletionScreen() {
  const { correctCt, totalSteps, xp } = useCourseStore();
  const navigate = useNavigate();
  const pct = Math.round((correctCt / totalSteps) * 100);

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 32,
        padding: "48px 24px",
        textAlign: "center",
      }}
    >
      {/* Trophy */}
      <div
        style={{
          width: 100,
          height: 100,
          background: `radial-gradient(circle, rgba(99,102,241,0.2), transparent 70%)`,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 52,
          animation: "trophy 0.7s cubic-bezier(.17,.89,.32,1.49) 0.1s both",
        }}
      >
        🏆
      </div>

      <div style={{ animation: "slideUp 0.5s ease 0.2s both" }}>
        <h2
          style={{
            fontFamily: T.fontSerif,
            fontSize: 30,
            fontWeight: 600,
            color: T.text,
            marginBottom: 10,
            letterSpacing: "-0.02em",
          }}
        >
          Course Complete!
        </h2>
        <p
          style={{
            fontFamily: T.fontSerif,
            fontSize: 16,
            color: T.textBody,
            maxWidth: 300,
            lineHeight: 1.75,
            margin: "0 auto",
          }}
        >
          Excellent work. You've mastered this lesson — keep the momentum going.
        </p>
      </div>

      {/* Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 12,
          width: "100%",
          maxWidth: 340,
          animation: "slideUp 0.5s ease 0.35s both",
        }}
      >
        {[
          {
            label: "Correct",
            value: `${correctCt}/${totalSteps}`,
            color: T.successText,
          },
          { label: "Score", value: `${pct}%`, color: T.amberText },
          { label: "XP", value: `+${xp}`, color: T.primary },
        ].map(({ label, value, color }) => (
          <div
            key={label}
            style={{
              padding: "16px 12px",
              background: T.surface2,
              border: `1px solid ${T.border}`,
              borderRadius: 14,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 6,
            }}
          >
            <span
              style={{
                fontSize: 11,
                color: T.textMuted,
                fontFamily: T.fontSans,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              {label}
            </span>
            <span
              style={{
                fontSize: 22,
                fontWeight: 600,
                color,
                fontFamily: T.fontSans,
              }}
            >
              {value}
            </span>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => navigate("/courses")}
        className="course-primary-btn"
        style={{
          padding: "14px 32px",
          background: T.primary,
          color: "#fff",
          border: "none",
          borderRadius: 12,
          fontSize: 14.5,
          fontWeight: 600,
          cursor: "pointer",
          fontFamily: T.fontSans,
          letterSpacing: "0.02em",
          transition: "all .2s ease",
          animation: "slideUp 0.5s ease 0.5s both",
        }}
      >
        Explore More Courses
      </button>
    </div>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function CourseContentPage() {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const course = ALL_COURSES.find((c) => c.id === courseId);

  if (!course) {
    return (
      <>
        <GlobalStyles />
        <div
          style={{
            minHeight: "100vh",
            background: T.bg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: 24,
            padding: 20,
            fontFamily: T.fontSans,
          }}
        >
          <div
            style={{
              width: 72,
              height: 72,
              background: T.surface2,
              borderRadius: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 32,
              border: `1px solid ${T.border}`,
            }}
          >
            🔍
          </div>
          <div style={{ textAlign: "center" }}>
            <h1
              style={{
                fontFamily: T.fontSerif,
                fontSize: 24,
                fontWeight: 600,
                color: T.text,
                marginBottom: 8,
              }}
            >
              Course not found
            </h1>
            <p style={{ color: T.textMuted, fontSize: 14 }}>
              This course doesn't exist or has been removed.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate("/courses")}
            className="course-primary-btn"
            style={{
              padding: "12px 24px",
              background: T.primary,
              color: "#fff",
              border: "none",
              borderRadius: 10,
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: T.fontSans,
            }}
          >
            Back to Courses
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <GlobalStyles />
      <CourseStoreProvider courseId={courseId} steps={course.steps}>
        <CourseContentInner
          course={course}
          onClose={() => navigate("/courses")}
        />
      </CourseStoreProvider>
    </>
  );
}

function CourseContentInner({ onClose }: any) {
  const {
    step,
    stepIdx,
    setStepIdx,
    totalSteps,
    answer,
    setAnswer,
    checked,
    setChecked,
    result,
    setResult,
    correctCt,
    setCorrectCt,
    done,
    setDone,
    saveProgress,
  } = useCourseStore();
  const [readyToAdvance, setReadyToAdvance] = useState(false);

  const handleCheck = useCallback(() => {
    const isLessonType = step.type === "lesson" || step.type === "code_lesson";
    if (isLessonType) {
      if (stepIdx + 1 >= totalSteps) {
        saveProgress();
        setDone(true);
      } else {
        setStepIdx(stepIdx + 1);
        setReadyToAdvance(false);
      }
    } else if (checked) {
      if (result === false) {
        // User has seen the failure banner — now reset to beginning
        setStepIdx(0);
        setAnswer(null);
        setChecked(false);
        setResult(null);
        setCorrectCt(0);
        setReadyToAdvance(false);
      } else {
        // Correct — advance
        setChecked(false);
        setAnswer(null);
        setResult(null);
        if (stepIdx + 1 >= totalSteps) {
          saveProgress();
          setDone(true);
        } else {
          setStepIdx(stepIdx + 1);
          setReadyToAdvance(false);
        }
      }
    } else {
      const isCorrect = validate(step, answer);
      setResult(isCorrect);
      // Always show the feedback banner (checked=true) regardless of correct/wrong
      setChecked(true);
      if (isCorrect) {
        setCorrectCt(correctCt + 1);
      }
    }
  }, [
    checked,
    result,
    stepIdx,
    totalSteps,
    answer,
    correctCt,
    step,
    setStepIdx,
    setChecked,
    setAnswer,
    setResult,
    setCorrectCt,
    saveProgress,
    setDone,
  ]);

  if (done) {
    return (
      <div
        style={{
          height: "100vh",
          background: T.bg,
          display: "flex",
          flexDirection: "column",
          fontFamily: T.fontSans,
        }}
      >
        <TopBar onClose={onClose} />
        <CompletionScreen />
      </div>
    );
  }

  const isAutoStep = step.type === "lesson" || step.type === "code_lesson";
  const canCheck = isAutoStep
    ? readyToAdvance
    : checked
      ? true
      : answer !== null;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: T.bg,
        display: "flex",
        flexDirection: "column",
        fontFamily: T.fontSans,
      }}
    >
      <TopBar onClose={onClose} />
      <div
        style={{
          flex: 1,
          padding: "28px 20px 16px",
          maxWidth: 780,
          width: "100%",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {step.type === "lesson" && (
          <LessonStep key={step.id} step={step} onReady={setReadyToAdvance} />
        )}
        {step.type === "code_lesson" && (
          <CodeLessonStep
            key={step.id}
            step={step}
            onReady={setReadyToAdvance}
          />
        )}
        {step.type === "quiz" && (
          <QuizStepComponent
            key={step.id}
            step={step}
            onAnswer={setAnswer}
            checked={checked}
            result={result}
          />
        )}
        {step.type === "quiz_code" && (
          <QuizStepComponent
            key={step.id}
            step={step}
            onAnswer={setAnswer}
            checked={checked}
            result={result}
          />
        )}
        {step.type === "true_false" && (
          <TrueFalseStepComponent
            key={step.id}
            step={step}
            onAnswer={setAnswer}
            checked={checked}
            result={result}
          />
        )}
        {step.type === "fill_code" && (
          <FillCodeStepComponent
            key={step.id}
            step={step}
            onAnswer={setAnswer}
            checked={checked}
            result={result}
          />
        )}
        {step.type === "match" && (
          <MatchStepComponent
            key={step.id}
            step={step}
            onAnswer={setAnswer}
            checked={checked}
            result={result}
          />
        )}
        {step.type === "reorder" && (
          <ReorderStepComponent
            key={step.id}
            step={step}
            onAnswer={setAnswer}
            checked={checked}
            result={result}
          />
        )}
        {step.type === "short_answer" && (
          <ShortAnswerStepComponent
            key={step.id}
            step={step}
            onAnswer={setAnswer}
            checked={checked}
            result={result}
          />
        )}
      </div>
      <BottomBar canCheck={canCheck} onAction={handleCheck} />
    </div>
  );
}
