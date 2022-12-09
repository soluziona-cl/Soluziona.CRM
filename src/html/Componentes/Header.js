import React from "react"
import { useNavigate } from "react-router-dom";
import "../../css/general.css"
import 'bootstrap/dist/css/bootstrap.min.css';

function Header() {

    const navigate = useNavigate();
    const handleLogout = () => {

        navigate(rutaservidor);
    };

    const rutaservidor = "/";
    // const rutaservidor = "/Orkesta_CallSouth_Salcobrand";

    return (
        <>  
            
            <div className="px-4 top-0 " id="header">
                <div className="d-flex flex-wrap justify-content-between align-items-center py-0 my-4 m-3">
                    <div className="justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
                        <span className="" style={{ color: 'white' }}>Control CRM Orkesta Procollect</span>
                    </div>
                    <div className="flex items-center">
                        <button 
                            onClick={handleLogout}
                            className="btn btn-danger sm" 
                        ><i class="fa-solid fa-right-from-bracket m-2"></i>
                             Salir
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Header;
