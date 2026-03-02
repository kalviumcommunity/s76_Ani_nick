import React, { useState } from 'react';
import GridComponent from '../components/Ncards';
import Navbar from '../components/Navbar';

export const Explore = () => {
  const [mobileSearch, setMobileSearch] = useState('');

  return (
    <div className='bg-[#171742] w-full min-h-screen relative overflow-hidden'>
      <Navbar />
      <img
        src="narubg.webp"
        alt=""
        loading="eager"
        decoding="async"
        fetchPriority="high"
        className='fixed bottom-0 left-1/2 -translate-x-1/2 opacity-60 h-180 z-0 pointer-events-none select-none'
      />

      <div className="pt-16 md:pt-24 px-4 md:px-6 relative z-20">
        <div className="bg-black/45 border border-gray-700/40 rounded-xl p-4 md:p-5 mb-4">
          <h1 className="text-[#FF7B00] text-2xl md:text-3xl font-bold">Explore Nicknames</h1>
          <p className="text-gray-300 text-sm md:text-base mt-1">Browse, like, comment, and share anime nickname ideas from the community.</p>
        </div>
      </div>

      {/* Mobile search bar — hidden on md+ where Navbar shows it */}
      <div className="md:hidden px-4 pb-2 relative z-20">
        <input
          type="search"
          placeholder="Search nicknames..."
          value={mobileSearch}
          onChange={(e) => setMobileSearch(e.target.value)}
          className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#FF7B00]"
        />
      </div>

      <div className='pt-2 relative z-20'>
        <GridComponent searchQuery={mobileSearch} />
      </div>
    </div>
  );
}
