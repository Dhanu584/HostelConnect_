import { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) return setError(data.message || 'Login failed');
      login(data.user, data.token);
      navigate('/redirect');
    } catch {
      setError('Server unreachable. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex',
      fontFamily: "'DM Sans', sans-serif",
      background: '#0f172a',
    }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Syne:wght@700&display=swap" rel="stylesheet" />

      {/* Left decorative panel */}
      <div style={{
        flex: 1, display: 'none',
        background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
        alignItems: 'center', justifyContent: 'center',
        padding: '40px',
        position: 'relative', overflow: 'hidden',
      }} className="left-panel">
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <div style={{ fontSize: '64px', marginBottom: '24px' }}>🏠</div>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: '36px', color: '#f8fafc', margin: '0 0 16px', fontWeight: 700 }}>HostelConnect</h2>
          <p style={{ color: '#94a3b8', fontSize: '16px', lineHeight: '1.7', maxWidth: '320px' }}>
            Your all-in-one platform for seamless hostel management — students, faculty, and committee in one place.
          </p>
        </div>
        {/* Decorative circles */}
        <div style={{ position: 'absolute', width: '400px', height: '400px', borderRadius: '50%', border: '1px solid rgba(99,102,241,0.15)', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
        <div style={{ position: 'absolute', width: '600px', height: '600px', borderRadius: '50%', border: '1px solid rgba(99,102,241,0.08)', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
      </div>

      {/* Right form panel */}
      <div style={{
        width: '100%', maxWidth: '480px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '40px 32px',
        background: '#0f172a',
      }}>
        <div style={{ width: '100%' }}>

          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '40px' }}>
            <NavLink to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>🏠</div>
              <span style={{ fontFamily: "'Syne', sans-serif", fontSize: '22px', fontWeight: 700, color: '#f8fafc' }}>HostelConnect</span>
            </NavLink>
          </div>

          <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#f8fafc', margin: '0 0 8px', fontFamily: "'Syne', sans-serif" }}>Welcome back</h1>
          <p style={{ color: '#64748b', fontSize: '15px', margin: '0 0 32px' }}>Sign in to your account to continue</p>

          {error && (
            <div style={{
              padding: '12px 16px', borderRadius: '10px',
              background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)',
              color: '#f87171', fontSize: '14px', marginBottom: '20px',
              display: 'flex', alignItems: 'center', gap: '8px',
            }}>
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: '13px', fontWeight: 500, marginBottom: '6px' }}>Email address</label>
              <input
                type="email" required placeholder="you@example.com"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                style={{
                  width: '100%', padding: '12px 16px', borderRadius: '10px',
                  background: '#1e293b', border: '1px solid #334155',
                  color: '#f8fafc', fontSize: '14px', outline: 'none',
                  boxSizing: 'border-box', transition: 'border 0.2s',
                }}
                onFocus={e => e.target.style.borderColor = '#6366f1'}
                onBlur={e => e.target.style.borderColor = '#334155'}
              />
            </div>

            <div>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: '13px', fontWeight: 500, marginBottom: '6px' }}>Password</label>
              <input
                type="password" required placeholder="••••••••"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                style={{
                  width: '100%', padding: '12px 16px', borderRadius: '10px',
                  background: '#1e293b', border: '1px solid #334155',
                  color: '#f8fafc', fontSize: '14px', outline: 'none',
                  boxSizing: 'border-box', transition: 'border 0.2s',
                }}
                onFocus={e => e.target.style.borderColor = '#6366f1'}
                onBlur={e => e.target.style.borderColor = '#334155'}
              />
            </div>

            <button
              type="submit" disabled={loading}
              style={{
                marginTop: '8px', padding: '13px',
                borderRadius: '10px', border: 'none',
                background: loading ? '#4338ca' : 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                color: '#fff', fontSize: '15px', fontWeight: 600,
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'opacity 0.2s',
                opacity: loading ? 0.8 : 1,
              }}
            >
              {loading ? 'Signing in...' : 'Sign In →'}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '24px', color: '#64748b', fontSize: '14px' }}>
            Don't have an account?{' '}
            <span
              onClick={() => navigate('/signup')}
              style={{ color: '#818cf8', cursor: 'pointer', fontWeight: 500 }}
            >
              Create one
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}