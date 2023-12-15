import React from "react";
import Link from "next/link";
import Image from "next/image";
import SignUpRicochet from "@/components/SignUpComponents/SignUpRicochet";
import { motion, spring } from "framer-motion";

const Ricochet = () => {
    return (
        <>
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

                <main className="mt-20 flex relative mx-auto my-auto justify-center h-[500px] w-[450px] bg-[#EEEEEE] rounded-2xl px-12 pt-10 pb-8 border border-[#D3D3D3]/50 shadow-2xl">
                    <section id="newslettercube" className="relative px-4 transition-all duration-500">
                        <div className="mt-3 flex flex-col relative gap-3">
                            <div className="bg-white w-fit p-2 rounded-3xl shadow mx-auto">
                                <div className="bg-white backdrop-blur-sm w-fit rounded-2xl shadow-inner">
                                    <Image width={70} height={70} alt="loops-logo" src="/MAlhY5SR_400x400.png" className="mx-auto" />
                                </div>
                            </div>
                            <h1 className="text-center text-5xl mb-1 mt-4 font-medium text-[#6F7071] leading-none tracking-tight transition-all duration-500 mx-auto">Newsletter</h1>
                            <p className="text-center text-lg font-normal text-[#6F7071] leading-tight tracking-normal transition-all duration-500 mx-auto">Subscribe to our newsletter to get your weekly dose of design details directly into your mailbox.</p>
                        </div>
                        <SignUpRicochet />
                        <p className="text-xs text-[#6F7071] mt-4 text-center">No spam. Browse our <span className="underline">past newsletters.</span></p>
                    </section >
                </main >
            </motion.div>

            {/* <footer className="p-4 bg-zinc-100 border-t border-zinc-200 mt-auto fixed bottom-0 w-full cursor-default">
                <div className="flex gap-6 w-full mx-auto text-xs">
                    <p>Design: <Link target="blank" href="https://twitter.com/kacperfyi">@kacperfyi</Link>{" "}Code: <Link target="blank" href="https://twitter.com/malthart">@malthart</Link>.</p>
                </div>
            </footer> */}

        </>
    )
};

export default Ricochet;