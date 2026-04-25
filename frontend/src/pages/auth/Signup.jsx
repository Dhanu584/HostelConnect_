import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const roles = [
  { value: 'student',   label: 'Student',   icon: '🎒', desc: 'Access courses, attendance & hostel info' },
  { value: 'faculty',   label: 'Faculty',   icon: '🎓', desc: 'Manage classes, grades & student records'  },
  { value: 'committee', label: 'Committee', icon: '🏛️', desc: 'Oversee hostel operations & approvals'     },
];

export default function Signup() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '', role: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.role) return setError('Please select your role to continue');
    setLoading(true);
    setError('');
    try {
      const res = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) return setError(data.message || 'Signup failed');
      login(data.user, data.token);
      navigate('/redirect');
    } catch {
      setError('Server unreachable. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%', padding: '12px 16px', borderRadius: '10px',
    background: '#1e293b', border: '1px solid #334155',
    color: '#f8fafc', fontSize: '14px', outline: 'none',
    boxSizing: 'border-box', transition: 'border 0.2s',
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: "'DM Sans', sans-serif", background: '#0f172a',
      padding: '40px 16px',
    }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Syne:wght@700&display=swap" rel="stylesheet" />

      <div style={{ width: '100%', maxWidth: '520px' }}>

        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '36px', justifyContent: 'center' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>🏠</div>
          <span style={{ fontFamily: "'Syne', sans-serif", fontSize: '22px', fontWeight: 700, color: '#f8fafc' }}>HostelConnect</span>
        </div>

        <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', padding: '36px' }}>
          <h1 style={{ fontSize: '26px', fontWeight: 700, color: '#f8fafc', margin: '0 0 6px', fontFamily: "'Syne', sans-serif" }}>Create your account</h1>
          <p style={{ color: '#64748b', fontSize: '14px', margin: '0 0 28px' }}>Fill in your details and choose your role</p>

          {error && (
            <div style={{ padding: '12px 16px', borderRadius: '10px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#f87171', fontSize: '14px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

            {/* Name */}
            <div>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: '13px', fontWeight: 500, marginBottom: '6px' }}>Full Name</label>
              <input
                type="text" required placeholder="John Doe"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = '#6366f1'}
                onBlur={e => e.target.style.borderColor = '#334155'}
              />
            </div>

            {/* Email */}
            <div>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: '13px', fontWeight: 500, marginBottom: '6px' }}>Email Address</label>
              <input
                type="email" required placeholder="you@example.com"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = '#6366f1'}
                onBlur={e => e.target.style.borderColor = '#334155'}
              />
            </div>

            {/* Password */}
            <div>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: '13px', fontWeight: 500, marginBottom: '6px' }}>Password</label>
              <input
                type="password" required placeholder="Min. 8 characters"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = '#6366f1'}
                onBlur={e => e.target.style.borderColor = '#334155'}
              />
            </div>

            {/* Role Selection */}
            <div>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: '13px', fontWeight: 500, marginBottom: '10px' }}>Select your role</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {roles.map(role => (
                  <button
                    type="button" key={role.value}
                    onClick={() => setForm({ ...form, role: role.value })}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '14px',
                      padding: '14px 16px', borderRadius: '12px',
                      background: form.role === role.value ? 'rgba(99,102,241,0.12)' : '#1e293b',
                      border: form.role === role.value ? '1.5px solid #6366f1' : '1px solid #334155',
                      cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s',
                    }}
                  >
                    <span style={{ fontSize: '24px', flexShrink: 0 }}>{role.icon}</span>
                    <div style={{ flex: 1 }}>
                      <p style={{ margin: 0, color: form.role === role.value ? '#a5b4fc' : '#e2e8f0', fontWeight: 600, fontSize: '14px' }}>{role.label}</p>
                      <p style={{ margin: '2px 0 0', color: '#64748b', fontSize: '12px' }}>{role.desc}</p>
                    </div>
                    {/* Radio indicator */}
                    <div style={{
                      width: '18px', height: '18px', borderRadius: '50%', flexShrink: 0,
                      border: form.role === role.value ? '2px solid #6366f1' : '2px solid #475569',
                      background: form.role === role.value ? '#6366f1' : 'transparent',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'all 0.2s',
                    }}>
                      {form.role === role.value && <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#fff' }} />}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit" disabled={loading}
              style={{
                marginTop: '8px', padding: '13px', borderRadius: '10px', border: 'none',
                background: loading ? '#4338ca' : 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                color: '#fff', fontSize: '15px', fontWeight: 600,
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.8 : 1,
              }}
            >
              {loading ? 'Creating account...' : 'Create Account →'}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '24px', color: '#64748b', fontSize: '14px' }}>
            Already have an account?{' '}
            <span onClick={() => navigate('/login')} style={{ color: '#818cf8', cursor: 'pointer', fontWeight: 500 }}>
              Sign in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}