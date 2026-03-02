import React from 'react'
import Navbar from '../components/Navbar'
import Rname from '../components/Rname';
import { Github, Instagram, Linkedin } from 'lucide-react';

export const Home = () => {
  return (
    <div className="overflow-x-hidden bg-[#171742] min-h-screen">
      <Navbar />
      <img src="/Ellipse 2.png" className="w-full h-50 backdrop-blur pointer-events-none select-none" alt="" />

      <div className="relative px-4 md:px-10 lg:px-16 pt-20 md:pt-24 pb-12 z-10">
        <img src="Ellipse 4.png" loading="lazy" className='hidden md:block absolute right-[14%] top-20 opacity-45 animate-pulse pointer-events-none select-none' alt="" />

        <div className="grid grid-cols-1 xl:grid-cols-5 gap-6 items-start">
          <img
            src="sololev1.png"
            loading="lazy"
            className='hidden xl:block xl:col-span-1 h-140 2xl:h-170 object-contain hover:scale-105 transition-transform'
            alt=""
          />

          <div className="xl:col-span-3 text-white">
            <div className="text-center mb-6">
              <h1 className='text-[#FF7B00] text-4xl sm:text-5xl md:text-6xl font-bold'>Generate Your Anime Nickname</h1>
              <p className='text-gray-300 mt-3 text-sm sm:text-base max-w-2xl mx-auto'>
                Discover random community nicknames, get inspired, then submit your own legendary one.
              </p>
            </div>

            <Rname />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <div className="bg-black/50 border border-gray-700/40 rounded-xl p-4">
                <p className="text-[#FF7B00] font-bold text-lg">Community Driven</p>
                <p className="text-gray-300 text-sm mt-1">Every nickname is submitted and loved by anime fans like you.</p>
              </div>
              <div className="bg-black/50 border border-gray-700/40 rounded-xl p-4">
                <p className="text-[#FF7B00] font-bold text-lg">Instant Explore</p>
                <p className="text-gray-300 text-sm mt-1">Jump to explore, like, comment, and share your favorite picks.</p>
              </div>
              <div className="bg-black/50 border border-gray-700/40 rounded-xl p-4">
                <p className="text-[#FF7B00] font-bold text-lg">Smart Submit</p>
                <p className="text-gray-300 text-sm mt-1">Use anime and character suggestions to keep submissions accurate.</p>
              </div>
            </div>
          </div>

          <img
            src="sololev2.png"
            loading="lazy"
            className='hidden xl:block xl:col-span-1 h-140 2xl:h-170 object-contain hover:scale-105 transition-transform'
            alt=""
          />
        </div>
      </div>

      <div className='pb-8 pt-8 bg-black text-white z-30 border-t border-gray-800/60'>
        <div className='px-5 md:px-10 flex items-center justify-between flex-wrap gap-5'>
          <div className='flex gap-5'>
            <a
              href="https://www.instagram.com/balaji_2k7"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-600 transition-colors"
            >
              <Instagram size={28} />
            </a>

            <a
              href="https://www.linkedin.com/in/balaji-r-640349315/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 transition-colors"
            >
              <Linkedin size={28} />
            </a>
            <a
              href="https://www.github.com/balaji-r-2007"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-900 transition-colors"
            >
              <Github size={28} />
            </a>
          </div>

          <img src="image 7.png" loading="lazy" className='h-28 md:h-36' alt="" />
        </div>

        <div className='text-base md:text-xl flex gap-3 px-5 md:px-10 mt-4'>
          <h1 className='text-gray-400'>By:</h1>
          <h1 className='hover:scale-105 hover:text-sky-600 cursor-pointer'>Balaji R</h1>
        </div>
      </div>
    </div>
  )
}
