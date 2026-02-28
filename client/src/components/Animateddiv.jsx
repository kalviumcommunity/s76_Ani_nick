import React from 'react';
import { motion } from 'framer-motion';

const AnimatedSection = () => {
  return (
    <motion.div 
      className="z-10 md:absolute md:ml-[1%] md:top-[35%] md:w-[65%] md:h-[90%] relative w-full hover:border-none hover:opacity-60 bg-black/40 text-white backdrop-blur p-6 md:p-[5%] rounded-3xl shadow-lg border border-gray-200/20"
      initial={{ scale: 0.9, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <motion.img 
        src="AniNick.png" 
        className='z-1 hover:scale-110 h-[20%]' 
        alt="" 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true }}
      />
      <motion.h2 
        className='text-white font-bold text-2xl sm:text-4xl md:text-5xl pt-[6%] md:pt-[10%] hover:scale-110'
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        Discover the <span className='text-[#FF7B00]'>Anime</span> Nicknames
      </motion.h2>
      <motion.h2 
        className='text-white text-base sm:text-xl md:text-3xl font-light hover:scale-110 pt-[6%] md:pt-[10%] flex'
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        Uncover the funniest and most unusual nicknames <br/> from your favorite anime characters. Vote, explore, <br /> and contribute your own!
      </motion.h2>
    </motion.div>
  );
}

export default AnimatedSection;
