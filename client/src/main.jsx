import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Home } from './pages/Home';
import { Landing } from './pages/Landing';
import { Explore } from './pages/Explore';
import Create from './pages/Create';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { AuthProvider, useAuth } from './context/AuthContext';
import './index.css';

// Protected route — requires a signed-in Firebase user
const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/login" replace />;
};

// Auth route — redirects already-signed-in users away from login/signup
const AuthRoute = ({ children }) => {
  const { currentUser } = useAuth();
  return currentUser ? <Navigate to="/home" replace /> : children;
};

// Root — go to /home if logged in, landing page otherwise
const RootRedirect = () => {
  const { currentUser } = useAuth();
  return currentUser ? <Navigate to="/home" replace /> : <Landing />;
};

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<RootRedirect />} />

      <Route path="/login" element={<AuthRoute><Login /></AuthRoute>} />
      <Route path="/signup" element={<AuthRoute><Signup /></AuthRoute>} />

      <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path="/explore" element={<ProtectedRoute><Explore /></ProtectedRoute>} />
      <Route path="/create" element={<ProtectedRoute><Create /></ProtectedRoute>} />
      <Route path="/create/:id" element={<ProtectedRoute><Create /></ProtectedRoute>} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </BrowserRouter>
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* AuthProvider waits for Firebase to resolve auth state before rendering —
        no more artificial 2-second loading delay, and ProtectedRoute uses real
        Firebase session instead of localStorage */}
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  </React.StrictMode>
);

