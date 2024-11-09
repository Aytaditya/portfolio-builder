"use client"
import React, { useContext, useEffect, useState } from 'react';
import { db } from '@/utils';
import { useUser } from '@clerk/nextjs';
import { eq } from 'drizzle-orm';
import { userInfo } from '@/utils/schema';
import { UserDetailContext } from '../_context/UserDetailContext';

const Provider = ({ children }) => {
    const { user } = useUser();
    const { userDetail, setUserDetail,projects,setProjects } = useContext(UserDetailContext);
    

    useEffect(() => {
        if (user && user.primaryEmailAddress) {
            getUserDetails();
        }
    }, [user]);

    const getUserDetails = async () => {
        const result = await db.query.userInfo.findMany({
            with: {
                project: true,
            },
            where: eq(userInfo.email, user?.primaryEmailAddress?.emailAddress),
        });

        setUserDetail(result);
        console.log(result);
        setProjects(result[0]?.project || []);
    };

    // This useEffect will run whenever `projects` is updated, ensuring it logs the updated state
    // useEffect(() => {
    //     console.log('Updated projects:', projects);
    // }, [projects]);

    return (
        <div data-theme={userDetail?.theme}>
            {children}
        </div>
    );
};

export default Provider;
