import React from 'react'
import { Createc } from '../components/Create';
import Navbar from '../components/Navbar';
const Create = () => {
  return (
    <div className='bg-blue-950  h-screen'>
      <Navbar/>
      <img src="Ellipse 2.png" className='w-[100%] h-[25%] absolute' alt="" />
      <div className='pt-30  p-20 z-30 text-center'>
        <img src="ryuk.png" alt="ryuk" className='h-150 ml-[75%]  absolute' />

      
        <Createc/>
      </div>
    </div>
  )
}

export default Create;