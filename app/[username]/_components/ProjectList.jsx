"use client"

import React, { useEffect, useState } from 'react';
import { Link } from 'lucide-react';
import { db } from '@/utils';
import { project, projectClick, userInfo } from '@/utils/schema';
import moment from 'moment/moment';
import AnalyticChart from './AnalyticChart';
import { eq, sql } from 'drizzle-orm';
import { useUser } from '@clerk/nextjs';

const ProjectList = ({ projectInfo = [] }) => {

  const [isLoading, setIsLoading] = useState(true);
  const {user}=useUser();
  const [projectClickData, setProjectClickData] = useState([]);

  const onProjectClick =async (project) => {
    
    const result=await db.insert(projectClick)
    .values({
      month:moment().format('MMMM'),
      projectRef:project.id,
    })

    window.open(project.url, '_blank');
  }

  useEffect(() => {
    if(user && user?.primaryEmailAddress){
      projectAnalyticsData()
    }
  }, [user])

  const projectAnalyticsData=async()=>{
    const result=await db.select({
      totalClick:sql`count(${projectClick.id})`.mapWith(Number),
      month:projectClick.month,
      projectId:projectClick.projectRef
    }).from(projectClick)
    .rightJoin(project,eq(projectClick.projectRef,project.id))
    .innerJoin(userInfo,eq(project.userRef,userInfo.id))
    .where(eq(userInfo.email,user?.primaryEmailAddress?.emailAddress))
    .groupBy(projectClick.projectRef,projectClick.month)

    setProjectClickData(result)

    //console.log(result);
  }

  const getProjectData = (projectId) => {
    // Filter out data related to the specific projectId
    let resp = projectClickData?.filter((project) => project.projectId === projectId);
  
    // If there's no data for the given projectId, return default structure
    if (!resp || resp.length === 0) {
      return [
        {
          month: 'March',
          totalClick: 0,
          projectId,
        },
        {
          month: 'April',
          totalClick: 0,
          projectId,
        },
      ];
    }
  
    // If data is found, return it
    return resp;
  };
  

  return (
    <>
    <h1 className='flex justify-center  mt-8 md:mt-1  mb-5 text-2xl font-bold md:text-3xl '>My Projects 🛠️</h1>
    <div className=' grid grid-cols-1 md:grid-cols-2 gap-7 '>
      {
        projectInfo.map((item, index) =>
          item.activeStatus && (
            <div key={index} onClick={()=>onProjectClick(item)} className="border w-full h-auto shadow-sm rounded-lg p-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer">
              <div className='flex gap-2 items-center  '>
                <img src={item.logo} alt="logo" className='w-[40px] h-[40px] rounded-full' />
                <h2 className='font-semibold justify-between flex items-center  text-lg md:text-xl  tracking-tighter md:tracking-tight'>{item.name}</h2>
               
              </div>
              
              <h2 className='text-base-content/80 text-xs my-2'>{item.desc}</h2>

              {/* <button className='btn btn-accent text-xs text-white btn-sm '>
                <a href={item.url}>
                  Live Link 🔗
                </a>
              </button> */}

              {/* <div className='flex justify-center items-center'>
              <img src={item.logo} alt="Image" className='h-[120px] w-[120px]' />
              </div> */}

                {item.showGraph && (
                  <AnalyticChart data={getProjectData(item.id)} />
                )}
              
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
