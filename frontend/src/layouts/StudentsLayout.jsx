import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const studentNavLinks = [
  { label: 'Today',     path: '/student/today',     icon: '⊡' },
  { label: 'Admission', path: '/student/admission',  icon: '📋' },
  { label: 'Buy & Sell',path: '/student/buy-sell',   icon: '🛒' },
  { label: 'Chats',     path: '/student/chats',      icon: '💬' },
  { label: 'In / Out',  path: '/student/in-out',     icon: '🚪' },
  { label: 'Help',      path: '/student/help',       icon: '🆘' },
];

export default function StudentsLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [hamburgerOpen, setHamburgerOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', fontFamily: "'DM Sans', sans-serif", background: '#f4f6fb' }}>

      {/* ── Google Font ── */}
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Syne:wght@700&display=swap" rel="stylesheet" />

      {/* ══════════════════ NAVBAR ══════════════════ */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 24px', height: '60px',
        background: '#0f172a',
        boxShadow: '0 2px 12px rgba(0,0,0,0.18)',
      }}>

        {/* Left — Hamburger + Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button
            onClick={() => setSidebarOpen(o => !o)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              display: 'flex', flexDirection: 'column', gap: '5px', padding: '6px',
            }}
            aria-label="Toggle sidebar"
          >
            {[0,1,2].map(i => (
              <span key={i} style={{
                display: 'block', width: '22px', height: '2px',
                background: '#e2e8f0',
                borderRadius: '2px',
                transition: 'all 0.3s',
                transform: sidebarOpen
                  ? i === 0 ? 'rotate(45deg) translate(5px, 5px)'
                  : i === 2 ? 'rotate(-45deg) translate(5px, -5px)'
                  : 'scaleX(0)'
                  : 'none',
              }} />
            ))}
          </button>

          <NavLink to="/student" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '32px', height: '32px', borderRadius: '8px',
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '16px',
            }}>🏠</div>
            <span style={{ fontFamily: "'Syne', sans-serif", fontSize: '20px', fontWeight: 700, color: '#f8fafc', letterSpacing: '-0.3px' }}>
              HostelConnect
            </span>
          </NavLink>
        </div>

        {/* Right — Notifications + Avatar + Hamburger panel toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button style={{
            background: 'none', border: 'none', cursor: 'pointer',
            fontSize: '20px', padding: '6px', borderRadius: '8px',
            position: 'relative',
          }}>
            🔔
            <span style={{
              position: 'absolute', top: '4px', right: '4px',
              width: '8px', height: '8px', borderRadius: '50%',
              background: '#f87171', border: '2px solid #0f172a',
            }} />
          </button>

          {/* Avatar — opens hamburger panel */}
          <button
            onClick={() => setHamburgerOpen(o => !o)}
            style={{
              width: '36px', height: '36px', borderRadius: '50%',
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              border: '2px solid #334155',
              cursor: 'pointer', color: '#fff',
              fontWeight: 600, fontSize: '14px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            {user?.name?.[0]?.toUpperCase() || 'S'}
          </button>
        </div>
      </nav>

      {/* ══════════════════ BODY ══════════════════ */}
      <div style={{ display: 'flex', flex: 1, position: 'relative' }}>

        {/* ── Sidebar ── */}
        <aside style={{
          position: 'fixed', top: '60px', left: 0,
          height: 'calc(100vh - 60px)',
          width: sidebarOpen ? '220px' : '0',
          overflow: 'hidden',
          background: '#0f172a',
          transition: 'width 0.3s cubic-bezier(0.4,0,0.2,1)',
          zIndex: 90,
          boxShadow: sidebarOpen ? '4px 0 20px rgba(0,0,0,0.2)' : 'none',
          display: 'flex', flexDirection: 'column',
        }}>
          <div style={{ padding: '20px 0', minWidth: '220px' }}>

            {/* User info at top */}
            <div style={{ padding: '0 20px 20px', borderBottom: '1px solid #1e293b' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '40px', height: '40px', borderRadius: '50%',
                  background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontWeight: 600, fontSize: '16px', flexShrink: 0,
                }}>
                  {user?.name?.[0]?.toUpperCase() || 'S'}
                </div>
                <div>
                  <p style={{ margin: 0, color: '#f8fafc', fontSize: '14px', fontWeight: 600 }}>{user?.name || 'Student'}</p>
                  <p style={{ margin: 0, color: '#64748b', fontSize: '11px' }}>Student</p>
                </div>
              </div>
            </div>

            {/* Nav Links */}
            <div style={{ padding: '12px 0' }}>
              {studentNavLinks.map(link => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setSidebarOpen(false)}
                  style={({ isActive }) => ({
                    display: 'flex', alignItems: 'center', gap: '12px',
                    padding: '11px 20px',
                    textDecoration: 'none',
                    color: isActive ? '#a5b4fc' : '#94a3b8',
                    background: isActive ? 'rgba(99,102,241,0.12)' : 'transparent',
                    borderLeft: isActive ? '3px solid #6366f1' : '3px solid transparent',
                    fontSize: '14px', fontWeight: isActive ? 600 : 400,
                    transition: 'all 0.2s',
                    whiteSpace: 'nowrap',
                  })}
                >
                  <span style={{ fontSize: '16px' }}>{link.icon}</span>
                  {link.label}
                </NavLink>
              ))}
            </div>
          </div>
        </aside>

        {/* Sidebar overlay */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            style={{
              position: 'fixed', inset: 0, top: '60px',
              background: 'rgba(0,0,0,0.4)', zIndex: 89,
            }}
          />
        )}

        {/* ── Main Content ── */}
        <main style={{ flex: 1, padding: '28px', minHeight: 'calc(100vh - 60px)', overflow: 'auto' }}>
          <Outlet />
        </main>

        {/* ══ Hamburger Slide Panel (Profile/Settings) ══ */}
        <div style={{
          position: 'fixed', top: '60px', right: 0,
          height: 'calc(100vh - 60px)',
          width: hamburgerOpen ? '260px' : '0',
          overflow: 'hidden',
          background: '#0f172a',
          transition: 'width 0.3s cubic-bezier(0.4,0,0.2,1)',
          zIndex: 90,
          boxShadow: hamburgerOpen ? '-4px 0 20px rgba(0,0,0,0.2)' : 'none',
        }}>
          <div style={{ padding: '24px', minWidth: '260px' }}>

            {/* Profile Header */}
            <div style={{ textAlign: 'center', paddingBottom: '20px', borderBottom: '1px solid #1e293b' }}>
              <div style={{
                width: '64px', height: '64px', borderRadius: '50%',
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontWeight: 700, fontSize: '24px',
                margin: '0 auto 12px',
              }}>
                {user?.name?.[0]?.toUpperCase() || 'S'}
              </div>
              <p style={{ margin: '0 0 4px', color: '#f8fafc', fontWeight: 600, fontSize: '15px' }}>{user?.name}</p>
              <p style={{ margin: 0, color: '#64748b', fontSize: '12px' }}>{user?.email}</p>
              <span style={{
                display: 'inline-block', marginTop: '8px',
                padding: '2px 10px', borderRadius: '20px',
                background: 'rgba(99,102,241,0.15)', color: '#a5b4fc',
                fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px',
              }}>Student</span>
            </div>

            {/* Menu Items */}
            <div style={{ paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {[
                { icon: '👤', label: 'My Profile',   path: '/student/profile' },
                { icon: '⚙️', label: 'Settings',     path: '/student/settings' },
                { icon: '🔔', label: 'Notifications', path: '/student/notifications' },
              ].map(item => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setHamburgerOpen(false)}
                  style={({ isActive }) => ({
                    display: 'flex', alignItems: 'center', gap: '12px',
                    padding: '11px 12px', borderRadius: '10px',
                    textDecoration: 'none',
                    color: isActive ? '#a5b4fc' : '#94a3b8',
                    background: isActive ? 'rgba(99,102,241,0.12)' : 'transparent',
                    fontSize: '14px', fontWeight: isActive ? 600 : 400,
                    transition: 'background 0.2s',
                    whiteSpace: 'nowrap',
                  })}
                >
                  <span style={{ fontSize: '16px' }}>{item.icon}</span>
                  {item.label}
                </NavLink>
              ))}

              {/* Divider */}
              <div style={{ borderTop: '1px solid #1e293b', margin: '12px 0' }} />

              {/* Logout */}
              <button
                onClick={handleLogout}
                style={{
                  display: 'flex', alignItems: 'center', gap: '12px',
                  padding: '11px 12px', borderRadius: '10px',
                  background: 'rgba(239,68,68,0.08)', border: 'none',
                  color: '#f87171', cursor: 'pointer',
                  fontSize: '14px', fontWeight: 500, width: '100%',
                  transition: 'background 0.2s', whiteSpace: 'nowrap',
                }}
              >
                <span style={{ fontSize: '16px' }}>🚪</span>
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Hamburger panel overlay */}
        {hamburgerOpen && (
          <div
            onClick={() => setHamburgerOpen(false)}
            style={{
              position: 'fixed', inset: 0, top: '60px',
              background: 'rgba(0,0,0,0.4)', zIndex: 89,
            }}
          />
        )}
      </div>
    </div>
  );
}