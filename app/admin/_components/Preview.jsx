import React from 'react'

const Preview = () => {
  return (
    <div className='p-7 md:fixed'>
      <div className='border-[13px] min-w-[340px] w-full max-h-[590px] max-w-[370px] border-black h-screen rounded-[40px] m-2 shadow-md shadow-blue-300'>
        <iframe title='Profile' src={process.env.NEXT_PUBLIC_BASE_URL+"adi"} width="100%" height="100%" className='rounded-[25px]' />
      </div>
    </div>
  )
}

export default Preview
