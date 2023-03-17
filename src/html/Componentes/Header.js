import React from "react"
import { useNavigate } from "react-router-dom";
import "../../css/general.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import { getToken, removeUserSession, setUserSession } from '../Componentes/Common';

function Header() {

    const navigate = useNavigate();
    const handleLogout = () => {

        removeUserSession();
        navigate(rutaservidor);
    };

   // const rutaservidor="/"; //Pruebas
   const rutaservidor = "/Orkesta/CallSouth/LosHeroes/CRM"; //Produccion
   
    return (
        <>  
            
            <div className=" top-0 " id="header">
                <div className=" justify-content-around align-content-around  py-0 my-4 m-3">
                    <div className=" align-content-around justify-content-around   " id="mobile-menu-2">
                        <span className="" style={{ color: 'white' }}>Control CRM Orkesta LOS HEROES</span>
                    </div>
                    <div className=" my-2 position-absolute end-0 translate-middle">
                        <button 
                            onClick={handleLogout}
                            className="btn btn-danger sm" 
                        ><i className="fa-solid fa-right-from-bracket m-2"></i>
                             Salir
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Header;
