import React, { useEffect, useState, useRef } from 'react';
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

            <div className="container-fluid">
                <div className="row flex-nowrap"><Header /></div>
                <div className="row flex-nowrap">
                    <div className="col-auto px-0">
                        <div id="sidebar" className="collapse collapse-horizontal show border-end">
                            <SideBar />
                        </div>
                    </div>
                    <main className="col ps-md-2 pt-2">
                        <a href="#" data-bs-target="#sidebar" data-bs-toggle="collapse" className="border rounded-3 p-1 text-decoration-none"><i className="fa-solid fa-bars py-2 p-1"></i> Menu</a>
                        <div className="page-header pt-3">
                            <h2>Administrador de Cargas</h2>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-12">
                                <Company_Campaing />
                                <button className="btn btn-info form-control" id="btn_show_gestion" onClick={HideLogo}>Filtrar</button>
                                <div className=' justify-content-center  align-items-md-center'>
                                    {filtrar && <ListarCargas />}
                                </div>
                            </div>
                        </div>
                    </main>

                </div>
                <Footer />
            </div>


        </>
    )
}
export default AdminCargas