import React from 'react'
import { Explore } from '../pages/Explore';
import { Link } from 'react-router-dom';
import { useState,useEffect } from 'react';
import axios from 'axios';
const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [allNicknames, setAllNicknames] = useState([]);

  useEffect(() => {
    // Fetch all nicknames once and store them
    const fetchNicknames = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/nicknames");
        setAllNicknames(response.data);
      } catch (error) {
        console.error("Error fetching nicknames:", error);
      }
    };

    fetchNicknames();
  }, []);

  // Handle search input
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    // Filter nicknames based on search query
    if (value.trim() === "") {
      setSuggestions([]);
    } else {
      const filtered = allNicknames.filter((item) =>
        item.nickname.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
    }
  };

  // When a suggestion is clicked
  const handleSelect = (nickname) => {
    setSearchQuery(nickname);
    setSuggestions([]); // Hide suggestions
    onSelect(nickname); // Send selected nickname to parent
  };

  return (
    <div className='p-5 justify-between bg-black/40 fixed z-50 text-white  flex h-20 w-[100%] '>
      <Link to='/home'>
      <img src="/AniNick.png" alt="logo" className='h-[20px] hover:scale-110 w-[90px]' />
      </Link>
      
      <input
        type="search"
        placeholder="Search nicknames..."
        value={searchQuery}
        onChange={handleSearch}
        className="p-2 rounded bg-gray-800 text-white w-[300px]"
      />

      {/* Suggestions Dropdown */}
      {suggestions.length > 0 && (
        <ul className="absolute top-16 bg-black/60 text-center w-[300px] ml-121 mt-5 rounded-lg shadow-lg text-white">
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
      <div className='flex gap-10 '>
<Link to='/explore'>
<div  className='h-10 w-35  text-center pt-1 font-medium text-2xl  hover:text-white text-[#FF7B00] cursor-pointer hover:scale-110'>
  Explore
</div>
</Link>
<Link to='/create'>
<div className='h-10 w-45  rounded-sm text-center pt-1 font-medium text-2xl hover:text-white text-[#FF7B00] cursor-pointer hover:scale-110 '>
  Submit your's
</div>
</Link>
</div>
      
    </div>
  )
}

export default Navbar;