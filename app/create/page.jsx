"use client";
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { db } from '@/utils';
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
            <Navbar />

            {/* Floating Bubbles Background */}
            <div className="bubbles">
                {[...Array(20)].map((_, index) => (
                    <div
                        key={index}
                        className="bubble"
                        style={{
                            left: `${Math.random() * 100}%`,
                            width: `${Math.random() * 40 + 20}px`,
                            height: `${Math.random() * 40 + 20}px`,
                            animationDuration: `${Math.random() * 10 + 10}s`,
                            animationDelay: `${Math.random() * 10}s`,
                        }}
                    />
                ))}
            </div>

            {/* Animated Heading */}
            <motion.h1
                className='flex text-center text-4xl pt-3 pb-2 items-center justify-center text-white font-bold tracking-tight uppercase'
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
            >
                Register your
                <span className='text-[#5f58e2] mx-2'>Portfolio</span> Here 🖼️
            </motion.h1>

            <div className='flex h-screen w-full '>
                {/* Left part */}
                <motion.div
                    className='flex-1 flex overflow-hidden relative justify-center items-center z-10 bg-noise'
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1, ease: 'easeInOut' }}
                >
                    <div className='flex flex-col gap-2 px-4 xl:ml-30 text-center md:text-start font-semibold'>
                        {/* Animated Form Container */}
                        <motion.div
                            className='p-16 rounded-lg border border-blue-200 shadow-lg flex flex-col w-full max-w-xl h-auto bg-gray-600 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-30 -mt-[150px]'
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.5, ease: 'easeInOut' }}
                        >
                            <h2 className='font-bold text-3xl py-3 text-center text-gray-200'>
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

                {/* Right part - Animated Image */}
                <motion.div
                    className='flex-1 relative overflow-hidden justify-center items-center hidden md:flex'
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1, ease: 'easeInOut' }}
                >
                    <motion.img
                        src={"/combined.png"}
                        alt='Portfolio illustration'
                        className='object-cover opacity-90 pointer-events-none select-none h-full -mt-[110px]'
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.8, ease: 'easeInOut' }}
                        whileHover={{ scale: 1.05 }}
                    />
                </motion.div>
            </div>
        </>
    );
};

export default Page;
