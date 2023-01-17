import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { getToken, removeUserSession, setUserSession } from './Common';
import 'bootstrap/dist/css/bootstrap.min.css';
import DotLoader from "react-spinners/DotLoader";
import { ToastContainer, toast } from "react-toastify";
import DataTable from 'react-data-table-component';


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

function ReporteCargaTablaResumen({ company }) {
    const [data, setData] = useState([]);
    const [excel, setExcel] = useState()
    const [authLoading, setAuthLoading] = useState(true);
    const [list_id, setListId] = useState('');

    //modal
    const [mostrarModal, setMostrarModal] = useState(false)
    const sesiones = {
        sgui: localStorage.getItem("localgui"),
        scliente: localStorage.getItem("localcliente"),
        sid: localStorage.getItem("localid"),
        sid_usuario: localStorage.getItem("localid_usuario"),
        stoken: localStorage.getItem("token")
    };

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
    const [loading, setLoading] = useState(false)

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
        // componentDidMount()

    }, []);




    const Buscar = (async () => {



        const result = await axios.post('https://app.soluziona.cl/API_v1_prod/Procollect/CRM/api/Ventas_CRM/CRM/DetalleCargas/CargasDetalleResumenDash/Full', { dato: company }, { headers: { "Authorization": `Bearer ${sesiones.stoken}` } })

        if (result.status === 200) {

            console.log(result.data)
            setData(result.data);
        }


    })

    const Detalle = (async (detalle) => {

       setLoading(true);
        const result = await axios.post('https://app.soluziona.cl/API_v1_prod/Procollect/CRM/api/Ventas_CRM/CRM/DetalleCargas/CargasDetalleResumenDash/Full/Detalle',
            { dato: detalle, dato_1: document.getElementById("ddl_campana").value },
            { headers: { "Authorization": `Bearer ${sesiones.stoken}` } })

        if (result.status === 200) {

            console.log(result.data)
            // toast(<a href='https://app.siptelchile.cl/Api_Correo/Procollect/Resultante_Carga_UGM_20230117__20230116.xlsx'>Descargar Archivo</a>)
            // Buscar()
            // setData(result.data);
            var arrr = result.data;

            arrr.forEach((element) => {
                toast(<a href={element.message} target="_blank">Descargar Archivo {element.message}</a>)
                // console.log(element.id);

            });

            setLoading(false);

        } else {

            setLoading(false);
            toast('Archivo No Generado')
            // Buscar()
        }
    })




    if (authLoading && getToken()) {
        return <div className="content">Checking Authentication...</div>

    }



    const customStyles = {
        rows: {
            style: {
                minHeight: '60px', // override the row height
                maxHeight: '70px',
                border: '2px solid #a9dff0',
                borderRadius: '3px'
            },
        },
        headCells: {
            style: {
                paddingLeft: '8px', // override the cell padding for head cells
                paddingRight: '8px',
                backgroundColor: '#a9dff0',

            },
        },
        cells: {
            style: {
                paddingLeft: '8px', // override the cell padding for data cells
                paddingRight: '8px',
                fontSize: '16px',


            },
        },
    };


    const columns = [
        {
            name: 'Fecha carga',
            selector: row => row.camp_1,
            center: true
        },
        {
            name: <div className="text-wrap">Nombre</div>,
            selector: row => row.camp_2,
            center: true
        },
        {
            name: <div className="text-wrap">Cargado</div>,
            selector: row => row.camp_3,
            center: true
        },
        {
            name: <div className="text-wrap">Recorrido</div>,
            selector: row => row.camp_3,
            center: true
        },
        {
            name: <div className="text-wrap">Conecta</div>,
            selector: row => row.camp_4,
            center: true
        },
        {
            name: <div className="text-wrap">No Conecta</div>,
            selector: row => row.camp_5,
            center: true
        },
        {
            name: <div className="text-wrap">Porcentaje Recorrido</div>,
            selector: row => row.camp_6,
            center: true
        },
        {
            name: <div className="text-wrap">Porcentaje No Recorrido</div>,
            selector: row => row.camp_7,
            center: true
        },
        {
            name: <div className="text-wrap">Porcentaje Contactabilidad</div>,
            selector: row => row.camp_9,
            center: true
        },
        {
            name: <div className="text-wrap"></div>,
            cell: (row) => <button onClick={() => (Detalle(row.camp_2))} className="btn btn-success mt-4">Detalle</button>,
            center: true,
            button: true,
        }
    ];


    // const detalleModal = (carga) => {

    //     alert(carga)
    //     setDataModalCarga(carga)
    //     setMostrarModal(true)

    //     alert(modalCarga)
    // }

    return (
        <>

            <ToastContainer />

            {loading ? (
                <div className="d-flex justify-content-center mt-3">
                   
                    
                    <DotLoader
                        className='loading'
                        color={'#5b198ab5'}
                        loading={loading}
                        size={60}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                        
                    />
                     {/* <div className="content">Generando Documento...</div> */}
                </div>

            ) : (
                <div className="mt-1">

                    <DataTable
                        columns={columns}
                        data={data}
                        // highlightOnHover
                        pagination
                        customStyles={customStyles}

                    />
                </div>
            )}


            {/* <Modal onCierre={handleOnCerrar} visible={mostrarModal}/> */}


            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
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
export default ReporteCargaTablaResumen
