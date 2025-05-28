import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username.trim()) {
      setError('Username is required');
      return;
    }
    
    if (!formData.password.trim()) {
      setError('Password is required');
      return;
    }

    if (formData.password.trim().length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    setLoading(true);
    try {
      // Using the new signup endpoint with JWT
      const response = await axios.post('https://s76-ani-nick-1.onrender.com/api/signup', {
        username: formData.username,
        email: formData.email,
        password: formData.password
      }, {
        withCredentials: true // Important: To allow cookies to be set
      });
      
      // Store user info in localStorage (but not the password for security)
      localStorage.setItem('user', JSON.stringify({
        username: response.data.username,
        email: formData.email,
        isLoggedIn: true
      }));
      
      navigate('/home');
    } catch (err) {
      if (err.response?.status === 400 && err.response?.data?.message === 'Username is already taken') {
        setError('Username is already taken. Please choose another one.');
      } else {
        setError(err.response?.data?.message || 'Signup failed');
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
            className="bg-red-900/50 text-white p-3 rounded-md mb-4"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
          >
            {error}
          </motion.div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-white mb-2">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Choose a username"
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#FF7B00]"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-white mb-2">Email (optional)</label>
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
            <label className="block text-white mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Choose a password"
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#FF7B00]"
            />
            <p className="text-gray-400 text-sm mt-1">Must be at least 6 characters</p>
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-[#FF7B00] hover:bg-[#E06A00] text-white font-bold py-3 px-4 rounded-md transition-colors duration-300 flex justify-center"
          >
            {loading ? (
              <span className="animate-pulse">Creating your account...</span>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-gray-300">
            Already have an account?{" "}
            <Link to="/login" className="text-[#FF7B00] hover:text-white transition-colors">
              Log in
            </Link>
          </p>
          
          <Link to="/" className="block mt-4 text-gray-400 hover:text-white transition-colors">
            Return to landing page
          </Link>
        </div>
        
        <motion.img 
          src="/narubg.png" 
          alt="Anime character"
          className="absolute -bottom-20 -left-16 h-48 opacity-40 z-0"
          animate={{ 
            y: [0, 10, 0],
            rotate: [0, -5, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </div>
  );
};

export default Signup;