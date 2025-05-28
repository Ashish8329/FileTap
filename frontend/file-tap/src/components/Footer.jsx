import React from 'react'

const Footer = () => {
  return (
    <div className='bottom-0 grid place-content-center bg-amber-500 shadow h-14 '>
      © {new Date().getFullYear()} All rights reserved.
    </div>
  )
}

export default Footer
