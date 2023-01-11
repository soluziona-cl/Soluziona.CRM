// es lo mismo pero con los reportes en 2 componentes diferentes

import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Header from './Componentes/Header';
import SideBar from './Componentes/Sidebar';
import Footer from './Componentes/Footer';

// import ListarCargas from './Componentes/ListarCargas';
import Carga_Inacap from './Componentes/Carga_Inacap';
import Carga_USS from './Componentes/Carga_USS';
// import Company_Campaing from './Componentes/Company_Campaing';

function AdminCargas2() {
    const [mostrarGridUSS, setMostrarGridUSS] = useState(false);
    const [mostrarGridInacap, setMostrarGridInacap] = useState(false);
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

    const Company = (async(company) => {

        const result = await axios.post('https://app.soluziona.cl/API_v1_prod/CallSouth/API_CallSouth_CRM_LosHeroes/api/Ventas_CRM/CRM/Flujo_Company', { dato: company }, { headers: { "Authorization": `Bearer ${sesiones.stoken}` } })

        if (result.status === 200) {
            setOptionList(result.data)

            // console.log(result.data)
            //  console.log(optionList)

        }

    })

    const ChangeConecta = (async(event) => {

        if (event === '0') {
            setOptionListDetalleEstado(true)
            setOptionListDetalleEstadoSelect('0')
            setSelectedLlamada('0')
        } else {
            const result = await axios.post('https://app.soluziona.cl/API_v1_prod/CallSouth/API_CallSouth_CRM_LosHeroes/api/Ventas_CRM/CRM/Campaign', { dato: event }, { headers: { "Authorization": `Bearer ${sesiones.stoken}` } })

            setSelectedLlamada(event)

            if (result.status === 200) {

                setOptionListDetalle(result.data)
                setOptionListDetalleEstado(false)

            }
        }


    })

    const ChangeConectaDetalle = (async(event) => {

        setOptionListDetalleEstado(false)
        setOptionListDetalleEstadoSelect(event)
        setSelectedLlamadaDetalle(event)

    })

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
        } else {
            // setMostrarGridUSS(false);
            // setMostrarGridInacap(false);
        }
    }
    return ( <
        >

        <
        div className = "container-fluid" >
        <
        div className = "row flex-nowrap" > < Header / > < /div> <
        div className = "row flex-nowrap" >
        <
        div className = "col-auto px-0" >
        <
        div id = "sidebar"
        className = "collapse collapse-horizontal show border-end" >
        <
        SideBar / >
        <
        /div> <
        /div> <
        main className = "col ps-md-2 pt-2" >
        <
        a href = "#"
        data - bs - target = "#sidebar"
        data - bs - toggle = "collapse"
        className = "border rounded-3 p-1 text-decoration-none" > < i className = "fa-solid fa-bars py-2 p-1" > < /i> Menu</a >
        <
        div className = "page-header pt-3" >
        <
        h2 > Administrador de Cargas < /h2> <
        /div> <
        hr / >
        <
        div className = "row" >
        <
        div className = "col-12" >
        <
        div className = "row mb-2" >
        <
        div className = "page-header pt-3" >
        <
        h3 > Filtros < /h3> <
        /div> <
        div className = "col-sm-12 col-lg-3" >
        <
        select className = "form-control form-select"
        id = "ddl_company"
        disabled = { false }
        // value={select}
        onChange = {
            (e) => (ChangeConecta(e.target.value)) } >
        <
        option value = "0" > Compañia < /option> {
            optionList.map((item) => ( <
                option key = { item.id }
                value = { item.id } > { item.detalle } <
                /option>
            ))
        } <
        /select> <
        /div> <
        div className = "col-sm-12 col-lg-3 mt-sm-2 mt-lg-0" >
        <
        select className = "form-control form-select"
        id = "ddl_campana"
        disabled = { optionListDetalleEstado }
        value = { optionListDetalleEstadoSelect }
        onChange = {
            (e) => (ChangeConectaDetalle(e.target.value)) } >
        <
        option value = "0" > Campaña < /option> {
            optionListDetalle.map((item) => ( <
                option key = { item.id }
                value = { item.id } > { item.detalle } <
                /option>
            ))
        } <
        /select> <
        /div> <
        /div> <
        button className = "btn btn-info form-control"
        id = "btn_show_gestion"
        onClick = { HideLogo } > Filtrar < /button> {
            /* <div className=' justify-content-center  align-items-md-center'>
                                                {filtrar && <ListarCargas />}
                                            </div> */
        } { mostrarGridInacap !== false && < Carga_Inacap / > } { mostrarGridUSS !== false && < Carga_USS / > } <
        /div> <
        /div> <
        /main>

        <
        /div> <
        Footer / >
        <
        /div>


        <
        />
    )
}
export default AdminCargas2