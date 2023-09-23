import HomeLayout from "../homeLayout/HomeLayout";
import aboutMainPage from "../Assets/images/aboutMainImage.png"
import CarousalSlide from "../component/CarousalSlide";
import { celebrities } from "../constant/CelebrityData";

function AboutUs(){
return(<HomeLayout cl>
    <div className="pl-20 pt-20 flex flex-col text-white">
        <div className=" flex items-center gap-5 mx-10 ">
           <section className=" w-1/2 space-y-10 ">
            <h1 className=" text-5xl text-yellow-500 font-semibold">
                Affordable and quality eduction 
            </h1>
            <p className="text-xl text-gray-200">
                Our goal is to provide th afordable and quality eduction.
                We are providing the platform the aspiring teacher and  to the stidents.
                their skills  ,creativity and knowledge to each other to enahnce their knowledge.
            </p>
            </section>
            <div className="w-1/2">
                <img
                id="test1"
                style={{
                    filter:" drop-shadow(0px 10px rgb(0,0,0))"
                }}
                alt="about main image"
                className=" drop-shadow-2xl"
                src={aboutMainPage}  />
            </div>
        </div>
    </div>
    <div className="carousel  w-1/2 m-auto my-16 mx-52  ">
    {celebrities && celebrities.map(celebrity =>
                                   (<CarousalSlide 
                                              {...celebrity} 
                                              key={celebrity.slideNumber} 
                                               totalSlides={celebrities.length} />))}
                   
   </div>
</HomeLayout>);
}
export default AboutUs;