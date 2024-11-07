"use client"
import React, { use } from 'react'
import BasicDetail from './BasicDetail'
import { motion } from 'framer-motion';
import AddProject from './AddProject';
import { BookImage } from 'lucide-react';
import { desc, eq } from 'drizzle-orm';
import { useUser } from '@clerk/nextjs';
import { db } from '@/utils';
import { project } from '@/utils/schema';
import { useEffect } from 'react';
import { Image } from 'lucide-react';
import ProjectListEdit from './ProjectListEdit';


const FormComponent = () => {

  const { user } = useUser();
  const [projectList, setProjectList] = React.useState([])

  const getProjects =async () => {
    const result=await db.select().from(project)
    .where(eq(project.emailRef,user?.primaryEmailAddress?.emailAddress))
    .orderBy(desc(project.id))
    console.log(result)
    setProjectList(result)
  }

  useEffect(() => {
    if(user && user.primaryEmailAddress){
      getProjects()
    } 
  }, [user])

  

  return (
    <div className='py-12 px-6'>
        <motion.h2
            className='text-4xl font-bold text-gray-300 font-enrich tracking-wide'
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
        >
            Start 
            <span className='text-[#645dee] ml-2 '>Designing</span> your portfolio page
            <Image className='w-12 h-12 inline-block mx-2 text-gray-300' />
        </motion.h2>
      <BasicDetail/>
      <hr  className='my-5 opacity-30'/>
      <AddProject/>
      <ProjectListEdit projects={projectList}refreshData={getProjects}/>
    </div>
  )
}

export default FormComponent


// 🖼️