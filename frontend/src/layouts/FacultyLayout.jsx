import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const centerNavLinks = [
  { label: 'Today', path: '/faculty/today' },
  // { label: 'Chats', path: '/faculty/chats' },
  { label: 'Help',  path: '/faculty/help'  },
];

const sidebarLinks = [
  { label: 'Profile',       path: '/faculty/profile',      icon: '👤' },
  { label: 'Students Info', path: '/faculty/studentsinfo',  icon: '🧑‍🎓' },
  { label: 'In / Out',      path: '/faculty/in-out',        icon: '🚪' },
  { label: 'Admission',     path: '/faculty/admission',     icon: '📋' },
  { label: 'Settings',      path: '/faculty/settings',      icon: '⚙️' },
];

export default function FacultyLayout() {
  const { user, logout } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogoClick = () => navigate('/faculty/today');
  const handleLogout    = () => { setSidebarOpen(false); logout(); navigate('/'); };

  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      minHeight: '100vh',
      fontFamily: "'DM Sans', sans-serif",
      background: theme.bg,
      transition: 'background 0.3s, color 0.3s',
    }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Syne:wght@700;800&display=swap" rel="stylesheet" />

      {/* ══════════════════ NAVBAR ══════════════════ */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 100,
        display: 'flex', alignItems: 'center',
        padding: '0 24px', height: '62px',
        background: theme.navBg,
        borderBottom: `1px solid ${theme.border}`,
        boxShadow: theme.mode === 'dark'
          ? '0 2px 20px rgba(0,0,0,0.3)'
          : '0 2px 12px rgba(16,185,129,0.08)',
        transition: 'background 0.3s, border-color 0.3s',
      }}>

        {/* LEFT — Logo */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
          <button onClick={handleLogoClick} style={{
            display: 'flex', alignItems: 'center', gap: '9px',
            background: 'none', border: 'none', cursor: 'pointer',
            padding: '6px 8px', borderRadius: '10px', transition: 'background 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.background = theme.accentSoft}
            onMouseLeave={e => e.currentTarget.style.background = 'none'}
          >
            <div style={{
              width: '32px', height: '32px', borderRadius: '8px',
              background: 'linear-gradient(135deg, #10b981, #059669)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '16px', flexShrink: 0,
              boxShadow: `0 0 14px ${theme.accentGlow}`,
            }}>🏠</div>
            <span style={{
              fontFamily: "'Syne', sans-serif", fontSize: '19px', fontWeight: 800,
              color: theme.text, letterSpacing: '-0.3px', whiteSpace: 'nowrap',
              transition: 'color 0.3s',
            }}>HostelConnect</span>
          </button>
        </div>

        {/* CENTER — Today, Chats, Help */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
          {centerNavLinks.map(link => (
            <NavLink key={link.path} to={link.path}
              style={({ isActive }) => ({
                padding: '7px 20px', borderRadius: '8px', textDecoration: 'none',
                fontSize: '14px', fontWeight: 500, whiteSpace: 'nowrap',
                color: isActive ? theme.accentText : theme.textSoft,
                background: isActive ? theme.accentSoft : 'transparent',
                border: isActive ? `1px solid ${theme.border}` : '1px solid transparent',
                transition: 'all 0.2s',
              })}
            >{link.label}</NavLink>
          ))}
        </div>

        {/* RIGHT — Hamburger */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
          <button onClick={() => setSidebarOpen(o => !o)} aria-label="Open menu"
            style={{
              width: '38px', height: '38px', borderRadius: '10px',
              background: sidebarOpen ? theme.accentSoft : 'rgba(128,128,128,0.06)',
              border: `1px solid ${theme.border}`,
              cursor: 'pointer',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: '5px',
              transition: 'all 0.2s',
            }}
          >
            {[0, 1, 2].map(i => (
              <span key={i} style={{
                display: 'block',
                width: i === 1 ? '12px' : '18px', height: '2px',
                background: sidebarOpen ? theme.accentText : theme.textSoft,
                borderRadius: '2px', transition: 'all 0.25s',
                transformOrigin: 'center',
                transform: sidebarOpen
                  ? i === 0 ? 'rotate(45deg) translate(5px, 5px)'
                  : i === 2 ? 'rotate(-45deg) translate(5px, -5px)'
                  : 'scaleX(0)'
                  : 'none',
                opacity: sidebarOpen && i === 1 ? 0 : 1,
              }} />
            ))}
          </button>
        </div>
      </nav>

      {/* ══════════════════ BODY ══════════════════ */}
      <div style={{ display: 'flex', flex: 1, position: 'relative' }}>

        <main style={{
          flex: 1, padding: '28px',
          minHeight: 'calc(100vh - 62px)',
          overflow: 'auto',
          color: theme.text,
          transition: 'color 0.3s',
        }}>
          <Outlet />
        </main>

        {sidebarOpen && (
          <div onClick={() => setSidebarOpen(false)} style={{
            position: 'fixed', inset: 0, top: '62px',
            background: 'rgba(0,0,0,0.5)', zIndex: 98, backdropFilter: 'blur(2px)',
          }} />
        )}

        {/* ══ RIGHT SIDEBAR ══ */}
        <div style={{
          position: 'fixed', top: '62px', right: 0,
          height: 'calc(100vh - 62px)', width: '270px',
          transform: sidebarOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s cubic-bezier(0.4,0,0.2,1), background 0.3s',
          background: theme.sidebarBg,
          borderLeft: `1px solid ${theme.border}`,
          zIndex: 99,
          display: 'flex', flexDirection: 'column',
          overflowY: 'auto',
          boxShadow: theme.mode === 'dark'
            ? '-4px 0 24px rgba(0,0,0,0.3)'
            : '-4px 0 24px rgba(16,185,129,0.08)',
        }}>

          {/* User Info */}
          <div style={{ padding: '24px 20px 20px', borderBottom: `1px solid ${theme.border}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '44px', height: '44px', borderRadius: '50%', flexShrink: 0,
                background: 'linear-gradient(135deg, #10b981, #059669)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontWeight: 700, fontSize: '18px',
                boxShadow: `0 0 16px ${theme.accentGlow}`,
              }}>
                {user?.name?.[0]?.toUpperCase() || 'F'}
              </div>
              <div>
                <p style={{ margin: 0, color: theme.text, fontWeight: 600, fontSize: '15px' }}>{user?.name || 'Faculty'}</p>
                <p style={{ margin: '2px 0 0', color: theme.textMuted, fontSize: '12px' }}>{user?.email || ''}</p>
              </div>
            </div>
            <div style={{
              marginTop: '12px', display: 'inline-flex', alignItems: 'center', gap: '5px',
              padding: '3px 10px', borderRadius: '20px',
              background: theme.accentSoft, border: `1px solid ${theme.border}`,
            }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: theme.accent, display: 'inline-block' }} />
              <span style={{ color: theme.accentText, fontSize: '11px', fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase' }}>Faculty</span>
            </div>
          </div>

          {/* Nav Links */}
          <div style={{ padding: '16px 12px', flex: 1 }}>
            <p style={{ color: theme.textMuted, fontSize: '11px', fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', margin: '0 8px 10px' }}>Menu</p>
            {sidebarLinks.map(link => (
              <NavLink key={link.path} to={link.path}
                onClick={() => setSidebarOpen(false)}
                style={({ isActive }) => ({
                  display: 'flex', alignItems: 'center', gap: '12px',
                  padding: '11px 12px', borderRadius: '10px', textDecoration: 'none',
                  color: isActive ? theme.accentText : theme.textSoft,
                  background: isActive ? theme.accentSoft : 'transparent',
                  border: isActive ? `1px solid ${theme.border}` : '1px solid transparent',
                  fontSize: '14px', fontWeight: isActive ? 600 : 400,
                  marginBottom: '4px', transition: 'all 0.18s',
                })}
              >
                <span style={{
                  width: '32px', height: '32px', borderRadius: '8px',
                  background: theme.bgCard, border: `1px solid ${theme.borderCard}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '15px', flexShrink: 0,
                }}>{link.icon}</span>
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Logout */}
          <div style={{ padding: '16px 12px', borderTop: `1px solid ${theme.border}` }}>
            <button onClick={handleLogout} style={{
              width: '100%', display: 'flex', alignItems: 'center', gap: '12px',
              padding: '11px 12px', borderRadius: '10px',
              background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.15)',
              color: '#f87171', cursor: 'pointer', fontSize: '14px', fontWeight: 500,
              transition: 'all 0.18s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.12)'; e.currentTarget.style.borderColor = 'rgba(239,68,68,0.3)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.06)'; e.currentTarget.style.borderColor = 'rgba(239,68,68,0.15)'; }}
            >
              <span style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(239,68,68,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px' }}>🚪</span>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}