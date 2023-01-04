import React, { useState, useEffect } from 'react';
import axios from "axios";
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


import ListarCargasModalDetalle from './ListarCargasModalDetalle';

function ListarCargas() {
    const [data, setData] = useState([]);
    const [excel, setExcel] = useState()
    const [authLoading, setAuthLoading] = useState(true);
    const [list_id, setListId] = useState('');

    //modal
    const [mostrarModal, setMostrarModal] = useState(false)


    const handleOnCerrar = () => {
        setMostrarModal(false)
        // setListId('')
    }

    const [mostrarModalDetalle, setMostrarModalDetalle] = useState(false)
    const [modalCarga, setDataModalCarga] = useState('');

    // const abrirModal = event =>{
    //     setMostrarModal(true)
    //     console.log("abrir modal")
    // }

    const navigate = useNavigate();
    useEffect(() => {
        const token = getToken();
        const rutaservidor = "/Orkesta/Procollect/CRM"
        if (!token) {
            // console.log('Vacio')
            navigate(rutaservidor);
            return;
        }


        axios.post('https://app.soluziona.cl/API_v1_prod/Procollect/CRM/api/Ventas_CRM/CRM/Session_check', { user: sesiones.sid_usuario, gui: sesiones.sgui }, { headers: { "Authorization": `Bearer ${sesiones.stoken}` } })
            .then(response => {

                setUserSession(sesiones.sgui, sesiones.sid_usuario);
                setAuthLoading(false);


            }).catch(error => {
                removeUserSession();
                setAuthLoading(false);
            });

        Buscar()
        componentDidMount()

    }, []);


    const sesiones = {
        sgui: localStorage.getItem("localgui"),
        scliente: localStorage.getItem("localcliente"),
        sid: localStorage.getItem("localid"),
        sid_usuario: localStorage.getItem("localid_usuario"),
        stoken: localStorage.getItem("token")
    };

    // 
    const componentDidMount = () => {
        // if (!$.fn.DataTable.isDataTable("#tbl_acumulado_dia")) {
        //     $(document).ready(function () {
        setTimeout(function () {
            $("#tbl_acumulado_dia").DataTable({
                destroy: true,
                language: {
                    url: "//cdn.datatables.net/plug-ins/1.11.3/i18n/es-cl.json"
                },
                paging: true,
                pageLength: 10,
                scrollX: true,
                sScrollXInner: "100%",
                dom: "frtip"

            });
        }, 1000);
        //     });
        // }
    }

    const Buscar = (async () => {

        var flujo = document.getElementById("ddl_campana").value;
        const result = await axios.post('https://app.soluziona.cl/API_v1_prod/Procollect/CRM/api/Ventas_CRM/CRM/DetalleCargas/CargasDetalleResumenDash/Full', { dato: flujo }, { headers: { "Authorization": `Bearer ${sesiones.stoken}` } })

        if (result.status === 200) {

            console.log(result.data)
            setData(result.data);
            // var arrr = result.data;

            // arrr.forEach((element) => {
            //     console.log(element.id);

            // });

        }

    })

    const Liberar = (async (liberar) => {


        const result = await axios.post('https://app.soluziona.cl/API_v1_prod/Procollect/CRM/api/Ventas_CRM/CRM/DetalleCargasAdmin/CargasDetalleResumenDashDetalleActivar', { dato_2: liberar }, { headers: { "Authorization": `Bearer ${sesiones.stoken}` } })

        if (result.status === 200) {

            console.log(result.data)
            toast('Registros Liberados.')
            Buscar()
            setData(result.data);
            // var arrr = result.data;

            // arrr.forEach((element) => {
            //     console.log(element.id);

            // });

        }else{

            toast('Registros No Liberados.')
            Buscar()
        }
    })


    const Bloquear = (async (bloquear) => {


        console.log(bloquear)
        const result = await axios.post('https://app.soluziona.cl/API_v1_prod/Procollect/CRM/api/Ventas_CRM/CRM/DetalleCargasAdmin/CargasDetalleResumenDashDetalleBlock', { dato_2: bloquear }, { headers: { "Authorization": `Bearer ${sesiones.stoken}` } })

        if (result.status === 200) {

            console.log(result.data)
            toast('Registros Bloqueados.')
            setData(result.data);
            Buscar()
            // var arrr = result.data;

            // arrr.forEach((element) => {
            //     console.log(element.id);

            // });

        }else{

            toast('Registros No Bloqueados.')
            Buscar()
        }

    })


    if (authLoading && getToken()) {
        return <div className="content">Checking Authentication...</div>

    }



    // const detalleModal = (carga) => {

    //     alert(carga)
    //     setDataModalCarga(carga)
    //     setMostrarModal(true)

    //     alert(modalCarga)
    // }

    return (
        <>
          
          <ToastContainer />
                <table id="tbl_acumulado_dia" className="table table-striped table-sm text-nowrap text-sm" width="100%">
                    <thead>
                        <tr>
                            <th>Fecha carga</th>
                            <th>Nombre</th>
                            <th>Cargado</th>
                            <th>Recorrido</th>
                            <th>Conecta</th>
                            <th>No Conecta</th>
                            <th>Porcentaje Recorrido</th>
                            <th>Porcentaje No Recorrido</th>
                            <th>Porcentaje Contactabilidad</th>
                            <th>Accion</th>

                        </tr>
                    </thead>
                    <tbody>
                        {data.map((data, index) => (
                            <tr key={data.camp_2}>
                                <td>{data.camp_1}</td>
                                <td>{data.camp_2}</td>
                                <td>{data.camp_3}</td>
                                <td>{data.camp_3}</td>
                                <td>{data.camp_4}</td>
                                <td>{data.camp_5}</td>
                                <td>{data.camp_6}%</td>
                                <td>{data.camp_7}%</td>
                                <td>{data.camp_9}%</td>
                                <td>
                                    <div className="d-flex bd-highlight">
                                        <div className="p-2 flex-fill bd-highlight"><button onClick={() => (setDataModalCarga(data.camp_2), setMostrarModal(true), setListId(data.camp_2))} data-bs-toggle="modal" data-bs-target="#staticBackdrop" className="btn btn-success">Detalle</button></div>
                                        <div className="p-2 flex-fill bd-highlight"><button onClick={() => (Liberar(data.camp_2))} className="btn btn-success">Activar</button></div>
                                        <div className="p-2 flex-fill bd-highlight"><button onClick={() => (Bloquear(data.camp_2))} className="btn btn-danger">Bloquear</button></div>
                                    </div>
                                </td>
                            </tr>
                        ))}

                    </tbody>

                </table>
                {/* <Modal onCierre={handleOnCerrar} visible={mostrarModal}/> */}


                <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog modal-xl">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="staticBackdropLabel">Detalle <label id="list_id_liberar">{list_id}</label></h5>

                            </div>
                            <div className="modal-body">
                                <div className="table-responsive">
                                    {mostrarModal !== false && <ListarCargasModalDetalle detalleModal={modalCarga} />}
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => handleOnCerrar()}>Cerrar</button>
                                {/* <button type="button" className="btn btn-primary">Understood</button> */}
                            </div>
                        </div>
                    </div>
                </div>

        </>
    )
}
export default ListarCargas
