import { useState, useRef, useEffect } from "react";

const STORAGE_KEY = "hostel_profile_student";

const defaultProfile = {
  name: "Aryan Sharma",
  rollNo: "22BCE0142",
  email: "aryan.sharma@university.edu",
  phone: "+91 98765 43210",
  course: "B.Tech Computer Science",
  year: "3rd Year",
  block: "Block B",
  roomNo: "B-214",
  bloodGroup: "O+",
  hometown: "Pune, Maharashtra",
  parentName: "Rajesh Sharma",
  parentPhone: "+91 99887 76655",
  bio: "Passionate about coding and competitive programming. Block B mess representative.",
  avatar: null,
};

const YEAR_OPTIONS = ["1st Year", "2nd Year", "3rd Year", "4th Year"];
const BLOCK_OPTIONS = ["Block A", "Block B", "Block C", "Block D", "Block E"];
const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

export default function ProfileStudent() {
  const [profile, setProfile] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || defaultProfile;
    } catch {
      return defaultProfile;
    }
  });
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(profile);
  const [saved, setSaved] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(profile.avatar);
  const fileRef = useRef();

  useEffect(() => {
    setAvatarPreview(profile.avatar);
  }, [profile.avatar]);

  const startEdit = () => {
    setDraft({ ...profile });
    setAvatarPreview(profile.avatar);
    setEditing(true);
  };

  const cancelEdit = () => {
    setAvatarPreview(profile.avatar);
    setEditing(false);
  };

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

  const Field = ({ label, field, type = "text", options }) => (
    <div style={s.field}>
      <label style={s.label}>{label}</label>
      {!editing ? (
        <div style={s.value}>{profile[field] || <span style={s.empty}>—</span>}</div>
      ) : options ? (
        <select
          style={s.input}
          value={draft[field]}
          onChange={(e) => setDraft({ ...draft, [field]: e.target.value })}
        >
          {options.map((o) => <option key={o}>{o}</option>)}
        </select>
      ) : (
        <input
          style={s.input}
          type={type}
          value={draft[field]}
          onChange={(e) => setDraft({ ...draft, [field]: e.target.value })}
        />
      )}
    </div>
  );

  const initials = profile.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

  return (
    <div style={s.page}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />

      {/* Toast */}
      {saved && (
        <div style={s.toast}>✅ Profile saved successfully!</div>
      )}

      {/* Hero Card */}
      <div style={s.heroCard}>
        <div style={s.heroBg} />
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
            <div style={s.roleTag}>🎓 Student</div>
            {editing ? (
              <input
                style={{ ...s.input, fontSize: "22px", fontFamily: "'DM Serif Display', serif", background: "rgba(255,255,255,0.15)", color: "#fff", border: "1.5px solid rgba(255,255,255,0.3)", marginBottom: "6px" }}
                value={draft.name}
                onChange={(e) => setDraft({ ...draft, name: e.target.value })}
              />
            ) : (
              <h1 style={s.heroName}>{profile.name}</h1>
            )}
            <div style={s.heroMeta}>
              <span style={s.metaPill}>🎫 {profile.rollNo}</span>
              <span style={s.metaPill}>🏠 {profile.block} · Room {profile.roomNo}</span>
              <span style={s.metaPill}>📚 {profile.year}</span>
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

      {/* Bio */}
      <div style={s.section}>
        <div style={s.sectionTitle}>About</div>
        {editing ? (
          <textarea
            style={{ ...s.input, resize: "vertical", lineHeight: 1.6 }}
            rows={3}
            value={draft.bio}
            onChange={(e) => setDraft({ ...draft, bio: e.target.value })}
          />
        ) : (
          <p style={s.bioText}>{profile.bio || "No bio added yet."}</p>
        )}
      </div>

      {/* Academic Info */}
      <div style={s.section}>
        <div style={s.sectionTitle}>Academic Information</div>
        <div style={s.grid}>
          <Field label="Roll Number" field="rollNo" />
          <Field label="Course" field="course" />
          <Field label="Year" field="year" options={YEAR_OPTIONS} />
          <Field label="Email" field="email" type="email" />
          <Field label="Phone" field="phone" type="tel" />
          <Field label="Blood Group" field="bloodGroup" options={BLOOD_GROUPS} />
        </div>
      </div>

      {/* Hostel Info */}
      <div style={s.section}>
        <div style={s.sectionTitle}>Hostel Details</div>
        <div style={s.grid}>
          <Field label="Block" field="block" options={BLOCK_OPTIONS} />
          <Field label="Room Number" field="roomNo" />
          <Field label="Hometown" field="hometown" />
        </div>
      </div>

      {/* Parent Info */}
      <div style={s.section}>
        <div style={s.sectionTitle}>Parent / Guardian</div>
        <div style={s.grid}>
          <Field label="Parent Name" field="parentName" />
          <Field label="Parent Phone" field="parentPhone" type="tel" />
        </div>
      </div>

      <style>{`
        @keyframes slideDown { from { opacity:0; transform:translateY(-16px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeUp { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }
        input:focus, select:focus, textarea:focus { outline: none; border-color: #6366f1 !important; box-shadow: 0 0 0 3px rgba(99,102,241,0.12); }
      `}</style>
    </div>
  );
}

