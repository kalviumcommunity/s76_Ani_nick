import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
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
    
    setLoading(true);
    try {
      // Using the updated login endpoint that handles authentication with MongoDB
      const response = await axios.post('https://s76-ani-nick-1.onrender.com/api/login', {
        username: formData.username,
        password: formData.password
      });
      
      // Store user info in localStorage (don't store password)
      localStorage.setItem('user', JSON.stringify({
        username: response.data.username,
        isLoggedIn: true
      }));
      
      navigate('/home');
    } catch (err) {
      if (err.response?.status === 401) {
        setError('Invalid username or password');
      } else {
        setError(err.response?.data?.message || 'Login failed');
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
              placeholder="Enter your username"
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
              placeholder="Enter your password"
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#FF7B00]"
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-[#FF7B00] hover:bg-[#E06A00] text-white font-bold py-3 px-4 rounded-md transition-colors duration-300 flex justify-center"
          >
            {loading ? (
              <span className="animate-pulse">Logging in...</span>
            ) : (
              "Login"
            )}
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-gray-300">
            Don't have an account?{" "}
            <Link to="/signup" className="text-[#FF7B00] hover:text-white transition-colors">
              Sign up
            </Link>
          </p>
          
          <Link to="/" className="block mt-4 text-gray-400 hover:text-white transition-colors">
            Return to landing page
          </Link>
        </div>
        
        <motion.img 
          src="/image 5.png" 
          alt="Anime character"
          className="absolute -bottom-16 -right-16 h-40 opacity-40 z-0"
          animate={{ 
            y: [0, 10, 0],
            rotate: [0, 5, 0]
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

export default Login;