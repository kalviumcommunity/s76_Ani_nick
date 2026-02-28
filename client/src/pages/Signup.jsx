import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
  const { signUpWithEmail, loginWithGoogle } = useAuth();
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleEmailSignup = async (e) => {
    e.preventDefault();
    if (!formData.username.trim()) return setError('Username is required');
    if (!formData.email.trim()) return setError('Email is required');
    if (!formData.password.trim()) return setError('Password is required');
    if (formData.password.length < 6) return setError('Password must be at least 6 characters');

    setLoading(true);
    try {
      await signUpWithEmail(formData.email, formData.password, formData.username);
      navigate('/home');
    } catch (err) {
      const code = err.code;
      if (code === 'auth/email-already-in-use') {
        setError('An account with this email already exists.');
      } else if (code === 'auth/invalid-email') {
        setError('Invalid email address.');
      } else if (code === 'auth/weak-password') {
        setError('Password is too weak. Use at least 6 characters.');
      } else {
        setError(err.message || 'Signup failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
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
          <h2 className="text-3xl font-bold text-[#FF7B00]">Join AniNick!</h2>
          <p className="text-gray-300 mt-2">Create an account to discover and share anime nicknames</p>
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

        {/* Google Sign-Up */}
        <button
          onClick={handleGoogleSignup}
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
        <form onSubmit={handleEmailSignup}>
          <div className="mb-4">
            <label className="block text-white mb-2 text-sm">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Choose a display name"
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#FF7B00]"
            />
          </div>

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
              placeholder="At least 6 characters"
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#FF7B00]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#FF7B00] hover:bg-[#E06A00] text-white font-bold py-3 px-4 rounded-md transition-colors duration-300 flex justify-center disabled:opacity-60"
          >
            {loading ? <span className="animate-pulse">Creating account…</span> : 'Sign Up'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-300">
            Already have an account?{' '}
            <Link to="/login" className="text-[#FF7B00] hover:text-white transition-colors">
              Log in
            </Link>
          </p>
          <Link to="/" className="block mt-4 text-gray-400 hover:text-white transition-colors text-sm">
            Return to landing page
          </Link>
        </div>

        <motion.img
          src="/narubg.png"
          alt=""
          className="absolute -bottom-20 -left-16 h-48 opacity-40 z-0"
          animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </div>
  );
};

export default Signup;