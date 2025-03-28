import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

const AnimatedKakashi = () => {

  return (
    <motion.img 
      src="kakashi.png" 
      className='h-[100%]  ml-[1%] w-[15%] hover:scale-105 z-10 absolute'
      alt="Kakashi" 
      initial={{ x: -200, opacity: 0 }} 
 
      whileInView={{ x: 0, opacity: 1 }}
      transition={{duration:.5,ease:"easeInOut",delay:.1}}
    />
  );
};

export default AnimatedKakashi;
