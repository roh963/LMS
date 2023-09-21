import Footer from '../component/Footer'

import {FiMenu} from "react-icons/fi"
import {AiFillCloseCircle} from "react-icons/ai"

import {useDispatch, useSelector} from  "react-redux"
import { Link, useNavigate } from "react-router-dom";
function HomeLayout({children}) {
        
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // for checking if user is logged in 
     const isLoggedIn =useSelector((state)=> state?.auth?.isLOggedIn);

    // for displaying the options acc to role 
     const role = useSelector((state)=> state?.auth?.role );

    function changewidth(){
        const drawerSide = document.getElementsByClassName("drawer-side")
        drawerSide[0].style.width = "auto";
    }
    function hiddenDrawer() {
        const element = document.getElementsByClassName("drawer-toggle");
        element[0].checked = false; 
        const drawerSide = document.getElementsByClassName("drawer-side")
        drawerSide[0].style.width = '0';
    }
    function handleLogout(e) {
       e.preventDefault();
    //    const res = await dispatch(logout());
    // if(res?playload?.success)
    navigate("/");
    }
    
    return(
        <div className="min-h-[90vh] bg-gray-900 ">
             <div className="drawer absolute left-0 z-50 m-fit">
                 <input id="my-drawer"  className="drawer-toggle"  type="checkbox" />
                <div className="drawer-content">
                 <label htmlFor="my-drawer" className=" cursor-pointer relative "> 
                  <FiMenu
                   onClick={changewidth}  size={"32px"} className="font-bold text-white m-4"
                 /> 
                 </label>

                </div>
                <div className="drawer-side w-0  text-gray-950 ">
                  <label htmlFor="my-drawer" className="drawer-overlay "></label>
                  <ul className="menu  pt-10 px-4   h-40  w-48 sm:w-80 sm:h-60     bg-gray-900 text-base-content  relative  ">
                 
                    <li className="w-fit absolute right-2 z-50  font-bold text-white " > 
                    <button onClick={hiddenDrawer}>
                     <AiFillCloseCircle size={24}/>
                    </button> 
                    </li>
                    <li className="font-bold text-white">
                        <Link to="/">Home</Link>
                    </li>
                    {
                        isLoggedIn && role === 'ADMIN' && ( 
                          <li>
                            <Link to={"/admin/dashboard"}>Admin  DashBoard</Link>
                          </li>

                        )
                    }
                    <li className="font-bold text-white">
                        <Link to="/courses"  >All Courses</Link>
                    </li>
                    <li className="font-bold text-white">
                        <Link to="/contact"  >Contact Us</Link>
                    </li>
                    <li className="font-bold text-white">
                        <Link to="/about"  > About Us</Link>
                    </li>
                    {!isLoggedIn && (
                       <li className=" absolute bottom-4  ">
                       <div className="w-full items-center justify-center"> 
                        <button className=' btn-primary px-4 py-1 font-semibold rounded-md w-full'>
                            <Link to="/login">LogIn</Link>
                        </button>
                        <button className=' btn-secondary  px-4 py-1 font-semibold rounded-md w-full'>
                            <Link to="/signin">SignIN</Link>
                        </button>
                        </div>
                       </li>
                    )}
                    {isLoggedIn && (
                       <li className=" absolute bottom-4 w-[90%] ">
                       <div className="w-full items-center justify-center"> 
                        <button className=' btn-primary px-4 py-1 font-semibold rounded-md w-full'>
                            <Link to="/user/profile">Profile</Link>
                        </button>
                        <button className=' btn-secondary  px-4 py-1 font-semibold rounded-md w-full'>
                            <Link onClick={handleLogout}>Logout</Link>
                        </button>
                        </div>
                       </li>
                    )}
                  </ul>
                 </div>
             </div>
             {children}
            <Footer/>
        </div>
    )
}
export default HomeLayout;