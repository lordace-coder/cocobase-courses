import { useNavigate } from "react-router-dom";

const T = {
  bg: "#F1EFE8",
  surface: "#ffffff",
  border: "#D3D1C7",
  primary: "#185FA5",
  primaryDark: "#0C447C",
  success: "#639922",
  text: "#2C2C2A",
  textBody: "#444441",
  muted: "#888780",
  fontSans: "'DM Sans', 'Inter', sans-serif",
  fontSerif: "'Literata', 'Lora', serif",
};

const features = [
  { icon: "📚", label: "6+ Courses", desc: "Structured learning paths" },
  { icon: "🎯", label: "Interactive", desc: "Quizzes & challenges" },
  { icon: "💾", label: "Local Progress", desc: "Resume anytime" },
];

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: T.bg,
        padding: "64px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: T.fontSans,
      }}
    >
      <div
        style={{
          maxWidth: 680,
          width: "100%",
          textAlign: "center",
          animation: "slideUp 0.5s ease",
        }}
      >
        <div style={{ fontSize: 56, marginBottom: 24 }}>🥥</div>

        <h1
          style={{
            fontFamily: T.fontSerif,
            fontSize: 28,
            fontWeight: 600,
            color: T.text,
            marginBottom: 16,
            lineHeight: 1.2,
          }}
        >
          Learn Backend Development
        </h1>

        <p
          style={{
            fontFamily: T.fontSerif,
            fontSize: 15,
            color: T.textBody,
            lineHeight: 1.7,
            maxWidth: 560,
            margin: "0 auto 40px",
          }}
        >
          Master Cocobase and backend development fundamentals through
          interactive lessons, quizzes, and challenges. Track your progress
          locally and learn at your own pace.
        </p>

        <button
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
          Explore Courses →
        </button>

        <div
          style={{
            marginTop: 64,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: 16,
          }}
        >
          {features.map((f) => (
            <div
              key={f.label}
              style={{
                padding: 16,
                background: T.surface,
                border: `1px solid ${T.border}`,
                borderRadius: 12,
              }}
            >
              <div style={{ fontSize: 24, marginBottom: 8 }}>{f.icon}</div>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: T.text,
                  marginBottom: 4,
                }}
              >
                {f.label}
              </div>
              <div style={{ fontSize: 12, color: T.muted }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
