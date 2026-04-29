import { useState, useRef, useEffect } from "react";

const STORAGE_KEY = "hostel_profile_committee";

const defaultProfile = {
  name: "Vikram Reddy",
  memberId: "COM-2024-008",
  email: "vikram.reddy@university.edu",
  phone: "+91 97654 32109",
  rollNo: "21BCE0088",
  course: "B.Tech ECE",
  year: "4th Year",
  role: "Mess Committee Head",
  block: "Block A",
  roomNo: "A-108",
  tenureFrom: "2024-06",
  tenureTo: "2025-05",
  responsibilities: "Overseeing mess quality, handling student grievances, coordinating with faculty warden, managing monthly mess budgets.",
  achievements: "Reduced food wastage by 30%, introduced weekly feedback system, organized Inter-Hostel Food Festival 2024.",
  bloodGroup: "A+",
  emergencyContact: "+91 99001 12233",
  bio: "Final year student committed to improving hostel life. Leading the mess committee with a focus on quality and transparency.",
  avatar: null,
};

const ROLE_OPTIONS = [
  "Mess Committee Head", "Mess Committee Member",
  "Cultural Secretary", "Sports Secretary",
  "General Secretary", "Treasurer", "Block Representative",
];
const YEAR_OPTIONS = ["1st Year", "2nd Year", "3rd Year", "4th Year"];
const BLOCK_OPTIONS = ["Block A", "Block B", "Block C", "Block D", "Block E"];
const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

