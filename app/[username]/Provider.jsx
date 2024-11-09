"use client"
import React from 'react'
import {db} from '@/utils'
import { useUser } from '@clerk/nextjs'
import {useEffect} from 'react'
import { eq } from 'drizzle-orm'
import { userInfo } from '@/utils/schema'

const Provider = ({children}) => {

    const {user}=useUser();

    useEffect(()=>{
        if(user && user.primaryEmailAddress ){
            getUserDetails()
        }
    },[user])

    const getUserDetails=async()=>{
        const result=await db.query.userInfo.findMany({
            with:{
                project:true
            },
            where:eq(userInfo.email,user?.primaryEmailAddress?.emailAddress)
        })

        console.log(result)
    }
  return (
    <div data-theme="cyberpunk">
      {children}
    </div>
  )
}

export default Provider
