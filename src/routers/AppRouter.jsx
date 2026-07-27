import { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { IMAGE } from '../constants/image/IMAGE';
import ChatPage from '../pages/chat/ChatPage';
import LoginPage from '../pages/user/LoginPage';
import QRScanPage from '../pages/user/QRScanPage';
import RegisterPage from '../pages/user/RegisterPage';
import useAuthStore from '../stores/auth.store';

// Bảo vệ route: chưa đăng nhập thì đá về /login
const PrivateRoute = ({ children }) => {
  const isAuthenticated = useAuthStore(s => s.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

// Route công khai: đã đăng nhập thì đá về /chat
const PublicRoute = ({ children }) => {
  const isAuthenticated = useAuthStore(s => s.isAuthenticated);
  return isAuthenticated ? <Navigate to="/chat" replace /> : children;
};

// Màn hình loading khi kiểm tra session
const SplashScreen = () => (
  <div className="flex items-center justify-center h-screen bg-gray-950">
    <div className="flex flex-col items-center gap-4">
      <img src={IMAGE.LOGO} alt="Mạng Xã Hội Gia Đình" className="w-16 h-16 animate-pulse" />
      <p className="text-white/60 text-sm">Đang tải Mạng Xã Hội Gia Đình...</p>
    </div>
  </div>
);

const AppRouter = () => {
  const isLoading = useAuthStore(s => s.isLoading);
  const checkAuth = useAuthStore(s => s.checkAuth);

  // Kiểm tra session
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isLoading) return <SplashScreen />;

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          }
        />
        <Route
          path="/qr-scan"
          element={
            <PrivateRoute>
              <QRScanPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/chat"
          element={
            <PrivateRoute>
              <ChatPage />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/chat" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
