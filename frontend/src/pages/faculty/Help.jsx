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

export default function HelpFaculty({ facultyName = "Faculty" }) {
  const [problems, setProblems] = useState([]);
  const [filter, setFilter] = useState("all");
  const [confirmId, setConfirmId] = useState(null);

  const loadAndClean = () => {
    const all = getProblems().filter((p) => {
      if (p.solved && p.solvedAt) {
        const dayMs = 24 * 60 * 60 * 1000;
        if (Date.now() - p.solvedAt > dayMs) return false;
      }
      return true;
    });
    saveProblems(all);
    setProblems(all);
  };

  useEffect(() => {
    loadAndClean();
    const interval = setInterval(loadAndClean, 5000);
    return () => clearInterval(interval);
  }, []);

  const markSolved = (id) => {
    const updated = getProblems().map((p) =>
      p.id === id ? { ...p, solved: true, solvedAt: Date.now(), solvedBy: facultyName } : p
    );
    saveProblems(updated);
    setProblems(updated);
    setConfirmId(null);
  };

  const markUnsolved = (id) => {
    const updated = getProblems().map((p) =>
      p.id === id ? { ...p, solved: false, solvedAt: null, solvedBy: null } : p
    );
    saveProblems(updated);
    setProblems(updated);
  };

  const formatTime = (ts) => {
    if (!ts) return "—";
    return new Date(ts).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const timeLeft = (solvedAt) => {
    if (!solvedAt) return null;
    const remaining = 24 * 60 * 60 * 1000 - (Date.now() - solvedAt);
    if (remaining <= 0) return "Removing soon...";
    const hrs = Math.floor(remaining / 3600000);
    const mins = Math.floor((remaining % 3600000) / 60000);
    return `Removes in ${hrs}h ${mins}m`;
  };

  const filtered = problems.filter((p) => {
    if (filter === "pending") return !p.solved;
    if (filter === "solved") return p.solved;
    return true;
  });

  const pendingCount = problems.filter((p) => !p.solved).length;
  const solvedCount = problems.filter((p) => p.solved).length;

  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <div style={styles.headerIcon}>🛠️</div>
          <div>
            <h1 style={styles.headerTitle}>Help Desk — Faculty Panel</h1>
            <p style={styles.headerSub}>Review and resolve student-reported hostel problems</p>
          </div>
        </div>
        <div style={styles.statsRow}>
          <div style={styles.statBox}>
            <span style={{ ...styles.statNum, color: "#ef4444" }}>{pendingCount}</span>
            <span style={styles.statLabel}>Pending</span>
          </div>
          <div style={styles.statDivider} />
          <div style={styles.statBox}>
            <span style={{ ...styles.statNum, color: "#22c55e" }}>{solvedCount}</span>
            <span style={styles.statLabel}>Resolved</span>
          </div>
        </div>
      </div>

      {/* Filter Pills */}
      <div style={styles.filterRow}>
        {["all", "pending", "solved"].map((f) => (
          <button
            key={f}
            style={{
              ...styles.filterPill,
              background: filter === f ? "#7c9e87" : "#f1f5f9",
              color: filter === f ? "#fff" : "#64748b",
              boxShadow: filter === f ? "0 4px 14px rgba(124,158,135,0.3)" : "none",
            }}
            onClick={() => setFilter(f)}
          >
            {f === "all" ? `All (${problems.length})` : f === "pending" ? `Pending (${pendingCount})` : `Resolved (${solvedCount})`}
          </button>
        ))}
      </div>

      {/* Problems List */}
      {filtered.length === 0 ? (
        <div style={styles.emptyState}>
          <div style={styles.emptyIcon}>{filter === "solved" ? "🎉" : "📭"}</div>
          <p style={styles.emptyText}>
            {filter === "solved"
              ? "No resolved problems yet."
              : filter === "pending"
              ? "All problems have been resolved!"
              : "No problems reported yet."}
          </p>
        </div>
      ) : (
        <div style={styles.problemList}>
          {filtered.map((p, i) => (
            <div
              key={p.id}
              style={{
                ...styles.problemCard,
                animationDelay: `${i * 0.05}s`,
                borderLeft: `4px solid ${p.solved ? "#22c55e" : "#f97316"}`,
                opacity: p.solved ? 0.92 : 1,
              }}
            >
              <div style={styles.cardTop}>
                <div style={styles.problemTextWrap}>
                  <p style={styles.problemText}>{p.text}</p>
                  <div style={styles.metaRow}>
                    <span style={styles.metaItem}>👤 {p.author}</span>
                    <span style={styles.metaItem}>🕐 {formatTime(p.createdAt)}</span>
                    {p.solved && p.solvedAt && (
                      <>
                        <span style={{ ...styles.metaItem, color: "#16a34a" }}>
                          ✅ Resolved by {p.solvedBy} • {formatTime(p.solvedAt)}
                        </span>
                        <span style={{ ...styles.metaItem, color: "#94a3b8" }}>
                          ⏱ {timeLeft(p.solvedAt)}
                        </span>
                      </>
                    )}
                  </div>
                </div>

                <div style={styles.actionArea}>
                  {p.solved ? (
                    <div style={styles.solvedGroup}>
                      <div style={styles.solvedTick}>
                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                          <circle cx="11" cy="11" r="11" fill="#22c55e" />
                          <path d="M6 11.5L9.5 15L16 8" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span style={styles.solvedText}>Resolved</span>
                      </div>
                      <button
                        style={styles.undoBtn}
                        onClick={() => markUnsolved(p.id)}
                        title="Mark as pending again"
                      >
                        ↩ Undo
                      </button>
                    </div>
                  ) : confirmId === p.id ? (
                    <div style={styles.confirmGroup}>
                      <span style={styles.confirmLabel}>Mark as solved?</span>
                      <button style={styles.confirmYes} onClick={() => markSolved(p.id)}>
                        ✓ Yes
                      </button>
                      <button style={styles.confirmNo} onClick={() => setConfirmId(null)}>
                        ✗ No
                      </button>
                    </div>
                  ) : (
                    <button
                      style={styles.resolveBtn}
                      onClick={() => setConfirmId(p.id)}
                    >
                      <span style={styles.resolveCircle} />
                      Mark Solved
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

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
    alignItems: "flex-start",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "16px",
    maxWidth: "760px",
    margin: "0 auto 20px auto",
  },
  headerLeft: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
  },
  headerIcon: {
    fontSize: "36px",
    lineHeight: 1,
  },
  headerTitle: {
    margin: 0,
    fontSize: "22px",
    fontWeight: 700,
    color: "#0f172a",
    letterSpacing: "-0.4px",
  },
  headerSub: {
    margin: "3px 0 0 0",
    fontSize: "13px",
    color: "#64748b",
  },
  statsRow: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    background: "#fff",
    borderRadius: "12px",
    padding: "10px 20px",
    border: "1px solid #e2e8f0",
    boxShadow: "0 1px 6px rgba(0,0,0,0.04)",
  },
  statBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "2px",
  },
  statNum: {
    fontSize: "22px",
    fontWeight: 800,
    lineHeight: 1,
  },
  statLabel: {
    fontSize: "11px",
    color: "#94a3b8",
    fontWeight: 500,
    textTransform: "uppercase",
    letterSpacing: "0.04em",
  },
  statDivider: {
    width: "1px",
    height: "32px",
    background: "#e2e8f0",
  },
  filterRow: {
    display: "flex",
    gap: "8px",
    maxWidth: "760px",
    margin: "0 auto 20px auto",
    flexWrap: "wrap",
  },
  filterPill: {
    border: "none",
    borderRadius: "99px",
    padding: "7px 18px",
    fontSize: "13px",
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.2s",
    letterSpacing: "0.01em",
  },
  emptyState: {
    textAlign: "center",
    padding: "52px 24px",
    background: "#fff",
    borderRadius: "16px",
    border: "1px solid #e2e8f0",
    maxWidth: "760px",
    margin: "0 auto",
  },
  emptyIcon: { fontSize: "40px", marginBottom: "10px" },
  emptyText: { color: "#94a3b8", fontSize: "15px", margin: 0 },
  problemList: {
    display: "flex",
    flexDirection: "column",
    gap: "13px",
    maxWidth: "760px",
    margin: "0 auto",
  },
  problemCard: {
    background: "#fff",
    borderRadius: "14px",
    padding: "18px 20px",
    boxShadow: "0 2px 14px rgba(0,0,0,0.05)",
    border: "1px solid #f1f5f9",
    animation: "fadeUp 0.35s ease both",
    transition: "box-shadow 0.2s",
  },
  cardTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "16px",
  },
  problemTextWrap: {
    flex: 1,
  },
  problemText: {
    margin: "0 0 10px 0",
    fontSize: "14.5px",
    color: "#1e293b",
    lineHeight: 1.65,
  },
  metaRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "12px",
    fontSize: "12px",
    color: "#94a3b8",
  },
  metaItem: {
    display: "flex",
    alignItems: "center",
    gap: "3px",
  },
  actionArea: {
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
  },
  resolveBtn: {
    display: "flex",
    alignItems: "center",
    gap: "7px",
    background: "#fff7ed",
    border: "1.5px solid #fed7aa",
    borderRadius: "10px",
    padding: "8px 16px",
    fontSize: "13px",
    fontWeight: 600,
    color: "#c2410c",
    cursor: "pointer",
    transition: "all 0.2s",
    whiteSpace: "nowrap",
  },
  resolveCircle: {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    border: "2px solid #ef4444",
    background: "#fef2f2",
    display: "inline-block",
    flexShrink: 0,
  },
  solvedGroup: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: "6px",
  },
  solvedTick: {
    display: "flex",
    alignItems: "center",
    gap: "7px",
  },
  solvedText: {
    fontSize: "13px",
    fontWeight: 700,
    color: "#16a34a",
  },
  undoBtn: {
    background: "none",
    border: "1px solid #e2e8f0",
    borderRadius: "7px",
    padding: "3px 10px",
    fontSize: "11px",
    color: "#94a3b8",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  confirmGroup: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    flexWrap: "wrap",
    justifyContent: "flex-end",
  },
  confirmLabel: {
    fontSize: "12px",
    color: "#475569",
    fontWeight: 500,
  },
  confirmYes: {
    background: "#22c55e",
    color: "#fff",
    border: "none",
    borderRadius: "7px",
    padding: "5px 12px",
    fontSize: "12px",
    fontWeight: 700,
    cursor: "pointer",
  },
  confirmNo: {
    background: "#f1f5f9",
    color: "#64748b",
    border: "none",
    borderRadius: "7px",
    padding: "5px 12px",
    fontSize: "12px",
    fontWeight: 600,
    cursor: "pointer",
  },
};