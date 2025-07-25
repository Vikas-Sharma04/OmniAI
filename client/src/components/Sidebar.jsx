import { useClerk, useUser} from '@clerk/clerk-react'
import { Eraser, FileText, Hash, House, Image, LogOut, Scissors, SquarePen, Users } from 'lucide-react';
import { NavLink } from 'react-router-dom';
const navItems = [
    {to: '/ai', label: 'Dashboard', Icon: House},
    {to: '/ai/write-article', label: 'Write Article', Icon: SquarePen},
    {to: '/ai/blog-titles', label: 'Blog Titles', Icon: Hash},
    {to: '/ai/review-resume', label: 'Resume Review', Icon: FileText},
]
const Sidebar = ({sidebar, setSidebar}) => {
    const {user} = useUser();
    const {signOut, openUserProfile} = useClerk();
  return (
    <div className={`w-60 bg-white border-r border-gray-200 flex flex-col justify-between
        items-center max-sm:absolute top-14 bottom-0 ${sidebar ? 'translate-x-0' : 'max-sm:translate-x-full'}
        transition-all duration-300 ease-in-out`}>
            <div className='my-7 w-full'>
                <img src={user.imageUrl} className='w-13 rounded-full mx-auto' alt="" />
                <h1 className='mt-1 text-center'>{user.fullName}</h1>
                <div className='px-6 mt-5 text-sm text-gray-600 font-medium'>
                    {navItems.map(({to, label, Icon})=>(
                        <NavLink key={to} to={to} end={to==='/ai'} onClick={setSidebar(false)} 
                        className={({isActive})=>`px-3.5 py-2.5 flex items-center gap-3 rounded
                         ${isActive ? 'bg-gradient-to-r from-[#3C81F6] to-[#9234EA] text-white' : ''}`}>

                            {({isActive})=>(
                                <>
                                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : ''}`}/>
                                {label}
                                </>
                            )}
                        </NavLink>
                    ))}
                </div>
            </div>

            <div className='w-full border-t border-gray-200 p-4 px-7 flex items-center justify-between'>
                <div className='flex items-center gap-3 cursor-pointer' onClick={openUserProfile}>
                    <img src={user.imageUrl} className='w-8 rounded-full' alt="" />
                    <div>
                        <h1 className='text-sm'>{user.fullName}</h1>
                    </div>
                </div>
                <LogOut onClick={signOut} className='w-4.5 text-gray-400 hover:text-gray-700 transition cursor-pointer'/>
            </div>
        </div>
  )
}

export default Sidebar