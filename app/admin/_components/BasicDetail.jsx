import { db } from '@/utils';
import { userInfo } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { Camera } from 'lucide-react'
import React from 'react'
import { toast } from 'react-toastify';
import { eq } from "drizzle-orm"
import 'react-toastify/dist/ReactToastify.css';

const BasicDetail = () => {

    const {user}=useUser();

    let timeoutId;
    const onInputChange = (e,fieldName)=>{

        clearTimeout(timeoutId)
       timeoutId=setTimeout(async()=>{
            // set because we want to update the value of particular field
            // and field name in square brackets is dynamic
            const result=await db.update(userInfo)
            .set({
                [fieldName]:e.target.value
            })
            .where(eq(userInfo.email,user?.primaryEmailAddress?.emailAddress))

            if(result){
                //console.log(result);
                toast.success('Updated successfully',{
                    position:'top-right'
                })
            }
            else{
                toast.error('Error',{
                    position:'top-right'
                })
            }
        },1000)
    }
  return (
    <div className='p-7 rounded-2xl bg-gray-800 my-7 '>
        <div className='flex gap-6'>
      <Camera className='p-3 h-12 w-12  bg-gray-500 rounded-full'/>
        <input type="text" placeholder="Enter your name for the portfolio" className="input input-bordered w-full py-3 px-4 rounded-lg border border-gray-400 focus:outline-none focus:border-pink-300 focus:ring focus:ring-pink-500 transition-all duration-300  " 
        onChange={(e)=>onInputChange(e,'name')}/>
        </div>
        <textarea type="textarea" placeholder="Provide a brief description of yourself" className="input input-bordered w-full py-3 px-4 rounded-lg border border-gray-400 focus:outline-none focus:border-[#5F58E2] focus:ring focus:ring-[#6c65eb] transition-all duration-300 mt-5" onChange={(e)=>onInputChange(e,'bio')} />
    </div>
  )
}

export default BasicDetail
