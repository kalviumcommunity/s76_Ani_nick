import React from "react";
import { Createc } from "../components/Create"; 
import Navbar from "../components/Navbar";
import { motion } from 'framer-motion';
const Create = () => {
  return (
    <div className="bg-blue-950 h-screen relative">
      <Navbar />
      <img src="/Ellipse 2.png" className="w-full h-[25%] absolute z-0 top-0" alt="Background" />
      <div className="pt-32 p-20 z-30 text-center relative">
        <motion.img 
  src="/ryuk.png" 
 className="h-150  ml-[75%] absolute"
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
