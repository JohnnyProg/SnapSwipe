import React from 'react'

const Loader = () => {
  return (
    <div className='flex-center w-full'>
        <img src={`${import.meta.env.BASE_URL}/assets/icons/loader.svg`} width={24} height={24}/>
    </div>
  )
}

export default Loader