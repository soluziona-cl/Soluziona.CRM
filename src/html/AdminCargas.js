import React, { useEffect, useState ,useRef} from 'react';
import Header from './Componentes/Header';
import SideBar from './Componentes/Sidebar';
import Footer from './Componentes/Footer';

import ListarCargas from './Componentes/ListarCargas';
import Company_Campaing from './Componentes/Company_Campaing';


function AdminCargas() {
    const [filtrar, Filtrar] = useState(false);

    const HideLogo = () => {
        // setshowlogo(!showlogo);
        Filtrar(!filtrar)
    
      }

    return (
        <>
            <div className='d-block'>
                <Header />  
                <div>
                    <SideBar />
                    
                </div>
            </div>
            <div className=' justify-content-center align-items-center'>
                        <Company_Campaing />
                        <button className="btn btn-info form-control mt-2" id="btn_show_gestion" onClick={HideLogo}>Filtrar</button>
                    </div>
                    <div className=' justify-content-center  align-items-md-center'>
                        {filtrar && <ListarCargas />}
                    </div>
            <Footer />
        </>
    )
}
export default AdminCargas