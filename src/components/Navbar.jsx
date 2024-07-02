import React from 'react'

const Navbar = () => {
  return (
    <nav className="flex justify-between bg-violet-500 text-white py-4">
        <div>
            <span className='mx-8'>iTask</span>
        </div>
        <ul className="flex gap-8 mx-8">
            <li className="hover:font-bold transtion:all">Home</li>
            <li className="hover:font-bold transtion:all">About us</li>
        </ul>
    </nav>
  )
}

export default Navbar
