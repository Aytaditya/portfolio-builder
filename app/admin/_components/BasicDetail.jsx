"use client"

import { db } from '../../../utils'
import { userInfo } from '../../../utils/schema';
import { useUser } from '@clerk/nextjs';
import { Camera, MapPin, Link2 } from 'lucide-react';
import React, { useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import { eq } from 'drizzle-orm';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';
import { UserDetailContext } from '../../_context/UserDetailContext'
import { storage } from '@/utils/firebaseConfig';
import { uploadBytes } from 'firebase/storage';
import { ref } from 'firebase/storage';
import Image from 'next/image';


const baseUrl= 'https://firebasestorage.googleapis.com/v0/b/create-ai-4cd98.appspot.com/o'
const BasicDetail = () => {
    const { user } = useUser();
    const { userDetail, setUserDetail } = useContext(UserDetailContext)
    const [selectedOption, setSelectedOption] = React.useState();
    const [profileImage, setProfileImage] = React.useState();

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

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        
        // Check if a file is selected
        if (!file) {
            toast.error('No file selected', { position: 'top-right' });
            return;
        }
    
        // Extract file type and create fileName
        const fileType = file.type.split('/')[1];
        const fileName = Date.now().toString() + '.' + fileType;
    
        // Ensure Firebase storage is initialized correctly
        const storageRef = ref(storage, fileName);
    
        // Upload the file to Firebase storage
        try {
            const snapshot = await uploadBytes(storageRef, file);
            console.log('Uploaded a blob or file!', snapshot);
            toast.success('Image uploaded successfully', { position: 'top-right' });
    
            // Construct the full URL for the uploaded image
            const imageUrl = `${baseUrl}/${encodeURIComponent(fileName)}?alt=media`;
    
            // Update the user profile image in your database
            const result = await db.update(userInfo)
                .set({ profileImage: imageUrl })
                .where(eq(userInfo.email, user?.primaryEmailAddress?.emailAddress));
    
            // Set the profileImage state directly with the full URL
            setProfileImage(imageUrl);
            console.log(profileImage);
        } catch (error) {
            console.error('Error uploading file:', error);
            toast.error('Failed to upload image', { position: 'top-right' });
        }
    };
    
 
    return (
        <>
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
                    <div className="w-16 h-16 bg-gray-700 rounded-full border-4 border-pink-500 flex items-center justify-center cursor-pointer">
                    {profileImage && (
                        
                            <Image src={profileImage} alt="Profile Image" width={40} height={40}/>
                       

                    )}
                    {!profileImage && (
                        <>
                        <label htmlFor="file-input" className=''>
                        <Camera className="text-white cursor-pointer " />
                        </label>
                        <input type="file" id='file-input' 
                        style={{display:'none'}}
                        accept='image/png, image/jpeg, image/jpg, image/gif'
                        onChange={(e)=>handleFileUpload(e)} />
                        </>
                    )}
                        
                    </div>
                </motion.div>
                <motion.input
                    type="text"
                    placeholder="Enter your name for the portfolio"
                    className="input input-bordered w-full py-3 px-4 rounded-lg border border-gray-400 focus:outline-none focus:border-pink-300 focus:ring focus:ring-pink-500 transition-all duration-300 bg-transparent text-gray-300"
                    onChange={(e) => onInputChange(e, 'name')}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    defaultValue={userDetail?.name}
                />
            </div>
            <motion.textarea
                placeholder="Provide a brief description of yourself"
                className="input input-bordered w-full py-3 px-4 rounded-lg border border-gray-400 focus:outline-none focus:border-[#5F58E2] focus:ring focus:ring-[#6c65eb] transition-all duration-300 mt-5 bg-transparent text-gray-300"
                onChange={(e) => onInputChange(e, 'bio')}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                defaultValue={userDetail?.bio}
            />


            <div className='flex gap-2'>
                <MapPin className={`h-14 w-14 p-3 mt-5 rounded-md 
                    hover:bg-gray-800 cursor-pointer text-blue-500 ${selectedOption === 'location' && 'bg-gray-800'}`}
                    onClick={() => setSelectedOption('location')} />
                <Link2 className={`h-14 w-14 p-3 mt-5 rounded-md 
                    hover:bg-gray-800 cursor-pointer text-yellow-500 ${selectedOption === 'link' && 'bg-gray-800'}`}
                    onClick={() => setSelectedOption('link')} />
            </div>


           {selectedOption === 'location' && (
             <div className='mt-2'>
             <label className="input flex items-center gap-3 p-3 border border-gray-400 bg-transparent rounded-lg shadow-sm focus-within:border-blue-400 focus-within:ring focus-within:ring-blue-300 transition-all duration-300 ">
                 <MapPin className="h-5 w-5 text-blue-400" />
                 <input
                     type="text"
                     className="grow bg-transparent text-gray-300 placeholder-gray-400 outline-none focus:outline-none"
                     placeholder="Enter your location"
                     onChange={(e) => onInputChange(e, 'location')}
                     defaultValue={userDetail?.location}
                 />
             </label>
         </div>
           )}

           {selectedOption==='link' && (
             <div className='mt-2'>
             <label className="input flex items-center gap-3 p-3 border border-gray-400 bg-transparent rounded-lg shadow-sm focus-within:border-blue-400 focus-within:ring focus-within:ring-blue-300 transition-all duration-300 ">
                 <Link2 className="h-5 w-5 text-yellow-400" />
                 <input
                     type="text"
                     className="grow bg-transparent text-gray-300 placeholder-gray-400 outline-none focus:outline-none"
                     placeholder="Any social media link"
                        onChange={(e) => onInputChange(e, 'link')}
                        defaultValue={userDetail?.link}
                 />
             </label>
         </div>
           )}

        </motion.div>
        </>
    );
};

export default BasicDetail;