const s = {
  page: {
    minHeight: "100vh",
    background: "#f5f3ff",
    fontFamily: "'DM Sans', system-ui, sans-serif",
    paddingBottom: "48px",
  },
  toast: {
    position: "fixed", top: "20px", left: "50%", transform: "translateX(-50%)",
    background: "#22c55e", color: "#fff", borderRadius: "10px", padding: "10px 24px",
    fontSize: "14px", fontWeight: 600, zIndex: 999, boxShadow: "0 4px 20px rgba(34,197,94,0.35)",
    animation: "slideDown 0.3s ease",
  },
  heroCard: {
    position: "relative", overflow: "hidden",
    background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #a855f7 100%)",
    borderRadius: "0 0 32px 32px",
    padding: "40px 24px 36px 24px",
    marginBottom: "0",
    boxShadow: "0 8px 40px rgba(79,70,229,0.35)",
  },
  heroBg: {
    position: "absolute", inset: 0,
    backgroundImage: "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.08) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.06) 0%, transparent 40%)",
    pointerEvents: "none",
  },
  heroContent: {
    position: "relative", display: "flex", alignItems: "flex-start",
    gap: "20px", flexWrap: "wrap", maxWidth: "800px", margin: "0 auto",
  },
  avatarWrap: { position: "relative", flexShrink: 0 },
  avatar: {
    width: "88px", height: "88px", borderRadius: "50%",
    background: "rgba(255,255,255,0.2)", backdropFilter: "blur(10px)",
    border: "3px solid rgba(255,255,255,0.5)",
    display: "flex", alignItems: "center", justifyContent: "center",
    overflow: "hidden",
  },
  avatarImg: { width: "100%", height: "100%", objectFit: "cover" },
  initials: { fontSize: "30px", fontWeight: 700, color: "#fff", fontFamily: "'DM Serif Display', serif" },
  avatarEditBtn: {
    position: "absolute", bottom: 0, right: 0,
    width: "26px", height: "26px", borderRadius: "50%",
    background: "#fff", border: "none", cursor: "pointer",
    fontSize: "13px", display: "flex", alignItems: "center", justifyContent: "center",
    boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
  },
  heroInfo: { flex: 1 },
  roleTag: {
    display: "inline-block", background: "rgba(255,255,255,0.18)", backdropFilter: "blur(8px)",
    borderRadius: "99px", padding: "3px 12px", fontSize: "12px", color: "rgba(255,255,255,0.9)",
    fontWeight: 600, marginBottom: "6px", letterSpacing: "0.02em",
  },
  heroName: {
    margin: "0 0 10px 0", fontSize: "26px", fontWeight: 400,
    fontFamily: "'DM Serif Display', serif", color: "#fff", letterSpacing: "-0.3px",
  },
  heroMeta: { display: "flex", gap: "8px", flexWrap: "wrap" },
  metaPill: {
    background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)",
    borderRadius: "99px", padding: "4px 12px", fontSize: "12px",
    color: "rgba(255,255,255,0.92)", fontWeight: 500,
  },
  heroActions: { display: "flex", alignItems: "flex-start", paddingTop: "8px" },
  editBtn: {
    background: "rgba(255,255,255,0.18)", backdropFilter: "blur(8px)",
    border: "1.5px solid rgba(255,255,255,0.35)", borderRadius: "10px",
    padding: "9px 20px", color: "#fff", fontSize: "13.5px", fontWeight: 600,
    cursor: "pointer", transition: "all 0.2s",
  },
  editBtnGroup: { display: "flex", gap: "8px" },
  saveBtn: {
    background: "#fff", borderRadius: "10px", border: "none",
    padding: "9px 20px", color: "#4f46e5", fontSize: "13.5px",
    fontWeight: 700, cursor: "pointer", boxShadow: "0 2px 12px rgba(0,0,0,0.12)",
  },
  cancelBtn: {
    background: "rgba(255,255,255,0.12)", border: "1.5px solid rgba(255,255,255,0.25)",
    borderRadius: "10px", padding: "9px 16px", color: "rgba(255,255,255,0.85)",
    fontSize: "13px", cursor: "pointer",
  },
  section: {
    maxWidth: "800px", margin: "24px auto 0 auto",
    background: "#fff", borderRadius: "18px", padding: "24px",
    boxShadow: "0 2px 16px rgba(79,70,229,0.07)", animation: "fadeUp 0.4s ease both",
  },
  sectionTitle: {
    fontSize: "13px", fontWeight: 700, color: "#6366f1",
    textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "18px",
    paddingBottom: "10px", borderBottom: "1px solid #ede9fe",
  },
  bioText: { margin: 0, fontSize: "14.5px", color: "#374151", lineHeight: 1.7 },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "18px" },
  field: { display: "flex", flexDirection: "column", gap: "5px" },
  label: { fontSize: "11.5px", fontWeight: 600, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.06em" },
  value: { fontSize: "14.5px", color: "#111827", fontWeight: 500, padding: "2px 0" },
  empty: { color: "#d1d5db" },
  input: {
    border: "1.5px solid #e5e7eb", borderRadius: "9px", padding: "9px 12px",
    fontSize: "14px", color: "#111827", fontFamily: "'DM Sans', sans-serif",
    background: "#fafafa", transition: "border-color 0.2s, box-shadow 0.2s",
    width: "100%", boxSizing: "border-box",
  },
};