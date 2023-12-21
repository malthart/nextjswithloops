import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const templates = [
    {
        name: 'Bento',
        imageUrl:
            '/bento/Template_ Bento.jpeg',
        link: '/templates/bento',
    },
    {
        name: 'Flowerpot',
        imageUrl:
            '/flowerpot/NextJS with Loops.jpeg',
        link: '/templates/flowerpot',

    },
    {
        name: 'Ricochet',
        imageUrl:
            '/ricochet/NextJS with Loops · 12.58am · 12-21.jpeg',
        link: '/templates/ricochet',
    },
    {
        name: 'Simplehero',
        imageUrl:
            '/simplehero/NextJS with Loops · 1.00am · 12-21.jpeg',
        link: '/templates/simplehero',

    },
    {
        name: 'Splash',
        imageUrl:
            '/splash/NextJS with Loops · 1.01am · 12-21.jpeg',
        link: '/templates/splash',
    },
    {
        name: 'Zinc',
        imageUrl:
            '/zinc/NextJS with Loops · 1.01am · 12-21 (1).jpeg',
        link: '/templates/zinc',
    },
]

const Templates = () => {
    return (

        <div className="mt-12 mb-12 relative mx-auto my-auto transition-all duration-500 px-4 sm:px-12">

            <div className="flex flex-col relative mb-6">
                <p className="text-xl font-medium text-black leading-[26px] tracking-normal transition-all duration-500">Templates</p>
            </div>

            <div role="list" className="relative grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6">
                {templates.map((template) => (
                    <div key={template.name} className="m-auto">
                        <div className="m-auto">
                            <a href={template.link}>
                                <img className="h-full w-full bg-gray-50 rounded-xl ring-2 ring-white hover:ring-orange-500 mb-3 transition-all duration-300 cursor-pointer" src={template.imageUrl} alt="" />
                            </a>
                            <div className="mb-4">
                                <p className="text-md font-medium"><a href={template.link}>{template.name}</a></p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div >
    )
};

export default Templates;