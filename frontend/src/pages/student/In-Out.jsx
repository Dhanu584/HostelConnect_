import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

const STORAGE_KEY = "hostel_inout_records";

const generateId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

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

export default function SInOut() {
  const { user } = useAuth();
  const studentName = user?.name || "Student";
  const rollNo = user?.rollNo || user?.id || "N/A";

  const [records, setRecords] = useState([]);
  const [form, setForm] = useState({ destination: "", outTime: "" });
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState("today");
  const [animIn, setAnimIn] = useState(false);

  useEffect(() => {
    loadRecords();
    setTimeout(() => setAnimIn(true), 50);
  }, []);

  const loadRecords = () => {
    try {
      const all = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      const mine = all.filter((r) => r.rollNo === rollNo);
      setRecords(mine);
    } catch {
      setRecords([]);
    }
  };

  const saveRecord = () => {
    if (!form.destination.trim() || !form.outTime) return;
    const all = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    const newEntry = {
      id: generateId(),
      studentName,
      rollNo,
      destination: form.destination.trim(),
      outTime: new Date(form.outTime).toISOString(),
      returnTime: null,
      returned: false,
      date: todayKey(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify([newEntry, ...all]));
    setForm({ destination: "", outTime: "" });
    setShowForm(false);
    loadRecords();
  };

  const markReturned = (id) => {
    const all = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    const updated = all.map((r) =>
      r.id === id ? { ...r, returned: true, returnTime: new Date().toISOString() } : r
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    loadRecords();
  };

  const todayRecords = records.filter((r) => r.date === todayKey());
  const historyRecords = records.filter((r) => r.date !== todayKey());
  const displayRecords = activeTab === "today" ? todayRecords : historyRecords;

  return (
    <div style={styles.page}>
      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .inout-input:focus { border-color: #6366f1 !important; background: #fff !important; }
        .return-btn:hover  { background: #bbf7d0 !important; }
        .add-btn:hover     { background: #3730a3 !important; }
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
          <div style={styles.headerIcon}>🚪</div>
          <div>
            <div style={styles.headerTitle}>In-Out Register</div>
            <div style={styles.headerSub}>{studentName} · {rollNo}</div>
          </div>
        </div>
        <button className="add-btn" style={styles.addBtn} onClick={() => setShowForm(!showForm)}>
          {showForm ? "✕ Cancel" : "+ Log Exit"}
        </button>
      </div>

      {/* Entry Form */}
      {showForm && (
        <div style={{ ...styles.formCard, animation: "slideDown 0.3s ease" }}>
          <div style={styles.formTitle}>New Exit Entry</div>
          <div style={styles.formGrid}>
            <div style={styles.fieldGroup}>
              <label style={styles.label}>Destination / Purpose</label>
              <input
                className="inout-input"
                style={styles.input}
                placeholder="e.g. City Market, Home visit, Hospital..."
                value={form.destination}
                onChange={(e) => setForm({ ...form, destination: e.target.value })}
              />
            </div>
            <div style={styles.fieldGroup}>
              <label style={styles.label}>Out Time</label>
              <input
                className="inout-input"
                style={styles.input}
                type="datetime-local"
                value={form.outTime}
                onChange={(e) => setForm({ ...form, outTime: e.target.value })}
              />
            </div>
          </div>
          <button
            style={{
              ...styles.submitBtn,
              opacity: form.destination && form.outTime ? 1 : 0.45,
              cursor: form.destination && form.outTime ? "pointer" : "not-allowed",
            }}
            onClick={saveRecord}
            disabled={!form.destination || !form.outTime}
          >
            Submit Entry →
          </button>
        </div>
      )}

      {/* Tabs */}
      <div style={styles.tabs}>
        {["today", "history"].map((tab) => (
          <button
            key={tab}
            style={{ ...styles.tab, ...(activeTab === tab ? styles.tabActive : {}) }}
            onClick={() => setActiveTab(tab)}
          >
            {tab === "today" ? `Today (${todayRecords.length})` : `History (${historyRecords.length})`}
          </button>
        ))}
      </div>

      {/* Records */}
      <div style={styles.recordsList}>
        {displayRecords.length === 0 ? (
          <div style={styles.empty}>
            <div style={styles.emptyIcon}>{activeTab === "today" ? "🚶" : "📋"}</div>
            <div style={styles.emptyText}>
              {activeTab === "today" ? "No exits logged today" : "No past records found"}
            </div>
            {activeTab === "today" && (
              <button style={styles.emptyAction} onClick={() => setShowForm(true)}>
                + Log your first exit
              </button>
            )}
          </div>
        ) : (
          displayRecords.map((r, i) => {
            const badgeStyle = {
              ...styles.badge,
              background: r.returned ? "#dcfce7" : "#fef3c7",
              color: r.returned ? "#166534" : "#92400e",
            };
            return (
              <div
                key={r.id}
                style={{
                  ...styles.recordCard,
                  animationDelay: `${i * 60}ms`,
                  borderLeft: r.returned ? "4px solid #22c55e" : "4px solid #f59e0b",
                }}
              >
                <div style={styles.recordTop}>
                  <div style={styles.destination}>📍 {r.destination}</div>
                  <span style={badgeStyle}>
                    {r.returned ? "✓ Returned" : "⏳ Out"}
                  </span>
                </div>
                <div style={styles.recordMeta}>
                  {activeTab === "history" && (
                    <span style={styles.metaChip}>📅 {formatDate(r.outTime)}</span>
                  )}
                  <span style={styles.metaChip}>🚶 Out: {formatTime(r.outTime)}</span>
                  {r.returned && (
                    <span style={styles.metaChip}>🏠 In: {formatTime(r.returnTime)}</span>
                  )}
                </div>
                {!r.returned && (
                  <button
                    className="return-btn"
                    style={styles.returnBtn}
                    onClick={() => markReturned(r.id)}
                  >
                    Mark as Returned
                  </button>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
    background: "#f8fafc",
    minHeight: "100vh",
    padding: "28px 24px",
    maxWidth: 640,
    margin: "0 auto",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
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
  addBtn: {
    background: "#4f46e5",
    color: "#fff",
    border: "none",
    borderRadius: 10,
    padding: "10px 16px",
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
    transition: "background 0.2s",
  },
  formCard: {
    background: "#fff",
    borderRadius: 16,
    padding: "20px 22px",
    marginBottom: 20,
    boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
    border: "1px solid #e0e7ff",
  },
  formTitle: { fontSize: 15, fontWeight: 700, color: "#0f172a", marginBottom: 16 },
  formGrid: { display: "flex", flexDirection: "column", gap: 12 },
  fieldGroup: { display: "flex", flexDirection: "column", gap: 5 },
  label: {
    fontSize: 11,
    fontWeight: 700,
    color: "#6366f1",
    textTransform: "uppercase",
    letterSpacing: "0.6px",
  },
  input: {
    border: "1.5px solid #e2e8f0",
    borderRadius: 10,
    padding: "10px 14px",
    fontSize: 14,
    color: "#0f172a",
    outline: "none",
    background: "#f8fafc",
    transition: "border-color 0.2s, background 0.2s",
  },
  submitBtn: {
    marginTop: 16,
    width: "100%",
    background: "#4f46e5",
    color: "#fff",
    border: "none",
    borderRadius: 10,
    padding: "12px",
    fontSize: 14,
    fontWeight: 700,
    transition: "opacity 0.2s",
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
    transition: "all 0.2s",
  },
  tabActive: {
    background: "#fff",
    color: "#4f46e5",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  recordsList: { display: "flex", flexDirection: "column", gap: 12 },
  recordCard: {
    background: "#fff",
    borderRadius: 14,
    padding: "16px 18px",
    boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
    animation: "fadeUp 0.4s ease both",
    border: "1px solid #f1f5f9",
  },
  recordTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  destination: { fontSize: 15, fontWeight: 700, color: "#0f172a" },
  badge: {
    fontSize: 11,
    fontWeight: 700,
    padding: "3px 10px",
    borderRadius: 20,
    letterSpacing: "0.3px",
  },
  recordMeta: { display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 10 },
  metaChip: {
    fontSize: 12,
    color: "#64748b",
    background: "#f1f5f9",
    padding: "4px 10px",
    borderRadius: 8,
    fontWeight: 500,
  },
  returnBtn: {
    background: "#f0fdf4",
    color: "#166534",
    border: "1.5px solid #86efac",
    borderRadius: 9,
    padding: "7px 14px",
    fontSize: 12,
    fontWeight: 700,
    cursor: "pointer",
    transition: "background 0.2s",
  },
  empty: { textAlign: "center", padding: "52px 0" },
  emptyIcon: { fontSize: 38, marginBottom: 10 },
  emptyText: { color: "#94a3b8", fontSize: 14, fontWeight: 500, marginBottom: 16 },
  emptyAction: {
    background: "#4f46e5",
    color: "#fff",
    border: "none",
    borderRadius: 10,
    padding: "10px 20px",
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
  },
};