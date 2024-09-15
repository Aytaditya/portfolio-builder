"use client";
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
    }, [isLoaded, user]);

    return (
        <div className="relative flex flex-col items-center mx-56 gap-9 mt-16">
            <div className="rain">
                {/* Generate fewer raindrop divs for decreased frequency */}
                {[...Array(30)].map((_, index) => (
                    <div
                        key={index}
                        className="rain-drop"
                        style={{
                            left: `${Math.random() * 100}%`,
                            animationDuration: `${Math.random() * 3 + 3}s`, // Adjust for slower rain
                            animationDelay: `${Math.random() * 3}s`, // Adjust delay
                        }}
                    />
                ))}
            </div>
            <h1 className="font-bold text-4xl text-center text-gray-300 font-enrich">
                <span className="text-[#5e57ed]">Create your dream portfolio effortlessly:</span> personalized portfolio and management tools at your fingertips for no cost.
            </h1>
            <p className="text-xl text-gray-400 text-center font-enrich">Build your portfolio with us and easily manage interactions through our platform.</p>
        
            <button className="bg-[#e35481] text-black rounded-xl p-3 font-semibold cursor-pointer" onClick={() => router.push('/admin')}>
                Get started for free
            </button>

            <img src="/combined.png" alt="Hero Image" className="-mt-28 w-[800px]" />
        </div>
    );
}

export default Hero;
