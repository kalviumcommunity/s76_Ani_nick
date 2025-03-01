import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Rname = () => {
  const [nicknames, setNicknames] = useState([]);
  const [selectedNickname, setSelectedNickname] = useState(null);

  useEffect(() => {
    const fetchNicknames = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/nicknames");
        setNicknames(response.data);
      } catch (error) {
        console.error("Error fetching nicknames:", error);
      }
    };

    fetchNicknames();
  }, []);

  const generateNickname = () => {
    if (nicknames.length > 0) {
      const randomIndex = Math.floor(Math.random() * nicknames.length);
      setSelectedNickname(nicknames[randomIndex]);
    }
  };

  return (
    <div>
      <div className=' p-6'>
        
        
        {selectedNickname && (
          <div 
            key={selectedNickname._id} 
            className="bg-black/60  py-10 rounded-2xl text-white text-center flex-col shadow-lg p-6 hover:scale-105 hover:animate-pulse hover:shadow-2xl transition-shadow duration-300"
          >
            <h2 className="text-2xl font-bold text-center text-[#FF7B00] mb-2">{selectedNickname.nickname}</h2>
            <hr className="text-[#FF7B00]" />
            <p className="text-white py-3"><span className="font-bold">Character: </span>{selectedNickname.character}</p>
            <p className="py-3"><span className="font-bold">Anime: </span>{selectedNickname.anime}</p>
            <p className="py-3">{selectedNickname.description}</p>
          </div>
        )}
      </div>

      <button 
        onClick={generateNickname} 
        className=' cursor-pointer hover:scale-105 text-[white] bg-[#FF7B00] hover:text-[#FF7B00] font-bold rounded-sm ml-[35%] p-2 mt-4 h-[28%] w-[30%] hover:bg-white transition duration-300'
      >
        Generate
      </button>
    </div>
  );
};

export default Rname;
