"use client"
import { db } from "@/utils"
import { userInfo } from "@/utils/schema"
import { eq } from "drizzle-orm"
import { useUser } from "@clerk/nextjs"
import { useEffect } from "react"
import { UserDetailContext } from "./_context/UserDetailContext"
import { useState } from "react"

function Provider({children}) {
    const {user}=useUser()
    const [userDetail,setUserDetail]=useState([])
    const [projects, setProjects] = useState([]);
    const [selectedThemeName, setSelectedThemeName] = useState(null)

    useEffect(()=>{
        if(user){
            getUserDetails()
        }
    },[user])

    const getUserDetails=async()=>{
        // when select() is empty, it will fetch all the columns from the table by default
        const result=await db.select().from(userInfo)
        .where(eq(userInfo.email,user?.primaryEmailAddress?.emailAddress))

        setUserDetail(result[0])
    }
  return (
    <UserDetailContext.Provider value={{userDetail,setUserDetail,projects,setProjects,selectedThemeName, setSelectedThemeName}}>

        {children}

    </UserDetailContext.Provider>

    
  )
}

export default Provider
