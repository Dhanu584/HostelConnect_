import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// ── CENTER navbar links (same as Student: Today, Chats, Help)
const centerLinks = [
  { label: 'Today', path: '/committee/today' },
  { label: 'Chats', path: '/committee/chats' },
  { label: 'Help',  path: '/committee/help'  },
];

// ── RIGHT sidebar links (Committee specific)
const sidebarLinks = [
  { icon: '👤', label: 'Profile',   path: '/committee/profile'   },
  { icon: '🛒', label: 'Buy & Sell',path: '/committee/buy-sell'  },
  { icon: '⚙️', label: 'Settings',  path: '/committee/settings'  },
];

export default function CommitteeLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout    = () => { setSidebarOpen(false); logout(); navigate('/'); };
  const handleLogoClick = () => navigate('/committee/today');

  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      minHeight: '100vh',
      fontFamily: "'DM Sans', sans-serif",
      background: '#080510',
    }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Syne:wght@700;800&display=swap" rel="stylesheet" />

      {/* ══════════════════ NAVBAR ══════════════════ */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 100,
        height: '62px',
        display: 'flex', alignItems: 'center',
        padding: '0 24px',
        background: '#080510',
        borderBottom: '1px solid rgba(139,92,246,0.15)',
      }}>

        {/* LEFT — Logo */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
          <button onClick={handleLogoClick}
            style={{ display: 'flex', alignItems: 'center', gap: '9px', background: 'none', border: 'none', cursor: 'pointer', padding: '6px 8px', borderRadius: '10px', transition: 'background 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(139,92,246,0.08)'}
            onMouseLeave={e => e.currentTarget.style.background = 'none'}
          >
            <div style={{
              width: '30px', height: '30px', borderRadius: '8px',
              background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '15px', boxShadow: '0 0 14px rgba(139,92,246,0.45)',
            }}>🏛️</div>
            <span style={{ fontFamily: "'Syne', sans-serif", fontSize: '18px', fontWeight: 800, color: '#faf5ff', letterSpacing: '-0.3px', whiteSpace: 'nowrap' }}>
              HostelConnect
            </span>
          </button>
        </div>

        {/* CENTER — Today, Chats, Help */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
          {centerLinks.map(link => (
            <NavLink key={link.path} to={link.path}
              style={({ isActive }) => ({
                padding: '7px 18px', borderRadius: '8px', textDecoration: 'none',
                fontSize: '14px', fontWeight: 500, whiteSpace: 'nowrap',
                color: isActive ? '#c4b5fd' : '#6b7280',
                background: isActive ? 'rgba(139,92,246,0.12)' : 'transparent',
                border: isActive ? '1px solid rgba(139,92,246,0.25)' : '1px solid transparent',
                transition: 'all 0.2s',
              })}
              onMouseEnter={e => { if (!e.currentTarget.getAttribute('aria-current')) { e.currentTarget.style.color = '#ddd6fe'; e.currentTarget.style.background = 'rgba(139,92,246,0.06)'; } }}
              onMouseLeave={e => { if (!e.currentTarget.getAttribute('aria-current')) { e.currentTarget.style.color = '#6b7280'; e.currentTarget.style.background = 'transparent'; } }}
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* RIGHT — Hamburger button */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
          <button
            onClick={() => setSidebarOpen(o => !o)}
            aria-label="Open menu"
            style={{
              width: '38px', height: '38px', borderRadius: '10px',
              background: sidebarOpen ? 'rgba(139,92,246,0.15)' : 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(139,92,246,0.2)',
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
                background: sidebarOpen ? '#c4b5fd' : '#6b7280',
                borderRadius: '2px',
                transition: 'all 0.25s',
                transform: sidebarOpen
                  ? i === 0 ? 'rotate(45deg) translate(5px, 5px)'
                  : i === 2 ? 'rotate(-45deg) translate(5px, -5px)'
                  : 'none'
                  : 'none',
                opacity: sidebarOpen && i === 1 ? 0 : 1,
              }} />
            ))}
          </button>
        </div>
      </nav>

      {/* ══════════════════ BODY ══════════════════ */}
      <div style={{ display: 'flex', flex: 1, position: 'relative' }}>

        {/* Main Content */}
        <main style={{ flex: 1, padding: '28px', minHeight: 'calc(100vh - 62px)', color: '#faf5ff', overflow: 'auto' }}>
          <Outlet />
        </main>

        {/* Overlay */}
        {sidebarOpen && (
          <div onClick={() => setSidebarOpen(false)} style={{
            position: 'fixed', inset: 0, top: '62px',
            background: 'rgba(0,0,0,0.5)', zIndex: 98,
            backdropFilter: 'blur(2px)',
          }} />
        )}

        {/* ══ RIGHT SIDEBAR PANEL ══ */}
        <div style={{
          position: 'fixed', top: '62px', right: 0,
          height: 'calc(100vh - 62px)',
          width: '270px',
          transform: sidebarOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          background: '#080510',
          borderLeft: '1px solid rgba(139,92,246,0.15)',
          zIndex: 99,
          display: 'flex', flexDirection: 'column',
          overflowY: 'auto',
        }}>

          {/* User info header */}
          <div style={{ padding: '24px 20px 20px', borderBottom: '1px solid rgba(139,92,246,0.1)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '44px', height: '44px', borderRadius: '50%', flexShrink: 0,
                background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontWeight: 700, fontSize: '18px',
                boxShadow: '0 0 16px rgba(139,92,246,0.4)',
              }}>
                {user?.name?.[0]?.toUpperCase() || 'C'}
              </div>
              <div>
                <p style={{ margin: 0, color: '#faf5ff', fontWeight: 600, fontSize: '15px' }}>{user?.name || 'Committee'}</p>
                <p style={{ margin: '2px 0 0', color: '#6b7280', fontSize: '12px' }}>{user?.email || ''}</p>
              </div>
            </div>
            <div style={{
              marginTop: '12px', display: 'inline-flex', alignItems: 'center', gap: '5px',
              padding: '3px 10px', borderRadius: '20px',
              background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.2)',
            }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#8b5cf6', display: 'inline-block' }} />
              <span style={{ color: '#c4b5fd', fontSize: '11px', fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase' }}>Committee</span>
            </div>
          </div>

          {/* Nav links */}
          <div style={{ padding: '16px 12px', flex: 1 }}>
            <p style={{ color: '#374151', fontSize: '11px', fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', margin: '0 8px 10px' }}>Menu</p>
            {sidebarLinks.map(link => (
              <NavLink key={link.path} to={link.path}
                onClick={() => setSidebarOpen(false)}
                style={({ isActive }) => ({
                  display: 'flex', alignItems: 'center', gap: '12px',
                  padding: '11px 12px', borderRadius: '10px', textDecoration: 'none',
                  color: isActive ? '#c4b5fd' : '#6b7280',
                  background: isActive ? 'rgba(139,92,246,0.1)' : 'transparent',
                  border: isActive ? '1px solid rgba(139,92,246,0.2)' : '1px solid transparent',
                  fontSize: '14px', fontWeight: isActive ? 600 : 400,
                  marginBottom: '4px', transition: 'all 0.18s',
                })}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(139,92,246,0.06)'; e.currentTarget.style.color = '#ddd6fe'; }}
                onMouseLeave={e => { if (!e.currentTarget.getAttribute('aria-current')) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#6b7280'; } }}
              >
                <span style={{
                  width: '32px', height: '32px', borderRadius: '8px',
                  background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px', flexShrink: 0,
                }}>{link.icon}</span>
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Logout */}
          <div style={{ padding: '16px 12px', borderTop: '1px solid rgba(139,92,246,0.1)' }}>
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