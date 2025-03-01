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
    <div className='bg-[#171742] flex-col  h-[100%]'>
        <img src="/Ellipse 2.png" className="w-full  h-50 backdrop-blur" alt="" />
        <motion.img 
  src="goku.png" 
  className='absolute z-0 hover:scale-105 flex hover:z-40 top-0 '
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



        <div className=' cursor-pointer hover:scale-3d text-[#FF7B00]  ml-[85%] mr-[20%] fixed shadow-5 flex gap-5  font-bold text-2xl top-[4%] z-10'>
        <h2 className="hover:scale-110 hover:text-white">login</h2>
        <h2 className="hover:scale-110 hover:text-white">Signup</h2>
        
        </div>
        
        <div className='p-[10%] flex'>
        <AnimatedSection/>
        
        <img src="image 1.png" className='ml-[85%] hover:scale-110 pt-[4%] flex animate' alt="" />

        <img src="Ellipse 4.png" className='absolute top-[25%] animate-pulse' alt="" />
        </div>

        <div className='flex pt-[1%] gap-1'>

        <AnimatedKakashi/>

        <motion.img 
      src="ns.png" 
      className='h-60 w-120 flex-bottom mt-[31%] hover:scale-105 ml-[50%]'
      alt="naruto sasuke" 
      initial={{ x: -500, opacity: 0 }} 
 
      whileInView={{ x: 0, opacity: 1 }}
      transition={{duration:.5,ease:"easeInOut",delay:.1}}
    />
        <img src="Ellipse 4.png" className='absolute  pl-[20%] animate-pulse' alt="" />

        <motion.img 
      src="stars.png" 
      className='absolute animate-pulse ml-[80%]  h-80 w-100'
      alt="stars" 
      initial={{ x: 200, opacity: 0 }} 
      
      whileInView={{ x: 0, opacity: 1 }}
      transition={{duration:1,ease:"easeInOut",delay:2}}
      />
        <div className="z-9 absolute ml-[15%] flex-collumn p-[10%] h-[100%]  hover:border-none w-[75%] bg-black/40 text-white backdrop-blur-d  rounded-3xl shadow-lg border border-gray-200/20">
            <h1 className='text-5xl hover:scale-120 font-bold'>What is <span className='text-[#FF7B00]'>AniNick</span>?</h1>
            <h2 className='text-3xl font-light pt-[10%]  hover:scale-105 '><span className='text-[#FF7B00]'>AniNick</span> is a fun community-driven platform where anime fans can discover, vote on, and share the weirdest nicknames found in anime series. From hilarious fan-made names to quirky character titles, we’ve got it all!</h2>
        </div>
      </div>

        <img src="Ellipse 4.png" className='absolute  right-[80%]' alt="" />
<div className='flex'>

        <div className='flex pt-220 text-white'>
            <Animatedichigo/>
            <div className="overflow-hidden w-full h-full absolute">

</div>
    <motion.img
      src="image 4.png"
      alt="gojo"
      className="top-450 hover:scale-105 absolute ml-[70%] hover:z-30 "
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
        <img src="Ellipse 4.png" className='absolute top-478  animate-pulse left-100' alt="" />
        </div>
        <div className='text-white flex-col mt-[10%]'>
            <h1 className='font-bold text-8xl pt-40 ml-85 mt-20 '>Ready To <span className='text-[#FF7B00]'>Dive In</span>?</h1>
            <h2 className='font-light text-4xl z-10 pl-50 pt-20  animate-pulse'>Join <span className='text-[#FF7B00]'> AniNick </span>today and start discovering the weirdest anime nicknames!</h2>
           
            <motion.img 
  src="image 3.png" 
  className='animate-bounce ml-[30%] mt-[6%] h-150'
  alt=""
  
  
/>

        </div>

        <div >
        
        </div>

    <div className='h-[100%] pb-[5%] pt-[2%] flex-col bg-white hover:bg-white/80 text-black  z-30'>
      <div className='pl-[5%] pt-[5%] absolute flex gap-5'>
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
        <img src="image 7.png" className='ml-[70%]  h-70' alt="" />
      <div className=' text-2xl flex gap-7 pl-[3%] font-lg '>
        <h1 className='hover:text-sky-500 cursor-pointer'>By:</h1>
        <h1 className='hover:scale-105 hover:text-sky-600 cursor-pointer'>Balaji R</h1>
        
      </div>
     
    </div>
    </div>
    </div>
  )
}
