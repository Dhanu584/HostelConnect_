import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      fontFamily: "'DM Sans', sans-serif",
      background: '#0f172a',
      position: 'relative', overflow: 'hidden',
    }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Syne:wght@700;800&display=swap" rel="stylesheet" />

      {/* Background decoration */}
      <div style={{ position: 'absolute', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', width: '200px', height: '200px', borderRadius: '50%', border: '1px solid rgba(99,102,241,0.12)', top: '15%', right: '15%', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', width: '100px', height: '100px', borderRadius: '50%', border: '1px solid rgba(139,92,246,0.1)', bottom: '20%', left: '12%', pointerEvents: 'none' }} />

      {/* Main content */}
      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '0 24px', maxWidth: '600px' }}>

        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '40px' }}>
          <div style={{
            width: '52px', height: '52px', borderRadius: '14px',
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px',
            boxShadow: '0 0 32px rgba(99,102,241,0.35)',
          }}>🏠</div>
          <span style={{ fontFamily: "'Syne', sans-serif", fontSize: '32px', fontWeight: 800, color: '#f8fafc', letterSpacing: '-0.5px' }}>
            HostelConnect
          </span>
        </div>

        {/* Tagline */}
        <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: '48px', fontWeight: 800, color: '#f8fafc', margin: '0 0 16px', lineHeight: '1.15', letterSpacing: '-1px' }}>
          Hostel management,{' '}
          <span style={{ background: 'linear-gradient(135deg, #818cf8, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            simplified
          </span>
        </h1>

        <p style={{ color: '#64748b', fontSize: '17px', lineHeight: '1.7', margin: '0 0 40px', maxWidth: '440px', marginLeft: 'auto', marginRight: 'auto' }}>
          One platform for students, faculty, and committee. Manage admissions, attendance, rooms, and more — all in one place.
        </p>

        {/* CTA Buttons */}
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={() => navigate('/signup')}
            style={{
              padding: '14px 32px', borderRadius: '12px', border: 'none',
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              color: '#fff', fontSize: '16px', fontWeight: 600, cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(99,102,241,0.35)',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
            onMouseEnter={e => { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 8px 28px rgba(99,102,241,0.45)'; }}
            onMouseLeave={e => { e.target.style.transform = 'none'; e.target.style.boxShadow = '0 4px 20px rgba(99,102,241,0.35)'; }}
          >
            Get Started →
          </button>
          <button
            onClick={() => navigate('/login')}
            style={{
              padding: '14px 32px', borderRadius: '12px',
              border: '1px solid #334155',
              background: 'transparent',
              color: '#94a3b8', fontSize: '16px', fontWeight: 500, cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.target.style.borderColor = '#6366f1'; e.target.style.color = '#a5b4fc'; }}
            onMouseLeave={e => { e.target.style.borderColor = '#334155'; e.target.style.color = '#94a3b8'; }}
          >
            Sign In
          </button>
        </div>

        {/* Role badges */}
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '48px', flexWrap: 'wrap' }}>
          {[
            { icon: '🎒', label: 'Students' },
            { icon: '🎓', label: 'Faculty'  },
            { icon: '🏛️', label: 'Committee' },
          ].map(role => (
            <div key={role.label} style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              padding: '6px 14px', borderRadius: '20px',
              background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.15)',
              color: '#94a3b8', fontSize: '13px',
            }}>
              <span style={{ fontSize: '14px' }}>{role.icon}</span>
              {role.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}