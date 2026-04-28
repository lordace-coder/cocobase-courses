import { useNavigate } from "react-router-dom";
import { ALL_COURSES } from "../data/courses";
import { getCourseProgress } from "../utils/progressStorage";

// ─── DESIGN TOKENS (matches CourseContentPage) ────────────────────────────────
const T = {
  bg: "#0A0A0F",
  surface: "#111118",
  surface2: "#16161F",
  surface3: "#1C1C27",
  border: "#2A2A3A",
  borderLight: "#333344",

  primary: "#6366F1",
  primaryLight: "rgba(99,102,241,0.12)",
  primaryMid: "rgba(99,102,241,0.25)",
  primaryGlow: "rgba(99,102,241,0.3)",

  success: "#22C55E",
  successBg: "rgba(34,197,94,0.1)",
  successBorder: "rgba(34,197,94,0.3)",
  successText: "#4ADE80",

  text: "#F0F0F8",
  textBody: "#A8A8C0",
  textMuted: "#5A5A72",

  fontSans: "'DM Sans', 'Inter', sans-serif",
  fontSerif: "'Playfair Display', 'Georgia', serif",
  fontMono: "'JetBrains Mono', 'Fira Code', monospace",
};

// ─── GLOBAL STYLES ────────────────────────────────────────────────────────────
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Playfair+Display:wght@500;600&family=JetBrains+Mono:wght@400;500&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  .course-card {
    background: ${T.surface};
    border: 1px solid ${T.border};
    border-radius: 18px;
    overflow: hidden;
    cursor: pointer;
    transition: transform 200ms ease, border-color 200ms ease, box-shadow 200ms ease;
    display: flex;
    flex-direction: column;
  }
  .course-card:hover {
    transform: translateY(-4px);
    border-color: ${T.borderLight};
    box-shadow: 0 16px 48px rgba(0,0,0,0.5), 0 0 0 1px ${T.borderLight};
  }
  .course-card:hover .card-arrow {
    transform: translateX(3px);
    opacity: 1 !important;
  }
  .course-card:hover .card-cta {
    color: ${T.primary} !important;
  }

  .back-btn:hover {
    color: ${T.text} !important;
    background: ${T.surface2} !important;
  }

  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: ${T.border}; border-radius: 4px; }
