"use client";
import Link from "react-router-dom";
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';


const Hero = () => {
    const { user, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && user) {
        router.push('/admin');
        }
  }, [isLoaded,user]);
    return (
        <div className="flex flex-col items-center mx-56 gap-9 mt-16">
            <h1 className="font-bold text-4xl text-center text-gray-400 font-enrich">
                <span className="text-[#5f58e2]">Create your dream portfolio effortlessly:</span> personalized portfolio and management tools at your fingertips for no cost.
            </h1>
            <p className="text-xl text-gray-400 text-center font-enrich">Build your portfolio with us and easily manage interactions through our platform.</p>

        
            <button className="btn bg-secondary text-black rounded-xl p-3 font-semibold cursor-pointer" onClick={()=>router.push('/admin')}>
            Get started for free
            </button>

            <img src="/combined.png" alt="Hero Image" className="-mt-28 w-[800px] " />

        </div>
    );
}

export default Hero; 
