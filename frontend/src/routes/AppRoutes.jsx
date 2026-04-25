import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Auth Pages
import Home from '../pages/Home';
import Login from '../pages/auth/Login';
import Signup from '../pages/auth/Signup';
import RoleRedirect from '../pages/auth/RoleRedirect';

// Layouts
import StudentsLayout from '../layouts/StudentsLayout';
import FacultyLayout from '../layouts/FacultyLayout';
import CommitteeLayout from '../layouts/CommitteeLayout';

// Student Pages
import Today from '../pages/student/Today';
import Admission from '../pages/student/Admission';
import BuySell from '../pages/student/Buy-Sell';
import Chats from '../pages/student/Chats';
import Help from '../pages/student/Help';
import InOut from '../pages/student/In-Out';
import Profile from '../pages/student/Profile';

function ProtectedRoute({ children, role }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (role && user.role !== role) return <Navigate to="/" replace />;
  return children;
}

export default function AppRoutes() {
  return (
    <Routes>

      {/* ─── Public Routes ─── */}
      <Route path="/"         element={<Home />} />
      <Route path="/login"    element={<Login />} />
      <Route path="/signup"   element={<Signup />} />
      <Route path="/redirect" element={<RoleRedirect />} />

      {/* ─── Student Routes ─── */}
      <Route path="/student" element={
        <ProtectedRoute role="student">
          <StudentsLayout />
        </ProtectedRoute>
      }>
        <Route index            element={<Today />} />
        <Route path="today"     element={<Today />} />
        <Route path="admission" element={<Admission />} />
        <Route path="buy-sell"  element={<Buy-Sell />} />
        <Route path="chats"     element={<Chats />} />
        <Route path="help"      element={<Help />} />
        <Route path="in-out"    element={<In-Out />} />
        <Route path="profile"   element={<Profile />} />
      </Route>

      {/* ─── Faculty Routes ─── */}
      <Route path="/faculty" element={
        <ProtectedRoute role="faculty">
          <FacultyLayout />
        </ProtectedRoute>
      }>
        <Route index element={<div style={{ padding: '28px', color: '#16a34a' }}>Faculty Dashboard — Coming Soon</div>} />
      </Route>

      {/* ─── Committee Routes ─── */}
      <Route path="/committee" element={
        <ProtectedRoute role="committee">
          <CommitteeLayout />
        </ProtectedRoute>
      }>
        <Route index element={<div style={{ padding: '28px', color: '#7c3aed' }}>Committee Dashboard — Coming Soon</div>} />
      </Route>

      {/* ─── 404 Fallback ─── */}
      <Route path="*" element={<Navigate to="/" replace />} />

    </Routes>
  );
}