
import {
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton
} from '@clerk/nextjs'



const Navbar = () => {
    return (
        <div>
            <div className="navbar">
                <div className="flex-1 cursor-pointer">
                    <a href='/' className=" ml-3 text-white font-bold text-2xl mr-2 cursor-pointer">Cre8 AI</a>
                    <img src="/robot.png" alt="Logo" className='w-[50px] h-[50px] cursor-pointer' />
                </div>
                <div className="flex-none">
                    <ul className="menu menu-horizontal px-1 mr-3">
                        <SignedOut>
                            <SignInButton className="bg-[#544ddd] rounded-xl p-3 font-bold text-[18px] text-white px-4  " />
                        </SignedOut>
                        <SignedIn>
                            <UserButton />
                        </SignedIn>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar


// bg-glass text-white rounded-xl p-3 font-semibold cursor-pointer border border-gray-500 shadow-md shadow-white