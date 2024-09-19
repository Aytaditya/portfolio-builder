"use client"
import Image from "next/image";
import Hero from "./components/Hero";
import Navbar from './components/Navbar'
import Landing from './components/Landing'
import Marquee from './components/Marquee'

export default function Home() {
  return (
    <div className="">
    <Navbar/>
    <Hero/>
    <Landing/>
    <Marquee/>
    </div>
  );
}
