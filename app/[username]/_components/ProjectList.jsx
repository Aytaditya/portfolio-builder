"use client"

import React, { useEffect, useState } from 'react';
import { Link } from 'lucide-react';

const ProjectList = ({ projectInfo = [] }) => {

  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
    <h1 className='flex justify-center  mt-8 md:mt-1  mb-5 text-2xl font-bold md:text-3xl '>My Projects 🛠️</h1>
    <div className=' grid grid-cols-1 md:grid-cols-2 gap-7 '>
      {
        projectInfo.map((item, index) =>
          item.activeStatus && (
            <div key={index} className="border w-full h-auto shadow-sm rounded-lg p-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer">
              <div className='flex gap-2 items-center  '>
                <img src={item.logo} alt="logo" className='w-[40px] h-[40px] rounded-full' />
                <h2 className='font-semibold justify-between flex items-center  text-lg md:text-xl  tracking-tighter md:tracking-tight'>{item.name}</h2>
               
              </div>
              
              <h2 className='text-base-content/80 text-xs my-2'>{item.desc}</h2>

              <button className='btn btn-accent text-xs text-white btn-sm '>
                <a href={item.url}>
                  Live Link 🔗
                </a>
              </button>

              {/* <div className='flex justify-center items-center'>
              <img src={item.logo} alt="Image" className='h-[120px] w-[120px]' />
              </div> */}
              
              <div className='flex justify-end items-end'>
              <span className='md:badge md:badge-primary hidden justify-end mt-3 tracking-tighter '>{item.category} 🔧  </span>
              </div>
            </div>
          )
        )
      }

    </div>
    </>
  );
};

export default ProjectList;
