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
  bg: "#F1EFE8",
  surface: "#ffffff",
  surface2: "#F1EFE8",
  border: "#D3D1C7",
  primary: "#185FA5",
  primaryLight: "#E6F1FB",
  primaryDark: "#0C447C",
  success: "#639922",
  successBg: "#EAF3DE",
  successText: "#3B6D11",
  danger: "#E24B4A",
  dangerBg: "#FCEBEB",
  dangerText: "#A32D2D",
  amber: "#BA7517",
  amberBg: "#FAEEDA",
  text: "#2C2C2A",
  textBody: "#444441",
  muted: "#888780",
  fontSans: "'DM Sans', 'Inter', sans-serif",
  fontSerif: "'Literata', 'Lora', serif",
  fontMono: "'JetBrains Mono', 'DM Mono', monospace",
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

// ─── STYLE HELPERS ────────────────────────────────────────────────────────────
function optionStyle(
  state: string,
): { background: string; border: string } {
  if (state === "correct")
    return { background: T.successBg, border: `2px solid ${T.success}` };
  if (state === "wrong")
    return { background: T.dangerBg, border: `2px solid ${T.danger}` };
  if (state === "selected")
    return { background: T.primaryLight, border: `2px solid ${T.primary}` };
  return { background: T.surface, border: `2px solid ${T.border}` };
}

function xpBadgeStyle(): React.CSSProperties {
  return {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    background: T.successBg,
    border: `1px solid ${T.success}44`,
    borderRadius: 9999,
    padding: "5px 14px",
    fontSize: 12,
    fontWeight: 500,
    color: T.successText,
    width: "fit-content",
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
          : T.surface2;
  const color =
    state === "correct" || state === "wrong" || state === "selected"
      ? "#fff"
      : T.muted;
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
        fontWeight: 500,
        color,
        flexShrink: 0,
        transition: "background .15s, color .15s",
      }}
    >
      {char}
    </span>
  );
}

