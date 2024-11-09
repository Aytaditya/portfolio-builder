"use client"

import React, { useEffect, useState } from 'react';

const ProjectList = ({ projectInfo = [] }) => {
  
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className=' grid grid-cols-1 md:grid-cols-2 gap-7'>
      {
        projectInfo.map((item, index) => (
          <div key={index} className="border w-full h-auto  shadow-sm rounded-lg p-5">
            <div className='flex gap-2 items-center'>
            <img src={item.logo} alt="logo" className='w-[40px] h-[40px] rounded-full' />
            <h2 className='font-bold justify-between flex items-center'>{item.name}</h2>
            <span className=' hidden lg:block text-xs bg-primary p-1 px-3 rounded-full text-white'>{item.category}</span>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default ProjectList;
