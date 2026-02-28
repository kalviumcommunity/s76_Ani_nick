import React from 'react'
import ScrollingDivs from '../components/Scrollingdivs'
import { motion } from 'framer-motion';
import AnimatedKakashi from '../components/Animatedkakashi';
import AnimatedSection from '../components/Animateddiv';
import Animatedichigo from '../components/Animatedichigo';
import { Github, Instagram, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';
export const Landing = () => {
  return (
    <div className="overflow-x-hidden">
    <div className='bg-[#171742] flex-col h-[100%] overflow-x-hidden'>
        <img src="/Ellipse 2.png" draggable="false" className="w-full  h-50 backdrop-blur" alt="" />
        <motion.img 
  src="goku.png" 
  className='hidden sm:block absolute z-0 hover:scale-105 flex top-0 '
  alt=""
  draggable="false"
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



        <div className='cursor-pointer hover:scale-3d text-[#FF7B00] fixed p-3 sm:p-4 md:p-5 flex gap-2 sm:gap-4 md:gap-5 font-bold text-lg sm:text-xl md:text-2xl top-[4%] right-[5%] sm:right-[5%] md:right-[5%] z-30'>
          <Link to="/login">
            <h2 className="hover:scale-110 hover:text-white">Login</h2>
          </Link>
          <Link to="/signup">
            <h2 className="hover:scale-110 hover:text-white">Signup</h2>
          </Link>
        </div>
        
        <div className='px-4 md:p-[10%] flex flex-col md:flex-row min-h-[60vh] md:min-h-0 items-center md:items-start justify-center md:justify-start pt-16 md:pt-0'>
        <AnimatedSection/>
        
        <img src="image 1.png" loading="lazy" className='hidden md:block ml-[85%] hover:scale-110 pt-[4%] flex animate' alt="" />

        <img src="Ellipse 4.png" loading="lazy" className='hidden md:block absolute top-[25%] animate-pulse' alt="" />
        </div>
      <div className='hidden md:block h-[500px]'>

      </div>
        <div className='flex pt-[1%] gap-1 relative'>

        <AnimatedKakashi/>

        <motion.img 
      src="ns.png" 
      loading="lazy"
      className='hidden md:block h-60 w-120 flex-bottom mt-[31%] hover:scale-105 ml-[50%]'
      alt="naruto sasuke" 
      initial={{ x: -500, opacity: 0 }} 
 
      whileInView={{ x: 0, opacity: 1 }}
      transition={{duration:.5,ease:"easeInOut",delay:.1}}
    />
        <img src="Ellipse 4.png" loading="lazy" className='hidden md:block absolute  pl-[20%] animate-pulse' alt="" />

        <motion.img 
      src="stars.png" 
      loading="lazy"
      className='hidden md:block absolute animate-pulse ml-[80%]  h-80 w-100'
      alt="stars" 
      initial={{ x: 200, opacity: 0 }} 
      
      whileInView={{ x: 0, opacity: 1 }}
      transition={{duration:1,ease:"easeInOut",delay:2}}
      />
        <div className="z-9 relative md:absolute mx-4 md:mx-0 md:ml-[15%] flex flex-col p-6 md:p-[10%] md:h-[100%]  hover:border-none w-auto md:w-[75%] bg-black/40 text-white backdrop-blur-d  rounded-3xl shadow-lg border border-gray-200/20">
                  <h1 className='text-3xl sm:text-4xl md:text-5xl hover:scale-120 font-bold'>What is <span className='text-[#FF7B00]'>AniNick</span>?</h1>
                <h2 className='text-base sm:text-xl md:text-3xl font-light pt-6 md:pt-[10%]  hover:scale-105 '><span className='text-[#FF7B00]'>AniNick</span> is a fun community-driven platform where anime fans can discover, vote on, and share the weirdest nicknames found in anime series. From hilarious fan-made names to quirky character titles, we've got it all!</h2>
        </div>
      </div>

        <img src="Ellipse 4.png" loading="lazy" className='hidden md:block absolute  right-[80%]' alt="" />
       
<div className='flex'>

        <div className='flex pt-520 text-white'>
            <Animatedichigo/>
            <div className="overflow-hidden w-full h-full absolute">

</div>
    <motion.img
      src="image 4.png"
      loading="lazy"
      alt="gojo"
      className="hidden md:block top-600 hover:scale-105 absolute ml-[72%] hover:z-30 "
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
      </div>
        <img src="Ellipse 4.png" loading="lazy" className='hidden md:block absolute top-278  animate-pulse left-100' alt="" />
        </div>
        <div className='text-white flex flex-col items-center md:items-start mt-0'>
            <h1 className='font-bold text-4xl sm:text-6xl md:text-8xl pt-10 md:pt-40 px-4 md:ml-85 md:mt-20 text-center md:text-left'>Ready To <span className='text-[#FF7B00]'>Dive In</span>?</h1>
            <h2 className='font-light text-xl sm:text-2xl md:text-4xl z-10 px-6 md:pl-50 pt-6 md:pt-20 animate-pulse text-center md:text-left'>Join <span className='text-[#FF7B00]'> AniNick </span>today and start discovering the weirdest anime nicknames!</h2>
           
            <motion.img 
  src="image 3.png" 
  loading="lazy"
  className='mx-auto md:ml-[30%] mt-[6%] h-64 md:h-150'
  alt=""
/>

        </div>

        <div >
        
        </div>

    <div className='h-[100%] pb-[5%] pt-12 flex-col bg-white hover:bg-white/80 text-black  z-30'>
      <div className='pl-[5%] pt-[5%] flex gap-5'>
      <a
      href="https://www.instagram.com/balaji_2k7"
      target="_blank"
      rel="noopener noreferrer"
      className=" hover:text-pink-600  transition-colors"
    >
      <Instagram size={32} />
    </a>

    <a
      href="https://www.linkedin.com/in/balaji-r-640349315/"
      target="_blank"
      rel="noopener noreferrer"
      className=" hover:text-blue-600 transition-colors"
    >
      <Linkedin size={32} />
    </a>
    <a
      href="https://www.github.com/balaji-r-2007"
      target="_blank"
      rel="noopener noreferrer"
      className=" hover:text-blue-900 transition-colors"
    >
      <Github size={32} />
    </a>
      </div>
        <img src="image 7.png" loading="lazy" className='ml-auto md:ml-[70%] h-40 md:h-70' alt="" />
      <div className=' text-2xl flex gap-7 pl-[3%] font-lg '>
        <h1 className='hover:text-sky-500 cursor-pointer'>By:</h1>
        <h1 className='hover:scale-105 hover:text-sky-600 cursor-pointer'>Balaji R</h1>
        
      </div>
     
    </div>
    </div>
    </div>
  )
}
