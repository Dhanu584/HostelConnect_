import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Layouts
import StudentsLayout  from '../layouts/StudentsLayout';
import FacultyLayout   from '../layouts/FacultyLayout';
import CommitteeLayout from '../layouts/CommitteeLayout';

// Auth Pages
import Home         from '../pages/Home';
import Login        from '../pages/auth/Login';
import Signup       from '../pages/auth/Signup';
import RoleRedirect from '../pages/auth/RoleRedirect';

// ── Student Pages ──
import SToday     from '../pages/student/Today';
import SAdmission from '../pages/student/Admission';
import SBuySell   from '../pages/student/Buy-Sell';
import SChats     from '../pages/student/Chats';
import SHelp      from '../pages/student/Help';
import SInOut     from '../pages/student/In-Out';
import SProfile   from '../pages/student/Profile';

// ── Faculty Pages ──
import FToday      from '../pages/faculty/Today';
import FAdmission  from '../pages/faculty/Admission';
import FChats      from '../pages/faculty/Chats';
import FHelp       from '../pages/faculty/Help';
import FInOut      from '../pages/faculty/In-Out';
import FProfile    from '../pages/faculty/Profile';
import FSettings   from '../pages/faculty/Settings';
import FStudents   from '../pages/faculty/StudentsInfo';

// ── Committee Pages ──
import CToday    from '../pages/committee/Today';
import CBuySell  from '../pages/committee/Buy-Sell';
import CChats    from '../pages/committee/Chats';
import CHelp     from '../pages/committee/Help';
import CProfile  from '../pages/committee/Profile';
import CSettings from '../pages/committee/Settings';

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

      {/* ════════════════════════════════
          STUDENT ROUTES
      ════════════════════════════════ */}
      <Route path="/student" element={
        <ProtectedRoute role="student">
          <StudentsLayout />
        </ProtectedRoute>
      }>
        <Route index            element={<SToday />} />
        <Route path="today"     element={<SToday />} />
        <Route path="admission" element={<SAdmission />} />
        <Route path="buy-sell"  element={<SBuySell />} />
        <Route path="chats"     element={<SChats />} />
        <Route path="help"      element={<SHelp />} />
        <Route path="in-out"    element={<SInOut />} />
        <Route path="profile"   element={<SProfile />} />
      </Route>

      {/* ════════════════════════════════
          FACULTY ROUTES
      ════════════════════════════════ */}
      <Route path="/faculty" element={
        <ProtectedRoute role="faculty">
          <FacultyLayout />
        </ProtectedRoute>
      }>
        <Route index              element={<FToday />} />
        <Route path="today"       element={<FToday />} />
        <Route path="admission"   element={<FAdmission />} />
        <Route path="chats"       element={<FChats />} />
        <Route path="help"        element={<FHelp />} />
        <Route path="in-out"      element={<FInOut />} />
        <Route path="profile"     element={<FProfile />} />
        <Route path="settings"    element={<FSettings />} />
        <Route path="studentsinfo" element={<FStudents />} />
      </Route>

      {/* ════════════════════════════════
          COMMITTEE ROUTES
      ════════════════════════════════ */}
      <Route path="/committee" element={
        <ProtectedRoute role="committee">
          <CommitteeLayout />
        </ProtectedRoute>
      }>
        <Route index           element={<CToday />} />
        <Route path="today"    element={<CToday />} />
        <Route path="buy-sell" element={<CBuySell />} />
        <Route path="chats"    element={<CChats />} />
        <Route path="help"     element={<CHelp />} />
        <Route path="profile"  element={<CProfile />} />
        <Route path="settings" element={<CSettings />} />
      </Route>

      {/* ─── 404 Fallback ─── */}
      <Route path="*" element={<Navigate to="/" replace />} />

    </Routes>
  );
}