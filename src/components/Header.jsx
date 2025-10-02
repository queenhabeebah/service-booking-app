import React from 'react'

const Header = () => {
  return (
    <header className='relative min-w-full container p-6 shadow-xl bg-primary-dark text-secondary'>
        <nav className='flex items-center justify-between'>
            <span className='font-extrabold tracking-tight'>EasyBook</span>
            <div className='gap-4 md:flex'>
                <a href="">Services</a>
                <a href="">My Bookings</a>
                <a href="" className='bg-secondary text-black rounded-xl py-2 px-3 font-bold'>Get Started</a>
            </div>
        </nav>

    </header>
  )
}

export default Header