import { useNavigate } from "react-router-dom";
import { ALL_COURSES } from "../data/courses";
import { getCourseProgress } from "../utils/progressStorage";

const T = {
  bg: "#F1EFE8",
  surface: "#ffffff",
  surface2: "#F1EFE8",
  border: "#D3D1C7",
  primary: "#185FA5",
  primaryLight: "#E6F1FB",
  success: "#639922",
  successBg: "#EAF3DE",
  successText: "#3B6D11",
  text: "#2C2C2A",
  textBody: "#444441",
  muted: "#888780",
  fontSans: "'DM Sans', 'Inter', sans-serif",
  fontSerif: "'Literata', 'Lora', serif",
};

function diffBadge(diff: string): { bg: string; color: string } {
  if (diff === "beginner") return { bg: "#E6F1FB", color: "#185FA5" };
  if (diff === "intermediate") return { bg: "#FAEEDA", color: "#854F0B" };
  return { bg: "#FCEBEB", color: "#A32D2D" };
}

export default function CoursesListPage() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: T.bg,
        padding: "40px 20px",
        fontFamily: T.fontSans,
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <button
            type="button"
            onClick={() => navigate("/")}
            style={{
              padding: "9px 12px",
              background: "transparent",
              border: "none",
              color: T.muted,
              fontSize: 14,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 4,
              marginBottom: 24,
              fontFamily: T.fontSans,
              transition: "color 150ms ease-in-out",
            }}
            onMouseOver={(e) => (e.currentTarget.style.color = T.text)}
            onMouseOut={(e) => (e.currentTarget.style.color = T.muted)}
          >
            ← Back
          </button>

          <h1
            style={{
              fontFamily: T.fontSerif,
              fontSize: 22,
              fontWeight: 500,
              color: T.text,
              marginBottom: 8,
              lineHeight: 1.3,
            }}
          >
            Available Courses
          </h1>
          <p style={{ color: T.muted, fontSize: 14 }}>
            Choose a course to start learning
          </p>
        </div>

        {/* Course grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: 16,
          }}
        >
          {ALL_COURSES.map((course) => {
            const progress = getCourseProgress(course.id);
            const total = course.steps.length;
            const completed = progress?.completedSteps?.length ?? 0;
            const pct = total > 0 ? (completed / total) * 100 : 0;
            const isComplete = progress?.isComplete;
            const badge = diffBadge(course.difficulty);

            return (
              <div
                key={course.id}
                onClick={() => navigate(`/course/${course.id}`)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) =>
                  e.key === "Enter" && navigate(`/course/${course.id}`)
                }
                style={{
                  background: T.surface,
                  border: `1px solid ${T.border}`,
                  borderRadius: 12,
                  overflow: "hidden",
                  cursor: "pointer",
                  transition:
                    "transform 150ms ease-in-out, box-shadow 150ms ease-in-out",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 16px rgba(0,0,0,0.08)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {/* Thumbnail */}
                <div
                  style={{
                    height: 120,
                    background: `linear-gradient(135deg, ${course.color}22, ${course.color}55)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 48,
                  }}
                >
                  {course.icon}
                </div>

                {/* Body */}
                <div style={{ padding: "14px 16px" }}>
                  {/* Badges row */}
                  <div
                    style={{ display: "flex", gap: 8, marginBottom: 8, flexWrap: "wrap" }}
                  >
                    <span
                      style={{
                        display: "inline-block",
                        fontSize: 11,
                        fontWeight: 500,
                        padding: "3px 8px",
                        borderRadius: 9999,
                        background: badge.bg,
                        color: badge.color,
                      }}
                    >
                      {course.difficulty}
                    </span>
                    <span
                      style={{
                        display: "inline-block",
                        fontSize: 11,
                        fontWeight: 500,
                        padding: "3px 8px",
                        borderRadius: 9999,
                        background: T.surface2,
                        color: T.muted,
                      }}
                    >
                      {total} lessons
                    </span>
                    {isComplete && (
                      <span
                        style={{
                          display: "inline-block",
                          fontSize: 11,
                          fontWeight: 500,
                          padding: "3px 8px",
                          borderRadius: 9999,
                          background: T.successBg,
                          color: T.successText,
                        }}
                      >
                        Completed
                      </span>
                    )}
                  </div>

                  <h3
                    style={{
                      fontSize: 15,
                      fontWeight: 500,
                      color: T.text,
                      marginBottom: 4,
                      lineHeight: 1.4,
                    }}
                  >
                    {course.title}
                  </h3>

                  <p
                    style={{
                      fontFamily: T.fontSerif,
                      fontSize: 13,
                      color: T.textBody,
                      marginBottom: 12,
                      lineHeight: 1.6,
                      minHeight: 36,
                    }}
                  >
                    {course.description}
                  </p>

                  <p
                    style={{
                      fontSize: 12,
                      color: T.muted,
                      marginBottom: 12,
                    }}
                  >
                    {course.duration} min
                  </p>

                  {/* Progress bar or CTA */}
                  {progress ? (
                    <div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          fontSize: 11,
                          color: T.muted,
                          marginBottom: 4,
                        }}
                      >
                        <span>{Math.round(pct)}% complete</span>
                        <span>
                          {total - completed} lesson
                          {total - completed !== 1 ? "s" : ""} left
                        </span>
                      </div>
                      <div
                        style={{
                          height: 6,
                          background: T.surface2,
                          borderRadius: 9999,
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            height: "100%",
                            background: isComplete ? T.success : T.primary,
                            borderRadius: 9999,
                            width: `${pct}%`,
                            transition: "width 300ms ease-out",
                          }}
                        />
                      </div>
                    </div>
                  ) : (
                    <span
                      style={{
                        fontSize: 14,
                        color: T.primary,
                        fontWeight: 500,
                      }}
                    >
                      Start learning →
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
