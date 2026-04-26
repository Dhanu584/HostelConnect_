import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const centerNavLinks = [
  { label: 'Today', path: '/student/today' },
  { label: 'Chats', path: '/student/chats' },
  { label: 'Help',  path: '/student/help'  },
];

const sidebarLinks = [
  { label: 'Profile',    path: '/student/profile',    icon: '👤' },
  { label: 'Buy & Sell', path: '/student/buy-sell',   icon: '🛒' },
  { label: 'In / Out',   path: '/student/in-out',     icon: '🚪' },
  { label: 'Admission',  path: '/student/admission',  icon: '📋' },
  { label: 'Settings',   path: '/student/settings',   icon: '⚙️' },
];

export default function StudentsLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogoClick = () => {
    if (user) navigate('/student/today');
    else navigate('/');
  };

  const handleLogout = () => {
    setSidebarOpen(false);
    logout();
    navigate('/');
  };

  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      minHeight: '100vh',
      fontFamily: "'DM Sans', sans-serif",
      background: '#0a0f1e',
    }}>

      {/* ── Google Font ── */}
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Syne:wght@700;800&display=swap" rel="stylesheet" />

      {/* ══════════════════════ NAVBAR ══════════════════════ */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 100,
        display: 'flex', alignItems: 'center',
        padding: '0 24px', height: '62px',
        background: '#0a0f1e',
        borderBottom: '1px solid rgba(99,102,241,0.15)',
        boxShadow: '0 2px 20px rgba(0,0,0,0.3)',
      }}>

        {/* ── LEFT: Logo ── */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
          <button
            onClick={handleLogoClick}
            style={{
              display: 'flex', alignItems: 'center', gap: '9px',
              background: 'none', border: 'none', cursor: 'pointer',
              padding: '6px 8px', borderRadius: '10px',
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(99,102,241,0.08)'}
            onMouseLeave={e => e.currentTarget.style.background = 'none'}
          >
            <div style={{
              width: '32px', height: '32px', borderRadius: '8px',
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '16px', flexShrink: 0,
              boxShadow: '0 0 14px rgba(99,102,241,0.4)',
            }}>🏠</div>
            <span style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: '19px', fontWeight: 800,
              color: '#f1f5f9', letterSpacing: '-0.3px',
              whiteSpace: 'nowrap',
            }}>
              HostelConnect
            </span>
          </button>
        </div>

        {/* ── CENTER: Today, Chats, Help ── */}
        <div style={{
          flex: 1, display: 'flex', alignItems: 'center',
          justifyContent: 'center', gap: '4px',
        }}>
          {centerNavLinks.map(link => (
            <NavLink
              key={link.path}
              to={link.path}
              style={({ isActive }) => ({
                padding: '7px 20px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontSize: '14px', fontWeight: 500,
                color: isActive ? '#a5b4fc' : '#94a3b8',
                background: isActive ? 'rgba(99,102,241,0.12)' : 'transparent',
                border: isActive ? '1px solid rgba(99,102,241,0.25)' : '1px solid transparent',
                transition: 'all 0.2s',
                whiteSpace: 'nowrap',
              })}
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* ── RIGHT: Hamburger ── */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
          <button
            onClick={() => setSidebarOpen(o => !o)}
            aria-label="Open menu"
            style={{
              width: '38px', height: '38px',
              borderRadius: '10px',
              background: sidebarOpen ? 'rgba(99,102,241,0.15)' : 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(99,102,241,0.2)',
              cursor: 'pointer',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: '5px',
              transition: 'all 0.2s',
            }}
          >
            {[0, 1, 2].map(i => (
              <span key={i} style={{
                display: 'block',
                width: i === 1 ? '12px' : '18px',
                height: '2px',
                background: sidebarOpen ? '#a5b4fc' : '#94a3b8',
                borderRadius: '2px',
                transition: 'all 0.25s',
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

      {/* ══════════════════════ BODY ══════════════════════ */}
      <div style={{ display: 'flex', flex: 1, position: 'relative' }}>

        {/* ── Main Content ── */}
        <main style={{
          flex: 1,
          padding: '28px',
          minHeight: 'calc(100vh - 62px)',
          overflow: 'auto',
          color: '#f1f5f9',
        }}>
          <Outlet />
        </main>

        {/* ── Overlay (closes sidebar when clicking outside) ── */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            style={{
              position: 'fixed', inset: 0, top: '62px',
              background: 'rgba(0,0,0,0.5)',
              zIndex: 98,
              backdropFilter: 'blur(2px)',
            }}
          />
        )}

        {/* ══════════ RIGHT SIDEBAR PANEL ══════════ */}
        <div style={{
          position: 'fixed', top: '62px', right: 0,
          height: 'calc(100vh - 62px)',
          width: '270px',
          transform: sidebarOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          background: '#0d1424',
          borderLeft: '1px solid rgba(99,102,241,0.15)',
          zIndex: 99,
          display: 'flex', flexDirection: 'column',
          overflowY: 'auto',
        }}>

          {/* User Info Header */}
          <div style={{
            padding: '24px 20px 20px',
            borderBottom: '1px solid rgba(99,102,241,0.1)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '44px', height: '44px', borderRadius: '50%', flexShrink: 0,
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontWeight: 700, fontSize: '18px',
                boxShadow: '0 0 16px rgba(99,102,241,0.4)',
              }}>
                {user?.name?.[0]?.toUpperCase() || 'S'}
              </div>
              <div>
                <p style={{ margin: 0, color: '#f1f5f9', fontWeight: 600, fontSize: '15px' }}>
                  {user?.name || 'Student'}
                </p>
                <p style={{ margin: '2px 0 0', color: '#64748b', fontSize: '12px' }}>
                  {user?.email || ''}
                </p>
              </div>
            </div>
            <div style={{
              marginTop: '12px',
              display: 'inline-flex', alignItems: 'center', gap: '5px',
              padding: '3px 10px', borderRadius: '20px',
              background: 'rgba(99,102,241,0.12)',
              border: '1px solid rgba(99,102,241,0.2)',
            }}>
              <span style={{
                width: '6px', height: '6px', borderRadius: '50%',
                background: '#6366f1', display: 'inline-block',
              }} />
              <span style={{
                color: '#a5b4fc', fontSize: '11px', fontWeight: 600,
                letterSpacing: '0.5px', textTransform: 'uppercase',
              }}>Student</span>
            </div>
          </div>

          {/* Nav Links */}
          <div style={{ padding: '16px 12px', flex: 1 }}>
            <p style={{
              color: '#475569', fontSize: '11px', fontWeight: 600,
              letterSpacing: '0.8px', textTransform: 'uppercase',
              margin: '0 8px 10px',
            }}>Menu</p>

            {sidebarLinks.map(link => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setSidebarOpen(false)}
                style={({ isActive }) => ({
                  display: 'flex', alignItems: 'center', gap: '12px',
                  padding: '11px 12px', borderRadius: '10px',
                  textDecoration: 'none',
                  color: isActive ? '#a5b4fc' : '#94a3b8',
                  background: isActive ? 'rgba(99,102,241,0.12)' : 'transparent',
                  border: isActive ? '1px solid rgba(99,102,241,0.2)' : '1px solid transparent',
                  fontSize: '14px', fontWeight: isActive ? 600 : 400,
                  marginBottom: '4px',
                  transition: 'all 0.18s',
                })}
              >
                <span style={{
                  width: '32px', height: '32px', borderRadius: '8px',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '15px', flexShrink: 0,
                }}>
                  {link.icon}
                </span>
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Logout */}
          <div style={{
            padding: '16px 12px',
            borderTop: '1px solid rgba(99,102,241,0.1)',
          }}>
            <button
              onClick={handleLogout}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: '12px',
                padding: '11px 12px', borderRadius: '10px',
                background: 'rgba(239,68,68,0.06)',
                border: '1px solid rgba(239,68,68,0.15)',
                color: '#f87171', cursor: 'pointer',
                fontSize: '14px', fontWeight: 500,
                transition: 'all 0.18s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(239,68,68,0.12)';
                e.currentTarget.style.borderColor = 'rgba(239,68,68,0.3)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(239,68,68,0.06)';
                e.currentTarget.style.borderColor = 'rgba(239,68,68,0.15)';
              }}
            >
              <span style={{
                width: '32px', height: '32px', borderRadius: '8px',
                background: 'rgba(239,68,68,0.08)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '15px',
              }}>🚪</span>
              Logout
            </button>
          </div>

        </div>
        {/* ══════════ END RIGHT SIDEBAR ══════════ */}

      </div>
    </div>
  );
}