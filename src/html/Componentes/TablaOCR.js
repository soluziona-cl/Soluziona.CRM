import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { getToken, removeUserSession, setUserSession } from './Common';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as XLSX from "xlsx";
import DotLoader from "react-spinners/DotLoader";

function TablaOCR({ ini }) {
    console.log(ini)
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
            RUT_PERSONA: v.ruT_PERSONA,
            This_Phone_number: v.this_Phone_number,
            Call_Disposition: v.call_Disposition,
            Call_Time: v.call_Time,
            Dialing_Duration: v.dialing_Duration,
            Answered_Duration: v.answered_Duration,
            Agent: v.agent,
            Recording_file: v.recording_file,
            Global_Interaction_ID: v.global_Interaction_ID,
            List_name: v.list_name
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
        const rutaservidor = "/Orkesta/CallSouth/LosHeroes/CRM"
        if (!token) {
            // console.log('Vacio')
            navigate(rutaservidor);
            return;
        }


        axios.post('https://app.soluziona.cl/API_v1_prod/CallSouth/API_CallSouth_CRM_LosHeroes/api/Ventas_CRM/CRM/Session_check', { user: sesiones.sid_usuario, gui: sesiones.sgui }, { headers: { "Authorization": `Bearer ${sesiones.stoken}` } })
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


        const result = await axios.post('https://app.soluziona.cl/API_v1_prod/Soluziona/OCRBonos/api/OCR_INI/QA/OCR/CRM/datosProceso',
            { dato: ini},
            { headers: { "Authorization": `Bearer ${sesiones.stoken}` } })

        if (result.status === 200) {

            console.log(result.data)
            setData(result.data);
            // setData([{
            //     "fecha": "3/18/2022",
            //     "llamadas_dimensionadas": 83,
            //     "recibidas": 87,
            //     "atendidas": 86,
            //     "sobre_bajo_trafico": 91,
            //     "debio_atender": 92,
            //     "n_atencion_e": 99,
            //     "n_atencion_o": 85,
            //     "agentes": 85,
            //     "TMO": 94,
            //     "agentes_r": 94
            //   }]);
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
            selector: row => row.fecha,
            center: true
        },
        {
            name: <div className="text-wrap">Llamadas dimensionadas a recibir</div>,
            selector: row => row.llamadas_dimensionadas,
            center: true
        },
        {
            name: <div className="text-wrap">Call DisRecibidas</div>,
            selector: row => row.recibidas,
            center: true
        },
        {
            name: <div className="text-wrap">Atendidas</div>,
            selector: row => row.atendidas,
            center: true
        },
        {
            name: <div className="text-wrap">Sobre o bajo tráfico</div>,
            selector: row => row.sobre_bajo_trafico,
            center: true
        },
        {
            name: <div className="text-wrap">Debió atender</div>,
            selector: row => row.debio_atender,
            center: true
        },
        {
            name: <div className="text-wrap">Nivel de atención esperado</div>,
            selector: row => row.n_atencion_e,
            center: true
        },
        {
            name: <div className="text-wrap">Nivel de atención obtenido</div>,
            selector: row => row.n_atencion_o,
            center: true
        },
        {
            name: <div className="text-wrap">Ejecutivos conectados</div>,
            selector: row => row.agentes,
            center: true
        },
        {
            name: <div className="text-wrap">TMO</div>,
            selector: row => secondsToString(parseInt(row.tmo).toFixed(2)),
            center: true
        },
        {
            name: <div className="text-wrap">Ejecutivos Requeridos</div>,
            selector: row => row.agentes_r,
            center: true
        },
    ];


    return (
        <>

            <div className="row">
                <div className="col-12">

                    <div className="col-sm-12 col-md-12 col-lg-12 text-center">
                        <div className="card mb-4 rounded-3 shadow-sm">
                            <div className="card-header">
                                <h4 className="my-0 font-weight-normal">Resultados OCR</h4>
                            </div>
                            <div className="card-body">
                                <section className=" float-end">
                                    {/* <button
                                            onClick={handleOnExportCarga}
                                            className="rounded inline-flex items-center py-2 px-4 text-sm font-medium text-gray-900 bg-secondary rounded-md border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 m-2 text-white">
                                            <i className="fa-solid fa-file-excel mr-2"></i>  Exportar
                                        </button> */}
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
                                        {datafull.map((data, index) => (
                                        <div className="container">
                                        <div className="row">
                                          <div className="col-md-6">
                                            <div className="input-group mb-3">
                                              <span className="input-group-text" id="basic-addon1">fecha</span>
                                              
                                              <input type="text" className="form-control" value={data.fecha.slice(6, 8) + "/" + data.fecha.slice(4, 6) + "/" + data.fecha.slice(0, 4)
                                            } />
                                            </div>
                                      
                                            <div className="input-group mb-3">
                                              <span className="input-group-text" id="basic-addon2">cantidad</span>
                                              <input type="text" className="form-control" value={data.cantidad} />
                                            </div>
                                      
                                            <div className="input-group mb-3">
                                              <span className="input-group-text" id="basic-addon3">cantidad procesados</span>
                                              <input type="text" className="form-control" value={data.cantidadProcesados} />
                                            </div>
                                          </div>
                                      
                                          <div className="col-md-6">
                                            <div className="input-group mb-3">
                                              <span className="input-group-text" id="basic-addon4">porcentaje</span>
                                              <input type="text" className="form-control" value={data.porcentaje} />
                                            </div>
                                      
                                            <div className="input-group mb-3">
                                              <span className="input-group-text" id="basic-addon5">fonasa</span>
                                              <input type="text" className="form-control" value={data.fonasa} />
                                            </div>
                                      
                                            <div className="input-group mb-3">
                                              <span className="input-group-text" id="basic-addon6">% fonasa</span>
                                              <input type="text" className="form-control" value={data.porcentajeFonasa} />
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      
                                         ))}
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
export default TablaOCR