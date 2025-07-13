import { useNavigate } from 'react-router-dom'
import gradientBackground from '../assets/gradientBackground.png'

const Hero = () => {
  const navigate = useNavigate()
  return (
    <div className='px-4 sm:px-20 xl:px-32 relative inline-flex flex-col w-full justify-center bg-cover bg-no-repeat min-h-screen'
     style={{ backgroundImage: `url(${gradientBackground})` }}>
      <div className='text-center mb-6'>
        <h1 className='text-3xl sm:text-5xl md:text-6xl 2xl:text-7xl font-semibold mx-auto leading-[1.2]'>Create amazing content <br /> with
         <span className='text-primary'> AI tools</span></h1>
        <p className='mt-4 max-w-x5 sm:max-w-lg 2xl:max-w-xl m-auto max-sm:text-xs text-gray-600'>Transform your content creation with our suite of AI tools. Write articles, review resume and enhance your workflow.</p>
      </div>

      <div className='flex flex-wrap justify-center gap-4 text-sm max-sm:text-xs'>
        <button onClick={()=>navigate('/ai')} className='bg-primary text-white px-10 py-3 rounded-lg hover:scale-102 active:scale-95
         transition cursor-pointer'>Start Creating now</button>
      </div>

    </div>
    
  )
}

export default Hero