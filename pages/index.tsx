import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Hero from "@/components/LandingPageComponents/Hero";
import Templates from "@/components/LandingPageComponents/Templates";

const Home = () => {
  return (

    <main className="flex flex-col min-h-screen overflow-hidden bg-orange-100 border-[12px] border-white rounded-3xl select-none">
      <Hero />
      <Templates />
    </main >
  )
};

export default Home;