export default function ProfileCommittee() {
  const [profile, setProfile] = useState(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || defaultProfile; }
    catch { return defaultProfile; }
  });
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(profile);
  const [saved, setSaved] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(profile.avatar);
  const fileRef = useRef();

  useEffect(() => { setAvatarPreview(profile.avatar); }, [profile.avatar]);

  const startEdit = () => { setDraft({ ...profile }); setAvatarPreview(profile.avatar); setEditing(true); };
  const cancelEdit = () => { setAvatarPreview(profile.avatar); setEditing(false); };

  const handleSave = () => {
    const updated = { ...draft, avatar: avatarPreview };
    setProfile(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setAvatarPreview(ev.target.result);
    reader.readAsDataURL(file);
  };

  const formatTenure = (from, to) => {
    if (!from) return "—";
    const fmt = (s) => { const [y, m] = s.split("-"); return `${["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][parseInt(m)-1]} ${y}`; };
    return `${fmt(from)} — ${to ? fmt(to) : "Present"}`;
  };

  const Field = ({ label, field, type = "text", options, full, textarea }) => (
    <div style={{ ...s.field, ...(full ? { gridColumn: "1 / -1" } : {}) }}>
      <label style={s.label}>{label}</label>
      {!editing ? (
        <div style={s.value}>{profile[field] || <span style={s.empty}>—</span>}</div>
      ) : textarea ? (
        <textarea style={{ ...s.input, resize: "vertical", lineHeight: 1.6 }} rows={3}
          value={draft[field]} onChange={(e) => setDraft({ ...draft, [field]: e.target.value })} />
      ) : options ? (
        <select style={s.input} value={draft[field]} onChange={(e) => setDraft({ ...draft, [field]: e.target.value })}>
          {options.map((o) => <option key={o}>{o}</option>)}
        </select>
      ) : (
        <input style={s.input} type={type} value={draft[field]} onChange={(e) => setDraft({ ...draft, [field]: e.target.value })} />
      )}
    </div>
  );

  const initials = profile.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

  return (
    <div style={s.page}>
      <link href="https://fonts.googleapis.com/css2?family=Fraunces:wght@400;600;700&family=IBM+Plex+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />

      {saved && <div style={s.toast}>✅ Profile saved!</div>}

      {/* Hero */}
      <div style={s.heroCard}>
        <div style={s.heroBg} />
        <div style={s.decorCircle1} />
        <div style={s.decorCircle2} />
        <div style={s.heroContent}>
          {/* Avatar */}
          <div style={s.avatarWrap}>
            <div style={s.avatar}>
              {(editing ? avatarPreview : profile.avatar) ? (
                <img src={editing ? avatarPreview : profile.avatar} alt="avatar" style={s.avatarImg} />
              ) : (
                <span style={s.initials}>{initials}</span>
              )}
            </div>
            {editing && (
              <>
                <button style={s.avatarEditBtn} onClick={() => fileRef.current.click()}>📷</button>
                <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleAvatarChange} />
              </>
            )}
          </div>

          <div style={s.heroInfo}>
            <div style={s.badgeRow}>
              <div style={s.roleTag}>⚡ Committee</div>
              <div style={s.tenureBadge}>📅 {formatTenure(profile.tenureFrom, profile.tenureTo)}</div>
            </div>
            {editing ? (
              <input
                style={{ ...s.input, fontSize: "22px", fontFamily: "'Fraunces', serif", background: "rgba(255,255,255,0.1)", color: "#fff", border: "1.5px solid rgba(255,255,255,0.25)", marginBottom: "6px" }}
                value={draft.name}
                onChange={(e) => setDraft({ ...draft, name: e.target.value })}
              />
            ) : (
              <h1 style={s.heroName}>{profile.name}</h1>
            )}
            <div style={s.heroRole}>{profile.role}</div>
            <div style={s.heroMeta}>
              <span style={s.metaPill}>🎫 {profile.rollNo}</span>
              <span style={s.metaPill}>🏠 {profile.block} · {profile.roomNo}</span>
              <span style={s.metaPill}>📚 {profile.course}</span>
            </div>
          </div>

          <div style={s.heroActions}>
            {!editing ? (
              <button style={s.editBtn} onClick={startEdit}>✏️ Edit Profile</button>
            ) : (
              <div style={s.editBtnGroup}>
                <button style={s.saveBtn} onClick={handleSave}>💾 Save</button>
                <button style={s.cancelBtn} onClick={cancelEdit}>Cancel</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats Strip */}
      <div style={s.statsStrip}>
        <div style={s.statItem}>
          <div style={s.statIcon}>🆔</div>
          <div>
            <div style={s.statLabel}>Member ID</div>
            <div style={s.statVal}>{profile.memberId}</div>
          </div>
        </div>
        <div style={s.statDivider} />
        <div style={s.statItem}>
          <div style={s.statIcon}>📧</div>
          <div>
            <div style={s.statLabel}>Email</div>
            <div style={s.statVal}>{profile.email}</div>
          </div>
        </div>
        <div style={s.statDivider} />
        <div style={s.statItem}>
          <div style={s.statIcon}>📞</div>
          <div>
            <div style={s.statLabel}>Phone</div>
            <div style={s.statVal}>{profile.phone}</div>
          </div>
        </div>
      </div>

      {/* Bio */}
      <div style={s.section}>
        <div style={s.sectionTitle}>About</div>
        {editing ? (
          <textarea style={{ ...s.input, resize: "vertical", lineHeight: 1.6 }} rows={3}
            value={draft.bio} onChange={(e) => setDraft({ ...draft, bio: e.target.value })} />
        ) : (
          <p style={s.bioText}>{profile.bio}</p>
        )}
      </div>

      {/* Committee Role */}
      <div style={s.section}>
        <div style={s.sectionTitle}>Committee Details</div>
        <div style={s.grid}>
          <Field label="Member ID" field="memberId" />
          <Field label="Role" field="role" options={ROLE_OPTIONS} />
          <Field label="Tenure From" field="tenureFrom" type="month" />
          <Field label="Tenure To" field="tenureTo" type="month" />
          <Field label="Responsibilities" field="responsibilities" full textarea />
          <Field label="Achievements" field="achievements" full textarea />
        </div>
      </div>

      {/* Academic Info */}
      <div style={s.section}>
        <div style={s.sectionTitle}>Academic & Hostel Info</div>
        <div style={s.grid}>
          <Field label="Roll Number" field="rollNo" />
          <Field label="Course" field="course" />
          <Field label="Year" field="year" options={YEAR_OPTIONS} />
          <Field label="Block" field="block" options={BLOCK_OPTIONS} />
          <Field label="Room Number" field="roomNo" />
          <Field label="Blood Group" field="bloodGroup" options={BLOOD_GROUPS} />
        </div>
      </div>

      {/* Contact */}
      <div style={s.section}>
        <div style={s.sectionTitle}>Contact Information</div>
        <div style={s.grid}>
          <Field label="Email" field="email" type="email" />
          <Field label="Phone" field="phone" type="tel" />
          <Field label="Emergency Contact" field="emergencyContact" type="tel" />
        </div>
      </div>

      <style>{`
        @keyframes slideDown { from { opacity:0; transform:translateY(-16px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeUp { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }
        input:focus, select:focus, textarea:focus { outline:none; border-color:#b45309 !important; box-shadow:0 0 0 3px rgba(180,83,9,0.1); }
      `}</style>
    </div>
  );
}

