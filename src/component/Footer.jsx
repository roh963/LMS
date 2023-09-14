import { BsFacebook ,BsInstagram, BsLinkedin ,BsTwitter} from 'react-icons/bs'
function Footer() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    return(
        <>
            <footer className=" bg-gray-800 relative left-0 bottom-0 h-[8vh] py-4 px-1 flex flex-row sm:flex-row  items-start justify-between  ">
                 
                 <section className="text-lg text-lime-50 font-bold">
                    Copyright {year} | All right reserved 
                 </section>
                 <section className='flex items-center justify-center gap-5 text-2xl text-white'>
                    <a className="hover:text-blue-300 hover:font-bold transition-all ease-in-out duration-300 cursor-pointer" >     <BsFacebook className='hover:h-8 hover:w-8 '/> </a>
                
                    <a className="hover:text-pink-200 hover:font-bold transition-all ease-in-out duration-300 cursor-pointer" >     <BsInstagram className='hover:h-8 hover:w-8  hover:font-bold '/> </a>
                 
                    <a className="hover:text-sky-300 hover:font-bold transition-all ease-in-out duration-300 cursor-pointer" >     <BsLinkedin className='hover:h-8 hover:w-8 '/> </a>
                 
                    <a className="hover:text-sky-600 hover:font-bold transition-all ease-in-out duration-300 cursor-pointer" >     <BsTwitter className='hover:h-8 hover:w-8'/> </a>
                
                    
                 </section>
            </footer>
        </>
    )
}
export default Footer