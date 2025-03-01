import React from "react";
import { Createc } from "../components/Create"; // Importing the fixed component
import Navbar from "../components/Navbar";

const Create = () => {
  return (
    <div className="bg-blue-950 h-screen relative">
      <Navbar />
      <img src="/Ellipse 2.png" className="w-full h-[25%] absolute z-0 top-0" alt="Background" />
      <div className="pt-32 p-20 z-30 text-center relative">
        <img src="/ryuk.png" alt="ryuk" className="h-150 ml-[75%] absolute" />
        <Createc />
      </div>
    </div>
  );
};

export default Create;
