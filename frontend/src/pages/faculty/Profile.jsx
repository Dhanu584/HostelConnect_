import { useState, useRef, useEffect } from "react";

const STORAGE_KEY = "hostel_profile_faculty";

const defaultProfile = {
  name: "Dr. Priya Nair",
  staffId: "FAC-2019-047",
  email: "priya.nair@university.edu",
  phone: "+91 94456 78901",
  designation: "Associate Professor",
  department: "Computer Science & Engineering",
  qualification: "Ph.D. (IIT Bombay), M.Tech (NIT Trichy)",
  experience: "12 Years",
  specialization: "Machine Learning, Data Mining",
  officeRoom: "Faculty Block, Room 304",
  availableHours: "Mon–Fri, 10:00 AM – 1:00 PM",
  hostelBlock: "Block B & C (Warden)",
  bloodGroup: "B+",
  emergencyContact: "+91 98001 23456",
  bio: "Passionate educator and researcher. Hostel warden for Block B & C. Always available for student concerns.",
  avatar: null,
};

const DESIGNATION_OPTIONS = [
  "Assistant Professor", "Associate Professor", "Professor",
  "Senior Professor", "Hostel Warden", "Chief Warden",
];
const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

export default function ProfileFaculty() {
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

  const Field = ({ label, field, type = "text", options, full }) => (
    <div style={{ ...s.field, ...(full ? { gridColumn: "1 / -1" } : {}) }}>
      <label style={s.label}>{label}</label>
      {!editing ? (
        <div style={s.value}>{profile[field] || <span style={s.empty}>—</span>}</div>
      ) : options ? (
        <select style={s.input} value={draft[field]} onChange={(e) => setDraft({ ...draft, [field]: e.target.value })}>
          {options.map((o) => <option key={o}>{o}</option>)}
        </select>
      ) : (
        <input style={s.input} type={type} value={draft[field]} onChange={(e) => setDraft({ ...draft, [field]: e.target.value })} />
      )}
    </div>
  );

  const initials = profile.name.replace("Dr. ", "").replace("Prof. ", "").split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

  return (
    <div style={s.page}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600&family=Lato:wght@400;500;600;700&display=swap" rel="stylesheet" />

      {saved && <div style={s.toast}>✅ Profile updated successfully!</div>}

      {/* Hero */}
      <div style={s.heroCard}>
        <div style={s.heroBg} />
        <div style={s.patternOverlay} />
        <div style={s.heroContent}>
          {/* Avatar */}
          <div style={s.avatarWrap}>
            <div style={s.avatarRing}>
              <div style={s.avatar}>
                {(editing ? avatarPreview : profile.avatar) ? (
                  <img src={editing ? avatarPreview : profile.avatar} alt="avatar" style={s.avatarImg} />
                ) : (
                  <span style={s.initials}>{initials}</span>
                )}
              </div>
            </div>
            {editing && (
              <>
                <button style={s.avatarEditBtn} onClick={() => fileRef.current.click()}>📷</button>
                <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleAvatarChange} />
              </>
            )}
          </div>

          <div style={s.heroInfo}>
            <div style={s.roleTag}>🏛️ Faculty</div>
            {editing ? (
              <input
                style={{ ...s.input, fontSize: "24px", fontFamily: "'Playfair Display', serif", background: "rgba(255,255,255,0.1)", color: "#fff", border: "1.5px solid rgba(255,255,255,0.25)", marginBottom: "8px" }}
                value={draft.name}
                onChange={(e) => setDraft({ ...draft, name: e.target.value })}
              />
            ) : (
              <h1 style={s.heroName}>{profile.name}</h1>
            )}
            <div style={s.heroDesig}>{profile.designation}</div>
            <div style={s.heroMeta}>
              <span style={s.metaPill}>🏢 {profile.department}</span>
              <span style={s.metaPill}>🆔 {profile.staffId}</span>
              <span style={s.metaPill}>🏠 {profile.hostelBlock}</span>
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

      {/* Quick Contact Strip */}
      <div style={s.quickStrip}>
        {[
          { icon: "📧", label: "Email", val: profile.email },
          { icon: "📞", label: "Phone", val: profile.phone },
          { icon: "🕐", label: "Office Hours", val: profile.availableHours },
          { icon: "🚪", label: "Office", val: profile.officeRoom },
        ].map((item) => (
          <div key={item.label} style={s.quickItem}>
            <span style={s.quickIcon}>{item.icon}</span>
            <div>
              <div style={s.quickLabel}>{item.label}</div>
              <div style={s.quickVal}>{item.val}</div>
            </div>
          </div>
        ))}
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

      {/* Professional Info */}
      <div style={s.section}>
        <div style={s.sectionTitle}>Professional Details</div>
        <div style={s.grid}>
          <Field label="Staff ID" field="staffId" />
          <Field label="Designation" field="designation" options={DESIGNATION_OPTIONS} />
          <Field label="Department" field="department" />
          <Field label="Experience" field="experience" />
          <Field label="Qualification" field="qualification" full />
          <Field label="Specialization" field="specialization" full />
        </div>
      </div>

      {/* Contact Info */}
      <div style={s.section}>
        <div style={s.sectionTitle}>Contact & Availability</div>
        <div style={s.grid}>
          <Field label="Email" field="email" type="email" />
          <Field label="Phone" field="phone" type="tel" />
          <Field label="Office Room" field="officeRoom" />
          <Field label="Available Hours" field="availableHours" />
        </div>
      </div>

      {/* Hostel & Emergency */}
      <div style={s.section}>
        <div style={s.sectionTitle}>Hostel & Emergency</div>
        <div style={s.grid}>
          <Field label="Hostel Block (Warden)" field="hostelBlock" />
          <Field label="Blood Group" field="bloodGroup" options={BLOOD_GROUPS} />
          <Field label="Emergency Contact" field="emergencyContact" type="tel" />
        </div>
      </div>

      <style>{`
        @keyframes slideDown { from { opacity:0; transform:translateY(-16px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeUp { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }
        input:focus, select:focus, textarea:focus { outline:none; border-color:#0369a1 !important; box-shadow:0 0 0 3px rgba(3,105,161,0.1); }
      `}</style>
    </div>
  );
}

