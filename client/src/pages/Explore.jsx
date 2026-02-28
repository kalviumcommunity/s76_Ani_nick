import React from 'react';
import GridComponent from '../components/Ncards';
import Navbar from '../components/Navbar';

export const Explore = () => {
  return (
    <div className='bg-[#171742] w-full min-h-screen relative overflow-hidden'>
      <Navbar />
      <img
        src="narubg.png"
        alt=""
        loading="lazy"
        className='fixed bottom-0 left-1/2 -translate-x-1/2 opacity-80 h-180 z-0 pointer-events-none'
      />
      <div className='pt-20 relative z-20'>
        <GridComponent />
      </div>
    </div>
  );
}
