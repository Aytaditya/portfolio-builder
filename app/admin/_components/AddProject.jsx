"use client"
import { Link } from "lucide-react"
import { toast } from "react-toastify";
import React from 'react'
import { db } from "@/utils";
import { project } from "@/utils/schema";
import { useUser } from '@clerk/nextjs';
import { UserDetailContext } from '../../_context/UserDetailContext'

const AddProject = () => {
    const { user } = useUser();
    const [openUrlInput, setOpenUrlInput] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const {userDetail, setUserDetail}=React.useContext(UserDetailContext)

    const handleSubmit =async (e) => {
        e.preventDefault();
        toast.success('Project added successfully', { position: 'top-right' });
        console.log('submitted')
        console.log(e.target[0].value)
        setLoading(true)
        const result=await db.insert(project)
        .values({
            url:e.target[0].value,
            emailRef:user?.primaryEmailAddress?.emailAddress,
            userRef:userDetail.id
        })
        setOpenUrlInput(false)
        if(result){
            setLoading(false)
            toast.success('Project added successfully', { position: 'top-right' });
        }
        else{
            setLoading(false)
            toast.error('Error', { position: 'top-right' });
        }
    }
    return (
        <div>
            {!openUrlInput && (
                <button className="btn bg-[#e13fd9] uppercase font-bold w-full text-white hover:bg-[#c930c1]"
                onClick={()=>setOpenUrlInput(true)} 
                >+ Add a new project</button>
            )}

            {openUrlInput && (
                <form action="" className="p-3 rounded-lg bg-gray-900" onSubmit={(e)=>handleSubmit(e)}>
                <label className=" input-bordered 
                input flex items-center gap-3 p-3 border border-gray-400 bg-transparent rounded-lg shadow-sm focus-within:border-gray-300 focus-within:ring focus-within:ring-gray-300 transition-all duration-300 ">
                    <Link className="text-purple-600" />
                    <input type="url" className="grow bg-transparent text-gray-300 placeholder-gray-400 outline-none focus:outline-none" placeholder="Project url" />
                </label>
                <button type="submit" disabled={loading} className="btn bg-[#e13fd9] uppercase font-bold w-full text-white hover:bg-[#c930c1] mt-3">+ Add a new project</button>
            </form>
            )}
        </div>
    )
}

export default AddProject