`;

function GlobalStyles() {
  return <style dangerouslySetInnerHTML={{ __html: globalStyles }} />;
}

// ─── DIFF BADGE ───────────────────────────────────────────────────────────────
function diffBadge(diff: string): { bg: string; color: string; border: string } {
  if (diff === "beginner")     return { bg: "rgba(99,102,241,0.1)",  color: "#818CF8", border: "rgba(99,102,241,0.25)" };
  if (diff === "intermediate") return { bg: "rgba(245,158,11,0.1)",  color: "#FCD34D", border: "rgba(245,158,11,0.25)" };
  return                              { bg: "rgba(248,113,113,0.1)", color: "#FCA5A5", border: "rgba(248,113,113,0.25)" };
}

// ─── COURSE CARD ──────────────────────────────────────────────────────────────
function CourseCard({ course, index }: { course: any; index: number }) {
  const navigate = useNavigate();
  const progress = getCourseProgress(course.id);
  const total = course.steps.length;
  const completed = progress?.completedSteps?.length ?? 0;
  const pct = total > 0 ? (completed / total) * 100 : 0;
  const isComplete = progress?.isComplete;
  const badge = diffBadge(course.difficulty);
  const hasProgress = !!progress && !isComplete;

  return (
    <div
      className="course-card"
      onClick={() => navigate(`/course/${course.id}`)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && navigate(`/course/${course.id}`)}
      style={{
        animation: `fadeUp 0.5s ease ${index * 0.06}s both`,
      }}
    >
      {/* Thumbnail */}
      <div style={{
        height: 130,
        background: `linear-gradient(135deg, ${course.color}18 0%, ${course.color}35 100%)`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 52, position: "relative", overflow: "hidden",
        borderBottom: `1px solid ${T.border}`,
        flexShrink: 0,
      }}>
        {/* Subtle grid pattern overlay */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `radial-gradient(circle, ${course.color}15 1px, transparent 1px)`,
          backgroundSize: "20px 20px",
        }} />
        <span style={{ position: "relative", zIndex: 1, filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.4))" }}>
          {course.icon}
        </span>
        {isComplete && (
          <div style={{
            position: "absolute", top: 12, right: 12,
            background: T.successBg, border: `1px solid ${T.successBorder}`,
            borderRadius: 9999, padding: "4px 10px",
            display: "flex", alignItems: "center", gap: 5,
          }}>
            <span style={{ color: T.success, fontSize: 11 }}>✓</span>
            <span style={{ fontSize: 10, fontWeight: 600, color: T.successText, fontFamily: T.fontSans, letterSpacing: "0.06em" }}>
              DONE
            </span>
          </div>
        )}
      </div>

      {/* Body */}
      <div style={{ padding: "18px 20px 20px", display: "flex", flexDirection: "column", flex: 1 }}>
        {/* Top badges */}
        <div style={{ display: "flex", gap: 6, marginBottom: 12, flexWrap: "wrap" }}>
          <span style={{
            fontSize: 10, fontWeight: 600, padding: "3px 9px", borderRadius: 9999,
            background: badge.bg, color: badge.color, border: `1px solid ${badge.border}`,
            fontFamily: T.fontSans, letterSpacing: "0.07em", textTransform: "uppercase",
          }}>
            {course.difficulty}
          </span>
          <span style={{
            fontSize: 10, fontWeight: 500, padding: "3px 9px", borderRadius: 9999,
            background: T.surface2, color: T.textMuted, border: `1px solid ${T.border}`,
            fontFamily: T.fontSans, letterSpacing: "0.04em",
          }}>
            {total} steps
          </span>
          <span style={{
            fontSize: 10, fontWeight: 500, padding: "3px 9px", borderRadius: 9999,
            background: T.surface2, color: T.textMuted, border: `1px solid ${T.border}`,
            fontFamily: T.fontSans, letterSpacing: "0.04em",
          }}>
            {course.duration} min
          </span>
        </div>

        <h3 style={{
          fontSize: 16, fontWeight: 600, color: T.text,
          marginBottom: 8, lineHeight: 1.35, fontFamily: T.fontSans,
          letterSpacing: "-0.01em",
        }}>
          {course.title}
        </h3>

        <p style={{
          fontFamily: T.fontSerif, fontSize: 13.5, color: T.textBody,
          lineHeight: 1.7, flex: 1, marginBottom: 16,
        }}>
          {course.description}
        </p>

        {/* Progress or CTA */}
        {hasProgress ? (
          <div>
            <div style={{
              display: "flex", justifyContent: "space-between",
              fontSize: 11, color: T.textMuted, marginBottom: 7,
              fontFamily: T.fontSans,
            }}>
              <span style={{ color: T.primary, fontWeight: 500 }}>{Math.round(pct)}% complete</span>
              <span>{total - completed} left</span>
            </div>
            <div style={{
              height: 4, background: T.surface3,
              borderRadius: 9999, overflow: "hidden",
            }}>
              <div style={{
                height: "100%",
                background: `linear-gradient(90deg, ${T.primary}, #818CF8)`,
                borderRadius: 9999, width: `${pct}%`,
                transition: "width 400ms ease",
                boxShadow: `0 0 8px ${T.primaryGlow}`,
              }} />
            </div>
          </div>
        ) : isComplete ? (
          <div style={{
            display: "flex", alignItems: "center", gap: 8,
          }}>
            <div style={{
              height: 4, background: T.surface3,
              borderRadius: 9999, overflow: "hidden", flex: 1,
            }}>
              <div style={{
                height: "100%", background: T.success,
                borderRadius: 9999, width: "100%",
                boxShadow: `0 0 8px rgba(34,197,94,0.3)`,
              }} />
            </div>
            <span style={{ fontSize: 11, color: T.successText, fontFamily: T.fontSans, fontWeight: 500, flexShrink: 0 }}>
              Replay
            </span>
          </div>
        ) : (
          <div className="card-cta" style={{
            display: "flex", alignItems: "center", gap: 6,
            color: T.textMuted, fontFamily: T.fontSans,
            fontSize: 13.5, fontWeight: 500,
            transition: "color 200ms ease",
          }}>
            <span>Start learning</span>
            <span className="card-arrow" style={{
              opacity: 0.5,
              transition: "transform 200ms ease, opacity 200ms ease",
            }}>→</span>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function CoursesListPage() {
  const navigate = useNavigate();

  const totalCourses = ALL_COURSES.length;
  const completedCount = ALL_COURSES.filter((c) => getCourseProgress(c.id)?.isComplete).length;
  const inProgressCount = ALL_COURSES.filter((c) => {
    const p = getCourseProgress(c.id);
    return p && !p.isComplete;
  }).length;

  return (
    <>
      <GlobalStyles />
      <div style={{
        minHeight: "100vh",
        background: T.bg,
        fontFamily: T.fontSans,
      }}>
        {/* Top nav bar */}
        <div style={{
          position: "sticky", top: 0, zIndex: 50,
          background: `${T.surface}EE`, backdropFilter: "blur(12px)",
          borderBottom: `1px solid ${T.border}`,
          padding: "14px 24px",
          display: "flex", alignItems: "center", gap: 16,
        }}>
          <button
            type="button"
            className="back-btn"
            onClick={() => navigate("/")}
            style={{
              padding: "7px 14px", background: "transparent",
              border: `1px solid ${T.border}`, color: T.textMuted,
              fontSize: 13, cursor: "pointer",
              display: "flex", alignItems: "center", gap: 6,
              fontFamily: T.fontSans, borderRadius: 8, fontWeight: 500,
              transition: "all .15s ease",
            }}
          >
            ← Back
          </button>
          <div style={{
            width: 1, height: 20, background: T.border, flexShrink: 0,
          }} />
          <span style={{
            fontFamily: T.fontMono, fontSize: 11.5, color: T.textMuted,
            letterSpacing: "0.04em",
          }}>
            courses
          </span>
        </div>

        <div style={{ maxWidth: 1160, margin: "0 auto", padding: "48px 24px 64px" }}>

          {/* Hero header */}
          <div style={{ marginBottom: 48, animation: "fadeUp 0.5s ease both" }}>
            <p style={{
              fontFamily: T.fontMono, fontSize: 11, color: T.primary,
              letterSpacing: "0.12em", textTransform: "uppercase",
              marginBottom: 12, fontWeight: 500,
            }}>
              Learning Library
            </p>
            <h1 style={{
              fontFamily: T.fontSerif, fontSize: 38, fontWeight: 600,
              color: T.text, lineHeight: 1.2, letterSpacing: "-0.02em",
              marginBottom: 14,
            }}>
              Available Courses
            </h1>
            <p style={{
              color: T.textBody, fontSize: 15.5, fontFamily: T.fontSerif,
              lineHeight: 1.7, maxWidth: 480,
            }}>
              Pick a course and start building real skills, step by step.
            </p>

            {/* Stats row */}
            <div style={{
              display: "flex", gap: 24, marginTop: 28,
              animation: "fadeUp 0.5s ease 0.1s both",
            }}>
              {[
                { label: "Total courses", value: totalCourses },
                { label: "Completed",     value: completedCount, color: T.successText },
                { label: "In progress",   value: inProgressCount, color: T.primary },
              ].map(({ label, value, color }) => (
                <div key={label} style={{
                  display: "flex", flexDirection: "column", gap: 2,
                  paddingRight: 24,
                  borderRight: `1px solid ${T.border}`,
                }}>
                  <span style={{
                    fontSize: 22, fontWeight: 600, color: color || T.text,
                    fontFamily: T.fontSans, lineHeight: 1,
                  }}>
                    {value}
                  </span>
                  <span style={{
                    fontSize: 11.5, color: T.textMuted, fontFamily: T.fontSans,
                    letterSpacing: "0.03em",
                  }}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Course grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(310px, 1fr))",
            gap: 18,
          }}>
            {ALL_COURSES.map((course, i) => (
              <CourseCard key={course.id} course={course} index={i} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}