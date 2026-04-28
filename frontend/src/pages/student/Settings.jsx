import { useState } from 'react';
import { useTheme, themes } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';

// Role accent map for the settings page header
const roleConfig = {
  student:   { label: 'Student',   gradient: 'linear-gradient(135deg,#6366f1,#8b5cf6)', glow: 'rgba(99,102,241,0.3)'  },
  faculty:   { label: 'Faculty',   gradient: 'linear-gradient(135deg,#10b981,#059669)', glow: 'rgba(16,185,129,0.3)'  },
  committee: { label: 'Committee', gradient: 'linear-gradient(135deg,#8b5cf6,#7c3aed)', glow: 'rgba(139,92,246,0.3)' },
};

export default function Settings() {
  const { theme, themeKey, setTheme } = useTheme();
  const { user } = useAuth();
  const role = user?.role || 'student';
  const rc   = roleConfig[role];

  const darkKey  = `${role}_dark`;
  const lightKey = `${role}_light`;
  const isDark   = themeKey === darkKey;

  const [saved, setSaved] = useState(false);

  const handleThemeChange = (key) => {
    setTheme(key);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  // Dynamic styles using current theme
  const s = {
    page: {
      minHeight: '100vh',
      background: theme.bg,
      color: theme.text,
      fontFamily: "'DM Sans', sans-serif",
      padding: '0 0 48px',
    },
    section: {
      background: theme.bgCard,
      border: `1px solid ${theme.borderCard}`,
      borderRadius: '16px',
      padding: '24px',
      marginBottom: '16px',
    },
    sectionTitle: {
      margin: '0 0 18px',
      fontSize: '13px',
      fontWeight: 700,
      letterSpacing: '0.8px',
      textTransform: 'uppercase',
      color: theme.textSoft,
    },
    label: {
      fontSize: '15px',
      fontWeight: 600,
      color: theme.text,
      margin: 0,
    },
    sublabel: {
      fontSize: '13px',
      color: theme.textSoft,
      margin: '3px 0 0',
    },
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Syne:wght@700;800&display=swap');
        @keyframes sfu { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        .sfu { animation: sfu 0.35s ease both; }
        .theme-card { transition: all 0.25s cubic-bezier(0.4,0,0.2,1); cursor: pointer; }
        .theme-card:hover { transform: translateY(-3px); }
        .stoggle { transition: all 0.2s; }
        .stoggle:hover { opacity: 0.85; }
        @keyframes fadeIn { from{opacity:0;transform:scale(0.95)} to{opacity:1;transform:scale(1)} }
        .saved-toast { animation: fadeIn 0.2s ease; }
      `}</style>

      <div style={s.page}>

        {/* ── Page Header ── */}
        <div className="sfu" style={{ marginBottom: '28px' }}>
          <p style={{ margin: '0 0 4px', fontSize: '12px', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', color: theme.textSoft }}>Preferences</p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h1 style={{ margin: 0, fontFamily: "'Syne', sans-serif", fontSize: '28px', fontWeight: 800, color: theme.text }}>
              Settings ⚙️
            </h1>
            {saved && (
              <div className="saved-toast" style={{
                padding: '7px 16px', borderRadius: '20px',
                background: theme.accentSoft, border: `1px solid ${theme.border}`,
                color: theme.accentText, fontSize: '13px', fontWeight: 600,
                display: 'flex', alignItems: 'center', gap: '6px',
              }}>
                ✓ Saved
              </div>
            )}
          </div>
        </div>

        {/* ════════════════════════════
            SECTION 1 — Appearance
        ════════════════════════════ */}
        <div className="sfu" style={{ ...s.section, animationDelay: '0.05s' }}>
          <p style={s.sectionTitle}>🎨 Appearance</p>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div>
              <p style={s.label}>Theme Mode</p>
              <p style={s.sublabel}>Choose between Dark and Light interface</p>
            </div>

            {/* Toggle pill */}
            <div style={{
              display: 'flex', gap: '4px', padding: '4px',
              background: theme.bgSecondary,
              border: `1px solid ${theme.border}`,
              borderRadius: '12px',
            }}>
              {[
                { key: darkKey,  label: '🌙 Dark'  },
                { key: lightKey, label: '☀️ Light' },
              ].map(opt => (
                <button key={opt.key}
                  className="stoggle"
                  onClick={() => handleThemeChange(opt.key)}
                  style={{
                    padding: '8px 20px', borderRadius: '9px', border: 'none',
                    fontSize: '13px', fontWeight: 600, cursor: 'pointer',
                    background: themeKey === opt.key ? rc.gradient : 'transparent',
                    color: themeKey === opt.key ? '#fff' : theme.textSoft,
                    boxShadow: themeKey === opt.key ? `0 0 14px ${rc.glow}` : 'none',
                    transition: 'all 0.25s',
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Theme preview cards */}
          <div style={{ display: 'flex', gap: '14px' }}>
            {/* Dark preview */}
            <div className="theme-card"
              onClick={() => handleThemeChange(darkKey)}
              style={{
                flex: 1, borderRadius: '14px', overflow: 'hidden',
                border: themeKey === darkKey ? `2px solid ${theme.accent}` : `2px solid ${theme.borderCard}`,
                boxShadow: themeKey === darkKey ? `0 0 20px ${rc.glow}` : 'none',
              }}
            >
              {/* Mini UI preview — dark */}
              <div style={{ background: themes[darkKey].bg, padding: '14px', height: '100px', position: 'relative' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
                  <div style={{ width: '20px', height: '6px', borderRadius: '3px', background: themes[darkKey].accent }}/>
                  <div style={{ width: '30px', height: '4px', borderRadius: '2px', background: themes[darkKey].textSoft, opacity: 0.4 }}/>
                  <div style={{ width: '20px', height: '4px', borderRadius: '2px', background: themes[darkKey].textSoft, opacity: 0.3 }}/>
                </div>
                <div style={{ display: 'flex', gap: '6px' }}>
                  {[70, 50, 85].map((w, i) => (
                    <div key={i} style={{ height: '32px', flex: w, borderRadius: '6px', background: themes[darkKey].bgCard, border: `1px solid ${themes[darkKey].borderCard}` }}/>
                  ))}
                </div>
                {themeKey === darkKey && (
                  <div style={{ position: 'absolute', top: '8px', right: '8px', width: '18px', height: '18px', borderRadius: '50%', background: themes[darkKey].accent, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: '#fff' }}>✓</div>
                )}
              </div>
              <div style={{ padding: '10px 14px', background: themes[darkKey].bgSecondary, borderTop: `1px solid ${themes[darkKey].borderCard}` }}>
                <p style={{ margin: 0, fontSize: '13px', fontWeight: 600, color: themes[darkKey].text }}>🌙 Dark</p>
                <p style={{ margin: '2px 0 0', fontSize: '11px', color: themes[darkKey].textSoft }}>Easy on the eyes</p>
              </div>
            </div>

            {/* Light preview */}
            <div className="theme-card"
              onClick={() => handleThemeChange(lightKey)}
              style={{
                flex: 1, borderRadius: '14px', overflow: 'hidden',
                border: themeKey === lightKey ? `2px solid ${theme.accent}` : `2px solid ${theme.borderCard}`,
                boxShadow: themeKey === lightKey ? `0 0 20px ${rc.glow}` : 'none',
              }}
            >
              <div style={{ background: themes[lightKey].bg, padding: '14px', height: '100px', position: 'relative' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
                  <div style={{ width: '20px', height: '6px', borderRadius: '3px', background: themes[lightKey].accent }}/>
                  <div style={{ width: '30px', height: '4px', borderRadius: '2px', background: themes[lightKey].textSoft, opacity: 0.5 }}/>
                  <div style={{ width: '20px', height: '4px', borderRadius: '2px', background: themes[lightKey].textSoft, opacity: 0.4 }}/>
                </div>
                <div style={{ display: 'flex', gap: '6px' }}>
                  {[70, 50, 85].map((w, i) => (
                    <div key={i} style={{ height: '32px', flex: w, borderRadius: '6px', background: themes[lightKey].bgCard, border: `1px solid ${themes[lightKey].borderCard}`, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}/>
                  ))}
                </div>
                {themeKey === lightKey && (
                  <div style={{ position: 'absolute', top: '8px', right: '8px', width: '18px', height: '18px', borderRadius: '50%', background: themes[lightKey].accent, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: '#fff' }}>✓</div>
                )}
              </div>
              <div style={{ padding: '10px 14px', background: themes[lightKey].bgSecondary, borderTop: `1px solid ${themes[lightKey].borderCard}` }}>
                <p style={{ margin: 0, fontSize: '13px', fontWeight: 600, color: themes[lightKey].text }}>☀️ Light</p>
                <p style={{ margin: '2px 0 0', fontSize: '11px', color: themes[lightKey].textSoft }}>Crisp and clear</p>
              </div>
            </div>
          </div>
        </div>

        {/* ════════════════════════════
            SECTION 2 — Account Info
        ════════════════════════════ */}
        <div className="sfu" style={{ ...s.section, animationDelay: '0.1s' }}>
          <p style={s.sectionTitle}>👤 Account</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '56px', height: '56px', borderRadius: '50%', flexShrink: 0,
              background: rc.gradient, boxShadow: `0 0 20px ${rc.glow}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontSize: '22px', fontWeight: 700,
            }}>
              {user?.name?.[0]?.toUpperCase() || '?'}
            </div>
            <div>
              <p style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: theme.text }}>{user?.name}</p>
              <p style={{ margin: '3px 0 0', fontSize: '13px', color: theme.textSoft }}>{user?.email}</p>
              <span style={{
                display: 'inline-block', marginTop: '6px',
                padding: '2px 10px', borderRadius: '20px',
                background: theme.accentSoft, border: `1px solid ${theme.border}`,
                color: theme.accentText, fontSize: '11px', fontWeight: 700,
                textTransform: 'uppercase', letterSpacing: '0.5px',
              }}>{rc.label}</span>
            </div>
          </div>
        </div>

        {/* ════════════════════════════
            SECTION 3 — Notifications
        ════════════════════════════ */}
        <div className="sfu" style={{ ...s.section, animationDelay: '0.15s' }}>
          <p style={s.sectionTitle}>🔔 Notifications</p>
          {[
            { label: 'Event Reminders',   sub: 'Get notified about upcoming events',     defaultOn: true  },
            { label: 'Mess Menu Updates', sub: 'Alert when weekly menu is changed',       defaultOn: true  },
            { label: 'Announcements',     sub: 'Important notices from Faculty/Committee', defaultOn: true  },
            { label: 'Chat Messages',     sub: 'New message notifications',               defaultOn: false },
          ].map((item, i) => (
            <NotifRow key={i} item={item} theme={theme} rc={rc} />
          ))}
        </div>

        {/* ════════════════════════════
            SECTION 4 — About
        ════════════════════════════ */}
        <div className="sfu" style={{ ...s.section, animationDelay: '0.2s' }}>
          <p style={s.sectionTitle}>ℹ️ About</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { label: 'App Version',  value: 'v1.0.0' },
              { label: 'Role',         value: rc.label  },
              { label: 'Platform',     value: 'HostelConnect Web' },
            ].map((row, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: i < 2 ? `1px solid ${theme.borderCard}` : 'none' }}>
                <p style={{ margin: 0, fontSize: '14px', color: theme.textSoft }}>{row.label}</p>
                <p style={{ margin: 0, fontSize: '14px', fontWeight: 600, color: theme.text }}>{row.value}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </>
  );
}

// ── Notification toggle row ──
function NotifRow({ item, theme, rc }) {
  const [on, setOn] = useState(item.defaultOn);
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: `1px solid ${theme.borderCard}` }}>
      <div>
        <p style={{ margin: 0, fontSize: '14px', fontWeight: 500, color: theme.text }}>{item.label}</p>
        <p style={{ margin: '3px 0 0', fontSize: '12px', color: theme.textSoft }}>{item.sub}</p>
      </div>
      {/* Toggle switch */}
      <button onClick={() => setOn(o => !o)} style={{
        width: '44px', height: '24px', borderRadius: '12px', border: 'none', cursor: 'pointer',
        background: on ? rc.gradient : theme.bgSecondary,
        position: 'relative', transition: 'background 0.25s', flexShrink: 0,
        boxShadow: on ? `0 0 10px ${rc.glow}` : 'none',
        outline: `1px solid ${on ? 'transparent' : theme.border}`,
      }}>
        <span style={{
          position: 'absolute', top: '3px',
          left: on ? '23px' : '3px',
          width: '18px', height: '18px', borderRadius: '50%',
          background: '#fff',
          transition: 'left 0.25s cubic-bezier(0.4,0,0.2,1)',
          boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
        }}/>
      </button>
    </div>
  );
}