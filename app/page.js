"use client"
import Image from "next/image";
import Hero from "./components/Hero";
import Navbar from './components/Navbar'

export default function Home() {
  return (
    <div className="bg-[#121C22]">
    <Navbar/>
    <Hero/>

    </div>
  );
}
