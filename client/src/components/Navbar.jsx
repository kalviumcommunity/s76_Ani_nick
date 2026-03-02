import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/client';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [allNicknames, setAllNicknames] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNicknames = async () => {
      try {
        const response = await api.get('/nicknames');
        setAllNicknames(response.data);
      } catch (error) {
        console.error('Error fetching nicknames for search:', error);
      }
    };
    fetchNicknames();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (value.trim() === '') {
      setSuggestions([]);
    } else {
      setSuggestions(
        allNicknames.filter((item) =>
          item.nickname.toLowerCase().includes(value.toLowerCase())
        )
      );
    }
  };

  const handleSelect = (item) => {
    setSearchQuery(item.nickname);
    setSuggestions([]);
    navigate(`/nickname/${item._id}`);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className='px-3 md:px-5 justify-between bg-black/60 backdrop-blur-md fixed z-50 text-white flex items-center h-14 md:h-20 w-full border-b border-gray-700/40'>
      <Link to='/home'>
        <img src="/AniNick.png" alt="logo" className='h-[16px] md:h-[20px] hover:scale-110 transition-transform w-[72px] md:w-[90px]' />
      </Link>

      <input
        type="search"
        placeholder="Search nicknames..."
        value={searchQuery}
        onChange={handleSearch}
        className="hidden md:block p-2 rounded-lg bg-gray-800/80 border border-gray-700 text-white w-[220px] lg:w-[320px] focus:outline-none focus:ring-2 focus:ring-[#FF7B00]/70"
      />

      {/* Suggestions Dropdown */}
      {suggestions.length > 0 && (
        <ul className="absolute top-14 md:top-16 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-auto bg-black/90 text-left w-[280px] md:w-[320px] rounded-lg shadow-lg text-white z-50 border border-gray-700/50">
          {suggestions.map((item) => (
            <li
              key={item._id}
              onClick={() => handleSelect(item)}
              className="p-2.5 cursor-pointer hover:bg-gray-700/70"
            >
              <p className="text-[#FF7B00] font-semibold">{item.nickname}</p>
              <p className="text-xs text-gray-400">{item.character} · {item.anime}</p>
            </li>
          ))}
        </ul>
      )}

      <div className='flex gap-3 md:gap-8 items-center'>
        <Link to='/home'>
          <div className='font-medium text-base md:text-xl hover:text-white text-[#FF7B00] cursor-pointer hover:scale-110 transition-transform'>
            Home
          </div>
        </Link>
        <Link to='/explore'>
          <div className='font-medium text-base md:text-xl hover:text-white text-[#FF7B00] cursor-pointer hover:scale-110 transition-transform'>
            Explore
          </div>
        </Link>
        <Link to='/create'>
          <div className='font-medium text-base md:text-xl hover:text-white text-[#FF7B00] cursor-pointer hover:scale-110 transition-transform hidden sm:block'>
            Submit
          </div>
          <div className='font-medium text-base md:text-xl hover:text-white text-[#FF7B00] cursor-pointer hover:scale-110 transition-transform sm:hidden'>
            +
          </div>
        </Link>

        {currentUser && (
          <Link to='/profile'>
            <div className='font-medium text-base md:text-xl hover:text-white text-[#FF7B00] cursor-pointer hover:scale-110 transition-transform'>
              {currentUser.photoURL ? (
                <img src={currentUser.photoURL} alt="avatar" className="w-8 h-8 rounded-full border-2 border-[#FF7B00] object-cover" />
              ) : (
                <div className="w-8 h-8 rounded-full border-2 border-[#FF7B00] bg-[#FF7B00]/20 flex items-center justify-center">
                  <span className="text-[#FF7B00] text-sm font-bold">
                    {(currentUser.displayName || currentUser.email || '?').charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
            </div>
          </Link>
        )}

        {currentUser && (
          <button
            type="button"
            onClick={handleLogout}
            className='font-medium text-base md:text-xl hover:text-white text-[#FF7B00] cursor-pointer hover:scale-110 transition-transform'
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;