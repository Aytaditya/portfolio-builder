"use client"
import React from 'react'
import ProjectList from './_components/ProjectList'
import UserDetailInfo from './_components/UserDetailInfo'
import { useContext } from 'react'
import { UserDetailContext } from '../_context/UserDetailContext'

const User = () => {
    const {userDetail,setUserDetail,projects}=useContext(UserDetailContext)
  return (
    <div className='p-3 md:px-10 grid grid-cols-1 md:grid-cols-3 gap-5'>
    <div>
        <UserDetailInfo userDetail={userDetail} />
    </div>

    <div className='md:col-span-2'>
        <ProjectList projectInfo={projects} />
    </div>
    </div>
  )
}

export default User
