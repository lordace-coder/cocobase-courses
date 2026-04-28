import { useNavigate } from "react-router-dom";

// ─── DESIGN TOKENS (matches system) ──────────────────────────────────────────
const T = {
  bg: "#0A0A0F",
  surface: "#111118",
  surface2: "#16161F",
  surface3: "#1C1C27",
  border: "#2A2A3A",
  borderLight: "#333344",

  primary: "#6366F1",
  primaryLight: "rgba(99,102,241,0.12)",
  primaryMid: "rgba(99,102,241,0.22)",
  primaryGlow: "rgba(99,102,241,0.35)",
  primaryDark: "#4F52C8",

  text: "#F0F0F8",
  textBody: "#A8A8C0",
  textMuted: "#5A5A72",

  fontSans: "'DM Sans', 'Inter', sans-serif",
  fontSerif: "'Playfair Display', 'Georgia', serif",
  fontMono: "'JetBrains Mono', 'Fira Code', monospace",
};

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,500;0,600;1,500&family=JetBrains+Mono:wght@400;500&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-8px); }
  }
  @keyframes orb1 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33%       { transform: translate(30px, -20px) scale(1.05); }
    66%       { transform: translate(-20px, 15px) scale(0.97); }
  }
  @keyframes orb2 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33%       { transform: translate(-25px, 20px) scale(1.04); }
    66%       { transform: translate(20px, -15px) scale(0.96); }
  }
  @keyframes shimmer {
    0%   { background-position: -400% 0; }
    100% { background-position:  400% 0; }
  }

  .hero-cta:hover {
    background: ${T.primaryDark} !important;
    transform: translateY(-2px) !important;
    box-shadow: 0 12px 36px ${T.primaryGlow} !important;
  }
  .hero-cta:active {
    transform: translateY(0) !important;
  }
  .feature-card:hover {
    border-color: ${T.borderLight} !important;
    background: ${T.surface2} !important;
    transform: translateY(-3px);
  }
  .feature-card:hover .feature-icon-wrap {
    border-color: ${T.primary} !important;
    background: ${T.primaryLight} !important;
  }

  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: ${T.border}; border-radius: 4px; }
