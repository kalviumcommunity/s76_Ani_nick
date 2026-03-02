import React, { useState, useEffect } from 'react';
import api from '../api/client';

const Rname = () => {
  const [nicknames, setNicknames] = useState([]);
  const [selectedNickname, setSelectedNickname] = useState(null);

  useEffect(() => {
    const fetchNicknames = async () => {
      try {
        const response = await api.get('/nicknames');
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
    <div className="relative z-20">
      <div className='p-4 md:p-6'>
        {selectedNickname ? (
          <div
            key={selectedNickname._id}
            className="bg-black/60 rounded-2xl text-white text-center shadow-xl border border-gray-700/30 p-5 md:p-6 transition-all duration-300"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-center text-[#FF7B00] mb-2 break-words">{selectedNickname.nickname}</h2>
            <hr className="border-[#FF7B00]/40" />
            <p className="text-white py-2"><span className="font-bold text-gray-300">Character: </span>{selectedNickname.character}</p>
            <p className="py-2"><span className="font-bold text-gray-300">Anime: </span>{selectedNickname.anime}</p>
            <p className="py-2 text-gray-300 leading-relaxed">{selectedNickname.description}</p>
          </div>
        ) : (
          <div className="bg-black/40 border border-gray-700/30 rounded-2xl text-gray-400 text-center py-12">
            Click generate to reveal a random anime nickname.
          </div>
        )}
      </div>

      <div className="flex justify-center relative z-30">
        <button
          type="button"
          onClick={generateNickname}
          className='cursor-pointer hover:scale-105 text-white bg-[#FF7B00] font-bold rounded-md px-8 py-2.5 hover:bg-[#d66a00] transition duration-300'
        >
          Generate Random Nickname
        </button>
      </div>
    </div>
  );
};

export default Rname;
