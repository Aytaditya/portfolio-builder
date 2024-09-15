// 

import React from 'react'

const page = () => {
    return (
        <div className='flex h-screen w-full bg-[#121C22]'>
            {/* left part */}
            <div className='flex-1 flex overflow-hidden  relative justify-center items-center z-10 bg-noise'>

                <div className='flex flex-col gap-2 px-4 xl:ml-30 text-center md:text-start font-semibold'>



                    <div className='p-10 rounded-lg border border-blue-200 shadow-lg flex flex-col w-full max-w-md h-auto bg-gray-600 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-30'>
                        <h2 className='font-bold text-3xl py-3 text-center text-gray-200'>
                            Create Portfolio Username 👨‍💻
                        </h2>
                        <label htmlFor="Add username" className='py-2 text-gray-300'>
                            Add username for your portfolio 👀
                        </label>
                        <input
                            type="text"
                            id="Add username"
                            className="input input-bordered w-full py-3 px-4 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all duration-300"
                            placeholder="Enter your username"
                        />
                        <button className='w-full btn mt-5 py-3 text-white btn-accent  rounded-lg font-bold  '>
                            Create User
                        </button>
                    </div>




                </div>
            </div>

            {/* Right part */}
            <div className='flex-1 relative overflow-hidden justify-center items-center hidden md:flex'>
                <img
                    src={"/combined.png"}
                    alt='Horse'

                    className='object-cover opacity-90 pointer-events-none select-none h-full'
                />
            </div>
        </div>
    )
}

export default page
