// es lo mismo pero con los reportes en 2 componentes diferentes

import React, { useEffect, useState, useRef } from 'react';
import Header from './Componentes/Header';
import SideBar from './Componentes/Sidebar';
import Footer from './Componentes/Footer';

import ListarCargas from './Componentes/ListarCargas';
import Carga_Inacap from './Componentes/Carga_Inacap';
import Carga_USS from './Componentes/Carga_USS';
import Company_Campaing from './Componentes/Company_Campaing';

function AdminCargas2() {
    const [mostrarGridUSS, setMostrarGridUSS] = useState(false);
  const [mostrarGridInacap, setMostrarGridInacap] = useState(false);
    const [filtrar, Filtrar] = useState(false);
    const [campana, setStartCampana] = useState('');

    const HideLogo = (event) => {
        let campanas = document.getElementById("ddl_campana").value
        console.table(campanas)
    

        setStartCampana(document.getElementById("ddl_campana").value)

        if (campanas == 1) {
            setMostrarGridInacap(true);
            setMostrarGridUSS(false);
            console.log("mostrar inacap")
          }
          // setMostrarGrid(true);
          else if (campanas == 2) {
            setMostrarGridInacap(false);
            setMostrarGridUSS(true);
            console.log("mostrar USS")
          }
          else {
            // setMostrarGridUSS(false);
            // setMostrarGridInacap(false);
          }
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
                                {/* <div className=' justify-content-center  align-items-md-center'>
                                    {filtrar && <ListarCargas />}
                                </div> */}
                                {mostrarGridInacap !== false && <Carga_Inacap  />}
                                {mostrarGridUSS !== false && <Carga_USS    />}
                            </div>
                        </div>
                    </main>

                </div>
                <Footer />
            </div>


        </>
    )
}
export default AdminCargas2