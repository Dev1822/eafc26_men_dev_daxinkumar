import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Suspense, lazy } from 'react';
import { Toaster } from 'react-hot-toast';

// Lazy load components
const Login = lazy(() => import('./pages/Auth/Login'));
const Register = lazy(() => import('./pages/Auth/Register'));
const UserDashboard = lazy(() => import('./pages/Dashboard/UserDashboard'));
const AdminDashboard = lazy(() => import('./pages/Dashboard/AdminDashboard'));
const Players = lazy(() => import('./pages/Dashboard/Players'));
const Analytics = lazy(() => import('./pages/Dashboard/Analytics'));
const MainLayout = lazy(() => import('./components/Layout/MainLayout'));

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchProfile } from './store/slices/authSlice';

// Route Guards
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, profileLoaded, token } = useSelector((state) => state.auth);
  if (!token) return <Navigate to="/login" replace />;
  if (token && !profileLoaded) return <PageLoader />;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
};

const AdminRoute = ({ children }) => {
  const { isAuthenticated, user, profileLoaded, token } = useSelector((state) => state.auth);
  if (!token) return <Navigate to="/login" replace />;
  if (token && !profileLoaded) return <PageLoader />;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (user?.role !== 'admin') return <Navigate to="/dashboard" replace />;
  return children;
};

// Global Loader
const PageLoader = () => (
  <div className="flex h-screen w-full items-center justify-center bg-gray-50 dark:bg-gray-900">
    <div className="h-12 w-12 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"></div>
  </div>
);

function App() {
  const dispatch = useDispatch();
  const { token, profileLoaded } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token && !profileLoaded) {
      dispatch(fetchProfile());
    }
  }, [dispatch, token, profileLoaded]);

  return (
    <Router>
      <Toaster position="top-right" />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Default Route */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          {/* Protected Routes inside Main Layout */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }>
            <Route index element={<UserDashboard />} />
            <Route path="players" element={<Players />} />
            <Route path="analytics" element={<Analytics />} />
            
            {/* Admin Only Routes */}
            <Route path="admin" element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            } />
          </Route>

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
