import React from 'react'

const Footer = () => {
  return (
    <footer className='bg-primary text-secondary text-center min-w-full p-6'>
        <p>&copy; {new Date().getFullYear()} Easy Book. All rights reserved </p>
    </footer>
  )
}

export default Footer