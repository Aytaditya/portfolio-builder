"use client"

import { db } from "@/utils"
import { userInfo } from "@/utils/schema"
import { useUser } from "@clerk/nextjs"
import { eq } from "drizzle-orm"
import {useRouter} from 'next/navigation'
import { useEffect } from "react"
import Navbar from "../components/Navbar"

const page = () => {

  const {user}=useUser();
  const router=useRouter()

  useEffect(()=>{
    if (user && user.primaryEmailAddress) {
      checkUser();
    }
  
  },[user])

  const checkUser=async()=>{
    console.log("Checking user email: ", user?.primaryEmailAddress?.emailAddress);
    const result=await db.select().from(userInfo)
    .where(eq(userInfo.email,user?.primaryEmailAddress?.emailAddress))

    console.log(result)

    if(result.length===0){
      router.push('/create')
    }
  }
  return (
    <div>
      
      hii
    </div>
  )
}

export default page
