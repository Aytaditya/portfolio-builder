import { UserButton } from '@clerk/nextjs'
import { Layers, Brush, ChartColumnIncreasing, Settings } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const SideNav = () => {
    const menuList = [
        {
            id: 1,
            name: "Pages",
            icon: Layers,
            path:"/admin"
        },
        {
            id: 2,
            name: "Styles",
            icon: Brush,
            path:"/admin/style"
        },
        {
            id: 3,
            name: "Stats",
            icon: ChartColumnIncreasing,
            path:"/admin/analytics"
        },
        {
            id: 4,
            name: "Settings",
            icon: Settings,
            path:"/admin/settings"
        },

    ]
    return (
        <>

            <div className='p-4 h-screen  bg-gray-900'>
                <div>
                    <img src="/robot.png" alt="Logo" className='pt-0 mb-16' />
                </div>
                {menuList.map(menu => (
                    <>
                        <Link href={menu.path} key={menu.id} className='py-4 p-2 bg-[#5f58e2] text-white rounded-lg flex items-center justify-center mb-5 tooltip-accent tooltip tooltip-right cursor-pointer hover:bg-[#e13fd9] hover:scale-110 transition-all ease-in-out duration-300  '
                            data-tip={menu.name}>
                            <menu.icon className='' />

                        </Link>
                    </>
                ))}
                <div className='fixed bottom-5 px-4'>
                    <UserButton/>
                </div>
            </div>
        </>
    )
}

export default SideNav
