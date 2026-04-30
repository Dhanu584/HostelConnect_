import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

const STORAGE_KEY = "hostel_inout_records";

const formatTime = (iso) => {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true });
};

const formatDate = (iso) => {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
};

const todayKey = () => new Date().toISOString().split("T")[0];

const groupByDate = (records) => {
  const groups = {};
  records.forEach((r) => {
    if (!groups[r.date]) groups[r.date] = [];
    groups[r.date].push(r);
  });
  return Object.entries(groups).sort(([a], [b]) => (a > b ? -1 : 1));
};

export default function FInOut() {
  const { user } = useAuth();
  const facultyName = user?.name || "Faculty";

  const [records, setRecords]           = useState([]);
  const [search, setSearch]             = useState("");
  const [filterDate, setFilterDate]     = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [activeTab, setActiveTab]       = useState("today");
  const [expandedDate, setExpandedDate] = useState(null);
  const [animIn, setAnimIn]             = useState(false);

  useEffect(() => {
    loadRecords();
    setTimeout(() => setAnimIn(true), 50);
    const interval = setInterval(loadRecords, 10000);
    return () => clearInterval(interval);
  }, []);

  const loadRecords = () => {
    try {
      const all = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      setRecords(all);
    } catch {
      setRecords([]);
    }
  };

  const filtered = records.filter((r) => {
    const q = search.toLowerCase();
    const matchSearch =
      !search ||
      r.studentName.toLowerCase().includes(q) ||
      r.rollNo.toLowerCase().includes(q) ||
      r.destination.toLowerCase().includes(q);
    const matchDate   = !filterDate || r.date === filterDate;
    const matchStatus =
      filterStatus === "all" ||
      (filterStatus === "out"      && !r.returned) ||
      (filterStatus === "returned" &&  r.returned);
    return matchSearch && matchDate && matchStatus;
  });

  const todayRecords   = filtered.filter((r) => r.date === todayKey());
  const historyRecords = filtered.filter((r) => r.date !== todayKey());
  const groupedHistory = groupByDate(historyRecords);

  const outNow        = records.filter((r) => r.date === todayKey() && !r.returned).length;
  const totalToday    = records.filter((r) => r.date === todayKey()).length;
  const returnedToday = records.filter((r) => r.date === todayKey() &&  r.returned).length;

  const hasFilters = search || filterDate || filterStatus !== "all";

  return (
    <div style={styles.page}>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseRed {
          0%,100% { box-shadow: 0 0 0 0 rgba(239,68,68,0.35); }
          50%      { box-shadow: 0 0 0 8px rgba(239,68,68,0); }
        }
        .refresh-btn:hover { background: #e2e8f0 !important; }
        .clear-btn:hover   { background: #fecaca !important; }
        .date-row:hover    { background: #d1d5db !important; }
      `}</style>

      {/* Header */}
      <div
        style={{
          ...styles.header,
          opacity: animIn ? 1 : 0,
          transform: animIn ? "translateY(0)" : "translateY(-20px)",
          transition: "all 0.5s ease",
        }}
      >
        <div style={styles.headerLeft}>
          <div style={styles.headerIcon}>🏫</div>
          <div>
            <div style={styles.headerTitle}>In-Out Dashboard</div>
            <div style={styles.headerSub}>{facultyName} · Faculty View</div>
          </div>
        </div>
        <button className="refresh-btn" style={styles.refreshBtn} onClick={loadRecords}>
          ↻ Refresh
        </button>
      </div>

      {/* Stat Cards */}
      <div
        style={{
          ...styles.statsRow,
          opacity: animIn ? 1 : 0,
          transition: "opacity 0.5s 0.15s ease",
        }}
      >
        <div style={{ ...styles.statCard, borderTop: "3px solid #f59e0b" }}>
          <div style={styles.statNum}>{outNow}</div>
          <div style={styles.statLabel}>Currently Out</div>
          {outNow > 0 && <div style={styles.liveDot} />}
        </div>
        <div style={{ ...styles.statCard, borderTop: "3px solid #6366f1" }}>
          <div style={styles.statNum}>{totalToday}</div>
          <div style={styles.statLabel}>Exits Today</div>
        </div>
        <div style={{ ...styles.statCard, borderTop: "3px solid #22c55e" }}>
          <div style={styles.statNum}>{returnedToday}</div>
          <div style={styles.statLabel}>Returned Today</div>
        </div>
      </div>

      {/* Filters */}
      <div style={styles.filtersBar}>
        <input
          style={styles.searchInput}
          placeholder="🔍  Search name, roll no, destination..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div style={styles.filterRow}>
          <input
            style={styles.dateInput}
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
          />
          <select
            style={styles.select}
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="out">Still Out</option>
            <option value="returned">Returned</option>
          </select>
          {hasFilters && (
            <button
              className="clear-btn"
              style={styles.clearBtn}
              onClick={() => {
                setSearch("");
                setFilterDate("");
                setFilterStatus("all");
              }}
            >
              ✕ Clear
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div style={styles.tabs}>
        <button
          style={{ ...styles.tab, ...(activeTab === "today" ? styles.tabActive : {}) }}
          onClick={() => setActiveTab("today")}
        >
          Today ({todayRecords.length})
          {outNow > 0 && <span style={styles.tabBadge}>{outNow} out</span>}
        </button>
        <button
          style={{ ...styles.tab, ...(activeTab === "history" ? styles.tabActive : {}) }}
          onClick={() => setActiveTab("history")}
        >
          History ({historyRecords.length})
        </button>
      </div>

      {/* Today */}
      {activeTab === "today" && (
        <div style={styles.list}>
          {todayRecords.length === 0 ? (
            <EmptyState
              icon="📋"
              text={hasFilters ? "No records match your filters" : "No exits logged today"}
            />
          ) : (
            todayRecords.map((r, i) => <RecordCard key={r.id} r={r} i={i} />)
          )}
        </div>
      )}

      {/* History */}
      {activeTab === "history" && (
        <div style={styles.list}>
          {groupedHistory.length === 0 ? (
            <EmptyState
              icon="🗓️"
              text={hasFilters ? "No records match your filters" : "No historical records yet"}
            />
          ) : (
            groupedHistory.map(([date, dayRecs]) => (
              <div key={date} style={{ marginBottom: 8 }}>
                <div
                  className="date-row"
                  style={styles.dateHeader}
                  onClick={() =>
                    setExpandedDate(expandedDate === date ? null : date)
                  }
                >
                  <span>
                    📅 {formatDate(new Date(date + "T00:00:00").toISOString())}
                    <span style={styles.dateCount}> · {dayRecs.length} exits</span>
                  </span>
                  <span style={{ fontSize: 12, color: "#94a3b8" }}>
                    {expandedDate === date ? "▲ hide" : "▼ show"}
                  </span>
                </div>
                {expandedDate === date && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 8 }}>
                    {dayRecs.map((r, i) => (
                      <RecordCard key={r.id} r={r} i={i} />
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

function RecordCard({ r, i }) {
  const badgeStyle = {
    fontSize: 11,
    fontWeight: 700,
    padding: "3px 10px",
    borderRadius: 20,
    letterSpacing: "0.3px",
    whiteSpace: "nowrap",
    background: r.returned ? "#dcfce7" : "#fef3c7",
    color: r.returned ? "#166534" : "#92400e",
  };

  const notReturnedChipStyle = {
    fontSize: 12,
    fontWeight: 500,
    padding: "4px 10px",
    borderRadius: 8,
    background: "#fef3c7",
    color: "#b45309",
  };

  const cardStyle = {
    background: "#fff",
    borderRadius: 14,
    padding: "14px 16px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
    animation: "fadeUp 0.35s ease both",
    animationDelay: `${i * 50}ms`,
    border: "1px solid #f1f5f9",
    borderLeft: r.returned ? "4px solid #22c55e" : "4px solid #f59e0b",
    marginBottom: 2,
  };

  return (
    <div style={cardStyle}>
      <div style={cardStyles.top}>
        <div style={cardStyles.studentRow}>
          <div style={cardStyles.avatar}>
            {(r.studentName || "?").charAt(0).toUpperCase()}
          </div>
          <div>
            <div style={cardStyles.name}>{r.studentName}</div>
            <div style={cardStyles.roll}>{r.rollNo}</div>
          </div>
        </div>
        <span style={badgeStyle}>
          {r.returned ? "✓ Returned" : "⏳ Out"}
        </span>
      </div>
      <div style={cardStyles.dest}>📍 {r.destination}</div>
      <div style={cardStyles.times}>
        <span style={cardStyles.chip}>🚶 Out: {formatTime(r.outTime)}</span>
        {r.returned ? (
          <span style={cardStyles.chip}>🏠 In: {formatTime(r.returnTime)}</span>
        ) : (
          <span style={notReturnedChipStyle}>Not yet returned</span>
        )}
      </div>
    </div>
  );
}

function EmptyState({ icon, text }) {
  return (
    <div style={{ textAlign: "center", padding: "52px 0" }}>
      <div style={{ fontSize: 38, marginBottom: 10 }}>{icon}</div>
      <div style={{ color: "#94a3b8", fontSize: 14, fontWeight: 500 }}>{text}</div>
    </div>
  );
}

const cardStyles = {
  top: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  studentRow: { display: "flex", alignItems: "center", gap: 10 },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: "50%",
    background: "#4f46e5",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 15,
    fontWeight: 700,
    flexShrink: 0,
  },
  name: { fontSize: 14, fontWeight: 700, color: "#0f172a" },
  roll: { fontSize: 11, color: "#94a3b8", fontWeight: 600, marginTop: 1 },
  dest: { fontSize: 13, color: "#334155", fontWeight: 500, marginBottom: 8, paddingLeft: 2 },
  times: { display: "flex", gap: 8, flexWrap: "wrap" },
  chip: {
    fontSize: 12,
    color: "#64748b",
    background: "#f1f5f9",
    padding: "4px 10px",
    borderRadius: 8,
    fontWeight: 500,
  },
};

const styles = {
  page: {
    fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
    background: "#f0f4f8",
    minHeight: "100vh",
    padding: "28px 24px",
    maxWidth: 720,
    margin: "0 auto",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  headerLeft: { display: "flex", alignItems: "center", gap: 14 },
  headerIcon: {
    fontSize: 28,
    background: "#1e293b",
    borderRadius: 14,
    width: 52,
    height: 52,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: { fontSize: 20, fontWeight: 700, color: "#0f172a", letterSpacing: "-0.3px" },
  headerSub: { fontSize: 13, color: "#64748b", marginTop: 2 },
  refreshBtn: {
    background: "#fff",
    color: "#475569",
    border: "1.5px solid #e2e8f0",
    borderRadius: 10,
    padding: "9px 14px",
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
    transition: "background 0.2s",
  },
  statsRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: 12,
    marginBottom: 20,
  },
  statCard: {
    background: "#fff",
    borderRadius: 14,
    padding: "16px 18px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
    position: "relative",
    overflow: "hidden",
  },
  statNum: { fontSize: 28, fontWeight: 800, color: "#0f172a", letterSpacing: "-1px" },
  statLabel: {
    fontSize: 11,
    color: "#94a3b8",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    marginTop: 2,
  },
  liveDot: {
    position: "absolute",
    top: 14,
    right: 14,
    width: 10,
    height: 10,
    borderRadius: "50%",
    background: "#ef4444",
    animation: "pulseRed 1.8s infinite",
  },
  filtersBar: {
    background: "#fff",
    borderRadius: 14,
    padding: "14px 16px",
    marginBottom: 16,
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  searchInput: {
    border: "1.5px solid #e2e8f0",
    borderRadius: 10,
    padding: "10px 14px",
    fontSize: 13,
    color: "#0f172a",
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
    background: "#f8fafc",
  },
  filterRow: { display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" },
  dateInput: {
    border: "1.5px solid #e2e8f0",
    borderRadius: 10,
    padding: "8px 12px",
    fontSize: 13,
    color: "#475569",
    outline: "none",
    background: "#f8fafc",
    cursor: "pointer",
  },
  select: {
    border: "1.5px solid #e2e8f0",
    borderRadius: 10,
    padding: "8px 12px",
    fontSize: 13,
    color: "#475569",
    outline: "none",
    background: "#f8fafc",
    cursor: "pointer",
  },
  clearBtn: {
    background: "#fee2e2",
    color: "#dc2626",
    border: "none",
    borderRadius: 9,
    padding: "8px 12px",
    fontSize: 12,
    fontWeight: 700,
    cursor: "pointer",
    transition: "background 0.2s",
  },
  tabs: {
    display: "flex",
    gap: 8,
    marginBottom: 16,
    background: "#e2e8f0",
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    flex: 1,
    padding: "9px 0",
    border: "none",
    borderRadius: 10,
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
    background: "transparent",
    color: "#64748b",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    transition: "all 0.2s",
  },
  tabActive: {
    background: "#fff",
    color: "#4f46e5",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  tabBadge: {
    background: "#fef3c7",
    color: "#b45309",
    fontSize: 10,
    fontWeight: 700,
    padding: "2px 7px",
    borderRadius: 20,
  },
  list: { display: "flex", flexDirection: "column", gap: 10 },
  dateHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#e2e8f0",
    borderRadius: 10,
    padding: "10px 14px",
    cursor: "pointer",
    fontSize: 13,
    fontWeight: 700,
    color: "#334155",
    userSelect: "none",
    transition: "background 0.2s",
  },
  dateCount: { fontWeight: 400, color: "#64748b" },
};