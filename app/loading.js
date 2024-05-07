import React from 'react'
import 'ldrs/dotPulse'

const loading = () => {
  return (
    // Default values shown 
    <div className='w-[98vw] sm:h-[66vh] h-[56.6vh] flex items-center justify-center'>
      <l-dot-pulse
        size="50"
        speed="1.2"
        color="(61, 190, 255)"
      ></l-dot-pulse>
    </div>
  )
}

export default loading
