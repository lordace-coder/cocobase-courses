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

const T = {
  bg: "#0d1117",
  surface: "#161b22",
  surface2: "#1c2430",
  border: "#30363d",
  green: "#39d353",
  greenDim: "rgba(57,211,83,0.14)",
  greenGlow: "rgba(57,211,83,0.35)",
  red: "#f85149",
  redDim: "rgba(248,81,73,0.12)",
  amber: "#e3b341",
  text: "#e6edf3",
  muted: "#7d8590",
  fontSans: "'Sora', sans-serif",
  fontMono: "'JetBrains Mono', monospace",
};

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

// ─── SHARED COMPONENTS ────────────────────────────────────────────────────────
function OptionLabel({ char, state }: any) {
  const bg =
    state === "correct"
      ? T.green
      : state === "wrong"
        ? T.red
        : state === "selected"
          ? T.green
          : T.surface2;
  const color =
    state === "correct" ? "#000" : state === "wrong" ? "#fff" : T.muted;
  return (
    <span
      style={{
        minWidth: 28,
        height: 28,
        background: bg,
        borderRadius: 6,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 12,
        fontWeight: 700,
        color,
        flexShrink: 0,
        transition: "background .2s,color .2s",
      }}
    >
      {char}
    </span>
  );
}

function StepLabel({ text, icon }: any) {
  return (
    <div
      style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 4 }}
    >
      {icon && <span style={{ fontSize: 14 }}>{icon}</span>}
      <span
        style={{
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: ".11em",
          color: T.green,
          textTransform: "uppercase",
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
        fontSize: 19,
        fontWeight: 700,
        lineHeight: 1.45,
        color: T.text,
        marginBottom: 20,
      }}
    >
      {children}
    </p>
  );
}

// ─── STEP COMPONENTS ──────────────────────────────────────────────────────────
function LessonStep({ step, onReady }: any) {
  useEffect(() => {
    onReady(true);
  }, [onReady]);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 16,
        animation: "slideIn 0.35s ease",
      }}
    >
      <StepLabel text="Lesson" icon="📖" />
      {step.icon && <div style={{ fontSize: 36 }}>{step.icon}</div>}
      <h2
        style={{
          fontSize: 22,
          fontWeight: 800,
          color: T.text,
          lineHeight: 1.3,
        }}
      >
        {step.title}
      </h2>
      <div
        style={{
          background: T.surface,
          border: `1px solid ${T.border}`,
          borderRadius: 12,
          padding: "18px 20px",
          fontSize: 15,
          lineHeight: 1.75,
          color: T.muted,
        }}
        dangerouslySetInnerHTML={{ __html: step.content }}
      />
      {step.xp ? (
        <span className="xp-badge">⚡ +{step.xp} XP for reading</span>
      ) : null}
    </div>
  );
}

