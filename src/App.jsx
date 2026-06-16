import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider as RealAuthProvider, useAuth as useRealAuth } from '@/lib/AuthContext';
import { AuthProvider, useAuth } from '@/lib/MockAuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import ProtectedRoute from '@/components/ProtectedRoute';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import ForgotPassword from '@/pages/ForgotPassword';
import ResetPassword from '@/pages/ResetPassword';
import Layout from '@/components/Layout';
import RoleGuard from '@/components/RoleGuard';
import PortalViajero from '@/pages/PortalViajero';
import PanelFuncionario from '@/pages/PanelFuncionario';
import Dashboard from '@/pages/Dashboard';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();
  // Mock auth overrides real auth — real AuthProvider kept for platform compliance only

  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      navigateToLogin();
      return null;
    }
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route element={<ProtectedRoute unauthenticatedElement={<Navigate to="/login" replace />} />}>
        <Route element={<Layout />}>
          <Route path="/" element={
            <RoleGuard allowedRoles={["viajero"]} redirectTo="/panel">
              <PortalViajero />
            </RoleGuard>
          } />
          <Route path="/panel" element={
            <RoleGuard allowedRoles={["funcionario", "admin"]}>
              <PanelFuncionario />
            </RoleGuard>
          } />
          <Route path="/estadisticas" element={
            <RoleGuard allowedRoles={["funcionario", "admin"]}>
              <Dashboard />
            </RoleGuard>
          } />
        </Route>
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

function App() {
  return (
    <RealAuthProvider>
      <AuthProvider>
        <QueryClientProvider client={queryClientInstance}>
          <Router>
            <AuthenticatedApp />
          </Router>
          <Toaster />
        </QueryClientProvider>
      </AuthProvider>
    </RealAuthProvider>
  )
}

export default App