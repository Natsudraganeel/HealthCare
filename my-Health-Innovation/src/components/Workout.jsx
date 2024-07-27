import React from 'react';
import WorkoutCard from '../layouts/WorkoutCard';
import w1 from "../assets/img/w1.png";
import w2 from "../assets/img/w2.png";
import w3 from "../assets/img/w3.png";
import w4 from "../assets/img/w4.png";
import w5 from "../assets/img/w5.png";
import w6 from "../assets/img/w6.png";

const Workout=()=>{
    return(
        <div cladssName="min-h-screen flex flex-col justify-center lg:px-32 px-5 pt-24">
            <div className="flex flex-col items=center  justify-between">
                <div>
                    <h1 className="  text-4xl font-semibold text-center ">Our Workout Library</h1>
                    <p className="mt-2 text-center ">Discover a variety of workouts designed to help you achieve your fitness goals and maintain a healthy lifestyle.</p>
                </div>
                <div className="mt-4 lg:mt-0">
                <a href="https://en.wikipedia.org/wiki/Exercise">
                <button className='bg-brightColor text-white p-5 m-3 px-4 py-2 rounded-md hover:bg-hoverColor transition duration-300 ease-in-out'>
                        Learn more . . .
                 </button>
                </a>
                </div>
             </div>
             <div className="my-8">
                <div className="flex flex-wrap justify-center gap-5">
                    <WorkoutCard img={w1} yog="Home Workout techniques"/>

                    <WorkoutCard img={w2} yog="Calisthenics Workout plan"/>

                    <WorkoutCard img={w3} yog="Women's Beginner Workout Plan"/>

                    <WorkoutCard img={w5} yog="No Weight Workout"/>

                    <WorkoutCard img={w4} yog="Abs Workout Plan"/>

                    <WorkoutCard img={w6} yog="30-Minute Workout Plan"/>
                </div>
             </div>
        </div>
    )
}

export default Workout;
