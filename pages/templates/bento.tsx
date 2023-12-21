import React from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import SignUpBento from "@/components/SignUpComponents/SignUpBento";

const Bento = () => {
    return (

        <main className="min-full-screen flex flex-col items-center justify-center">

            <Head>
                <title>Template: Bento</title>
                <link rel="icon" href="/favicon.ico" sizes="any" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="description" content="This question bank includes the most important and impactful customer interview questions in Product Building." key="desc" />
                <meta property="og:title" content="Product Head: Question Bank" />
                <meta
                    property="og:description"
                    content="This question bank includes the most important and impactful customer interview questions in Product Building."
                />
                <meta
                    property="og:image"
                    content="/productbuilderquestionbank.jpeg"
                />
            </Head>

            <div className="min-full-screen flex w-full max-w-[1728px] flex-col">
                <div className="relative flex min-h-screen w-full flex-1 flex-col items-center">
                    <div className="flex h-full w-full max-w-[428px] items-center justify-center p-6 pt-12 pb-0 xl:absolute xl:top-0 xl:max-w-[min(100vw,1728px)] xl:items-stretch xl:justify-start xl:p-16">
                        <div className="flex w-full flex-col px-4 xl:mr-20 xl:flex-1 xl:px-0">
                            <div className="relative xl:sticky xl:top-16">
                                <div className="w-[120px] xl:w-[184px]">
                                    <div className="bg-[#565656]/10 relative overflow-hidden w-[100%] h-[100%] rounded-full">
                                        <Image src="/bento/memojigirl.gif" alt="" width={184} height={184} />
                                        <div className="pointer-events-none absolute inset-0 rounded-[inherit] phantom-border"></div>
                                    </div>
                                </div>
                                <div className="ml-2 w-[calc(100%-8px)] max-w-[min(500px,100%-8px)] xl:max-w-[min(500px,calc(100vw_-_1000px))] mt-8">
                                    <div className="text-[32px] font-bold leading-[120%] tracking-[-1px] xl:text-[44px] xl:tracking-[-2px]">
                                        <div className="rt-editor">
                                            Julia Santiago
                                        </div>
                                    </div>
                                    <div className="mt-3 text-[#565656] xl:mt-3 xl:text-xl">
                                        <div className="styles_bio__oMe8p">
                                            <div className="">
                                                <div className="">
                                                    <p>
                                                        NYC-based product designer shaping digital experiences | #DesignInNYC
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex h-full w-full max-w-[428px] flex-1 flex-col p-6 pt-0 xl:max-w-[1728px] xl:flex-row xl:p-16">
                        <div className="mb-10 flex flex-col px-4 xl:mb-0 xl:mr-20 xl:flex-1 xl:px-0"></div>
                        <div className="grid grid-cols-1 xl:grid-cols-4 xl:grid-rows-3 relative h-full w-full gap-4 xl:w-[820px]">
                            <div className="bento-box flex flex-col xl:col-span-2 xl:row-span-2 justify-between">
                                <div className="mb-4">
                                    <p className="text-sm">Newsletter</p>
                                    <p className="text-xs">producthead.xyz</p>
                                </div>
                                <div>
                                    <SignUpBento />
                                </div>
                            </div>
                            <div className="bento-X xl:col-start-3">
                                <Image className="rounded-lg mb-4" src="/bento/x.png" alt="" width={38} height={38} />
                                <div>
                                    <p className="text-sm">Updates</p>
                                    <p className="text-xs mb-2">@juliasantiago</p>
                                </div>
                                <div className="bg-black/80 hover:bg-black w-fit rounded-xl py-2 px-4 transition-all duration-200 cursor-pointer">
                                    <p className="text-white text-xs font-medium">Follow</p>
                                </div>
                            </div>
                            <div className="bento-box xl:col-start-4">
                                <Image className="rounded-lg mb-4 shadow" src="/bento/icon.svg" alt="" width={38} height={38} />
                                <div>
                                    <p className="text-sm mb-1">CV</p>
                                    <p className="text-xs">read.cv</p>
                                </div>
                            </div>
                            <div className="bento-box bg-transparent xl:col-span-2 xl:col-start-3 xl:row-start-2">
                                <Image className="rounded-lg mb-4 shadow" src="/bento/image.svg" alt="" width={38} height={38} />
                                <div>
                                    <p className="text-sm">Latest</p>
                                    <p className="text-xs mb-2">@juliasantiago</p>
                                </div>
                                <div className="bg-[#7B31F8]/80 hover:bg-[#7B31F8] w-fit rounded-xl py-2 px-4 transition-all duration-200 cursor-pointer">
                                    <p className="text-white text-xs font-medium">Follow <span className="text-white/70">2.4K</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <footer className="p-4 bg-zinc-100 border-t border-zinc-200 mt-auto fixed bottom-0 w-full">
                <div className="flex gap-6 w-full mx-auto">
                    <a
                        className="text-xs text-zinc-600 flex gap-0.25"
                        href="https://nextjswithloops.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Made with NextJS with Loops
                        <svg
                            fill="none"
                            height="16"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            viewBox="0 0 24 24"
                            width="16"
                            aria-hidden="true"
                            className="w-3 h-3 ml-1"
                        >
                            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"></path>
                            <path d="M15 3h6v6"></path>
                            <path d="M10 14L21 3"></path>
                        </svg>
                    </a>
                </div>
            </footer>

        </main>
    )
};

export default Bento;