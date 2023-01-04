import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Header from './Componentes/Header';
import SideBar from './Componentes/Sidebar';
import Footer from './Componentes/Footer';

import ListarCargas from './Componentes/ListarCargas';



function AdminCargas() {
    const [filtrar, Filtrar] = useState(false);

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

    useEffect(() => {
        Company(sesiones.sid)
    }, []);

    const Company = (async (company) => {

        const result = await axios.post('https://app.soluziona.cl/API_v1_prod/Procollect/CRM/api/Ventas_CRM/CRM/Flujo_Company', { dato: company }, { headers: { "Authorization": `Bearer ${sesiones.stoken}` } })

        if (result.status === 200) {
            setOptionList(result.data)

            // console.log(result.data)
            //  console.log(optionList)

        }

    })

    const ChangeConecta = (async (event) => {

        if (event === '0') {
            setOptionListDetalleEstado(true)
            setOptionListDetalleEstadoSelect('0')
            setSelectedLlamada('0')
        }
        else {
            const result = await axios.post('https://app.soluziona.cl/API_v1_prod/Procollect/CRM/api/Ventas_CRM/CRM/Campaign', { dato: event }, { headers: { "Authorization": `Bearer ${sesiones.stoken}` } })

            setSelectedLlamada(event)

            if (result.status === 200) {

                setOptionListDetalle(result.data)
                setOptionListDetalleEstado(false)

            }
        }


    })

    const ChangeConectaDetalle = (async (event) => {

        setOptionListDetalleEstado(false)
        setOptionListDetalleEstadoSelect(event)
        setSelectedLlamadaDetalle(event)


        if (filtrar === true) {
            Filtrar(false)
            HideLogo()
        }


    })
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
                                <div className="row mb-2">
                                    <div className="col-12 ">
                                        <div className="row row-cols-1 row-cols-md-2 mb-2 text-center">
                                            <div className="col-sm-12 col-lg-12">
                                                <div className="card mb-4 rounded-3 shadow-sm">
                                                    <div className="card-header">
                                                        <div className="row mt-2 bg-light align-items-center">
                                                            <div className="col-sm-12 col-lg-3 mt-lg-0 mt-sm-2">
                                                                <select className="form-control form-select" id="ddl_company"
                                                                    disabled={false}
                                                                    // value={select}
                                                                    onChange={(e) => (ChangeConecta(e.target.value))}>
                                                                    <option value="0">Compañia</option>
                                                                    {optionList.map((item) => (
                                                                        <option key={item.id} value={item.id}>
                                                                            {item.detalle}
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                            <div className="col-sm-12 col-lg-3 mt-lg-0 mt-sm-2">
                                                                <select className="form-control form-select" id="ddl_campana"
                                                                    disabled={optionListDetalleEstado}
                                                                    value={optionListDetalleEstadoSelect}
                                                                    onChange={(e) => (ChangeConectaDetalle(e.target.value))}
                                                                >
                                                                    <option value="0">Campaña</option>
                                                                    {optionListDetalle.map((item) => (
                                                                        <option key={item.id} value={item.id}>
                                                                            {item.detalle}
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                            <div className="col-sm-12 col-lg-3 mt-lg-0 mt-sm-2">
                                                                <button className="mb-0 btn btn-success" id="btn_show_gestion" onClick={HideLogo}>Filtrar</button>
                                                            </div>
                                                        </div>
                                                        <div className="card-body bg-white mt-2">
                                                            <div className=' justify-content-center  align-items-md-center'>
                                                                <div className="table-responsive mt-2">
                                                                    {filtrar && <ListarCargas />}

                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>
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