import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Header from './Componentes/Header';
import SideBar from './Componentes/Sidebar';
import Footer from './Componentes/Footer';
import Company_Campaing_Dash from './Componentes/Company_Campaing_Dash';
import ListarCargas from './Componentes/ListarCargas';



function AdminCargas() {

    const [mostrarGrid, setMostrarGrid] = useState(false);
    const [mostrarGrid2, setMostrarGrid2] = useState(false);
    const [company, setStartCompany] = useState('');

    const [campana, setStartCampana] = useState('');

    const [selectLlamada, setSelectedLlamada] = useState('');
    const [selectLlamadaDetalle, setSelectedLlamadaDetalle] = useState('');

    const [optionList, setOptionList] = useState([]);
    const [optionListDetalle, setOptionListDetalle] = useState([]);
    const [optionListDetalleEstado, setOptionListDetalleEstado] = useState(true);
    const [optionListDetalleEstadoSelect, setOptionListDetalleEstadoSelect] = useState('0');
    const sesiones = {
        sgui: localStorage.getItem("localgui"),
        scliente: localStorage.getItem("localcliente"),
        sid: localStorage.getItem("localid"),
        sid_usuario: localStorage.getItem("localid_usuario"),
        stoken: localStorage.getItem("token")
    };

    const filtrar = (event) => {

        setStartCompany(document.getElementById("ddl_company").value)
        setStartCampana(document.getElementById("ddl_campana").value)
        setMostrarGrid(true);
        setMostrarGrid2(false);
        // setFlujo(document.getElementById("ddl_campana").options[document.getElementById("ddl_campana").selectedIndex].text)

    };

    const filtrar2 = (event) => {

        setStartCompany(document.getElementById("ddl_company").value)
        setStartCampana(document.getElementById("ddl_campana").value)
        setMostrarGrid(false);
        setMostrarGrid2(true);

        // setFlujo(document.getElementById("ddl_campana").options[document.getElementById("ddl_campana").selectedIndex].text)
    };


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
                            <div className="row mt-2 bg-light align-items-center">

                                <div className="col-sm-12 col-lg-4 mt-lg-0 mt-sm-2">
                                    <h2>Administrador de Cargas</h2>
                                </div>

                            </div>

                        </div>
                        <hr />
                        <div className='row'>
                            <div className="row mt-2 bg-light align-items-center">

                                <Company_Campaing_Dash></Company_Campaing_Dash>

                                <div className="col-sm-12 col-lg-3 mt-lg-0 mt-sm-2">
                                    {mostrarGrid === false && <button type="button" className="mb-0 btn btn-success" onClick={() => filtrar()}>Buscar</button>}
                                    {mostrarGrid === true && <button type="button" className="mb-0 btn btn-success" onClick={() => filtrar2()}>Buscar</button>}
                                </div>
                            </div>
                        </div>
                        <div className="row mt-3">

                            <div className="col-12">
                                <div className="row row-cols-1 row-cols-md-2 mb-2 text-center">
                                    <div className="col-sm-12 col-lg-12">
                                        <div className="card mb-4 rounded-3 shadow-sm">
                                            <div className="card-header">
                                                <h4 className="my-0 font-weight-normal">Cargas</h4>
                                                {/* <hr /> */}
                                            </div>
                                            <div className="card-body">
                                                <div key='123456'>
                                                    {mostrarGrid !== false && <ListarCargas company={campana} />}
                                                </div>
                                                <div key='789578'>
                                                    {mostrarGrid2 !== false && <ListarCargas company={campana} />}
                                                </div>


                                            </div>
                                        </div>
                                    </div>
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