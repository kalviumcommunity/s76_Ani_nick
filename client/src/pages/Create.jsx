import React from "react";
import { Createc } from "../components/Create"; 
import Navbar from "../components/Navbar";
import { motion } from 'framer-motion';

const Create = () => {
  return (
    <div className="bg-[#171742] min-h-screen relative overflow-x-hidden">
      <Navbar />
      <img src="/Ellipse 2.png" className="w-full h-[25%] absolute z-0 top-0" alt="Background" />
      <div className="pt-20 md:pt-28 px-4 md:px-12 pb-10 z-30 relative max-w-7xl mx-auto">
        <motion.img 
          src="/ryuk.png" 
          loading="lazy"
          className="hidden xl:block h-120 2xl:h-150 right-0 top-28 absolute pointer-events-none"
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
        <Createc />
      </div>
    </div>
  );
};

export default Create;
