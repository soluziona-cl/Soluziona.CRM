import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { getToken, removeUserSession, setUserSession } from './Common';
import 'bootstrap/dist/css/bootstrap.min.css';
import DotLoader from "react-spinners/DotLoader";
import { ToastContainer, toast } from "react-toastify";
import DataTable from 'react-data-table-component';
import { format } from "date-fns";
import DatePicker, { registerLocale } from "react-datepicker";
import es from 'date-fns/locale/es'

import "react-datepicker/dist/react-datepicker.css";
import { getMonth, getYear } from "date-fns";
import range from "lodash/range";
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

function ListarCargas({ company }) {
    const [data, setData] = useState([]);
    const [excel, setExcel] = useState()
    const [authLoading, setAuthLoading] = useState(true);
    const [list_id, setListId] = useState('');
    const [resultante, setResultante] = useState('');
    const [startdateini, setStartDateIni] = useState(new Date());
    const [startdatefin, setStartDateFin] = useState(new Date());
    //modal
    const [mostrarModal, setMostrarModal] = useState(false)
    const [mostrarModal2, setMostrarModal2] = useState(false)
    const sesiones = {
        sgui: localStorage.getItem("localgui"),
        scliente: localStorage.getItem("localcliente"),
        sid: localStorage.getItem("localid"),
        sid_usuario: localStorage.getItem("localid_usuario"),
        stoken: localStorage.getItem("token")
    };
    const years = range(2022, getYear(new Date()) + 2, 1);
    const months = [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
    ];

    const handleOnCerrar = () => {
        setMostrarModal(false)
        // setListId('')
    }
    const handleOnCerrar2 = () => {
        setMostrarModal2(false)
        setListId('')
        setResultante('')
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




    // 
    const componentDidMount = () => {
        if (!$.fn.DataTable.isDataTable("#tbl_acumulado_dia")) {
            $(document).ready(function () {
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
                }, 2000);
            });
        }
    }

    const Buscar = (async () => {



        const result = await axios.post('https://app.soluziona.cl/API_v1_prod/Procollect/CRM/api/Ventas_CRM/CRM/DetalleCargas/CargasDetalleResumenDash/Full', { dato: company }, { headers: { "Authorization": `Bearer ${sesiones.stoken}` } })

        if (result.status === 200) {

            // console.log(result.data)
            setData(result.data);
        }


    })

    const Liberar = (async (liberar) => {


        const result = await axios.post('https://app.soluziona.cl/API_v1_prod/Procollect/CRM/api/Ventas_CRM/CRM/DetalleCargasAdmin/CargasDetalleResumenDashDetalleActivar', { dato_2: liberar }, { headers: { "Authorization": `Bearer ${sesiones.stoken}` } })

        if (result.status === 200) {

            // console.log(result.data)
            toast('Registros Liberados.')
            Buscar()
            setData(result.data);
            // var arrr = result.data;

            // arrr.forEach((element) => {
            //     console.log(element.id);

            // });

        } else {

            toast('Registros No Liberados.')
            Buscar()
        }
    })


    const Bloquear = (async (bloquear) => {


        // console.log(bloquear)
        const result = await axios.post('https://app.soluziona.cl/API_v1_prod/Procollect/CRM/api/Ventas_CRM/CRM/DetalleCargasAdmin/CargasDetalleResumenDashDetalleBlock', { dato_2: bloquear }, { headers: { "Authorization": `Bearer ${sesiones.stoken}` } })

        if (result.status === 200) {

            // console.log(result.data)
            toast('Registros Bloqueados.')
            setData(result.data);
            Buscar()
            // var arrr = result.data;

            // arrr.forEach((element) => {
            //     console.log(element.id);

            // });

        } else {

            toast('Registros No Bloqueados.')
            Buscar()
        }

    })


    if (authLoading && getToken()) {
        return <div className="content">Checking Authentication...</div>

    }

    const Detalle = (async (detalle) => {

        setLoading(true);
        const result = await axios.post('https://app.soluziona.cl/API_v1_prod/Procollect/CRM/api/Ventas_CRM/CRM/DetalleCargas/CargasDetalleResumenDash/Full/Detalle',
            { dato: detalle, dato_1: document.getElementById("ddl_campana").value },
            { headers: { "Authorization": `Bearer ${sesiones.stoken}` } })

        if (result.status === 200) {

            // console.log(result.data)
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

    const Resultante = (async (detalle) => {

        setLoading(true);


        if (document.getElementById("ddl_campana").value=='10479343'){

            const result = await axios.post('https://app.soluziona.cl/API_v1_prod/Procollect/CRM/api/Ventas_CRM/CRM/DetalleCargas/CargasDetalleResumenDash/Full/Detalle/Gestion/INACAP',
            { dato: detalle, dato_1: document.getElementById("ddl_campana").value,dato_2:format(startdateini, "yyyyMMdd") ,dato_3: format(startdatefin, "yyyyMMdd") },
            { headers: { "Authorization": `Bearer ${sesiones.stoken}` } })
            if (result.status === 200) {

                // console.log(result.data)
                var arrr = result.data;
    
                arrr.forEach((element) => {
                     setResultante( <a href={element.message} target="_blank"><i class="fa-solid fa-file-excel"></i>  Descargar Archivo </a>)
                    toast('Archivo Generado')
                    // console.log(element.id);
    
                });
    
                setLoading(false);
    
            } else {
    
                setLoading(false);
                toast('Archivo No Generado')
                // Buscar()
            }
        }

        if (document.getElementById("ddl_campana").value=='21141416'){

            const result = await axios.post('https://app.soluziona.cl/API_v1_prod/Procollect/CRM/api/Ventas_CRM/CRM/DetalleCargas/CargasDetalleResumenDash/Full/Detalle/Gestion/USS',
            { dato: detalle, dato_1: document.getElementById("ddl_campana").value,dato_2:format(startdateini, "yyyyMMdd") ,dato_3: format(startdatefin, "yyyyMMdd") },
            { headers: { "Authorization": `Bearer ${sesiones.stoken}` } })
            if (result.status === 200) {

                // console.log(result.data)
                var arrr = result.data;
    
                arrr.forEach((element) => {
                     setResultante( <a href={element.message} target="_blank"><i class="fa-solid fa-file-excel"></i>  Descargar Archivo </a>)
                    toast('Archivo Generado')
                    // console.log(element.id);
    
                });
    
                setLoading(false);
    
            } else {
    
                setLoading(false);
                toast('Archivo No Generado')
                // Buscar()
            }
        }

        if (document.getElementById("ddl_campana").value=='40244372'){

            const result = await axios.post('https://app.soluziona.cl/API_v1_prod/Procollect/CRM/api/Ventas_CRM/CRM/DetalleCargas/CargasDetalleResumenDash/Full/Detalle/Gestion/GAM',
            { dato: detalle, dato_1: document.getElementById("ddl_campana").value,dato_2:format(startdateini, "yyyyMMdd") ,dato_3: format(startdatefin, "yyyyMMdd") },
            { headers: { "Authorization": `Bearer ${sesiones.stoken}` } })
            if (result.status === 200) {

                // console.log(result.data)
                var arrr = result.data;
    
                arrr.forEach((element) => {
                     setResultante( <a href={element.message} target="_blank"><i class="fa-solid fa-file-excel"></i>  Descargar Archivo </a>)
                    toast('Archivo Generado')
                    // console.log(element.id);
    
                });
    
                setLoading(false);
    
            } else {
    
                setLoading(false);
                toast('Archivo No Generado')
                // Buscar()
            }
        }



        
    })

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
            name: <div className="text-wrap">Porcentaje Contac.</div>,
            selector: row => row.camp_9,
            center: true
        }
        ,
        {
            name: <div className="text-wrap"></div>,
            cell: (row) => <button onClick={(e) => (setDataModalCarga(row.camp_2), setMostrarModal(true), setListId(row.camp_2))} data-bs-toggle="modal" data-bs-target="#staticBackdrop" className="btn btn-success mt-4">Admin</button>,
            center: true,
            button: true,
        },
        {
            name: <div className="text-wrap"></div>,
            cell: (row) => <button onClick={() => (Liberar(row.camp_2))} className="btn btn-success mt-4">Activar</button>,
            center: true,
            button: true,
        },
        {
            name: <div className="text-wrap"></div>,
            cell: (row) => <button onClick={() => (Bloquear(row.camp_2))} className="btn btn-danger  mt-4">Bloquear</button>,
            center: true,
            button: true,
        },
        {
            name: <div className="text-wrap"></div>,
            cell: (row) => <button onClick={() => (Detalle(row.camp_2))} className="btn btn-danger  mt-4">Descargar</button>,
            center: true,
            button: true,
        },
        {
            name: <div className="text-wrap"></div>,
            cell: (row) => <button onClick={(e) =>(setDataModalCarga(row.camp_2), setMostrarModal2(true), setListId(row.camp_2))} data-bs-toggle="modal" data-bs-target="#staticBackdrop_Result" className="btn btn-success mt-4">Gestion</button>,
            // cell: (row) => <button data-bs-toggle="modal" data-bs-target="#staticBackdrop_Result" className="btn btn-success mt-4">Gestion</button>,
            center: true,
            button: true,
        }
        // ,
        // {
        //     name: <div className="text-wrap">Accion</div>,
        //     cell: (row) =><select className='form-control form-select'>
        //         <option>Seleccione Accion</option>
        //         <option><button onClick={() => (Liberar(row.camp_2))} className="btn btn-success mt-4">Activar</button></option>
        //         <option><button onClick={() => (setDataModalCarga(row.camp_2), setMostrarModal(true), setListId(row.camp_2))} data-bs-toggle="modal" data-bs-target="#staticBackdrop" className="btn btn-success mt-4">Admin</button></option>
        //         <option><button onClick={() => (Bloquear(row.camp_2))} className="btn btn-danger  mt-4">Bloquear</button></option>
        //         <option><button onClick={() => (Detalle(row.camp_2))} className="btn btn-danger  mt-4">Descargar</button></option>
        //     </select>,
        //     center:true,
        //     button: true,
        // }
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
            <div className="modal fade" id="staticBackdrop_Result" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="modal-title" id="staticBackdropLabel">Detalle <label id="list_id_liberar">{list_id}</label></h3>


                        </div>
                        <div className="modal-header">

                            <div className="col-sm-12 col-lg-3 mt-lg-0 mt-sm-2">
                                <DatePicker
                                    id="ini"
                                    locale='es'
                                    className="form-control rounded-md text-center h-10 hover:bg-gray-200 hover:border-blue-700 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700"
                                    //  customInput={<ExampleCustomInput />}
                                    renderCustomHeader={({
                                        date,
                                        changeYear,
                                        changeMonth,
                                        decreaseMonth,
                                        increaseMonth,
                                        prevMonthButtonDisabled,
                                        nextMonthButtonDisabled,
                                    }) => (
                                        <div
                                            style={{
                                                margin: 10,
                                                display: "flex",
                                                justifyContent: "center",
                                            }}
                                        >
                                            <button
                                                onClick={decreaseMonth}
                                                disabled={prevMonthButtonDisabled}
                                            >
                                                {"<"}
                                            </button>
                                            <select
                                                value={getYear(date)}
                                                onChange={({ target: { value } }) => changeYear(value)}
                                            >
                                                {years.map((option) => (
                                                    <option key={option} value={option}>
                                                        {option}
                                                    </option>
                                                ))}
                                            </select>

                                            <select
                                                value={months[getMonth(date)]}
                                                onChange={({ target: { value } }) =>
                                                    changeMonth(months.indexOf(value))
                                                }
                                            >
                                                {months.map((option) => (
                                                    <option key={option} value={option}>
                                                        {option}
                                                    </option>
                                                ))}
                                            </select>

                                            <button
                                                onClick={increaseMonth}
                                                disabled={nextMonthButtonDisabled}
                                            >
                                                {">"}
                                            </button>
                                        </div>
                                    )}
                                    selected={startdateini}
                                    dateFormat="dd/MM/yyyy"
                                    maxDate={new Date()}
                                    onChange={(date) => {
                                        setStartDateIni(date);

                                    }}
                                /></div>
                            <div className="col-sm-12 col-lg-3 mt-lg-0 mt-sm-2">
                                <DatePicker
                                    id="fin"
                                    locale='es'
                                    className="form-control rounded-md text-center h-10 hover:bg-gray-200 hover:border-blue-700 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700"
                                    //  customInput={<ExampleCustomInput />}
                                    renderCustomHeader={({
                                        date,
                                        changeYear,
                                        changeMonth,
                                        decreaseMonth,
                                        increaseMonth,
                                        prevMonthButtonDisabled,
                                        nextMonthButtonDisabled,
                                    }) => (
                                        <div
                                            style={{
                                                margin: 10,
                                                display: "flex",
                                                justifyContent: "center",
                                            }}
                                        >
                                            <button
                                                onClick={decreaseMonth}
                                                disabled={prevMonthButtonDisabled}
                                            >
                                                {"<"}
                                            </button>
                                            <select
                                                value={getYear(date)}
                                                onChange={({ target: { value } }) => changeYear(value)}
                                            >
                                                {years.map((option) => (
                                                    <option key={option} value={option}>
                                                        {option}
                                                    </option>
                                                ))}
                                            </select>

                                            <select
                                                value={months[getMonth(date)]}
                                                onChange={({ target: { value } }) =>
                                                    changeMonth(months.indexOf(value))
                                                }
                                            >
                                                {months.map((option) => (
                                                    <option key={option} value={option}>
                                                        {option}
                                                    </option>
                                                ))}
                                            </select>

                                            <button
                                                onClick={increaseMonth}
                                                disabled={nextMonthButtonDisabled}
                                            >
                                                {">"}
                                            </button>
                                        </div>
                                    )}
                                    selected={startdatefin}
                                    dateFormat="dd/MM/yyyy"
                                    maxDate={new Date()}
                                    onChange={(date) => {
                                        setStartDateFin(date);

                                    }}
                                /></div>
                            <div className="col-sm-12 col-lg-3 mt-lg-0 mt-sm-2">
                                <button
                                    className="mb-0 btn btn-success"
                                    onClick={()=>Resultante(list_id)}
                                >Descargar
                                </button>

                            </div>

                        </div>

                        <div className="modal-body">
                        <label id="resultante">{resultante}</label>
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => handleOnCerrar2()}>Cerrar</button>
                            {/* <button type="button" className="btn btn-primary">Understood</button> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ListarCargas
