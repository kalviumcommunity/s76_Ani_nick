import {Home} from './pages/Home'
import {Landing} from './pages/Landing'
import {Explore} from './pages/Explore'
import Create from './pages/Create'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

// Protected route component - redirects to login if not authenticated
const ProtectedRoute = ({ children }) => {
  const isLoggedIn = JSON.parse(localStorage.getItem('user'))?.isLoggedIn || false;
  
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

// Auth route component - redirects to home if already authenticated
const AuthRoute = ({ children }) => {
  const isLoggedIn = JSON.parse(localStorage.getItem('user'))?.isLoggedIn || false;
  
  if (isLoggedIn) {
    return <Navigate to="/home" replace />;
  }
  
  return children;
};

function App() {
  const [isLoading, setIsLoading] = useState(true);
  
  // Check authentication on app load
  useEffect(() => {
    // Simple verification that user data exists
    const checkAuth = () => {
      try {
        const userData = localStorage.getItem('user');
        if (userData) {
          // You could perform additional validation here if needed
          console.log("User is logged in");
        }
      } catch (error) {
        console.error("Auth check error:", error);
        localStorage.removeItem('user'); // Clear invalid data
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  if (isLoading) {
    return  <div className="flex justify-center items-center h-screen">
    <img src={loadingGifPath} alt="Loading..." className="w-60 h-60" />
  </div>
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path='/' element={<Landing/>}/>
        
        {/* Routes that redirect to home if already logged in */}
        <Route path='/login' element={
          <AuthRoute>
            <Login/>
          </AuthRoute>
        }/>
        <Route path='/signup' element={
          <AuthRoute>
            <Signup/>
          </AuthRoute>
        }/>
        
        {/* Protected routes - require authentication */}
        <Route path='/home' element={
          <ProtectedRoute>
            <Home/>
          </ProtectedRoute>
        }/>
        <Route path='/explore' element={
          <ProtectedRoute>
            <Explore/>
          </ProtectedRoute>
        }/>
        <Route path='/create' element={
          <ProtectedRoute>
            <Create/>
          </ProtectedRoute>
        }/>
        <Route path="/create/:id" element={
          <ProtectedRoute>
            <Create />
          </ProtectedRoute>
        }/>
        
        {/* Fallback route - redirect to landing page */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
