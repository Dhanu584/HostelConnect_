import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const centerLinks = [
  { label: 'Today', path: '/student/today' },
  // { label: 'Chats', path: '/student/chats' },
  { label: 'Help',  path: '/student/help'  },
];

const sidebarLinks = [
  { label: 'Profile',   path: '/student/profile',   icon: '👤' },
  { label: 'Buy & Sell',path: '/student/buy-sell',   icon: '🛒' },
  { label: 'In / Out',  path: '/student/in-out',     icon: '🚪' },
  { label: 'Admission', path: '/student/admission',  icon: '📋' },
  { label: 'Settings',  path: '/student/settings',   icon: '⚙️' },
];

export default function Navbar() {
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
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800&family=Fraunces:wght@600;700&display=swap"
        rel="stylesheet"
      />

      {/* ══════════════ NAVBAR ══════════════ */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 100,
        height: '62px',
        display: 'flex', alignItems: 'center',
        padding: '0 24px',
        background: '#ffffff',
        borderBottom: '1.5px solid #e8eeea',
        boxShadow: '0 2px 16px rgba(100,130,90,0.08)',
        fontFamily: "'Nunito', sans-serif",
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
            onMouseEnter={e => e.currentTarget.style.background = '#eef4f0'}
            onMouseLeave={e => e.currentTarget.style.background = 'none'}
          >
            <div style={{
              width: '32px', height: '32px', borderRadius: '9px',
              background: '#7c9e87',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '15px', flexShrink: 0,
              boxShadow: '0 4px 12px rgba(124,158,135,0.35)',
            }}>🏠</div>
            <span style={{
              fontFamily: "'Fraunces', serif",
              fontSize: '19px', fontWeight: 700,
              color: '#1e293b', letterSpacing: '-0.2px',
              whiteSpace: 'nowrap',
            }}>
              HostelConnect
            </span>
          </button>
        </div>

        {/* ── CENTER: Nav Links ── */}
        {user && (
          <div style={{
            flex: 1, display: 'flex', alignItems: 'center',
            justifyContent: 'center', gap: '4px',
          }}>
            {centerLinks.map(link => (
              <NavLink
                key={link.path}
                to={link.path}
                style={({ isActive }) => ({
                  padding: '7px 18px',
                  borderRadius: '10px',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: isActive ? 700 : 600,
                  color: isActive ? '#5a7a62' : '#94a3b8',
                  background: isActive ? '#eef4f0' : 'transparent',
                  border: isActive ? '1.5px solid #c2d9c7' : '1.5px solid transparent',
                  transition: 'all 0.2s',
                  whiteSpace: 'nowrap',
                })}
                onMouseEnter={e => {
                  if (!e.currentTarget.getAttribute('aria-current')) {
                    e.currentTarget.style.color = '#5a7a62';
                    e.currentTarget.style.background = '#f4f8f5';
                  }
                }}
                onMouseLeave={e => {
                  if (!e.currentTarget.getAttribute('aria-current')) {
                    e.currentTarget.style.color = '#94a3b8';
                    e.currentTarget.style.background = 'transparent';
                  }
                }}
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        )}

        {/* ── RIGHT: Hamburger OR Login/Signup ── */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '10px' }}>
          {user ? (
            <button
              onClick={() => setSidebarOpen(o => !o)}
              aria-label="Open menu"
              style={{
                width: '38px', height: '38px',
                borderRadius: '10px',
                background: sidebarOpen ? '#eef4f0' : '#f8faf8',
                border: `1.5px solid ${sidebarOpen ? '#c2d9c7' : '#e8eeea'}`,
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
                  background: sidebarOpen ? '#7c9e87' : '#94a3b8',
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
          ) : (
            <>
              <button
                onClick={() => navigate('/login')}
                style={{
                  padding: '7px 18px', borderRadius: '10px',
                  background: 'transparent',
                  border: '1.5px solid #c2d9c7',
                  color: '#5a7a62', fontSize: '14px', fontWeight: 600,
                  cursor: 'pointer', transition: 'all 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = '#eef4f0'; e.currentTarget.style.borderColor = '#7c9e87'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = '#c2d9c7'; }}
              >
                Login
              </button>
              <button
                onClick={() => navigate('/signup')}
                style={{
                  padding: '7px 18px', borderRadius: '10px',
                  background: '#7c9e87',
                  border: 'none',
                  color: '#fff', fontSize: '14px', fontWeight: 700,
                  cursor: 'pointer', transition: 'opacity 0.2s',
                  boxShadow: '0 4px 14px rgba(124,158,135,0.35)',
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </nav>

      {/* ══════════════ SIDEBAR OVERLAY ══════════════ */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: 'fixed', inset: 0, top: '62px',
            background: 'rgba(30,41,59,0.25)',
            zIndex: 98,
            backdropFilter: 'blur(3px)',
          }}
        />
      )}

      {/* ══════════════ SIDEBAR PANEL ══════════════ */}
      <div style={{
        position: 'fixed', top: '62px', right: 0,
        height: 'calc(100vh - 62px)',
        width: '270px',
        transform: sidebarOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        background: '#ffffff',
        borderLeft: '1.5px solid #e8eeea',
        boxShadow: '-4px 0 24px rgba(100,130,90,0.10)',
        zIndex: 99,
        display: 'flex', flexDirection: 'column',
        fontFamily: "'Nunito', sans-serif",
        overflowY: 'auto',
      }}>

        {/* User info header */}
        <div style={{
          padding: '24px 20px 20px',
          borderBottom: '1.5px solid #e8eeea',
          background: '#f8faf8',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '44px', height: '44px', borderRadius: '50%', flexShrink: 0,
              background: '#7c9e87',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontWeight: 800, fontSize: '18px',
              boxShadow: '0 4px 14px rgba(124,158,135,0.35)',
            }}>
              {user?.name?.[0]?.toUpperCase() || 'S'}
            </div>
            <div>
              <p style={{ margin: 0, color: '#1e293b', fontWeight: 700, fontSize: '15px' }}>
                {user?.name || 'Student'}
              </p>
              <p style={{ margin: '2px 0 0', color: '#94a3b8', fontSize: '12px', fontWeight: 500 }}>
                {user?.email || ''}
              </p>
            </div>
          </div>
          <div style={{
            marginTop: '12px',
            display: 'inline-flex', alignItems: 'center', gap: '5px',
            padding: '4px 11px', borderRadius: '20px',
            background: '#eef4f0',
            border: '1.5px solid #c2d9c7',
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#7c9e87', display: 'inline-block' }} />
            <span style={{ color: '#5a7a62', fontSize: '11px', fontWeight: 800, letterSpacing: '0.5px', textTransform: 'uppercase' }}>Student</span>
          </div>
        </div>

        {/* Nav links */}
        <div style={{ padding: '16px 12px', flex: 1 }}>
          <p style={{ color: '#94a3b8', fontSize: '11px', fontWeight: 700, letterSpacing: '0.8px', textTransform: 'uppercase', margin: '0 8px 10px' }}>Menu</p>

          {sidebarLinks.map(link => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setSidebarOpen(false)}
              style={({ isActive }) => ({
                display: 'flex', alignItems: 'center', gap: '12px',
                padding: '11px 12px', borderRadius: '12px',
                textDecoration: 'none',
                color: isActive ? '#5a7a62' : '#64748b',
                background: isActive ? '#eef4f0' : 'transparent',
                border: isActive ? '1.5px solid #c2d9c7' : '1.5px solid transparent',
                fontSize: '14px', fontWeight: isActive ? 700 : 600,
                marginBottom: '4px',
                transition: 'all 0.18s',
              })}
              onMouseEnter={e => {
                if (!e.currentTarget.getAttribute('aria-current')) {
                  e.currentTarget.style.background = '#f4f8f5';
                  e.currentTarget.style.color = '#5a7a62';
                }
              }}
              onMouseLeave={e => {
                if (!e.currentTarget.getAttribute('aria-current')) {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = '#64748b';
                }
              }}
            >
              <span style={{
                width: '32px', height: '32px', borderRadius: '9px',
                background: '#f0f4f0',
                border: '1.5px solid #e2ebe4',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '15px', flexShrink: 0,
              }}>
                {link.icon}
              </span>
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Logout at bottom */}
        <div style={{ padding: '16px 12px', borderTop: '1.5px solid #e8eeea' }}>
          <button
            onClick={handleLogout}
            style={{
              width: '100%', display: 'flex', alignItems: 'center', gap: '12px',
              padding: '11px 12px', borderRadius: '12px',
              background: '#fef2f2',
              border: '1.5px solid #fecaca',
              color: '#ef4444', cursor: 'pointer',
              fontSize: '14px', fontWeight: 600,
              transition: 'all 0.18s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#fee2e2'; e.currentTarget.style.borderColor = '#fca5a5'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#fef2f2'; e.currentTarget.style.borderColor = '#fecaca'; }}
          >
            <span style={{
              width: '32px', height: '32px', borderRadius: '9px',
              background: '#fef2f2',
              border: '1.5px solid #fecaca',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '15px',
            }}>🚪</span>
            Logout
          </button>
        </div>
      </div>
    </>
  );
}