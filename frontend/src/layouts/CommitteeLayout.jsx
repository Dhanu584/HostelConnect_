import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const committeeNavLinks = [
  { label: 'Dashboard',    path: '/committee/dashboard',  icon: '⊡' },
  { label: 'Students',     path: '/committee/students',   icon: '👥' },
  { label: 'Faculty',      path: '/committee/faculty',    icon: '🎓' },
  { label: 'Admissions',   path: '/committee/admissions', icon: '📋' },
  { label: 'Notices',      path: '/committee/notices',    icon: '📢' },
  { label: 'Reports',      path: '/committee/reports',    icon: '📊' },
  { label: 'Approvals',    path: '/committee/approvals',  icon: '✅' },
];

export default function CommitteeLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [hamburgerOpen, setHamburgerOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', fontFamily: "'DM Sans', sans-serif", background: '#faf5ff' }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Syne:wght@700&display=swap" rel="stylesheet" />

      {/* NAVBAR */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 24px', height: '60px',
        background: '#1e0a3c',
        boxShadow: '0 2px 12px rgba(0,0,0,0.18)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button
            onClick={() => setSidebarOpen(o => !o)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '5px', padding: '6px' }}
            aria-label="Toggle sidebar"
          >
            {[0,1,2].map(i => (
              <span key={i} style={{
                display: 'block', width: '22px', height: '2px', background: '#ede9fe', borderRadius: '2px', transition: 'all 0.3s',
                transform: sidebarOpen ? i === 0 ? 'rotate(45deg) translate(5px, 5px)' : i === 2 ? 'rotate(-45deg) translate(5px, -5px)' : 'scaleX(0)' : 'none',
              }} />
            ))}
          </button>

          <NavLink to="/committee" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'linear-gradient(135deg, #7c3aed, #a855f7)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>🏛️</div>
            <span style={{ fontFamily: "'Syne', sans-serif", fontSize: '20px', fontWeight: 700, color: '#faf5ff', letterSpacing: '-0.3px' }}>HostelConnect</span>
          </NavLink>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px', padding: '6px', borderRadius: '8px', position: 'relative' }}>
            🔔
            <span style={{ position: 'absolute', top: '4px', right: '4px', width: '8px', height: '8px', borderRadius: '50%', background: '#f87171', border: '2px solid #1e0a3c' }} />
          </button>
          <button
            onClick={() => setHamburgerOpen(o => !o)}
            style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #7c3aed, #a855f7)', border: '2px solid #4c1d95', cursor: 'pointer', color: '#fff', fontWeight: 600, fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            {user?.name?.[0]?.toUpperCase() || 'C'}
          </button>
        </div>
      </nav>

      <div style={{ display: 'flex', flex: 1, position: 'relative' }}>
        {/* Sidebar */}
        <aside style={{
          position: 'fixed', top: '60px', left: 0,
          height: 'calc(100vh - 60px)',
          width: sidebarOpen ? '220px' : '0',
          overflow: 'hidden', background: '#1e0a3c',
          transition: 'width 0.3s cubic-bezier(0.4,0,0.2,1)', zIndex: 90,
          boxShadow: sidebarOpen ? '4px 0 20px rgba(0,0,0,0.2)' : 'none',
        }}>
          <div style={{ padding: '20px 0', minWidth: '220px' }}>
            <div style={{ padding: '0 20px 20px', borderBottom: '1px solid #2e1065' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #7c3aed, #a855f7)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 600, fontSize: '16px', flexShrink: 0 }}>
                  {user?.name?.[0]?.toUpperCase() || 'C'}
                </div>
                <div>
                  <p style={{ margin: 0, color: '#faf5ff', fontSize: '14px', fontWeight: 600 }}>{user?.name || 'Committee'}</p>
                  <p style={{ margin: 0, color: '#c4b5fd', fontSize: '11px' }}>Committee</p>
                </div>
              </div>
            </div>
            <div style={{ padding: '12px 0' }}>
              {committeeNavLinks.map(link => (
                <NavLink key={link.path} to={link.path} onClick={() => setSidebarOpen(false)}
                  style={({ isActive }) => ({
                    display: 'flex', alignItems: 'center', gap: '12px', padding: '11px 20px',
                    textDecoration: 'none', color: isActive ? '#c4b5fd' : '#a78bfa',
                    background: isActive ? 'rgba(124,58,237,0.15)' : 'transparent',
                    borderLeft: isActive ? '3px solid #7c3aed' : '3px solid transparent',
                    fontSize: '14px', fontWeight: isActive ? 600 : 400, transition: 'all 0.2s', whiteSpace: 'nowrap',
                  })}>
                  <span style={{ fontSize: '16px' }}>{link.icon}</span>
                  {link.label}
                </NavLink>
              ))}
            </div>
          </div>
        </aside>

        {sidebarOpen && <div onClick={() => setSidebarOpen(false)} style={{ position: 'fixed', inset: 0, top: '60px', background: 'rgba(0,0,0,0.4)', zIndex: 89 }} />}

        <main style={{ flex: 1, padding: '28px', minHeight: 'calc(100vh - 60px)', overflow: 'auto' }}>
          <Outlet />
        </main>

        {/* Hamburger Panel */}
        <div style={{
          position: 'fixed', top: '60px', right: 0,
          height: 'calc(100vh - 60px)',
          width: hamburgerOpen ? '260px' : '0',
          overflow: 'hidden', background: '#1e0a3c',
          transition: 'width 0.3s cubic-bezier(0.4,0,0.2,1)', zIndex: 90,
          boxShadow: hamburgerOpen ? '-4px 0 20px rgba(0,0,0,0.2)' : 'none',
        }}>
          <div style={{ padding: '24px', minWidth: '260px' }}>
            <div style={{ textAlign: 'center', paddingBottom: '20px', borderBottom: '1px solid #2e1065' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'linear-gradient(135deg, #7c3aed, #a855f7)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: '24px', margin: '0 auto 12px' }}>
                {user?.name?.[0]?.toUpperCase() || 'C'}
              </div>
              <p style={{ margin: '0 0 4px', color: '#faf5ff', fontWeight: 600, fontSize: '15px' }}>{user?.name}</p>
              <p style={{ margin: 0, color: '#c4b5fd', fontSize: '12px' }}>{user?.email}</p>
              <span style={{ display: 'inline-block', marginTop: '8px', padding: '2px 10px', borderRadius: '20px', background: 'rgba(124,58,237,0.15)', color: '#c4b5fd', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Committee</span>
            </div>
            <div style={{ paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {[
                { icon: '👤', label: 'My Profile',    path: '/committee/profile' },
                { icon: '⚙️', label: 'Settings',      path: '/committee/settings' },
                { icon: '🔔', label: 'Notifications', path: '/committee/notifications' },
              ].map(item => (
                <NavLink key={item.path} to={item.path} onClick={() => setHamburgerOpen(false)}
                  style={({ isActive }) => ({
                    display: 'flex', alignItems: 'center', gap: '12px', padding: '11px 12px', borderRadius: '10px',
                    textDecoration: 'none', color: isActive ? '#c4b5fd' : '#a78bfa',
                    background: isActive ? 'rgba(124,58,237,0.12)' : 'transparent',
                    fontSize: '14px', fontWeight: isActive ? 600 : 400, transition: 'background 0.2s', whiteSpace: 'nowrap',
                  })}>
                  <span style={{ fontSize: '16px' }}>{item.icon}</span>{item.label}
                </NavLink>
              ))}
              <div style={{ borderTop: '1px solid #2e1065', margin: '12px 0' }} />
              <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '11px 12px', borderRadius: '10px', background: 'rgba(239,68,68,0.08)', border: 'none', color: '#f87171', cursor: 'pointer', fontSize: '14px', fontWeight: 500, width: '100%', whiteSpace: 'nowrap' }}>
                <span style={{ fontSize: '16px' }}>🚪</span>Logout
              </button>
            </div>
          </div>
        </div>
        {hamburgerOpen && <div onClick={() => setHamburgerOpen(false)} style={{ position: 'fixed', inset: 0, top: '60px', background: 'rgba(0,0,0,0.4)', zIndex: 89 }} />}
      </div>
    </div>
  );
}