function CodeLessonStep({ step, onReady }: any) {
  useEffect(() => {
    onReady(true);
  }, [onReady]);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 16,
        animation: "slideIn 0.35s ease",
      }}
    >
      <StepLabel text="Code Lesson" icon="💻" />
      <h2
        style={{
          fontSize: 22,
          fontWeight: 800,
          color: T.text,
          lineHeight: 1.3,
        }}
      >
        {step.title}
      </h2>
      <p style={{ fontSize: 15, color: T.muted, lineHeight: 1.6 }}>
        {step.content}
      </p>
      <div
        style={{
          background: "#0d1117",
          border: `1px solid ${T.border}`,
          borderRadius: 12,
          padding: 16,
          fontFamily: T.fontMono,
          fontSize: 12,
          lineHeight: 1.8,
          color: "#a9b1d6",
          overflowX: "auto",
          whiteSpace: "pre",
        }}
      >
        {step.codeSnippet}
      </div>
      {step.xp ? (
        <span className="xp-badge">⚡ +{step.xp} XP for reading</span>
      ) : null}
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
        gap: 16,
        animation: "slideIn 0.35s ease",
      }}
    >
      <StepLabel
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
          return (
            <button
              key={i}
              className={`option-btn ${isCode ? "code" : ""} ${state !== "idle" ? state : ""}`}
              disabled={checked}
              onClick={() => setSel(i)}
              style={{
                width: "100%",
                background: T.surface,
                border: `2px solid ${T.border}`,
                borderRadius: 12,
                padding: "14px 16px",
                color: T.text,
                fontFamily: T.fontSans,
                fontSize: 14,
                fontWeight: 600,
                cursor: checked ? "default" : "pointer",
                textAlign: "left",
                transition: "border-color .15s,background .15s,transform .1s",
                display: "flex",
                alignItems: "flex-start",
                gap: 12,
              }}
            >
              <OptionLabel char={labels[i]} state={state} />
              <span style={{ flex: 1 }}>{opt}</span>
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
    { val: true, label: "True", icon: "✓" },
    { val: false, label: "False", icon: "✗" },
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 16,
        animation: "slideIn 0.35s ease",
      }}
    >
      <StepLabel text="True or False" icon="⚖️" />
      <QuestionText>{step.question}</QuestionText>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {opts.map((o) => {
          const state =
            checked && o.val === step.correct
              ? "correct"
              : checked && o.val === sel
                ? "wrong"
                : !checked && o.val === sel
                  ? "selected"
                  : "idle";
          return (
            <button
              key={String(o.val)}
              className={`tf-btn ${state !== "idle" ? state : ""}`}
              disabled={checked}
              onClick={() => setSel(o.val)}
              style={{
                background: T.surface,
                border: `2px solid ${T.border}`,
                borderRadius: 12,
                padding: "20px 12px",
                color: T.text,
                fontFamily: T.fontSans,
                fontSize: 15,
                fontWeight: 700,
                cursor: checked ? "default" : "pointer",
                textAlign: "center",
                transition: "border-color .15s,background .15s",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8,
              }}
            >
              <span style={{ fontSize: 32 }}>{o.icon}</span>
              {o.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function FillCodeStepComponent({ step, onAnswer, checked }: any) {
  const blankIndices = step.blanks; // e.g., [3]
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
    setUsed(used.filter((u) => u !== wi));
    setActive(blankIdx);
  };

  // Build the code display with inline blanks only at specified positions
  const renderCode = () => {
    const elements: React.ReactNode[] = [];
    let blankCounter = 0;

    step.codeTemplate.forEach((part: string, idx: number) => {
      const hasBlank = blankIndices.includes(idx);
      const blankIdx = blankIndices.indexOf(idx);

      // Split part by newline to handle line breaks correctly
      const lines = part.split("\n");
      lines.forEach((line, lineIdx) => {
        if (lineIdx > 0) elements.push(<br key={`br-${idx}-${lineIdx}`} />);

        if (hasBlank && line.includes("______")) {
          const [beforeBlank, afterBlank] = line.split("______");
          elements.push(
            <span key={`line-${idx}-${lineIdx}`}>
              <span>{beforeBlank}</span>
              <span
                onClick={() => fills[blankIdx] && clear(blankIdx)}
                style={{
                  display: "inline-block",
                  minWidth: 72,
                  borderBottom: `2px solid`,
                  borderColor: checked
                    ? fills[blankIdx]
                      ? T.green
                      : T.red
                    : active === blankIdx
                      ? T.green
                      : T.border,
                  color: fills[blankIdx]
                    ? checked
                      ? fills[blankIdx] === step.blankAnswers[blankIdx]
                        ? T.green
                        : T.red
                      : T.green
                    : T.muted,
                  fontWeight: 700,
                  textAlign: "center",
                  padding: "0 4px",
                  cursor: fills[blankIdx] ? "pointer" : "default",
                  borderRadius: 2,
                  transition: "border-color .2s",
                }}
              >
                {fills[blankIdx] || (active === blankIdx ? "▌" : "______")}
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
        gap: 16,
        animation: "slideIn 0.35s ease",
      }}
    >
      <StepLabel text="Fill in the Code" icon="✏️" />
      <QuestionText>{step.question}</QuestionText>
      <div
        style={{
          background: "#0d1117",
          border: `1px solid ${T.border}`,
          borderRadius: 12,
          padding: 16,
          fontFamily: T.fontMono,
          fontSize: 13,
          lineHeight: 1.9,
          color: "#a9b1d6",
          overflowX: "auto",
          whiteSpace: "pre-wrap",
        }}
      >
        {renderCode()}
      </div>
      <div>
        <p style={{ fontSize: 12, color: T.muted, marginBottom: 8 }}>
          Word bank — tap to fill, tap blank to clear:
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {step.wordBank.map((w: string, wi: number) => (
            <button
              key={wi}
              disabled={used.includes(wi) || checked}
              onClick={() => pick(w, wi)}
              style={{
                background: T.surface,
                border: `2px solid ${T.border}`,
                borderRadius: 999,
                padding: "6px 14px",
                fontFamily: T.fontMono,
                fontSize: 12,
                fontWeight: 600,
                color: T.text,
                cursor: used.includes(wi) || checked ? "default" : "pointer",
                transition: "border-color .15s,background .15s,color .15s",
                opacity: used.includes(wi) ? 0.25 : 1,
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
    const ok = pair?.def === def;
    if (ok) {
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

  // Helper to get styles for term item
  const getTermStyle = (term: string) => {
    const isMatched = matched[term] !== undefined;
    const isActive = selTerm === term;
    let bg = T.surface;
    let borderColor = T.border;
    let color = T.text;
    if (!checked) {
      if (isMatched) {
        bg = T.greenDim;
        borderColor = T.green;
        color = T.green;
      } else if (isActive) {
        bg = T.greenDim;
        borderColor = T.green;
        color = T.green;
      }
    }
    return {
      background: bg,
      border: `2px solid ${borderColor}`,
      color,
      cursor: isMatched || checked ? "default" : "pointer",
      opacity: isMatched ? 0.7 : 1,
    };
  };

  // Helper to get styles for definition item
  const getDefStyle = (def: string) => {
    let opacity;
    const isMatched = Object.values(matched).includes(def);
    const isWrongFlash = wrongPair?.def === def;
    let bg = T.surface;
    let borderColor = T.border;
    let color = T.text;
    if (isWrongFlash && !checked) {
      bg = T.redDim;
      borderColor = T.red;
      color = T.red;
    } else if (!checked && selTerm && !isMatched) {
      bg = T.greenDim;
      borderColor = T.green;
      color = T.green;
    } else if (isMatched) {
      bg = T.greenDim;
      borderColor = T.green;
      color = T.green;
      opacity = 0.7;
    }
    return {
      background: bg,
      border: `2px solid ${borderColor}`,
      color,
      cursor: isMatched || !selTerm || checked ? "default" : "pointer",
      opacity: isMatched ? 0.7 : 1,
    };
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 16,
        animation: "slideIn 0.35s ease",
      }}
    >
      <StepLabel text="Match" icon="🔗" />
      <QuestionText>{step.question}</QuestionText>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <div>
          <p
            style={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: ".1em",
              color: T.muted,
              textTransform: "uppercase",
              marginBottom: 8,
              textAlign: "center",
            }}
          >
            Method
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {step.pairs.map((pair: any, i: number) => {
              const style = getTermStyle(pair.term);
              return (
                <div
                  key={i}
                  onClick={() =>
                    !checked && !matched[pair.term] && setSelTerm(pair.term)
                  }
                  style={{
                    ...style,
                    borderRadius: 8,
                    padding: 12,
                    fontSize: 13,
                    fontWeight: 600,
                    textAlign: "center",
                    transition:
                      "border-color .15s,background .15s,transform .1s",
                    minHeight: 52,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {pair.term}
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <p
            style={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: ".1em",
              color: T.muted,
              textTransform: "uppercase",
              marginBottom: 8,
              textAlign: "center",
            }}
          >
            Meaning
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {step.pairs.map((pair: any, i: number) => {
              const style = getDefStyle(pair.def);
              return (
                <div
                  key={i}
                  onClick={() => clickDef(pair.def)}
                  style={{
                    ...style,
                    borderRadius: 8,
                    padding: 12,
                    fontSize: 13,
                    fontWeight: 600,
                    textAlign: "center",
                    transition:
                      "border-color .15s,background .15s,transform .1s",
                    minHeight: 52,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {pair.def}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {selTerm && (
        <p
          style={{
            fontSize: 12,
            color: T.green,
            textAlign: "center",
            animation: "pulse 1s infinite",
          }}
        >
          Now tap a meaning for <strong>{selTerm}</strong>
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
        gap: 16,
        animation: "slideIn 0.35s ease",
      }}
    >
      <StepLabel text="Reorder" icon="↕️" />
      <QuestionText>{step.question}</QuestionText>
      <p style={{ fontSize: 12, color: T.muted }}>
        Use the arrows to rearrange:
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {items.map((item: any, idx: number) => {
          const cls =
            "reorder-item " +
            (checked
              ? step.correct[idx] === item.id
                ? "correct"
                : "wrong"
              : "");
          return (
            <div
              key={item.id}
              className={cls}
              style={{
                background: T.surface,
                border: `2px solid ${T.border}`,
                borderRadius: 8,
                padding: "12px 14px",
                fontFamily: T.fontMono,
                fontSize: 12,
                display: "flex",
                alignItems: "center",
                gap: 10,
                transition: "border-color .2s,background .2s,transform .15s",
              }}
            >
              <span
                style={{
                  minWidth: 24,
                  height: 24,
                  background: T.surface2,
                  borderRadius: 4,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 11,
                  fontWeight: 700,
                  color: T.muted,
                  fontFamily: T.fontSans,
                  flexShrink: 0,
                }}
              >
                {idx + 1}
              </span>
              <span style={{ flex: 1, color: T.text, fontSize: 12 }}>
                {item.text}
              </span>
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {[
                  [-1, "▲"],
                  [1, "▼"],
                ].map(([d, lbl]) => (
                  <button
                    key={d}
                    onClick={() => move(idx, d as number)}
                    disabled={checked}
                    style={{
                      background: "none",
                      border: "none",
                      color: T.muted,
                      cursor: "pointer",
                      fontSize: 13,
                      padding: "2px 4px",
                      lineHeight: 1,
                      opacity:
                        (d === -1 && idx === 0) ||
                        (d === 1 && idx === items.length - 1)
                          ? 0.25
                          : 1,
                    }}
                  >
                    {lbl as string}
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

  useEffect(() => {
    setVal("");
    onAnswer(null);
  }, [step.id, onAnswer]);

  useEffect(() => {
    onAnswer(val.trim() || null);
  }, [val, onAnswer]);

  const st = checked ? (validate(step, val) ? "correct" : "wrong") : "";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 16,
        animation: "slideIn 0.35s ease",
      }}
    >
      <StepLabel text="Short Answer" icon="⌨️" />
      <QuestionText>{step.question}</QuestionText>
      {step.hint && (
        <p
          style={{
            fontSize: 13,
            color: T.muted,
            fontStyle: "italic",
            fontFamily: T.fontMono,
          }}
        >
          {step.hint}
        </p>
      )}
      <input
        className={`short-input ${st}`}
        value={val}
        placeholder={step.placeholder || "Type your answer..."}
        disabled={checked}
        onChange={(e) => setVal(e.target.value)}
        onKeyDown={(e) =>
          e.key === "Enter" && !checked && val.trim() && onAnswer(val)
        }
        style={{
          width: "100%",
          background: T.surface,
          border: `2px solid ${T.border}`,
          borderRadius: 12,
          padding: "14px 16px",
          color: T.text,
          fontFamily: T.fontSans,
          fontSize: 15,
          outline: "none",
          transition: "border-color .15s",
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
        height: 10,
        background: T.surface2,
        borderRadius: 999,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          height: "100%",
          background: T.green,
          borderRadius: 999,
          width: `${value}%`,
          transition: "width .6s cubic-bezier(.4,0,.2,1)",
          boxShadow: `0 0 10px ${T.greenGlow}`,
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
        background: T.bg,
        borderBottom: `1px solid ${T.border}`,
        padding: "12px 16px",
        display: "flex",
        alignItems: "center",
        gap: 12,
      }}
    >
      <button
        onClick={onClose}
        style={{
          background: "none",
          border: "none",
          color: T.muted,
          cursor: "pointer",
          fontSize: 20,
          padding: "4px 6px",
          borderRadius: 6,
          lineHeight: 1,
          transition: "color .2s",
        }}
        onMouseOver={(e) => (e.currentTarget.style.color = T.text)}
        onMouseOut={(e) => (e.currentTarget.style.color = T.muted)}
      >
        ✕
      </button>
      <ProgressBar value={progress} />
    </div>
  );
}

function FeedbackBanner({ result, explanation }: any) {
  return (
    <div
      style={{
        borderRadius: 12,
        padding: "14px 16px",
        display: "flex",
        alignItems: "flex-start",
        gap: 12,
        background: result ? "rgba(57,211,83,.09)" : "rgba(248,81,73,.09)",
        border: `1px solid ${result ? "rgba(57,211,83,.3)" : "rgba(248,81,73,.3)"}`,
        animation: "slideUp 0.35s cubic-bezier(.4,0,.2,1) both",
      }}
    >
      <span style={{ fontSize: 20, flexShrink: 0, marginTop: 1 }}>
        {result ? "✓" : "✗"}
      </span>
      <div>
        <p
          style={{
            fontSize: 15,
            fontWeight: 700,
            color: result ? T.green : T.red,
            marginBottom: 4,
          }}
        >
          {result ? "Correct!" : "Not quite!"}
        </p>
        <p style={{ fontSize: 13, color: T.muted, lineHeight: 1.55 }}>
          {explanation}
        </p>
      </div>
    </div>
  );
}

function BottomBar({ canCheck, onAction }: any) {
  const { checked, result, stepIdx, totalSteps, step } = useCourseStore();
  const isLast = stepIdx + 1 >= totalSteps;
  const isLessonType = step.type === "lesson" || step.type === "code_lesson";
  const label = checked ? (isLast ? "🏁 Finish" : "Continue →") : "Check";
  const btnState =
    checked && !isLessonType ? (result ? "pass" : "fail") : "idle";

  return (
    <div
      style={{
        position: "sticky",
        bottom: 0,
        background: T.bg,
        borderTop: `1px solid ${T.border}`,
        padding: 16,
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      {checked && !isLessonType && (
        <FeedbackBanner result={result} explanation={step.explanation} />
      )}
      <button
        className={`check-btn ${btnState}`}
        disabled={!canCheck}
        onClick={onAction}
        style={{
          width: "100%",
          border: "none",
          borderRadius: 12,
          padding: 16,
          fontFamily: T.fontSans,
          fontSize: 16,
          fontWeight: 800,
          letterSpacing: ".04em",
          cursor: canCheck ? "pointer" : "default",
          transition: "opacity .2s,transform .1s,background .2s",
          background:
            btnState === "pass"
              ? T.green
              : btnState === "fail"
                ? T.red
                : T.green,
          color: btnState === "fail" ? "#fff" : "#000",
          opacity: !canCheck ? 0.28 : 1,
        }}
      >
        {label}
      </button>
    </div>
  );
}

function CompletionScreen() {
  const { correctCt, totalSteps } = useCourseStore();
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
        gap: 20,
        padding: "40px 24px",
        textAlign: "center",
        animation: "slideUp 0.5s ease",
      }}
    >
      <div
        style={{
          width: 96,
          height: 96,
          background: T.greenDim,
          border: `3px solid ${T.green}`,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 44,
          animation: "glow 1.6s ease infinite",
        }}
      >
        🏆
      </div>
      <h2 style={{ fontSize: 28, fontWeight: 800, color: T.green }}>
        Lesson Complete!
      </h2>
      <p
        style={{ fontSize: 14, color: T.muted, maxWidth: 300, lineHeight: 1.6 }}
      >
        Great job! You've finished this course. Now try the next one to keep
        learning.
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 16,
          marginTop: 20,
        }}
      >
        <div style={{ padding: 16, background: T.surface, borderRadius: 8 }}>
          <div style={{ fontSize: 12, color: T.muted, marginBottom: 4 }}>
            Correct
          </div>
          <div style={{ fontSize: 20, fontWeight: 800, color: T.green }}>
            {correctCt}/{totalSteps}
          </div>
        </div>
        <div style={{ padding: 16, background: T.surface, borderRadius: 8 }}>
          <div style={{ fontSize: 12, color: T.muted, marginBottom: 4 }}>
            Score
          </div>
          <div style={{ fontSize: 20, fontWeight: 800, color: T.amber }}>
            {pct}%
          </div>
        </div>
      </div>
      <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
        <button
          onClick={() => navigate("/courses")}
          style={{
            padding: "12px 24px",
            background: T.green,
            color: "#000",
            border: "none",
            borderRadius: 12,
            fontSize: 14,
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          Explore More Courses
        </button>
      </div>
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
      <div
        style={{
          minHeight: "100vh",
          background: T.bg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: 20,
          padding: 20,
        }}
      >
        <div style={{ fontSize: 48 }}>❌</div>
        <h1 style={{ color: T.text, fontSize: 24 }}>Course not found</h1>
        <button
          onClick={() => navigate("/courses")}
          style={{
            padding: "12px 24px",
            background: T.green,
            color: "#000",
            border: "none",
            borderRadius: 12,
            fontSize: 14,
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          Back to Courses
        </button>
      </div>
    );
  }

  return (
    <CourseStoreProvider courseId={courseId} steps={course.steps}>
      <CourseContentInner
        course={course}
        onClose={() => navigate("/courses")}
      />
    </CourseStoreProvider>
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
      // For lessons, just advance without checking
      if (stepIdx + 1 >= totalSteps) {
        saveProgress();
        setDone(true);
      } else {
        setStepIdx(stepIdx + 1);
        setReadyToAdvance(false);
      }
    } else if (checked) {
      // Advance to next or finish after checking answer
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
    } else {
      // Check answer for quiz/challenge types
      const isCorrect = validate(step, answer);
      setResult(isCorrect);

      if (!isCorrect) {
        // Restart course on wrong answer
        setStepIdx(0);
        setAnswer(null);
        setChecked(false);
        setResult(null);
        setCorrectCt(0);
      } else {
        setCorrectCt(correctCt + 1);
        setChecked(true);
      }
    }
  }, [
    checked,
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

  // Check if done
  if (done) {
    return (
      <div
        style={{
          height: "100vh",
          background: T.bg,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <TopBar onClose={onClose} />
        <CompletionScreen />
      </div>
    );
  }

  // Inside CourseContentInner component
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
      }}
    >
      <TopBar onClose={onClose} />
      <div
        style={{
          flex: 1,
          padding: "24px 20px",
          maxWidth: 800,
          width: "100%",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {step.type === "lesson" && (
          <LessonStep step={step} onReady={setReadyToAdvance} />
        )}
        {step.type === "code_lesson" && (
          <CodeLessonStep step={step} onReady={setReadyToAdvance} />
        )}
        {step.type === "quiz" && (
          <QuizStepComponent
            step={step}
            onAnswer={setAnswer}
            checked={checked}
            result={result}
          />
        )}
        {step.type === "quiz_code" && (
          <QuizStepComponent
            step={step}
            onAnswer={setAnswer}
            checked={checked}
            result={result}
          />
        )}
        {step.type === "true_false" && (
          <TrueFalseStepComponent
            step={step}
            onAnswer={setAnswer}
            checked={checked}
            result={result}
          />
        )}
        {step.type === "fill_code" && (
          <FillCodeStepComponent
            step={step}
            onAnswer={setAnswer}
            checked={checked}
            result={result}
          />
        )}
        {step.type === "match" && (
          <MatchStepComponent
            step={step}
            onAnswer={setAnswer}
            checked={checked}
            result={result}
          />
        )}
        {step.type === "reorder" && (
          <ReorderStepComponent
            step={step}
            onAnswer={setAnswer}
            checked={checked}
            result={result}
          />
        )}
        {step.type === "short_answer" && (
          <ShortAnswerStepComponent
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
