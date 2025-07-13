import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import logo from '../assets/logo.png'
import {useUser, useClerk, UserButton } from '@clerk/clerk-react';

const Navbar = () => {
    const navigate = useNavigate()
    const {user} = useUser()
    const {openSignIn} = useClerk()

  return (
    <div className='fixed z-5 w-full backdrop-blur-2xl flex justify-between items-center py-3 px-4 sm:px-20 xl:px-32 cursor-pointer'>
        <img src={logo} alt="logo" className='w-auto h-16 sm:w-44 cursor-pointer' onClick={()=>navigate('/')}/>
        {
            user ? <UserButton/> :
            (<button onClick={openSignIn} className='flex items-center gap-2 text-white rounded-full text-sm
        cursor-pointer bg-primary px-10 py-2.5'>Get Started <ArrowRight className='w-4 h-4'/> </button>)
        }
        
    </div>
  )
}

export default Navbar