const s = {
  page: { minHeight: "100vh", background: "#f0f7ff", fontFamily: "'Lato', system-ui, sans-serif", paddingBottom: "48px" },
  toast: {
    position: "fixed", top: "20px", left: "50%", transform: "translateX(-50%)",
    background: "#0369a1", color: "#fff", borderRadius: "10px", padding: "10px 24px",
    fontSize: "14px", fontWeight: 600, zIndex: 999, boxShadow: "0 4px 20px rgba(3,105,161,0.35)",
    animation: "slideDown 0.3s ease",
  },
  heroCard: {
    position: "relative", overflow: "hidden",
    background: "linear-gradient(135deg, #0c4a6e 0%, #0369a1 50%, #0ea5e9 100%)",
    borderRadius: "0 0 32px 32px",
    padding: "40px 24px 36px 24px",
    boxShadow: "0 8px 40px rgba(12,74,110,0.4)",
  },
  heroBg: {
    position: "absolute", inset: 0,
    backgroundImage: "radial-gradient(ellipse at 10% 60%, rgba(255,255,255,0.07) 0%, transparent 55%)",
    pointerEvents: "none",
  },
  patternOverlay: {
    position: "absolute", inset: 0, opacity: 0.04,
    backgroundImage: `repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)`,
    backgroundSize: "20px 20px",
    pointerEvents: "none",
  },
  heroContent: { position: "relative", display: "flex", alignItems: "flex-start", gap: "20px", flexWrap: "wrap", maxWidth: "820px", margin: "0 auto" },
  avatarWrap: { position: "relative", flexShrink: 0 },
  avatarRing: {
    padding: "3px", borderRadius: "50%",
    background: "linear-gradient(135deg, rgba(255,255,255,0.6), rgba(255,255,255,0.2))",
  },
  avatar: {
    width: "88px", height: "88px", borderRadius: "50%",
    background: "rgba(255,255,255,0.15)", backdropFilter: "blur(10px)",
    display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden",
  },
  avatarImg: { width: "100%", height: "100%", objectFit: "cover" },
  initials: { fontSize: "28px", fontWeight: 700, color: "#fff", fontFamily: "'Playfair Display', serif" },
  avatarEditBtn: {
    position: "absolute", bottom: 0, right: 0, width: "26px", height: "26px", borderRadius: "50%",
    background: "#fff", border: "none", cursor: "pointer", fontSize: "13px",
    display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
  },
  heroInfo: { flex: 1 },
  roleTag: {
    display: "inline-block", background: "rgba(255,255,255,0.18)", borderRadius: "99px",
    padding: "3px 12px", fontSize: "12px", color: "rgba(255,255,255,0.9)", fontWeight: 700,
    marginBottom: "6px", letterSpacing: "0.04em",
  },
  heroName: { margin: "0 0 4px 0", fontSize: "26px", fontFamily: "'Playfair Display', serif", color: "#fff", fontWeight: 600 },
  heroDesig: { fontSize: "14px", color: "rgba(255,255,255,0.75)", fontWeight: 500, marginBottom: "10px" },
  heroMeta: { display: "flex", gap: "8px", flexWrap: "wrap" },
  metaPill: {
    background: "rgba(255,255,255,0.15)", borderRadius: "99px", padding: "4px 12px",
    fontSize: "12px", color: "rgba(255,255,255,0.9)", fontWeight: 600,
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
    padding: "9px 20px", color: "#0369a1", fontSize: "13.5px", fontWeight: 700, cursor: "pointer",
  },
  cancelBtn: {
    background: "rgba(255,255,255,0.12)", border: "1.5px solid rgba(255,255,255,0.25)",
    borderRadius: "10px", padding: "9px 16px", color: "rgba(255,255,255,0.85)", fontSize: "13px", cursor: "pointer",
  },
  quickStrip: {
    maxWidth: "820px", margin: "-1px auto 0 auto",
    background: "#fff", borderRadius: "0 0 20px 20px",
    padding: "18px 28px", display: "flex", gap: "0", flexWrap: "wrap",
    boxShadow: "0 4px 20px rgba(3,105,161,0.1)",
    borderTop: "1px solid #e0f2fe",
  },
  quickItem: {
    display: "flex", alignItems: "center", gap: "10px",
    flex: "1 1 200px", padding: "8px 12px",
    borderRight: "1px solid #e0f2fe",
  },
  quickIcon: { fontSize: "20px", flexShrink: 0 },
  quickLabel: { fontSize: "11px", color: "#94a3b8", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" },
  quickVal: { fontSize: "13px", color: "#0f172a", fontWeight: 500, marginTop: "1px" },
  section: {
    maxWidth: "820px", margin: "20px auto 0 auto",
    background: "#fff", borderRadius: "18px", padding: "24px",
    boxShadow: "0 2px 16px rgba(3,105,161,0.06)", animation: "fadeUp 0.4s ease both",
  },
  sectionTitle: {
    fontSize: "12px", fontWeight: 700, color: "#0369a1",
    textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "18px",
    paddingBottom: "10px", borderBottom: "1px solid #e0f2fe",
  },
  bioText: { margin: 0, fontSize: "14.5px", color: "#374151", lineHeight: 1.7 },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "18px" },
  field: { display: "flex", flexDirection: "column", gap: "5px" },
  label: { fontSize: "11px", fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.06em" },
  value: { fontSize: "14px", color: "#111827", fontWeight: 500 },
  empty: { color: "#d1d5db" },
  input: {
    border: "1.5px solid #e5e7eb", borderRadius: "9px", padding: "9px 12px",
    fontSize: "14px", color: "#111827", fontFamily: "'Lato', sans-serif",
    background: "#f8fafc", transition: "border-color 0.2s, box-shadow 0.2s",
    width: "100%", boxSizing: "border-box",
  },
};