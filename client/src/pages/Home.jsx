import React from 'react'
import Navbar from '../components/Navbar'
import Rname from '../components/Rname';
import { Github, Instagram, Linkedin } from 'lucide-react';

export const Home = () => {
  return (
   
        <div className="overflow-x-hidden">
    <div className='bg-[#171742] flex-col  h-[100%]'>
      <Navbar/>
        <img src="/Ellipse 2.png" className="w-full  h-50 backdrop-blur" alt="" />

    <div className='flex justify-between'>

    <img src="sololev1.png" className='h-200 hover:scale-110 hover:animate-pulse' alt="" />
    <div className='text-white'>
      <h1 className='text-[#FF7B00] text-7xl font-bold hover:scale-110'>Get a Nicknames</h1>
      <Rname/>
    <img src="Ellipse 4.png" className='absolute right-[18%] opacity-45 animate-pulse' alt="" />
    </div>
    <img src="sololev2.png" className='h-200 hover:scale-110' alt="" />

    </div>
    <div className='h-[100%] pb-[5%] pt-[2%] flex-col bg-black hover:bg-white/80 text-white hover:text-black  z-30'>
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
