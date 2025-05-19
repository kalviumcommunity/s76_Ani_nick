import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const messages = [
  {
    heading: "Discover Hilarious Nicknames:",
    content: "Explore a vast collection of weird and funny anime nicknames."
  },
  {
    heading: "Vote on Your Favorites:",
    content: "Decide which nicknames are the funniest or the weirdest."
  },
  {
    heading: "Submit Your Own:",
    content: "Got a nickname that’s too good not to share? Submit it and see how others react!"
  },
  {
    heading: "Learn Character Details:",
    content: "Find out which characters and anime the nicknames come from."
  },
  {
    heading: "Random Nickname Generator:",
    content: "Get surprised by a random nickname with every click!"
  }
];

const ScrollingDivs = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % messages.length);
      }, 3000); // Change every 3 seconds
      return () => clearInterval(interval);
    }
  }, [isPaused]);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % messages.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + messages.length) % messages.length);
  };

  return (
    <div 
      className='z-20 p-[5%]  absolute flex flex-col hover:border-none cursor-pointer hover:scale-105 items-center justify-center h-[100%] gap-2 w-[50%] top-700  left-[55%] transform -translate-x-1/2 bg-black/60 text-white backdrop-blur-m  rounded-3xl shadow-2xl border border-gray-200/20 overflow-hidden'
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <h1 className='text-6xl font-bold mb-6 text-center hover:scale-105'>
        Why You’ll <span className='text-[#FF0000]'>Love</span> AniNick
      </h1>
      <div className="relative w-full h-[250px] flex justify-center items-center text-center">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`absolute hover:scale-110 transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
          >
            <h2 className='font-bold text-[#FF7B00] text-4xl mb-2'>{msg.heading}</h2>
            <p className='text-2xl font-light'>{msg.content}</p>
          </div>
        ))}
      </div>
      

      <button 
        onClick={goToPrev} 
        className="absolute left-5 top-1/2 cursor-pointer transform -translate-y-1/2 text-white bg-black/50 hover:bg-black/70 p-3 rounded-full"
      >
        <ChevronLeft size={30} />
      </button>
      <button 
        onClick={goToNext} 
        className="absolute right-5 top-1/2 cursor-pointer transform -translate-y-1/2 text-white bg-black/50 hover:bg-black/70 p-3 rounded-full"
      >
        <ChevronRight size={30} />
      </button>
    </div>
  );
};

export default ScrollingDivs;
