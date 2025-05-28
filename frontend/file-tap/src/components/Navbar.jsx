import React from 'react'


const Navbar = () => {
  return (
    <div className="flex items-center justify-between bg-amber-400 h-14 px-4 shadow">

      <a href="/">
        <div className="text-gray-700 font-medium capitalize border-1">
          file-tap
        </div>
      </a>

      <div className="text-gray-800 font-bold capitalize text-lg text-center flex-1">
        this is navbar
      </div>
    </div>

  )
}


export default Navbar
