import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { getToken, removeUserSession, setUserSession } from './Common';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as XLSX from "xlsx";
import DotLoader from "react-spinners/DotLoader";

function ReporteIntervaloTabla({ ini, fin }) {

    const [datafull, setData] = useState([]);
    const [authLoading, setAuthLoading] = useState(true);
    const navigate = useNavigate();
    const sesiones = {
        sgui: localStorage.getItem("localgui"),
        scliente: localStorage.getItem("localcliente"),
        sid: localStorage.getItem("localid"),
        sid_usuario: localStorage.getItem("localid_usuario"),
        stoken: localStorage.getItem("token")
    };

    function secondsToString(seconds) {
        var hour = Math.floor(seconds / 3600);
        hour = hour < 10 ? "0" + hour : hour;
        var minute = Math.floor((seconds / 60) % 60);
        minute = minute < 10 ? "0" + minute : minute;
        var second = seconds % 60;
        second = second < 10 ? "0" + second : second;
        return hour + ":" + minute + ":" + second;
    }

    const handleOnExportCarga = () => {

        //creates a new workbook
        let wb = XLSX.utils.book_new();

        var arr2 = datafull.map(v => ({
            Fecha: v.hora,
            Recibido: v.totaL_RECIBIDAS,
            Contestado: v.atenD_FRONT,
            Abandonado: v.totaL_ABANDON,
            N_Atencion: (100 * (v.atenD_FRONT / (v.totaL_RECIBIDAS === '0' ? 1 : v.totaL_RECIBIDAS))).toFixed(2),
            N_Servicio: (100 * (v.atenD_ANTES_20 / (v.atenD_FRONT === '0' ? 1 : v.atenD_FRONT))).toFixed(2),
            N_Abandono: (v.totaL_RECIBIDAS) === '0' ? 0 : (100 - 100 * (v.atenD_FRONT / (v.totaL_RECIBIDAS === '0' ? 1 : v.totaL_RECIBIDAS))).toFixed(2),
          
        }));

        let ws = XLSX.utils.json_to_sheet(arr2);
        var today = new Date()
        let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
        XLSX.utils.book_append_sheet(wb, ws, "Reporte_Intervalo_Resumen");
        XLSX.writeFile(wb, "Reporte_Intervalo_Resumen" + date + ".xlsx");
    };

    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 3000)
    }, [])


    useEffect(() => {

        const token = getToken();
        const rutaservidor = "/Orkesta/CallSouth/Salcobrand/CRM"
        if (!token) {
            // console.log('Vacio')
            navigate(rutaservidor);
            return;
        }


        axios.post('https://app.soluziona.cl/API_v1_prod/CallSouth/API_CallSouth.Salcobrand.CRM/api/Ventas_CRM/CRM/Session_check', { user: sesiones.sid_usuario, gui: sesiones.sgui }, { headers: { "Authorization": `Bearer ${sesiones.stoken}` } })
            .then(response => {

                setUserSession(sesiones.sgui, sesiones.sid_usuario);
                setAuthLoading(true);


            }).catch(error => {
                removeUserSession();
                setAuthLoading(true);
            });

        Datos()

    }, []);

    const Datos = (async () => {


        const result = await axios.post('https://app.soluziona.cl/API_v1_prod/CallSouth/API_CallSouth.Salcobrand.CRM/api/Contact_CRM_Vocalcom/CRM/Trafico/Informe_Intervalos/Total', { dato: ini, dato_1: fin })

        if (result.status === 200) {
            setData(result.data)

        }


    })


    const customStyles = {
        rows: {
            style: {
                minHeight: '30px', // override the row height
                maxHeight: '50px',
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
            name: 'Fecha',
            selector: row => row.hora,
            center: true
        },
        {
            name: <div className="text-wrap">Recibido</div>,
            selector: row => row.totaL_RECIBIDAS,
            center: true
        },
        {
            name: <div className="text-wrap">Contestado</div>,
            selector: row => row.atenD_FRONT,
            center: true
        },
        {
            name: <div className="text-wrap">Abandonado</div>,
            selector: row => row.totaL_ABANDON,
            center: true
        },
        {
            name: <div className="text-wrap">Nivel de Atención</div>,
            selector: row => (100 * (row.atenD_FRONT / (row.totaL_RECIBIDAS === '0' ? 1 : row.totaL_RECIBIDAS))).toFixed(2),
            center: true
        },
        {
            name: <div className="text-wrap">Nivel de Servicio</div>,
            selector: row => (100 * (row.atenD_ANTES_20 / (row.atenD_FRONT === '0' ? 1 : row.atenD_FRONT))).toFixed(2),
            center: true
        },
        {
            name: <div className="text-wrap">Nivel de Abandono</div>,
            selector: row => (row.totaL_RECIBIDAS) === '0' ? 0 : (100 - 100 * (row.atenD_FRONT / (row.totaL_RECIBIDAS === '0' ? 1 : row.totaL_RECIBIDAS))).toFixed(2),
            center: true
        }
    ];


    return (
        <>

            <div className="row">
                <div className="col-12">
                   
                        <div className="col-sm-12 col-md-12 col-lg-12 text-center">
                            <div className="card mb-4 rounded-3 shadow-sm">
                                <div className="card-header">
                                    <h4 className="my-0 font-weight-normal">Trafico Acumulado Dia</h4>
                                </div>
                                <div className="card-body">
                                    <section className=" float-end">
                                        <button
                                            onClick={handleOnExportCarga}
                                            className="rounded inline-flex items-center py-2 px-4 text-sm font-medium text-gray-900 bg-secondary rounded-md border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 m-2 text-white">
                                            <i className="fa-solid fa-file-excel mr-2"></i>  Exportar
                                        </button>
                                    </section>
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
                                        <div className=" mt-5 "  >

                                            <DataTable
                                                columns={columns}
                                                data={datafull}
                                                customStyles={customStyles}
                                                noDataComponent="Los Filtros No Contiene Datos" //or your component
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                   
                </div>

            </div>

        </>
    )
}
export default ReporteIntervaloTabla