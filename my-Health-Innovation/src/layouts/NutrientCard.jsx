import React from 'react'

const NutrientCard=({icon,title})=>{
    return (
        <div className="group flex flex-col items-center text-center gap-2 w-full lg:w-1/3 p-5 cursor-pointer lg:hover:-translate-y-6 transition duration-300 ease-in-out">
        <div className="bg-[#26c25d] p-3 rounded-full transition-colors duration-300 ease-in-out group-hover:bg-[#e7112e]">{icon}</div>
        <h1 className="font-semibold text-lg">{title}</h1>
        <p> The ECG monitors the electrical activity of the heart to identify arrhythmias and myocardial infarctions. The Echocardiogram utilizes ultrasound to visualize heart chambers and valves, aiding in the diagnosis of heart failure and valvular abnormalities. </p>

        <a href="https://en.wikipedia.org/wiki/Medical_laboratory" target="_blank" rel="noopener noreferrer">
    <h3 className="text-backgroundColor cursor-pointer hover:text-black transition duration-300 ease-in-out">
        Learn More..
    </h3>
</a>

        </div>
    )
}

export default NutrientCard;
