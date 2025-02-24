// src/components/AnimatedKakashi.js
import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';


const Animatedichigo = () => {


  return (
    <motion.img 
      src="image 5.png" 
      className='absolute top-510 hover:scale-110 hover:z-30'
      alt="ichigo" 
      initial={{ x: -200, opacity: 0 }} 
      whileInView={{ x: 0, opacity: 1 }}
      transition={{duration:.5,ease:"easeInOut",delay:.1}}    />
  );
};

export default Animatedichigo;
