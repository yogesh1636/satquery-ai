import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { OnboardingRolePage } from './pages/OnboardingRolePage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { ResetPasswordPage } from './pages/ResetPasswordPage';
import { SuccessPage } from './pages/SuccessPage';
import { DashboardPage } from './pages/DashboardPage';
import { isAuthenticated, getUserRole } from './utils/auth';

// Guard for protected pages (Dashboard)
const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// Guard for public-only pages (Login, Register) when already signed in
const PublicOnlyRoute = ({ children }) => {
  if (isAuthenticated()) {
    const userRole = getUserRole();
    if (userRole) {
      return <Navigate to={`/dashboard/${userRole}`} replace />;
    }
    return <Navigate to="/onboarding/role" replace />;
  }
  return children;
};

// Guard for Onboarding Role page
const OnboardingGuard = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  const userRole = getUserRole();
  if (userRole) {
    return <Navigate to={`/dashboard/${userRole}`} replace />;
  }
  return children;
};

// Helper for /dashboard base route
const DashboardRedirector = () => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  const userRole = getUserRole();
  if (userRole) {
    return <Navigate to={`/dashboard/${userRole}`} replace />;
  }
  return <Navigate to="/onboarding/role" replace />;
};

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* Public Auth Routes */}
        <Route path="/login" element={<PublicOnlyRoute><LoginPage /></PublicOnlyRoute>} />
        <Route path="/register" element={<PublicOnlyRoute><RegisterPage /></PublicOnlyRoute>} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        
        {/* Onboarding & Success Routes */}
        <Route path="/onboarding/role" element={<OnboardingGuard><OnboardingRolePage /></OnboardingGuard>} />
        <Route path="/success" element={<ProtectedRoute><SuccessPage /></ProtectedRoute>} />
        
        {/* Protected Dashboard Routes */}
        <Route path="/dashboard/:roleId" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        <Route path="/dashboard" element={<DashboardRedirector />} />
        
        {/* Fallback Catch-all Route */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
