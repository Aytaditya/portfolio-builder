"use client";
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { db } from '../../utils';
import { userInfo } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { eq } from "drizzle-orm";
const { useRouter } = require('next/navigation');
import Navbar from '../components/Navbar';

const Page = () => {
    const [username, setUsername] = useState('');
    const { user } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (user && user.primaryEmailAddress) {
            checkUser();
        }
    }, [user]);

    // Checking if user already exists in database
    const checkUser = async () => {
        console.log("Checking user email: ", user?.primaryEmailAddress?.emailAddress);
        const result = await db.select().from(userInfo)
            .where(eq(userInfo.email, user?.primaryEmailAddress?.emailAddress));

        console.log(result);

        if (result.length > 0) {
            router.push('/admin');
        }
    };

    const handleCreate = async () => {
        if (username.length === 0) {
            toast.error('Username is required', {
                position: "top-right",
            });
            return;
        }
        if (username.length > 10) {
            toast.error('Username should be less than 10 characters', {
                position: "top-right",
            });
            return;
        }

        // Check if username already exists
        const check = await db.select().from(userInfo)
            .where(eq(userInfo.username, username.replace(' ', '')));
        if (check.length > 0) {
            toast.error('Username already exists', {
                position: "top-right",
            });
            return;
        }

        const result = await db.insert(userInfo)
            .values({
                name: user?.fullName,
                email: user?.primaryEmailAddress?.emailAddress,
                username: username.replace(' ', '')
            });

        console.log(result);
        toast.success('User created successfully', {
            position: "top-right",
        });

        router.push('/admin');

        setUsername('');
    };

    return (
        <>
            {/* <Navbar /> */}

            {/* Floating Bubbles Background */}
            {/* <div className="bubbles">
                {[...Array(30)].map((_, index) => (
                    <div
                        key={index}
                        className="bubble"
                        style={{
                            left: `${Math.random() * 100}%`,
                            width: `${Math.random() * 60 + 40}px`, // Adjust size
                            height: `${Math.random() * 60 + 40}px`, // Adjust size
                            animationDuration: `${Math.random() * 10 + 8}s`, // Adjust frequency
                            animationDelay: `${Math.random() * 5}s`, // Adjust delay
                        }}
                    />
                ))}
            </div> */}
            <div className="rain">
                {/* Generate fewer raindrop divs for decreased frequency */}
                {[...Array(28)].map((_, index) => (
                    <div
                        key={index}
                        className="rain-drop"
                        style={{
                            left: `${Math.random() * 100}%`,
                            animationDuration: `${Math.random() * 3 + 4}s`, // Adjust for slower rain
                            animationDelay: `${Math.random() * 5}s`, // Adjust delay
                        }}
                    />
                ))}
            </div>

            <div className='flex h-screen w-full'>
  {/* Left part */}
   
  
  <motion.div
    className='flex-1 flex flex-col overflow-hidden relative justify-center items-center z-10 bg-noise '
    initial={{ x: -100, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ duration: 1, ease: 'easeInOut' }}
  >

    {/* <h1 className='mb-5 text-5xl pt-10 pb-2 px-20  text-gray-300 font-bold tracking-tight font-enrich'>Register your
    <span className='text-[#5f58e2] mx-2'>Portfolio</span> Here 🖼️</h1> */}
    {/* Animated Heading */}
    {/* <motion.h1
      className='flex  text-5xl pt-10 pb-2 px-20  text-gray-300 font-bold tracking-tight font-enrich'
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
    >
      Enter your
      <span className='text-[#e258c9] mx-2'>basic</span> username
    </motion.h1> */}

    

    {/* Animated Form Container */}
    <div className='flex flex-col gap-2 px-4 xl:ml-30 text-center md:text-start font-semibold mt-24 '>
      <motion.div
        className='p-16 border border-blue-200 shadow-md shadow-white flex flex-col w-full max-w-xl h-auto bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-30 -mt-[150px] rounded-xl'
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.5, ease: 'easeInOut' }}
      >
        <h2 className='font-bold text-3xl py-3 text-center text-gray-200 font-enrich'>
          Create Portfolio Username 👨‍💻
        </h2>
        <label htmlFor="Add username" className='py-2 text-gray-400 tracking-tight'>
          Add username for your portfolio 👀
        </label>
        <motion.input
          type="text"
          id="Add username"
          className="input input-bordered w-full py-3 px-4 rounded-lg border border-gray-300 focus:outline-none focus:border-pink-300 focus:ring focus:ring-pink-200 transition-all duration-300"
          placeholder="Enter your username"
          whileFocus={{ scale: 1.05, borderColor: '#e35481' }}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <motion.button
          className='w-full mt-6 py-3 text-white bg-[#e35481] rounded-lg font-bold tracking-tight'
          whileHover={{ scale: 1.05, backgroundColor: '#d43d6e' }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleCreate()}
        >
          Create User
        </motion.button>
      </motion.div>
    </div>
  </motion.div>

  {/* Right part - Full Image */}
  {/* <motion.div
    className='flex-1 relative overflow-hidden justify-center items-center hidden md:flex'
    initial={{ x: 100, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ duration: 1, ease: 'easeInOut' }}
  >
    <motion.img
      src={"/side-img.svg"}
      alt='Portfolio illustration'
      className='object-cover opacity-90 pointer-events-none select-none h-full ml-[190px]'
      initial={{ scale: 0.9 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      whileHover={{ scale: 1.05 }}
    />
  </motion.div> */}
</div>

        </>
    );
};

export default Page;
