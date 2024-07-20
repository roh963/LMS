import React from 'react'

import {BsInstagram,BsLinkedin,BsTwitter ,BsGithub ,BsFacebook} from 'react-icons/bs';
export default function Footer() {
  const currentDate =new Date()
  const year = currentDate.getFullYear()
  return (
    <>
       <footer className="relative left-0 bottom-0  bg-slate-800 h-[10vh]   py-5    flex-col sm:flex-row items-center justify-between text-indigo-100 sm:px-20">

          <section className="text-lg  text-red-300">
            Copy right {year} | All rights reserved
          </section>
          <section className=" flex sm:flex-row items-center justify-end  text-2xl gap-5 text-white">
            <a href="*" className="hover:text-yellow-500 transition-all ease-in-out duration-300">
              <BsInstagram className="icon" />
            </a>
             <a href="*" className="hover:text-yellow-500 transition-all ease-in-out duration-300">
                <BsLinkedin className="icon" />
             </a>
            <a href="*" className="hover:text-yellow-500 transition-all ease-in-out duration-300">
              <BsTwitter className="icon" />
            </a>
            <a href="*" className="hover:text-yellow-500 transition-all ease-in-out duration-300">
              <BsGithub className="icon" />
            </a>
            <a href="*" className="hover:text-yellow-500 transition-all ease-in-out duration-300">
              <BsFacebook className="icon" />
            </a>
          </section>

       </footer>
    </>
  )
}
