import React from 'react'
import ScrollingDivs from '../components/Scrollingdivs'
import { motion } from 'framer-motion';
import AnimatedKakashi from '../components/Animatedkakashi';
import AnimatedSection from '../components/Animateddiv';
import Animatedichigo from '../components/Animatedichigo';
import { Github, Instagram, Linkedin } from 'lucide-react';

export const Landing = () => {
  return (
    <div className="overflow-x-hidden">
    <div className='bg-[#171742] h-1000'>
        <img src="/Ellipse 2.png" className="w-full  h-50 backdrop-blur" alt="" />
        <motion.img 
  src="goku.png" 
  className='absolute z-0 hover:scale-105 hover:z-40 top-0 '
  alt=""
  initial={{ y: -200, opacity: 0 }}
  animate={{ y: [0, -20, 0], opacity: 1 }}
  transition={{
    duration: 1.5,            
    ease: "easeOut",
    opacity: { duration: 1.2 },
    y: {
      duration: 3,            
      ease: "easeInOut",
      repeat: Infinity,       
      repeatType: "mirror"
    }
  }}
/>



        <div className=' cursor-pointer text-[#FF7B00]  ml-350 fixed shadow-l flex gap-5  font-bold text-2xl top-5 z-10'>
        <h2 className="hover:scale-110 hover:text-white">login</h2>
        <h2 className="hover:scale-110 hover:text-white">Signup</h2>
        
        </div>
        <div className='pl-40'>
        <AnimatedSection/>
        
        <img src="image 1.png" className='ml-260 hover:scale-110 pt-25 animate' alt="" />

        <img src="Ellipse 4.png" className='absolute top-50 animate-pulse' alt="" />
        </div>
        <AnimatedKakashi/>

        <motion.img 
      src="ns.png" 
      className='h-60 mt-180 hover:scale-105 ml-[50%]'
      alt="naruto sasuke" 
      initial={{ x: -500, opacity: 0 }} 
 
      whileInView={{ x: 0, opacity: 1 }}
      transition={{duration:.5,ease:"easeInOut",delay:.1}}
    />
        <img src="Ellipse 4.png" className='absolute top-245 pl-60 animate-pulse' alt="" />

        <motion.img 
      src="stars.png" 
      className='absolute animate-pulse ml-300 top-230 ml-300 h-80 w-100'
      alt="stars" 
      initial={{ x: 200, opacity: 0 }} 
 
      whileInView={{ x: 0, opacity: 1 }}
      transition={{duration:1,ease:"easeInOut",delay:2}}
    />
        <div className="z-9 absolute flex-collumn h-180 top-250 hover:border-none ml-50 w-310 bg-black/40 text-white backdrop-blur-d  p-30 rounded-3xl shadow-lg border border-gray-200/20">
            <h1 className='text-5xl hover:scale-120 font-bold'>What is <span className='text-[#FF7B00]'>AniNick</span>?</h1>
            <h2 className='text-3xl font-light pt-15 hover:scale-105 '><span className='text-[#FF7B00]'>AniNick</span> is a fun community-driven platform where anime fans can discover, vote on, and share the weirdest nicknames found in anime series. From hilarious fan-made names to quirky character titles, we’ve got it all!</h2>
        </div>

        <img src="Ellipse 4.png" className='absolute top-420 right-300 ' alt="" />

        <div className='flex pt-220 text-white'>
            <Animatedichigo/>
            <div className="overflow-hidden w-full h-full absolute">

</div>
    <motion.img
      src="image 4.png"
      alt="gojo"
      className="top-450 hover:scale-105 absolute ml-280 hover:z-30 "
      animate={{ 
        y: [0, 70, 0],
        rotate: [0, 11, -14, 0] 
      }}
      transition={{
        duration: 3, 
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />


            <ScrollingDivs/>    
        <img src="Ellipse 4.png" className='absolute top-478  animate-pulse left-100' alt="" />
        </div>
        <div className='text-white'>
            <h1 className='font-bold text-8xl pt-40 ml-85 mt-20 '>Ready To <span className='text-[#FF7B00]'>Dive In</span>?</h1>
            <h2 className='font-light text-4xl z-10 pl-50 pt-20  animate-pulse'>Join <span className='text-[#FF7B00]'> AniNick </span>today and start discovering the weirdest anime nicknames!</h2>
           
            <motion.img 
  src="image 3.png" 
  className='animate-bounce ml-100 mt-25 brightness-75 saturate-200 h-140'
  alt=""
  
  
/>

        </div>

        <div >
        
        </div>

    <div className='h-70 bg-black/40 z-30'>
      <div className='text-white text-2xl flex gap-7 p-10 font-light '>
        <h1 className='hover:scale-105 cursor-pointer'>Home</h1>
        <h1 className='hover:scale-105 cursor-pointer'>About</h1>
        <h1 className='hover:scale-105 cursor-pointer'>Contact</h1>
        
      </div>
      <div className='pl-10 flex gap-5'>
      <a
      href="https://www.instagram.com/balaji_2k7"
      target="_blank"
      rel="noopener noreferrer"
      className="text-white hover:text-pink-600  transition-colors"
    >
      <Instagram size={32} />
    </a>

    <a
      href="https://www.linkedin.com/in/balaji-r-640349315/"
      target="_blank"
      rel="noopener noreferrer"
      className="text-white hover:text-blue-600 transition-colors"
    >
      <Linkedin size={32} />
    </a>
    <a
      href="https://www.github.com/balaji-r-2007"
      target="_blank"
      rel="noopener noreferrer"
      className="text-white hover:text-blue-900 transition-colors"
    >
      <Github size={32} />
    </a>
      </div>
     
      <img src="image 7.png" className='absolute ml-300 top-930 h-70' alt="" />
    </div>
    </div>
    </div>
  )
}