const s = {
  page: { minHeight: "100vh", background: "#fffbf0", fontFamily: "'IBM Plex Sans', system-ui, sans-serif", paddingBottom: "48px" },
  toast: {
    position: "fixed", top: "20px", left: "50%", transform: "translateX(-50%)",
    background: "#b45309", color: "#fff", borderRadius: "10px", padding: "10px 24px",
    fontSize: "14px", fontWeight: 600, zIndex: 999, boxShadow: "0 4px 20px rgba(180,83,9,0.35)",
    animation: "slideDown 0.3s ease",
  },
  heroCard: {
    position: "relative", overflow: "hidden",
    background: "linear-gradient(135deg, #78350f 0%, #b45309 50%, #d97706 100%)",
    borderRadius: "0 0 32px 32px", padding: "40px 24px 36px 24px",
    boxShadow: "0 8px 40px rgba(120,53,15,0.4)",
  },
  heroBg: {
    position: "absolute", inset: 0,
    backgroundImage: "radial-gradient(ellipse at 80% 30%, rgba(255,255,255,0.08) 0%, transparent 55%)",
    pointerEvents: "none",
  },
  decorCircle1: {
    position: "absolute", top: "-40px", right: "-40px",
    width: "180px", height: "180px", borderRadius: "50%",
    border: "30px solid rgba(255,255,255,0.06)", pointerEvents: "none",
  },
  decorCircle2: {
    position: "absolute", bottom: "-20px", left: "30%",
    width: "100px", height: "100px", borderRadius: "50%",
    background: "rgba(255,255,255,0.04)", pointerEvents: "none",
  },
  heroContent: { position: "relative", display: "flex", alignItems: "flex-start", gap: "20px", flexWrap: "wrap", maxWidth: "820px", margin: "0 auto" },
  avatarWrap: { position: "relative", flexShrink: 0 },
  avatar: {
    width: "88px", height: "88px", borderRadius: "16px",
    background: "rgba(255,255,255,0.18)", backdropFilter: "blur(10px)",
    border: "2.5px solid rgba(255,255,255,0.4)",
    display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden",
  },
  avatarImg: { width: "100%", height: "100%", objectFit: "cover" },
  initials: { fontSize: "28px", fontWeight: 700, color: "#fff", fontFamily: "'Fraunces', serif" },
  avatarEditBtn: {
    position: "absolute", bottom: "-6px", right: "-6px", width: "26px", height: "26px", borderRadius: "8px",
    background: "#fff", border: "none", cursor: "pointer", fontSize: "13px",
    display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
  },
  heroInfo: { flex: 1 },
  badgeRow: { display: "flex", gap: "8px", marginBottom: "7px", flexWrap: "wrap" },
  roleTag: {
    background: "rgba(255,255,255,0.2)", borderRadius: "99px",
    padding: "3px 12px", fontSize: "12px", color: "rgba(255,255,255,0.95)", fontWeight: 700, letterSpacing: "0.04em",
  },
  tenureBadge: {
    background: "rgba(0,0,0,0.2)", borderRadius: "99px",
    padding: "3px 12px", fontSize: "12px", color: "rgba(255,255,255,0.8)", fontWeight: 500,
  },
  heroName: { margin: "0 0 3px 0", fontSize: "26px", fontFamily: "'Fraunces', serif", color: "#fff", fontWeight: 600 },
  heroRole: { fontSize: "14px", color: "rgba(255,255,255,0.75)", fontWeight: 600, marginBottom: "10px", letterSpacing: "0.01em" },
  heroMeta: { display: "flex", gap: "8px", flexWrap: "wrap" },
  metaPill: {
    background: "rgba(255,255,255,0.15)", borderRadius: "99px",
    padding: "4px 12px", fontSize: "12px", color: "rgba(255,255,255,0.9)", fontWeight: 500,
  },
  heroActions: { display: "flex", alignItems: "flex-start", paddingTop: "8px" },
  editBtn: {
    background: "rgba(255,255,255,0.18)", backdropFilter: "blur(8px)",
    border: "1.5px solid rgba(255,255,255,0.35)", borderRadius: "10px",
    padding: "9px 20px", color: "#fff", fontSize: "13.5px", fontWeight: 700, cursor: "pointer",
  },
  editBtnGroup: { display: "flex", gap: "8px" },
  saveBtn: {
    background: "#fff", borderRadius: "10px", border: "none",
    padding: "9px 20px", color: "#b45309", fontSize: "13.5px", fontWeight: 700, cursor: "pointer",
  },
  cancelBtn: {
    background: "rgba(255,255,255,0.12)", border: "1.5px solid rgba(255,255,255,0.25)",
    borderRadius: "10px", padding: "9px 16px", color: "rgba(255,255,255,0.85)", fontSize: "13px", cursor: "pointer",
  },
  statsStrip: {
    maxWidth: "820px", margin: "0 auto 0 auto",
    background: "#fff", borderRadius: "0 0 20px 20px",
    padding: "16px 28px", display: "flex", gap: "0", flexWrap: "wrap",
    boxShadow: "0 4px 20px rgba(180,83,9,0.08)", borderTop: "1px solid #fef3c7",
  },
  statItem: { display: "flex", alignItems: "center", gap: "10px", flex: "1 1 180px", padding: "6px 12px" },
  statIcon: { fontSize: "20px", flexShrink: 0 },
  statLabel: { fontSize: "11px", color: "#94a3b8", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" },
  statVal: { fontSize: "13px", color: "#1e293b", fontWeight: 600, marginTop: "1px" },
  statDivider: { width: "1px", background: "#fef3c7", alignSelf: "stretch", margin: "4px 0" },
  section: {
    maxWidth: "820px", margin: "20px auto 0 auto",
    background: "#fff", borderRadius: "18px", padding: "24px",
    boxShadow: "0 2px 16px rgba(180,83,9,0.06)", animation: "fadeUp 0.4s ease both",
  },
  sectionTitle: {
    fontSize: "12px", fontWeight: 700, color: "#b45309",
    textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "18px",
    paddingBottom: "10px", borderBottom: "1px solid #fef3c7",
  },
  bioText: { margin: 0, fontSize: "14.5px", color: "#374151", lineHeight: 1.7 },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "18px" },
  field: { display: "flex", flexDirection: "column", gap: "5px" },
  label: { fontSize: "11px", fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.06em" },
  value: { fontSize: "14px", color: "#111827", fontWeight: 500 },
  empty: { color: "#d1d5db" },
  input: {
    border: "1.5px solid #e5e7eb", borderRadius: "9px", padding: "9px 12px",
    fontSize: "14px", color: "#111827", fontFamily: "'IBM Plex Sans', sans-serif",
    background: "#fffbf0", transition: "border-color 0.2s, box-shadow 0.2s",
    width: "100%", boxSizing: "border-box",
  },
};