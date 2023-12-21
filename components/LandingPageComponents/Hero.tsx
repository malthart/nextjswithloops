import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const Hero = () => {
    return (

        <div className="mt-40 mb-32 container relative mx-auto my-auto transition-all duration-500">

            <motion.div
                initial={{ scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    delay: 0.5,
                }}
            >

                <div className="flex flex-col relative gap-3">
                    <h1 className="text-center text-3xl sm:text-7xl md:text-7xl lg:text-8xl font-extrabold text-black leading-none tracking-tight transition-all duration-500 max-w-5xl mx-auto">NextJS with <span className="text-[#fc5200]">Loops</span></h1>
                    <p className="text-center text-lg font-normal text-black leading-[26px] tracking-normal transition-all duration-500 max-w-3xl mx-auto">Lead generation & e-mail automation-ready boilerplate built with NextJS, Tailwind & Loops</p>
                </div>

                <Link className="w-fit" target="_blank" rel="noreferrer" href="https://github.com/malthart/nextjswithloops">
                    <div className="flex flex-row mt-3 relative bg-white hover:bg-slate-50 active:scale-95 w-fit mx-auto rounded-xl items-center px-4 py-2.5 gap-2 justify-center transition-all duration-200">
                        <Image src="/github-mark.svg" alt="" height={18} width={18} />
                        <span className="text-md">Github</span>
                    </div>
                </Link>

            </motion.div>

        </div >
    )
};

export default Hero;