import React from 'react'
import NutrientCard from "../layouts/NutrientCard"
import { RiMicroscopeLine } from "react-icons/ri"
import { MdHealthAndSafety } from "react-icons/md"
import { FaHeartbeat } from "react-icons/fa"

const Nutrient = () => {
    const icon1 = <RiMicroscopeLine size={35} className="text-backgroundColor" />
    const icon2 = <MdHealthAndSafety size={35} className="text-backgroundColor" />
    const icon3 = <FaHeartbeat size={35} className="text-backgroundColor" />

    return (
        <div className="min-h-screen flex flex-col justify-center items-center lg:px-32 px-5 pt-24 lg:pt-16">
            {/* <div > */}
                {/* <div className="flex flex-col items-center text-center lg:flex-row lg:justify-between lg:text-start w-full"> */}
                    <div><h1 className="text-4xl font-semibold flex flex-col items-center text-center lg:flex-row lg:justify-between lg:text-start w-full">Our Testing Labs</h1></div>
                    <div><p className="mt-2 flex flex-col items-center text-center lg:flex-row lg:justify-between lg:text-start w-full">Precision Testing for Peace of Mind:Discover Excellence in Every Result from Our Labs</p></div>
                {/* </div> */}
            {/* </div> */}
            <div className="flex flex-col lg:flex-row gap-5 pt-14">
                <NutrientCard icon={icon1} title="Tonometry" />
                <NutrientCard icon={icon2} title="Echocardiogram" />
                <NutrientCard icon={icon3} title="MRI Scan" />
            </div>
        </div>
    )
}

export default Nutrient;

 {/* <div className="mt-4 lg:mt-0">
                    <button>Explore more...</button>
                </div> */}
