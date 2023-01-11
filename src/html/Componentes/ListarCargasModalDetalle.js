import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Modal } from "./Modal";
import { useNavigate } from 'react-router-dom';
import { getToken, removeUserSession, setUserSession } from './Common';
import 'bootstrap/dist/css/bootstrap.min.css';

import { ToastContainer, toast } from "react-toastify";

import "jquery/dist/jquery.min.js";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import "datatables.net-buttons/js/dataTables.buttons.js";
import "datatables.net-buttons/js/buttons.colVis.js";
import "datatables.net-buttons/js/buttons.flash.js";
import "datatables.net-buttons/js/buttons.html5.js";
import "datatables.net-buttons/js/buttons.print.js";
import $ from "jquery";



function ListarCargasModalDetalle({ detalleModal }) {

    const [data, setData] = useState([]);
    const [excel, setExcel] = useState()
    const [authLoading, setAuthLoading] = useState(true);

    //modal
    const [mostrarModal, setMostrarModal] = useState(false)
    const handleOnCerrar = () => setMostrarModal(false)

    const navigate = useNavigate();

    const sesiones = {
        sgui: localStorage.getItem("localgui"),
        scliente: localStorage.getItem("localcliente"),
        sid: localStorage.getItem("localid"),
        sid_usuario: localStorage.getItem("localid_usuario"),
        stoken: localStorage.getItem("token")
    };

    useEffect(() => {
        const token = getToken();

        const rutaservidor = "/Orkesta/CallSouth/LosHeroes/CRM"
        if (!token) {
            // console.log('Vacio')
            navigate(rutaservidor);
            return;
        }

        // console.log(sesiones.stoken)
        DetalleModal()
            // componentDidMount()
    }, []);

    const DetalleModal = (async() => {


        console.log(detalleModal)


        const result = await axios.post('https://app.soluziona.cl/API_v1_prod/CallSouth/API_CallSouth_CRM_LosHeroes/api/Ventas_CRM/CRM/DetalleCargasAdmin/CargasDetalleResumenDashDetalle', { dato: detalleModal }, { headers: { "Authorization": `Bearer ${sesiones.stoken}` } })

        if (result.status === 200) {

            console.log(result.data)
            setData(result.data);

        }

    })

    const liberarRegistros = (async(codigo) => {

        // console.log(codigo)

        const result = await axios.post('https://app.soluziona.cl/API_v1_prod/CallSouth/API_CallSouth_CRM_LosHeroes/api/Ventas_CRM/CRM/DetalleCargasAdmin/CargasDetalleResumenDashDetalleLiberar', { dato: codigo, dato_2: detalleModal }, { headers: { "Authorization": `Bearer ${sesiones.stoken}` } })

        if (result.status === 200) {

            console.log(result.data)
            toast('Registros Liberados.')
            setData(result.data);
            // var arrr = result.data;

            // arrr.forEach((element) => {
            //     console.log(element.id);

            // });

        } else {

            toast('Registros No Liberados.')
        }

    })
    const componentDidMount = () => {
        // if (!$.fn.DataTable.isDataTable("#tbl_detalle_cargas")) {
        //     $(document).ready(function () {

        setTimeout(function() {
            $("#tbl_detalle_cargas").DataTable({
                destroy: true,
                language: {
                    url: "//cdn.datatables.net/plug-ins/1.11.3/i18n/es-cl.json"
                },
                paging: true,
                pageLength: 10,
                dom: "frtip"

            });
        }, 1000);
        //     });
        // }
    }

    return ( <
        >

        <
        ToastContainer / >
        <
        table id = "tbl_detalle_cargas"
        className = "table-striped table-sm text-nowrap text-sm"
        width = "100%" >
        <
        thead >
        <
        tr >
        <
        th > Llamado < /th> <
        th > Llamado Detalle < /th> <
        th > Cantidad < /th> <
        th > < /th>

        <
        /tr> <
        /thead> <
        tbody > {
            data.map((data, index) => ( <
                tr key = { index + 1 } >
                <
                td > { data.llamado } < /td> <
                td > { data.detalle } < /td> <
                td > { data.candidad } < /td> <
                td > < button onClick = {
                    () => liberarRegistros(data.codigo) }
                className = "btn btn-primary" > Liberar < /button></td >
                <
                /tr>
            ))
        }

        <
        /tbody>

        <
        /table>

        <
        />
    )
}
export default ListarCargasModalDetalle