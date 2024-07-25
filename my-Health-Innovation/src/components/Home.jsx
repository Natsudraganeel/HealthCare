import React from 'react';
import homeBg from '../assets/img/home_bg2.jpg'; 

const Home=()=>{
     const backgroundImage = `url(${homeBg})`;
    return (
        
        <div className="min-h-screen flex flex-col justify-center lg:px-32 px-5 text-black  bg-gradient-to-b from-green-200 to-green-300 bg-no-repeat bg-cover" style={{ backgroundImage: backgroundImage }}>
            <div className="w-full  lg:w-4/5 space-y-5 mt-10 ">
       
                 <h1 className="text-5xl font-bold leading-tight ">Empowering Health Choices for a Vibrant Life Your Trusted..</h1>
                 <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magni vel minima aut accusamus, doloribus quaerat. Laborum voluptatum mollitia sed ut iste earum! Ducimus, quia quibusdam esse illo magni earum saepe?</p>

                 <a href="https://en.wikipedia.org/wiki/Health_care" target="_blank" rel="noopener noreferrer">
  <button className='bg-brightColor text-white px-4 py-2 rounded-md hover:bg-hoverColor transition duration-300 ease-in-out'>
    Explore more...
  </button>
</a>
             </div>
            
        </div>
    )
}

export default Home;
// className="min-h-screen flex flex-col justify-center lg:px-32 py-5 text-white bg-[url('assets/img/home_bg.jpeg')] bg-no-repeat bg-cover opacity-90"
