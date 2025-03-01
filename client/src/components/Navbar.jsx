import React from 'react'
import { Explore } from '../pages/Explore';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='p-5 justify-between bg-black/40 fixed z-10 text-white  flex h-20 w-[100%] '>
      <Link to='/home'>
      <img src="AniNick.png" alt="logo" className='h-[20px] hover:scale-110 w-[90px]' />
      </Link>
      <input type="search" placeholder='  Search nicknames' className='h-10 w-70 rounded-xl hover:scale-105 hover:border-2 bg-white/30  cursor-text  border' />
  
      <div className='flex gap-10 '>
<Link to='/explore'>
<div  className='h-10 w-35  text-center pt-1 font-medium text-2xl  hover:text-white text-[#FF7B00] cursor-pointer hover:scale-110'>
  Explore
</div>
</Link>
<div className='h-10 w-45  rounded-sm text-center pt-1 font-medium text-2xl hover:text-white text-[#FF7B00] cursor-pointer hover:scale-110 '>
  Submit your's
</div>
</div>
      
    </div>
  )
}

export default Navbar;