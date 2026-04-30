import { useState, useEffect } from "react";

const STORAGE_KEY = "hostel_help_problems";

function getProblems() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function saveProblems(problems) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(problems));
}

export default function HelpStudent({ studentName = "Student" }) {
  const [problems, setProblems] = useState([]);
  const [input, setInput] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [charCount, setCharCount] = useState(0);

  const MAX_CHARS = 300;

  useEffect(() => {
    const load = () => {
      const all = getProblems().filter((p) => {
        if (p.solved && p.solvedAt) {
          const dayMs = 24 * 60 * 60 * 1000;
          if (Date.now() - p.solvedAt > dayMs) return false;
        }
        return true;
      });
      setProblems(all);
      saveProblems(all);
    };
    load();
    const interval = setInterval(load, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = () => {
    if (!input.trim()) return;
    setSubmitting(true);
    setTimeout(() => {
      const newProblem = {
        id: Date.now().toString(),
        text: input.trim(),
        author: studentName,
        createdAt: Date.now(),
        solved: false,
        solvedAt: null,
      };
      const updated = [newProblem, ...getProblems()];
      saveProblems(updated);
      setProblems(updated);
      setInput("");
      setCharCount(0);
      setSubmitting(false);
    }, 400);
  };

  const handleChange = (e) => {
    const val = e.target.value;
    if (val.length <= MAX_CHARS) {
      setInput(val);
      setCharCount(val.length);
    }
  };

  const formatTime = (ts) => {
    const d = new Date(ts);
    return d.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerIcon}>🛎️</div>
        <div>
          <h1 style={styles.headerTitle}>Help Desk</h1>
          <p style={styles.headerSub}>Report hostel problems — faculty will respond</p>
        </div>
      </div>

      {/* Submit Box */}
      <div style={styles.submitCard}>
        <div style={styles.submitLabel}>📝 Describe your problem</div>
        <textarea
          style={styles.textarea}
          placeholder="e.g. Hot water not working in Block B bathroom since morning..."
          value={input}
          onChange={handleChange}
          rows={4}
        />
        <div style={styles.submitFooter}>
          <span style={{ ...styles.charCount, color: charCount > MAX_CHARS * 0.85 ? "#ef4444" : "#94a3b8" }}>
            {charCount}/{MAX_CHARS}
          </span>
          <button
            style={{
              ...styles.submitBtn,
              opacity: !input.trim() || submitting ? 0.5 : 1,
              cursor: !input.trim() || submitting ? "not-allowed" : "pointer",
            }}
            onClick={handleSubmit}
            disabled={!input.trim() || submitting}
          >
            {submitting ? "Submitting..." : "Submit Problem"}
          </button>
        </div>
      </div>

      {/* Problems List */}
      <div style={styles.listSection}>
        <div style={styles.listHeader}>
          <span style={styles.listTitle}>All Reported Problems</span>
          <span style={styles.listCount}>{problems.length} issue{problems.length !== 1 ? "s" : ""}</span>
        </div>

        {problems.length === 0 ? (
          <div style={styles.emptyState}>
            <div style={styles.emptyIcon}>✅</div>
            <p style={styles.emptyText}>No problems reported yet. Everything looks good!</p>
          </div>
        ) : (
          <div style={styles.problemList}>
            {problems.map((p, i) => (
              <div
                key={p.id}
                style={{
                  ...styles.problemCard,
                  animationDelay: `${i * 0.05}s`,
                  borderLeft: `4px solid ${p.solved ? "#22c55e" : "#f97316"}`,
                }}
              >
                <div style={styles.problemTop}>
                  <div style={styles.problemText}>{p.text}</div>
                  <div
                    style={{
                      ...styles.statusBadge,
                      background: p.solved ? "#dcfce7" : "#fff7ed",
                      color: p.solved ? "#16a34a" : "#ea580c",
                    }}
                  >
                    <span
                      style={{
                        ...styles.statusDot,
                        background: p.solved ? "#22c55e" : "#ef4444",
                        boxShadow: p.solved
                          ? "0 0 6px #22c55e88"
                          : "0 0 6px #ef444488",
                      }}
                    />
                    {p.solved ? "Resolved" : "Pending"}
                  </div>
                </div>
                <div style={styles.problemMeta}>
                  <span>👤 {p.author}</span>
                  <span>🕐 {formatTime(p.createdAt)}</span>
                  {p.solved && p.solvedAt && (
                    <span style={{ color: "#16a34a" }}>✅ Solved {formatTime(p.solvedAt)}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "transparent",
    padding: "24px 16px",
    fontFamily: "'Segoe UI', system-ui, sans-serif",
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    maxWidth: "720px",
    margin: "0 auto 24px auto",
  },
  headerIcon: {
    fontSize: "36px",
    lineHeight: 1,
  },
  headerTitle: {
    margin: 0,
    fontSize: "26px",
    fontWeight: 700,
    color: "#0f172a",
    letterSpacing: "-0.5px",
  },
  headerSub: {
    margin: "2px 0 0 0",
    fontSize: "14px",
    color: "#64748b",
  },
  submitCard: {
    maxWidth: "720px",
    margin: "0 auto 28px auto",
    background: "#ffffff",
    borderRadius: "16px",
    padding: "20px 24px",
    boxShadow: "0 4px 24px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.04)",
    border: "1px solid #e2e8f0",
  },
  submitLabel: {
    fontSize: "14px",
    fontWeight: 600,
    color: "#475569",
    marginBottom: "10px",
    letterSpacing: "0.01em",
  },
  textarea: {
    width: "100%",
    border: "1.5px solid #e2e8f0",
    borderRadius: "10px",
    padding: "12px 14px",
    fontSize: "14.5px",
    color: "#1e293b",
    resize: "vertical",
    outline: "none",
    fontFamily: "inherit",
    lineHeight: 1.6,
    background: "#f8fafc",
    boxSizing: "border-box",
    transition: "border-color 0.2s",
  },
  submitFooter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "12px",
  },
  charCount: {
    fontSize: "12px",
    transition: "color 0.2s",
  },
  submitBtn: {
    background: "#7c9e87",
    color: "#fff",
    border: "none",
    borderRadius: "9px",
    padding: "9px 22px",
    fontSize: "14px",
    fontWeight: 600,
    cursor: "pointer",
    letterSpacing: "0.01em",
    boxShadow: "0 4px 14px rgba(124,158,135,0.35)",
    transition: "all 0.2s",
  },
  listSection: {
    maxWidth: "720px",
    margin: "0 auto",
  },
  listHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "14px",
  },
  listTitle: {
    fontSize: "16px",
    fontWeight: 700,
    color: "#0f172a",
  },
  listCount: {
    fontSize: "13px",
    color: "#94a3b8",
    background: "#f1f5f9",
    borderRadius: "99px",
    padding: "3px 12px",
    fontWeight: 500,
  },
  emptyState: {
    textAlign: "center",
    padding: "48px 24px",
    background: "#fff",
    borderRadius: "16px",
    border: "1px solid #e2e8f0",
  },
  emptyIcon: { fontSize: "40px", marginBottom: "10px" },
  emptyText: { color: "#94a3b8", fontSize: "15px", margin: 0 },
  problemList: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  problemCard: {
    background: "#fff",
    borderRadius: "13px",
    padding: "16px 20px",
    boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
    border: "1px solid #f1f5f9",
    animation: "fadeUp 0.35s ease both",
  },
  problemTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "12px",
  },
  problemText: {
    fontSize: "14.5px",
    color: "#1e293b",
    lineHeight: 1.6,
    flex: 1,
  },
  statusBadge: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    borderRadius: "99px",
    padding: "4px 11px",
    fontSize: "12px",
    fontWeight: 600,
    whiteSpace: "nowrap",
    flexShrink: 0,
  },
  statusDot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    display: "inline-block",
    flexShrink: 0,
  },
  problemMeta: {
    display: "flex",
    gap: "16px",
    marginTop: "10px",
    fontSize: "12px",
    color: "#94a3b8",
    flexWrap: "wrap",
  },
};