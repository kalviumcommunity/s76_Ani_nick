import React from 'react';
import GridComponent from '../components/Ncards';

import Navbar from '../components/Navbar';

export const Explore = () => {
  return (
    <div className='bg-[#171742] w-full min-h-screen relative overflow-hidden'>
      <Navbar />
      <img 
        src="narubg.png" 
        className='fixed top-[10%] ml-[30%]  opacity-80 h-180' 
        alt="Background Illustration" 
      />
      <div className='pt-20 relative z-20'>

          <GridComponent />
      </div>
    </div>
  );
}