`;

const features = [
  {
    icon: "📚",
    label: "Structured Courses",
    desc: "Hand-crafted learning paths that build knowledge progressively, concept by concept.",
    tag: "6+ courses",
  },
  {
    icon: "🎯",
    label: "Active Challenges",
    desc: "Quizzes, code fills, matching exercises — learning by doing, not just reading.",
    tag: "7 question types",
  },
  {
    icon: "💾",
    label: "Local Progress",
    desc: "Your progress is saved right in the browser. Pick up exactly where you left off.",
    tag: "No login needed",
  },
];

function GlobalStyles() {
  return <style dangerouslySetInnerHTML={{ __html: globalStyles }} />;
}

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <>
      <GlobalStyles />
      <div
        style={{
          minHeight: "100vh",
          background: T.bg,
          fontFamily: T.fontSans,
          display: "flex",
          flexDirection: "column",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Ambient background orbs */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            zIndex: 0,
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "-15%",
              left: "20%",
              width: 500,
              height: 500,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)",
              animation: "orb1 18s ease-in-out infinite",
              filter: "blur(40px)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "5%",
              right: "10%",
              width: 400,
              height: 400,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)",
              animation: "orb2 22s ease-in-out infinite",
              filter: "blur(60px)",
            }}
          />
          {/* Subtle dot grid */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `radial-gradient(circle, ${T.border} 1px, transparent 1px)`,
              backgroundSize: "32px 32px",
              opacity: 0.4,
            }}
          />
        </div>

        {/* Nav bar */}
        <nav
          style={{
            position: "relative",
            zIndex: 10,
            padding: "18px 32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: `1px solid ${T.border}`,
            background: `${T.surface}AA`,
            backdropFilter: "blur(12px)",
            animation: "fadeIn 0.4s ease both",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span
              style={{
                fontSize: 22,
                animation: "float 4s ease-in-out infinite",
              }}
            >
              🥥
            </span>
            <span
              style={{
                fontFamily: T.fontMono,
                fontSize: 13,
                fontWeight: 500,
                color: T.textBody,
                letterSpacing: "0.06em",
              }}
            >
              cocobase<span style={{ color: T.primary }}>.learn</span>
            </span>
          </div>
          <button
            type="button"
            className="hero-cta"
            onClick={() => navigate("/courses")}
            style={{
              padding: "8px 18px",
              background: T.primaryLight,
              border: `1px solid ${T.primaryMid}`,
              color: T.primary,
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: T.fontSans,
              letterSpacing: "0.02em",
              transition: "all .2s ease",
            }}
          >
            Browse Courses
          </button>
        </nav>

        {/* Hero */}
        <main
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "80px 24px 60px",
            textAlign: "center",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Eyebrow pill */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: T.primaryLight,
              border: `1px solid ${T.primaryMid}`,
              borderRadius: 9999,
              padding: "6px 16px",
              marginBottom: 32,
              animation: "fadeUp 0.5s ease 0.05s both",
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: T.primary,
                boxShadow: `0 0 8px ${T.primaryGlow}`,
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: T.fontMono,
                fontSize: 11,
                fontWeight: 500,
                color: T.primary,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Backend Development · Interactive Learning
            </span>
          </div>

          {/* Headline */}
          <h1
            style={{
              fontFamily: T.fontSerif,
              fontSize: "clamp(34px, 6vw, 58px)",
              fontWeight: 600,
              color: T.text,
              lineHeight: 1.15,
              letterSpacing: "-0.025em",
              marginBottom: 22,
              maxWidth: 680,
              animation: "fadeUp 0.5s ease 0.12s both",
            }}
          >
            Master{" "}
            <span
              style={{
                fontStyle: "italic",
                background: `linear-gradient(135deg, #818CF8, ${T.primary})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Cocobase
            </span>{" "}
            from the ground up
          </h1>

          {/* Subheading */}
          <p
            style={{
              fontFamily: T.fontSerif,
              fontSize: 17,
              color: T.textBody,
              lineHeight: 1.75,
              maxWidth: 520,
              marginBottom: 44,
              animation: "fadeUp 0.5s ease 0.2s both",
            }}
          >
            Structured lessons, real coding challenges, and instant feedback —
            everything you need to build backend apps with confidence.
          </p>

          {/* CTA group */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              flexWrap: "wrap",
              justifyContent: "center",
              animation: "fadeUp 0.5s ease 0.28s both",
            }}
          >
            <button
              type="button"
              className="hero-cta"
              onClick={() => navigate("/courses")}
              style={{
                padding: "14px 32px",
                background: T.primary,
                border: "none",
                color: "#fff",
                borderRadius: 12,
                fontSize: 15,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: T.fontSans,
                letterSpacing: "0.02em",
                transition: "all .2s ease",
                boxShadow: `0 4px 24px ${T.primaryGlow}`,
              }}
            >
              Start Learning →
            </button>
            <span
              style={{
                fontFamily: T.fontMono,
                fontSize: 12,
                color: T.textMuted,
                letterSpacing: "0.04em",
              }}
            >
              Free · No signup
            </span>
          </div>

          {/* Divider */}
          <div
            style={{
              width: "100%",
              maxWidth: 720,
              margin: "72px auto 0",
              height: 1,
              background: `linear-gradient(90deg, transparent, ${T.border}, transparent)`,
              animation: "fadeIn 0.6s ease 0.5s both",
            }}
          />

          {/* Feature cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 16,
              width: "100%",
              maxWidth: 760,
              marginTop: 48,
              animation: "fadeUp 0.5s ease 0.4s both",
            }}
          >
            {features.map((f, i) => (
              <div
                key={f.label}
                className="feature-card"
                style={{
                  padding: "22px 20px",
                  background: T.surface,
                  border: `1px solid ${T.border}`,
                  borderRadius: 16,
                  textAlign: "left",
                  transition: "all .2s ease",
                  animationDelay: `${0.45 + i * 0.07}s`,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    marginBottom: 14,
                  }}
                >
                  <div
                    className="feature-icon-wrap"
                    style={{
                      width: 44,
                      height: 44,
                      background: T.surface2,
                      border: `1px solid ${T.border}`,
                      borderRadius: 12,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 22,
                      transition: "all .2s ease",
                    }}
                  >
                    {f.icon}
                  </div>
                  <span
                    style={{
                      fontFamily: T.fontMono,
                      fontSize: 9.5,
                      fontWeight: 500,
                      color: T.primary,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      background: T.primaryLight,
                      border: `1px solid ${T.primaryMid}`,
                      borderRadius: 9999,
                      padding: "3px 8px",
                    }}
                  >
                    {f.tag}
                  </span>
                </div>
                <h3
                  style={{
                    fontSize: 14.5,
                    fontWeight: 600,
                    color: T.text,
                    marginBottom: 7,
                    fontFamily: T.fontSans,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {f.label}
                </h3>
                <p
                  style={{
                    fontFamily: T.fontSerif,
                    fontSize: 13,
                    color: T.textBody,
                    lineHeight: 1.65,
                  }}
                >
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </main>

        {/* Footer */}
        <footer
          style={{
            position: "relative",
            zIndex: 1,
            borderTop: `1px solid ${T.border}`,
            padding: "16px 32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            animation: "fadeIn 0.5s ease 0.6s both",
          }}
        >
          <span
            style={{
              fontFamily: T.fontMono,
              fontSize: 11,
              color: T.textMuted,
              letterSpacing: "0.04em",
            }}
          >
            🥥 cocobase.learn — built to ship
          </span>
        </footer>
      </div>
    </>
  );
}
