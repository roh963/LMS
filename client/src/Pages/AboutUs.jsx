import React from 'react'
import HomeLayout from "../Layouts/HomeLayout"
import aboutMainImage from "../Assets/images/aboutMainImage.png"
import Apj from "../Assets/images/apj.png"
import nm from "../Assets/images/nelsonMandela.png"
import  billg   from "../Assets/images/billGates.png"
import  steve   from "../Assets/images/steveJobs.png"
import  einstein  from "../Assets/images/einstein.png"
import CoarousalSlide from '../components/CoarousalSlide'
import {celebrities} from "../Constants/CelebirtyData"

function AboutUs() {
  return (
    <HomeLayout>
       <div className="pl-20 pt-20 flex flex-col text-white">
        <div className="flex item-center  gap-5 mx-5">
             <section className="w-1/2 space-y-10">
             <h1 className="text-5xl text-yellow-500 font-semibold">
                            Affordable and quality education
            </h1>
            <p className="text-xl text-gray-200">
                            Our goal is to provide the afoordable and quality education to the world. 
                            We are providing the platform for the aspiring teachers and students to share
                            their skills, creativity and knowledge to each other to empower and contribute
                            in the growth and wellness of mankind.  
            </p>
            <div className="carousel w-1/10 m-auto my-16">
           {celebrities && celebrities.map(celebrity => (<CoarousalSlide 
                                                                    {...celebrity} 
                                                                    key={celebrity.slideNumber} 
                                                                    totalSlides={celebrities.length}

                                                                />))}
        </div>
             </section>
             <div className="w-1/2">
                        <img
                            id="test1"
                            style={{
                                filter: "drop-shadow(0px 10px 10px rgb(0,0,0))"
                              }}
                            alt="about main image"
                            className="drop-shadow-2xl"
                            src={aboutMainImage}
                        />
             </div>
        </div>
       
        


       </div>
    </HomeLayout>
  )
}

export default AboutUs