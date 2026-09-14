import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { OnboardingRolePage } from './pages/OnboardingRolePage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { ResetPasswordPage } from './pages/ResetPasswordPage';
import { SuccessPage } from './pages/SuccessPage';
import { DashboardPage } from './pages/DashboardPage';

const DashboardRedirector = () => {
  const savedRole = localStorage.getItem('satquery_user_role') || localStorage.getItem('satquery_role');
  if (savedRole) {
    return <Navigate to={`/dashboard/${savedRole}`} replace />;
  }
  return <Navigate to="/onboarding/role" replace />;
};

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/onboarding/role" element={<OnboardingRolePage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/dashboard/:roleId" element={<DashboardPage />} />
        <Route path="/dashboard" element={<DashboardRedirector />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