function StepLabel({ text, icon }: any) {
  return (
    <div
      style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}
    >
      {icon && <span style={{ fontSize: 14 }}>{icon}</span>}
      <span
        style={{
          fontSize: 11,
          fontWeight: 500,
          letterSpacing: "0.08em",
          color: T.primary,
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
        fontFamily: T.fontSerif,
        fontSize: 19,
        fontWeight: 500,
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
  }, [onReady, step.id]);

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
          fontFamily: T.fontSerif,
          fontSize: 22,
          fontWeight: 500,
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
          fontFamily: T.fontSerif,
          fontSize: 15,
          lineHeight: 1.75,
          color: T.textBody,
        }}
        dangerouslySetInnerHTML={{ __html: step.content }}
      />
      {step.xp ? (
        <span style={xpBadgeStyle()}>⚡ +{step.xp} XP for reading</span>
      ) : null}
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
        gap: 16,
        animation: "slideIn 0.35s ease",
      }}
    >
      <StepLabel text="Code Lesson" icon="💻" />
      <h2
        style={{
          fontFamily: T.fontSerif,
          fontSize: 22,
          fontWeight: 500,
          color: T.text,
          lineHeight: 1.3,
        }}
      >
        {step.title}
      </h2>
      <p
        style={{
          fontFamily: T.fontSerif,
          fontSize: 15,
          color: T.textBody,
          lineHeight: 1.7,
        }}
      >
        {step.content}
      </p>

      {/* Dark code block per design spec */}
      <div
        style={{
          background: "#1e1e2e",
          border: "1px solid #2e2e3e",
          borderRadius: 10,
          overflow: "hidden",
          margin: "4px 0",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "8px 16px",
            background: "#16161e",
            borderBottom: "1px solid #2e2e3e",
          }}
        >
          <span
            style={{
              fontFamily: T.fontMono,
              fontSize: 11,
              color: "#7c7c9a",
              letterSpacing: "0.04em",
            }}
          >
            typescript
          </span>
        </div>
        <pre style={{ margin: 0, padding: "18px 20px", overflowX: "auto" }}>
          <code
            style={{
              fontFamily: T.fontMono,
              fontSize: 13,
              lineHeight: 1.7,
              color: "#cdd6f4",
            }}
          >
            {step.codeSnippet}
          </code>
        </pre>
      </div>

      {step.xp ? (
        <span style={xpBadgeStyle()}>⚡ +{step.xp} XP for reading</span>
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
          const os = optionStyle(state);
          return (
            <button
              key={i}
              type="button"
              className={isCode ? "option-btn code" : "option-btn"}
              disabled={checked}
              onClick={() => setSel(i)}
              style={{
                width: "100%",
                ...os,
                borderRadius: 12,
                padding: "14px 16px",
                color: T.text,
                fontFamily: isCode ? T.fontMono : T.fontSans,
                fontSize: isCode ? 12 : 14,
                fontWeight: isCode ? 400 : 500,
                cursor: checked ? "default" : "pointer",
                textAlign: "left",
                transition: "border-color .15s, background .15s",
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
              : checked && o.val === sel && sel !== step.correct
                ? "wrong"
                : !checked && o.val === sel
                  ? "selected"
                  : "idle";
          const os = optionStyle(state);
          return (
            <button
              key={String(o.val)}
              type="button"
              disabled={checked}
              onClick={() => setSel(o.val)}
              style={{
                ...os,
                borderRadius: 12,
                padding: "20px 12px",
                color: T.text,
                fontFamily: T.fontSans,
                fontSize: 15,
                fontWeight: 500,
                cursor: checked ? "default" : "pointer",
                textAlign: "center",
                transition: "border-color .15s, background .15s",
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
                  minWidth: 72,
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
                    : T.muted,
                  fontWeight: 500,
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

      {/* Dark code block */}
      <div
        style={{
          background: "#1e1e2e",
          border: "1px solid #2e2e3e",
          borderRadius: 10,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: "8px 16px",
            background: "#16161e",
            borderBottom: "1px solid #2e2e3e",
          }}
        >
          <span
            style={{
              fontFamily: T.fontMono,
              fontSize: 11,
              color: "#7c7c9a",
              letterSpacing: "0.04em",
            }}
          >
            fill in the blanks
          </span>
        </div>
        <pre
          style={{
            margin: 0,
            padding: "18px 20px",
            fontFamily: T.fontMono,
            fontSize: 13,
            lineHeight: 1.9,
            color: "#cdd6f4",
            overflowX: "auto",
            whiteSpace: "pre-wrap",
          }}
        >
          {renderCode()}
        </pre>
      </div>

      {/* Word bank */}
      <div>
        <p
          style={{
            fontSize: 12,
            color: T.muted,
            marginBottom: 8,
            fontFamily: T.fontSans,
          }}
        >
          Word bank — tap to fill, tap blank to clear:
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {step.wordBank.map((w: string, wi: number) => (
            <button
              key={wi}
              type="button"
              disabled={used.includes(wi) || checked}
              onClick={() => pick(w, wi)}
              style={{
                background: used.includes(wi) ? T.surface2 : T.surface,
                border: `2px solid ${T.border}`,
                borderRadius: 9999,
                padding: "6px 14px",
                fontFamily: T.fontMono,
                fontSize: 12,
                fontWeight: 500,
                color: T.text,
                cursor: used.includes(wi) || checked ? "default" : "pointer",
                transition: "border-color .15s, background .15s",
                opacity: used.includes(wi) ? 0.3 : 1,
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

  const getTermStyle = (term: string): React.CSSProperties => {
    const isMatched = matched[term] !== undefined;
    const isActive = selTerm === term;
    if (isMatched)
      return {
        background: T.successBg,
        border: `2px solid ${T.success}`,
        color: T.successText,
        cursor: "default",
        opacity: 0.8,
      };
    if (isActive)
      return {
        background: T.primaryLight,
        border: `2px solid ${T.primary}`,
        color: T.primary,
        cursor: "pointer",
      };
    return {
      background: T.surface,
      border: `2px solid ${T.border}`,
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
        border: `2px solid ${T.danger}`,
        color: T.dangerText,
        cursor: "default",
      };
    if (isMatched)
      return {
        background: T.successBg,
        border: `2px solid ${T.success}`,
        color: T.successText,
        cursor: "default",
        opacity: 0.8,
      };
    if (!checked && selTerm && !isMatched)
      return {
        background: T.primaryLight,
        border: `2px solid ${T.primary}`,
        color: T.primary,
        cursor: "pointer",
      };
    return {
      background: T.surface,
      border: `2px solid ${T.border}`,
      color: T.text,
      cursor: !selTerm || checked ? "default" : "pointer",
    };
  };

  const colLabel = {
    fontSize: 10,
    fontWeight: 500,
    letterSpacing: "0.08em",
    color: T.muted,
    textTransform: "uppercase" as const,
    marginBottom: 8,
    textAlign: "center" as const,
  };

  const itemBase: React.CSSProperties = {
    borderRadius: 8,
    padding: 12,
    fontSize: 13,
    fontWeight: 500,
    textAlign: "center",
    transition: "border-color .15s, background .15s",
    minHeight: 52,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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
      <p style={{ fontSize: 12, color: T.muted, fontFamily: T.fontSans }}>
        Use the arrows to rearrange:
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
                    : T.surface,
                border: `2px solid ${isCorrect ? T.success : isWrong ? T.danger : T.border}`,
                borderRadius: 8,
                padding: "12px 14px",
                fontFamily: T.fontMono,
                fontSize: 12,
                display: "flex",
                alignItems: "center",
                gap: 10,
                transition: "border-color .2s, background .2s",
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
                  fontWeight: 500,
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
                      color: T.muted,
                      cursor: checked ? "default" : "pointer",
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
        value={val}
        placeholder={step.placeholder || "Type your answer..."}
        disabled={checked}
        onChange={(e) => setVal(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onKeyDown={(e) =>
          e.key === "Enter" && !checked && val.trim() && onAnswer(val)
        }
        style={{
          width: "100%",
          background: isCorrect ? T.successBg : isWrong ? T.dangerBg : T.surface,
          border: `2px solid ${
            isCorrect
              ? T.success
              : isWrong
                ? T.danger
                : focused
                  ? T.primary
                  : T.border
          }`,
          borderRadius: 12,
          padding: "14px 16px",
          color: T.text,
          fontFamily: T.fontSans,
          fontSize: 15,
          outline: "none",
          transition: "border-color .15s, background .15s",
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
        height: 6,
        background: T.surface2,
        borderRadius: 9999,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          height: "100%",
          background: T.primary,
          borderRadius: 9999,
          width: `${value}%`,
          transition: "width 300ms ease-out",
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
        background: T.surface,
        borderBottom: `1px solid ${T.border}`,
        padding: "12px 16px",
        display: "flex",
        alignItems: "center",
        gap: 12,
      }}
    >
      <button
        type="button"
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
          transition: "color 150ms ease-in-out",
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
        background: result ? T.successBg : T.dangerBg,
        border: `1px solid ${result ? T.success : T.danger}`,
        animation: "slideUp 0.35s cubic-bezier(.4,0,.2,1) both",
      }}
    >
      <span
        style={{
          fontSize: 20,
          flexShrink: 0,
          marginTop: 1,
          color: result ? T.success : T.danger,
        }}
      >
        {result ? "✓" : "✗"}
      </span>
      <div>
        <p
          style={{
            fontSize: 15,
            fontWeight: 500,
            color: result ? T.successText : T.dangerText,
            marginBottom: 4,
          }}
        >
          {result ? "Correct!" : "Not quite!"}
        </p>
        <p
          style={{
            fontFamily: T.fontSerif,
            fontSize: 13,
            color: T.textBody,
            lineHeight: 1.6,
          }}
        >
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
  const label = checked ? (isLast ? "Finish" : "Continue →") : "Check";
  const btnBg =
    checked && !isLessonType ? (result ? T.success : T.danger) : T.primary;

  return (
    <div
      style={{
        position: "sticky",
        bottom: 0,
        background: T.surface,
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
        type="button"
        disabled={!canCheck}
        onClick={onAction}
        style={{
          width: "100%",
          border: "none",
          borderRadius: 8,
          padding: "9px 18px",
          fontFamily: T.fontSans,
          fontSize: 14,
          fontWeight: 500,
          cursor: canCheck ? "pointer" : "default",
          background: btnBg,
          color: "#ffffff",
          opacity: !canCheck ? 0.28 : 1,
          transition:
            "background 150ms ease-in-out, opacity 150ms ease-in-out",
        }}
        onMouseOver={(e) => {
          if (canCheck) e.currentTarget.style.opacity = "0.88";
        }}
        onMouseOut={(e) => {
          if (canCheck) e.currentTarget.style.opacity = "1";
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
        gap: 24,
        padding: "48px 24px",
        textAlign: "center",
        animation: "slideUp 0.5s ease",
      }}
    >
      <div
        style={{
          width: 96,
          height: 96,
          background: T.successBg,
          border: `2px solid ${T.success}`,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 44,
        }}
      >
        🏆
      </div>

      <div>
        <h2
          style={{
            fontFamily: T.fontSerif,
            fontSize: 22,
            fontWeight: 500,
            color: T.text,
            marginBottom: 8,
          }}
        >
          Lesson Complete!
        </h2>
        <p
          style={{
            fontFamily: T.fontSerif,
            fontSize: 15,
            color: T.textBody,
            maxWidth: 320,
            lineHeight: 1.7,
            margin: "0 auto",
          }}
        >
          Great job! You've finished this course. Now try the next one to keep
          learning.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 16,
          width: "100%",
          maxWidth: 320,
        }}
      >
        <div
          style={{
            padding: 16,
            background: T.surface,
            border: `1px solid ${T.border}`,
            borderRadius: 12,
          }}
        >
          <div style={{ fontSize: 12, color: T.muted, marginBottom: 4 }}>
            Correct
          </div>
          <div style={{ fontSize: 20, fontWeight: 500, color: T.success }}>
            {correctCt}/{totalSteps}
          </div>
        </div>
        <div
          style={{
            padding: 16,
            background: T.surface,
            border: `1px solid ${T.border}`,
            borderRadius: 12,
          }}
        >
          <div style={{ fontSize: 12, color: T.muted, marginBottom: 4 }}>
            Score
          </div>
          <div style={{ fontSize: 20, fontWeight: 500, color: T.amber }}>
            {pct}%
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => navigate("/courses")}
        style={{
          padding: "9px 18px",
          background: T.primary,
          color: "#ffffff",
          border: "none",
          borderRadius: 8,
          fontSize: 14,
          fontWeight: 500,
          cursor: "pointer",
          transition: "background 150ms ease-in-out",
          fontFamily: T.fontSans,
        }}
        onMouseOver={(e) =>
          (e.currentTarget.style.background = T.primaryDark)
        }
        onMouseOut={(e) => (e.currentTarget.style.background = T.primary)}
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
          fontFamily: T.fontSans,
        }}
      >
        <div style={{ fontSize: 48 }}>🔍</div>
        <h1
          style={{
            fontFamily: T.fontSerif,
            fontSize: 22,
            fontWeight: 500,
            color: T.text,
          }}
        >
          Course not found
        </h1>
        <button
          type="button"
          onClick={() => navigate("/courses")}
          style={{
            padding: "9px 18px",
            background: T.primary,
            color: "#ffffff",
            border: "none",
            borderRadius: 8,
            fontSize: 14,
            fontWeight: 500,
            cursor: "pointer",
            fontFamily: T.fontSans,
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
      if (stepIdx + 1 >= totalSteps) {
        saveProgress();
        setDone(true);
      } else {
        setStepIdx(stepIdx + 1);
        setReadyToAdvance(false);
      }
    } else if (checked) {
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
      const isCorrect = validate(step, answer);
      setResult(isCorrect);

      if (!isCorrect) {
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
  const canCheck = isAutoStep ? readyToAdvance : checked ? true : answer !== null;

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
          padding: "24px 20px",
          maxWidth: 800,
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
