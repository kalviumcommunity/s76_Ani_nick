import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { loginWithEmail, loginWithGoogle } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    if (!formData.email.trim()) return setError('Email is required');
    if (!formData.password.trim()) return setError('Password is required');

    setLoading(true);
    try {
      await loginWithEmail(formData.email, formData.password);
      navigate('/home');
    } catch (err) {
      const code = err.code;
      if (
        code === 'auth/user-not-found' ||
        code === 'auth/wrong-password' ||
        code === 'auth/invalid-credential'
      ) {
        setError('Invalid email or password');
      } else if (code === 'auth/too-many-requests') {
        setError('Too many failed attempts. Please try again later.');
      } else {
        setError(err.message || 'Login failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await loginWithGoogle();
      navigate('/home');
    } catch (err) {
      if (err.code !== 'auth/popup-closed-by-user') {
        setError('Google sign-in failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#171742] flex items-center justify-center overflow-hidden">
      <img src="/Ellipse 2.png" className="absolute top-0 w-full h-50 backdrop-blur" alt="" />

      <motion.div
        className="bg-black/60 w-full max-w-md p-8 rounded-lg shadow-2xl text-white z-10 border border-gray-700/30"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-8">
          <Link to="/">
            <img src="/AniNick.png" alt="AniNick Logo" className="h-10 mx-auto mb-4 hover:scale-110 transition-transform" />
          </Link>
          <h2 className="text-3xl font-bold text-[#FF7B00]">Welcome Back!</h2>
          <p className="text-gray-300 mt-2">Sign in to continue your anime nickname adventure</p>
        </div>

        {error && (
          <motion.div
            className="bg-red-900/50 text-white p-3 rounded-md mb-4 text-sm"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
          >
            {error}
          </motion.div>
        )}

        {/* Google Sign-In */}
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 bg-white text-gray-800 font-semibold py-3 px-4 rounded-md mb-6 hover:bg-gray-100 transition-colors duration-200 disabled:opacity-60"
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Continue with Google
        </button>

        <div className="relative flex items-center mb-6">
          <div className="flex-grow border-t border-gray-600" />
          <span className="mx-4 text-gray-400 text-sm">or</span>
          <div className="flex-grow border-t border-gray-600" />
        </div>

        {/* Email + Password form */}
        <form onSubmit={handleEmailLogin}>
          <div className="mb-4">
            <label className="block text-white mb-2 text-sm">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#FF7B00]"
            />
          </div>

          <div className="mb-6">
            <label className="block text-white mb-2 text-sm">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#FF7B00]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#FF7B00] hover:bg-[#E06A00] text-white font-bold py-3 px-4 rounded-md transition-colors duration-300 flex justify-center disabled:opacity-60"
          >
            {loading ? <span className="animate-pulse">Signing in…</span> : 'Login'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-300">
            Don't have an account?{' '}
            <Link to="/signup" className="text-[#FF7B00] hover:text-white transition-colors">
              Sign up
            </Link>
          </p>
          <Link to="/" className="block mt-4 text-gray-400 hover:text-white transition-colors text-sm">
            Return to landing page
          </Link>
        </div>

        <motion.img
          src="/image 5.png"
          alt=""
          className="absolute -bottom-16 -right-16 h-40 opacity-40 z-0"
          animate={{ y: [0, 10, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </div>
  );
};

export default Login;