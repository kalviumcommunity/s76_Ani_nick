import React from 'react'
import Navbar from '../components/Navbar'
import Rname from '../components/Rname';
import { Github, Instagram, Linkedin } from 'lucide-react';

export const Home = () => {
  return (
   
        <div className="overflow-x-hidden">
    <div className='bg-[#171742] flex-col  h-[100%] overflow-x-hidden'>
      <Navbar/>
        <img src="/Ellipse 2.png" className="w-full  h-50 backdrop-blur" alt="" />

    <div className='flex flex-col md:flex-row justify-between items-center md:items-start'>

    <img src="sololev1.png" loading="lazy" className='hidden md:block h-150 md:h-200 hover:scale-110 hover:animate-pulse' alt="" />
    <div className='text-white flex-1 flex flex-col items-center md:items-start pt-8 md:pt-0'>
      <h1 className='text-[#FF7B00] text-4xl sm:text-5xl md:text-7xl p-5 font-bold hover:scale-110 text-center md:text-left'>Get a Nickname</h1>
      <Rname/>
    <img src="Ellipse 4.png" loading="lazy" className='hidden md:block absolute right-[18%] opacity-45 animate-pulse' alt="" />
    </div>
    <img src="sololev2.png" loading="lazy" className='hidden md:block h-150 md:h-200 hover:scale-110' alt="" />

    </div>
    <div className='h-[100%] pb-[5%] pt-12 flex-col bg-black hover:bg-white/80 text-white hover:text-black  z-30'>
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
