import React from "react"
import { useNavigate } from "react-router-dom";

function Header() {

    const navigate = useNavigate();
    const handleLogout = () => {
     
      navigate(rutaservidor);
    };
  
    const rutaservidor = "/Orkesta_CallSouth_Salcobrand";

    return (
        <>
            <nav className=" h-full bg-slate-500 border-gray-200 px-4  py-2.5 ">
                <div className="flex flex-wrap justify-between items-center mx-auto">    
                    <div className="flex items-center lg:order-2">

                        <button
            onClick={handleLogout}
            className=' text-gray-200 bg-slate-400 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5  focus:outline-none '
          ><i class="fa-solid fa-right-from-bracket mr-2"></i>
              Salir 
          </button>
                
                    </div>
                    <div className="justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
                        <span className="text-xl text-gray-200 px-10">Control CRM Orkesta Salcobrand</span>
                    </div>
                </div>
            </nav>
        </>
    )
}
export default Header;
