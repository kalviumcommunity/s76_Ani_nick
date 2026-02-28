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

  const handleSelect = (nickname) => {
    setSearchQuery(nickname);
    setSuggestions([]);
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
    <div className='px-3 md:px-5 justify-between bg-black/40 fixed z-50 text-white flex items-center h-14 md:h-20 w-full'>
      <Link to='/home'>
        <img src="/AniNick.png" alt="logo" className='h-[16px] md:h-[20px] hover:scale-110 w-[72px] md:w-[90px]' />
      </Link>

      <input
        type="search"
        placeholder="Search nicknames..."
        value={searchQuery}
        onChange={handleSearch}
        className="hidden md:block p-2 rounded bg-gray-800 text-white w-[200px] lg:w-[300px]"
      />

      {/* Suggestions Dropdown */}
      {suggestions.length > 0 && (
        <ul className="absolute top-14 md:top-16 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-auto bg-black/60 text-center w-[280px] md:w-[300px] rounded-lg shadow-lg text-white z-50">
          {suggestions.map((item) => (
            <li
              key={item._id}
              onClick={() => handleSelect(item.nickname)}
              className="p-2 cursor-pointer hover:bg-gray-700"
            >
              {item.nickname}
            </li>
          ))}
        </ul>
      )}

      <div className='flex gap-3 md:gap-8 items-center'>
        <Link to='/explore'>
          <div className='font-medium text-base md:text-2xl hover:text-white text-[#FF7B00] cursor-pointer hover:scale-110'>
            Explore
          </div>
        </Link>
        <Link to='/create'>
          <div className='font-medium text-base md:text-2xl hover:text-white text-[#FF7B00] cursor-pointer hover:scale-110 hidden sm:block'>
            Submit
          </div>
          <div className='font-medium text-base md:text-2xl hover:text-white text-[#FF7B00] cursor-pointer hover:scale-110 sm:hidden'>
            +
          </div>
        </Link>

        {currentUser && (
          <div
            onClick={handleLogout}
            className='font-medium text-base md:text-2xl hover:text-white text-[#FF7B00] cursor-pointer hover:scale-110'
          >
            Logout
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;