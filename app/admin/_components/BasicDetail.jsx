import { db } from '@/utils';
import { userInfo } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { Camera } from 'lucide-react';
import React from 'react';
import { toast } from 'react-toastify';
import { eq } from 'drizzle-orm';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';

const BasicDetail = () => {
    const { user } = useUser();

    let timeoutId;
    const onInputChange = (e, fieldName) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(async () => {
            const result = await db.update(userInfo)
                .set({ [fieldName]: e.target.value })
                .where(eq(userInfo.email, user?.primaryEmailAddress?.emailAddress));

            if (result) {
                toast.success('Updated successfully', { position: 'top-right' });
            } else {
                toast.error('Error', { position: 'top-right' });
            }
        }, 1000);
    };

    return (
        <motion.div
            className="p-7 rounded-lg bg-gray-900 my-7 shadow-lg border border-gray-800"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="flex items-center gap-6">
                <motion.div
                    className="relative"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="w-16 h-16 bg-gray-800 rounded-full border-4 border-pink-500 flex items-center justify-center">
                        <Camera className="text-white " />
                    </div>
                </motion.div>
                <motion.input
                    type="text"
                    placeholder="Enter your name for the portfolio"
                    className="input input-bordered w-full py-3 px-4 rounded-lg border border-gray-400 focus:outline-none focus:border-pink-300 focus:ring focus:ring-pink-500 transition-all duration-300 bg-transparent"
                    onChange={(e) => onInputChange(e, 'name')}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                />
            </div>
            <motion.textarea
                placeholder="Provide a brief description of yourself"
                className="input input-bordered w-full py-3 px-4 rounded-lg border border-gray-400 focus:outline-none focus:border-[#5F58E2] focus:ring focus:ring-[#6c65eb] transition-all duration-300 mt-5 bg-transparent"
                onChange={(e) => onInputChange(e, 'bio')}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
            />
        </motion.div>
    );
};

export default BasicDetail;
