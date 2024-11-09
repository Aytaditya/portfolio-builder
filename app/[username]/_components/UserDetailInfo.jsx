import { MapPin, Globe } from 'lucide-react'
import React from 'react'


const UserDetailInfo = ({ userDetail }) => {
  return (
    <div className='flex flex-col md:justify-center md:h-screen'>
      <div className='w-full flex items-center justify-between'>
        <div className='flex md:flex-col items-center md:items-start gap-3'>
          <img src={userDetail.profileImage} alt='avatar' className='rounded-full h-20 w-20 md:w-[130px] md:h-[130px] border-[3px] border-red-500 ' />

          <div className='flex flex-col gap-4 mt-3'>
            <h2 className='font-bold text-lg md:text-3xl'>{userDetail.name}</h2>
            <h2 className='flex gap-1 items-center font-mono'>
              <MapPin size={33} />
              {userDetail.location}
            </h2>
          </div>
        </div>


      </div>
      {/* div to show bio */}
      <h2 className='mt-2 md:mt-7 ml-2 mb-2 md:text-xl '>
        {userDetail.bio}
      </h2>

      <div className='flex gap-2 mt-1'>
        <input type="text" placeholder="Enter your Email" className="input input-bordered w-full max-w-xs" />
        <button className='btn btn-secondary'>Lets Connect</button>
      </div>

      <div className='flex'>
        <button className='mt-4 ml-3 btn btn-primary btn-sm font-bold flex'>
          <a href={userDetail.link} target='_blank' className='flex justify-center items-center'>
            Follow My Socials <span className='inline-block ml-2'><Globe /></span>
          </a>
        </button>
      </div>
    </div>
  )
}

export default UserDetailInfo
