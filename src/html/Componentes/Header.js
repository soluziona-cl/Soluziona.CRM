import React from "react"
import { useNavigate } from "react-router-dom";

function Header() {

    const navigate = useNavigate();
    const handleLogout = () => {

        navigate(rutaservidor);
    };

    const rutaservidor = "/";

    return (
        <>
            <nav className=" h-full bg-slate-500 border-gray-200">
                <div className="d-flex flex-wrap justify-content-between align-items-center py-0 my-4 m-3 border-bottom">
                    <div className="justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
                        <span className="">Control CRM Orkesta Salcobrand</span>
                    </div>
                    <div className="flex items-center">

                        <button
                            onClick={handleLogout}
                            className=' text-gray-200 focus:ring-4 focus:ring-gray-300 focus:outline-none btn btn-danger sm'
                        ><i class="fa-solid fa-right-from-bracket mr-4"></i>
                            Salir
                        </button>

                    </div>

                </div>
            </nav>
        </>
    )
}
export default Header;
