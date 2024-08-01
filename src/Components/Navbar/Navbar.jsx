import React from 'react'
import { Link } from 'react-router-dom'


const Navbar = () => {
  return (
    <div className=' bg-green-200 p-10 text-black justify-between h-[40px] flex items-center'>
        <h1 className='font-bold md:text-[26px] text-[20px]'>BIG MONEY APP</h1>
        <div className='flex gap-4'>
            <Link to="/login">
            <h3 className='text-18px'>Login</h3>
            </Link>
            <Link to="/register"> 
            <h3 className='text-[18px]'>Signup</h3></Link>
           
        </div>
    </div>
  )
}

export default Navbar