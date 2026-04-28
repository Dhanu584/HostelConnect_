import { useState, useRef, useEffect } from "react";

const STORAGE_KEY = "hostel_profile_student";

const AVATAR_COLORS = [
  ["#667eea", "#764ba2"],
  ["#f093fb", "#f5576c"],
  ["#4facfe", "#00f2fe"],
  ["#43e97b", "#38f9d7"],
  ["#fa709a", "#fee140"],
  ["#a18cd1", "#fbc2eb"],
  ["#fccb90", "#d57eeb"],
  ["#fd7043", "#ff8a65"],
];

function getInitials(name) {
  if (!name) return "?";
  return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}

function loadProfile() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || null;
  } catch { return null; }
}

function saveProfile(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

const defaultProfile = {
  name: "Arjun Sharma",
  rollNo: "22BCE0154",
  email: "arjun.sharma@vit.ac.in",
  phone: "+91 98765 43210",
  room: "A-204",
  block: "Block A",
  batch: "2022–2026",
  branch: "B.Tech CSE",
  bloodGroup: "B+",
  hometown: "Pune, Maharashtra",
  parentName: "Rajesh Sharma",
  parentPhone: "+91 91234 56789",
  bio: "Third year CSE student. Loves competitive programming and badminton.",
  avatarColor: 0,
  avatarUrl: "",
};

const FIELD_CONFIG = [
  { section: "Academic Details", fields: [
    { key: "rollNo", label: "Roll Number", icon: "🎓", editable: false },
    { key: "batch", label: "Batch", icon: "📅", editable: false },
    { key: "branch", label: "Branch", icon: "🏛️", editable: false },
  ]},
  { section: "Hostel Details", fields: [
    { key: "room", label: "Room Number", icon: "🚪", editable: true },
    { key: "block", label: "Block", icon: "🏢", editable: true },
  ]},
  { section: "Contact Info", fields: [
    { key: "email", label: "Email", icon: "✉️", editable: true, type: "email" },
    { key: "phone", label: "Phone", icon: "📞", editable: true },
    { key: "bloodGroup", label: "Blood Group", icon: "🩸", editable: true },
    { key: "hometown", label: "Hometown", icon: "🏠", editable: true },
  ]},
  { section: "Parent / Guardian", fields: [
    { key: "parentName", label: "Parent Name", icon: "👨‍👩‍👦", editable: true },
    { key: "parentPhone", label: "Parent Phone", icon: "📱", editable: true },
  ]},
];

export default function ProfileStudent() {
  const [profile, setProfile] = useState(() => loadProfile() || defaultProfile);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(null);
  const [saved, setSaved] = useState(false);
  const [photoHover, setPhotoHover] = useState(false);
  const fileRef = useRef();

  const colorPair = AVATAR_COLORS[profile.avatarColor % AVATAR_COLORS.length];

  const startEdit = () => {
    setDraft({ ...profile });
    setEditing(true);
  };

  const cancelEdit = () => {
    setEditing(false);
    setDraft(null);
  };

  const saveEdit = () => {
    saveProfile(draft);
    setProfile(draft);
    setEditing(false);
    setDraft(null);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleField = (key, val) => {
    setDraft((d) => ({ ...d, [key]: val }));
  };

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const url = ev.target.result;
      if (editing) handleField("avatarUrl", url);
      else {
        const updated = { ...profile, avatarUrl: url };
        saveProfile(updated);
        setProfile(updated);
      }
    };
    reader.readAsDataURL(file);
  };

  const cycleColor = () => {
    const next = (profile.avatarColor + 1) % AVATAR_COLORS.length;
    if (editing) handleField("avatarColor", next);
    else {
      const updated = { ...profile, avatarColor: next };
      saveProfile(updated);
      setProfile(updated);
    }
  };

  const current = editing ? draft : profile;

  return (
    <div style={S.page}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet" />

      {/* Save toast */}
      {saved && (
        <div style={S.toast}>✅ Profile saved successfully!</div>
      )}

      {/* Hero Banner */}
      <div style={{ ...S.banner, background: `linear-gradient(135deg, ${colorPair[0]}, ${colorPair[1]})` }}>
        <div style={S.bannerNoise} />
        <div style={S.bannerContent}>
          {/* Avatar */}
          <div
            style={S.avatarWrap}
            onMouseEnter={() => setPhotoHover(true)}
            onMouseLeave={() => setPhotoHover(false)}
            onClick={() => fileRef.current.click()}
          >
            {current.avatarUrl ? (
              <img src={current.avatarUrl} alt="avatar" style={S.avatarImg} />
            ) : (
              <div style={{ ...S.avatarPlaceholder, background: `linear-gradient(135deg, ${colorPair[0]}cc, ${colorPair[1]}cc)` }}>
                <span style={S.avatarInitials}>{getInitials(current.name)}</span>
              </div>
            )}
            {photoHover && (
              <div style={S.avatarOverlay}>
                <span style={{ fontSize: "22px" }}>📷</span>
                <span style={{ fontSize: "11px", fontWeight: 600 }}>Change Photo</span>
              </div>
            )}
            <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handlePhoto} />
          </div>

          {/* Name & Role */}
          <div style={S.heroText}>
            {editing ? (
              <input
                style={S.nameInput}
                value={draft.name}
                onChange={(e) => handleField("name", e.target.value)}
                placeholder="Full Name"
              />
            ) : (
              <h1 style={S.heroName}>{profile.name}</h1>
            )}
            <div style={S.heroBadge}>🎓 Student</div>
            <div style={S.heroSub}>{current.rollNo} &nbsp;·&nbsp; {current.branch}</div>
          </div>

          {/* Color picker dot */}
          {!current.avatarUrl && (
            <button style={S.colorBtn} onClick={cycleColor} title="Change avatar color">🎨</button>
          )}
        </div>
      </div>

      {/* Bio */}
      <div style={S.bioCard}>
        {editing ? (
          <textarea
            style={S.bioTextarea}
            value={draft.bio}
            onChange={(e) => handleField("bio", e.target.value)}
            rows={3}
            placeholder="Write something about yourself..."
          />
        ) : (
          <p style={S.bioText}>"{profile.bio}"</p>
        )}
      </div>

      {/* Sections */}
      <div style={S.grid}>
        {FIELD_CONFIG.map((section) => (
          <div key={section.section} style={S.sectionCard}>
            <div style={S.sectionTitle}>{section.section}</div>
            <div style={S.fieldList}>
              {section.fields.map((f) => (
                <div key={f.key} style={S.fieldRow}>
                  <span style={S.fieldIcon}>{f.icon}</span>
                  <div style={S.fieldBody}>
                    <span style={S.fieldLabel}>{f.label}</span>
                    {editing && f.editable ? (
                      <input
                        style={S.fieldInput}
                        type={f.type || "text"}
                        value={draft[f.key] || ""}
                        onChange={(e) => handleField(f.key, e.target.value)}
                      />
                    ) : (
                      <span style={S.fieldValue}>{current[f.key] || "—"}</span>
                    )}
                  </div>
                  {!f.editable && <span style={S.lockedBadge}>🔒</span>}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div style={S.actionBar}>
        {editing ? (
          <>
            <button style={S.cancelBtn} onClick={cancelEdit}>Cancel</button>
            <button style={S.saveBtn} onClick={saveEdit}>💾 Save Changes</button>
          </>
        ) : (
          <button style={S.editBtn} onClick={startEdit}>✏️ Edit Profile</button>
        )}
      </div>

      <style>{`
        @keyframes slideDown { from { opacity:0; transform:translateY(-20px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
      `}</style>
    </div>
  );
}

const S = {
  page: {
    minHeight: "100vh",
    background: "#f8fafc",
    fontFamily: "'DM Sans', system-ui, sans-serif",
    paddingBottom: "48px",
  },
  toast: {
    position: "fixed", top: "20px", left: "50%", transform: "translateX(-50%)",
    background: "#0f172a", color: "#fff", borderRadius: "99px",
    padding: "10px 24px", fontSize: "13px", fontWeight: 600,
    zIndex: 9999, animation: "slideDown 0.3s ease",
    boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
  },
  banner: {
    position: "relative", overflow: "hidden",
    padding: "40px 24px 32px", minHeight: "200px",
  },
  bannerNoise: {
    position: "absolute", inset: 0,
    backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
    opacity: 0.5,
  },
  bannerContent: {
    position: "relative", display: "flex", alignItems: "flex-end",
    gap: "20px", maxWidth: "800px", margin: "0 auto",
  },
  avatarWrap: {
    width: "90px", height: "90px", borderRadius: "50%",
    border: "3px solid rgba(255,255,255,0.8)",
    overflow: "hidden", cursor: "pointer", position: "relative",
    flexShrink: 0, boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
  },
  avatarImg: { width: "100%", height: "100%", objectFit: "cover" },
  avatarPlaceholder: {
    width: "100%", height: "100%",
    display: "flex", alignItems: "center", justifyContent: "center",
    background: "rgba(255,255,255,0.2)",
  },
  avatarInitials: { fontSize: "30px", fontWeight: 800, color: "#fff", fontFamily: "'Playfair Display', serif" },
  avatarOverlay: {
    position: "absolute", inset: 0, background: "rgba(0,0,0,0.55)",
    display: "flex", flexDirection: "column", alignItems: "center",
    justifyContent: "center", gap: "2px", color: "#fff",
  },
  heroText: { flex: 1 },
  heroName: {
    margin: "0 0 6px 0", color: "#fff",
    fontFamily: "'Playfair Display', serif", fontSize: "28px", fontWeight: 800,
    textShadow: "0 2px 8px rgba(0,0,0,0.2)",
  },
  nameInput: {
    background: "rgba(255,255,255,0.25)", border: "1.5px solid rgba(255,255,255,0.5)",
    borderRadius: "8px", padding: "6px 12px", fontSize: "20px",
    fontWeight: 700, color: "#fff", width: "100%", outline: "none",
    fontFamily: "'Playfair Display', serif", marginBottom: "6px",
  },
  heroBadge: {
    display: "inline-flex", alignItems: "center", gap: "4px",
    background: "rgba(255,255,255,0.2)", backdropFilter: "blur(8px)",
    borderRadius: "99px", padding: "3px 12px", fontSize: "12px",
    fontWeight: 600, color: "#fff", marginBottom: "4px",
  },
  heroSub: { fontSize: "13px", color: "rgba(255,255,255,0.75)", marginTop: "2px" },
  colorBtn: {
    position: "absolute", top: "0", right: "0",
    background: "rgba(255,255,255,0.2)", border: "none",
    borderRadius: "50%", width: "34px", height: "34px",
    fontSize: "16px", cursor: "pointer",
  },
  bioCard: {
    maxWidth: "800px", margin: "-1px auto 0 auto",
    background: "#fff", padding: "20px 28px",
    borderBottom: "1px solid #f1f5f9",
  },
  bioText: {
    margin: 0, fontSize: "14.5px", color: "#475569",
    fontStyle: "italic", lineHeight: 1.7,
  },
  bioTextarea: {
    width: "100%", border: "1.5px solid #e2e8f0", borderRadius: "8px",
    padding: "10px 14px", fontSize: "14px", color: "#334155",
    fontFamily: "inherit", resize: "vertical", outline: "none",
    background: "#f8fafc", boxSizing: "border-box",
  },
  grid: {
    maxWidth: "800px", margin: "20px auto 0 auto",
    display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
    gap: "14px", padding: "0 16px",
  },
  sectionCard: {
    background: "#fff", borderRadius: "14px",
    border: "1px solid #e8edf2",
    boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
    overflow: "hidden",
    animation: "fadeUp 0.4s ease both",
  },
  sectionTitle: {
    padding: "12px 18px", fontSize: "11px", fontWeight: 700,
    letterSpacing: "0.08em", textTransform: "uppercase",
    color: "#94a3b8", background: "#f8fafc",
    borderBottom: "1px solid #f1f5f9",
  },
  fieldList: { padding: "6px 0" },
  fieldRow: {
    display: "flex", alignItems: "center", gap: "12px",
    padding: "10px 18px", borderBottom: "1px solid #f8fafc",
  },
  fieldIcon: { fontSize: "16px", flexShrink: 0 },
  fieldBody: { flex: 1, display: "flex", flexDirection: "column", gap: "2px" },
  fieldLabel: { fontSize: "11px", color: "#94a3b8", fontWeight: 500, letterSpacing: "0.02em" },
  fieldValue: { fontSize: "14px", color: "#1e293b", fontWeight: 500 },
  fieldInput: {
    border: "1.5px solid #cbd5e1", borderRadius: "7px",
    padding: "5px 10px", fontSize: "13.5px", color: "#1e293b",
    fontFamily: "inherit", outline: "none", background: "#f8fafc",
    transition: "border-color 0.2s",
  },
  lockedBadge: { fontSize: "12px", opacity: 0.4 },
  actionBar: {
    maxWidth: "800px", margin: "24px auto 0 auto",
    display: "flex", justifyContent: "flex-end", gap: "10px",
    padding: "0 16px",
  },
  editBtn: {
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    color: "#fff", border: "none", borderRadius: "10px",
    padding: "11px 28px", fontSize: "14px", fontWeight: 600,
    cursor: "pointer", boxShadow: "0 4px 14px rgba(102,126,234,0.4)",
  },
  saveBtn: {
    background: "linear-gradient(135deg, #22c55e, #16a34a)",
    color: "#fff", border: "none", borderRadius: "10px",
    padding: "11px 28px", fontSize: "14px", fontWeight: 600,
    cursor: "pointer", boxShadow: "0 4px 14px rgba(34,197,94,0.35)",
  },
  cancelBtn: {
    background: "#f1f5f9", color: "#64748b", border: "none",
    borderRadius: "10px", padding: "11px 22px",
    fontSize: "14px", fontWeight: 600, cursor: "pointer",
  },
};