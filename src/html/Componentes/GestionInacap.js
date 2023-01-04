import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import axios from "axios";
import { Modal } from "../../html/Componentes/Modal";
import { useNavigate } from 'react-router-dom';
import { getToken, removeUserSession, setUserSession } from './Common';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as XLSX from "xlsx";
import DotLoader from "react-spinners/DotLoader";



function GestionInacap({ flujo, campana, ini, fin }) {

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
            RUT_PERSONA: v.rut_persona,
            NOMBRE: v.nombre,
            RUT_PERSONA_AVAL: v.rut_persona_aval,
            NOMBRE_AVAL: v.nombre_aval,
            SEDE: v.sede,
            AO_DEUDA: v.ao_deuda,
            INFO1: v.info1,
            INFO2: v.info2,
            INFO3: v.info3,
            INFO4: v.info4,
            INFO5: v.info5,
            INFO6: v.info6,
            FONO1: v.fono1,
            FONO2: v.fono2,
            FONO3: v.fono3,
            FONO4: v.fono4,
            FONO5: v.fono5,
            FONO6: v.fono6,
            ULTIMA_GESTION: v.ultima_gestion,
            OBSERVACION_ANTERIOR: v.observacion_anterior,
            URL_BOLETA: v.url_boleta,
            THIS_PHONE_NUMBER: v.This_Phone_number,
            CALL_TIME: v.Call_Time,
            DIALING_DURATION: v.Dialing_Duration,
            ANSWERED_DURATION: v.Answered_Duration,
            AGENT: v.Agent,
            GLOBAL_INTERACTION_ID: v.Global_Interaction_ID,
            LIST_NAME: v.List_name
        }));

        let ws = XLSX.utils.json_to_sheet(arr2);
        var today = new Date()
        let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
        XLSX.utils.book_append_sheet(wb, ws, "Carga");
        XLSX.writeFile(wb, "Gestion_Carga_" + date + ".xlsx");
    };


    const [loading, setLoading] = useState(false)
    useEffect(() => {
    setLoading(true)
    setTimeout(()=> {
       setLoading(false)
    }, 5000)
   }, [])


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

        Datos()

    }, []);

    const Datos = (async () => {


        const result = await axios.post('https://app.soluziona.cl/API_v1_prod/Procollect/CRM/api/Ventas_CRM/CRM/Resultado/Cargas/Gestion/Inacap',
            { dato: flujo, dato_1: campana, dato_2: ini, dato_3: fin },
            { headers: { "Authorization": `Bearer ${sesiones.stoken}` } })

        if (result.status === 200) {

            console.log(result.data)
            setData(result.data);
        }

    })


    const columns = [
        {
            name: "RUT_PERSONA",
            selector: "rut_persona"
        },
        {
            name: "NOMBRE",
            selector: "nombre"
        },
        {
            name: "RUT_PERSONA_AVAL",
            selector: "rut_persona_aval"
        },
        {
            name: "NOMBRE_AVAL",
            selector: "nombre_aval"
        },
        {
            name: "SEDE",
            selector: "sede"
        },
        {
            name: "AO_DEUDA",
            selector: "ao_deuda"
        },
        {
            name: "INFO1",
            selector: "info1"
        },
        {
            name: "INFO2",
            selector: "info2"
        },
        {
            name: "INFO3",
            selector: "info3"
        },
        {
            name: "INFO4",
            selector: "info4"
        },
        {
            name: "INFO5",
            selector: "info5"
        },
        {
            name: "INFO6",
            selector: "info6"
        },
        {
            name: "FONO1",
            selector: "fono1"
        },
        {
            name: "FONO2",
            selector: "fono2"
        },
        {
            name: "FONO3",
            selector: "fono3"
        },
        {
            name: "FONO4",
            selector: "fono4"
        },
        {
            name: "FONO5",
            selector: "fono5"
        },
        {
            name: "FONO6",
            selector: "fono6"
        },
        {
            name: "ULTIMA_GESTION",
            selector: "ultima_gestion"
        },
        {
            name: "OBSERVACION_ANTERIOR",
            selector: "observacion_anterior"
        },
        {
            name: "URL_BOLETA",
            selector: "url_boleta"
        },
        {
            name: "THIS_PHONE_NUMBER",
            selector: "This_Phone_number"
        },
        {
            name: "CALL_TIME",
            selector: "Call_Time"
        },
        {
            name: "DIALING_DURATION",
            selector: "Dialing_Duration"
        },
        {
            name: "ANSWERED_DURATION",
            selector: "Answered_Duration"
        },
        {
            name: "AGENT",
            selector: "Agent"
        },
        {
            name: "GLOBAL_INTERACTION_ID",
            selector: "Global_Interaction_ID"
        },
        {
            name: "LIST_NAME",
            selector: "List_name"
        }
    ];


    return (
        <>
            <section className=" float-end ">
                <button
                    onClick={handleOnExportCarga}
                    className="inline-flex items-center py-2 px-4 text-sm font-medium text-gray-900 bg-secondary rounded-md text-white m-2 border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 ">
                    <i className="fa-solid fa-file-excel mr-2"></i> Exportar
                </button>
            </section>

            {loading ? (
            <DotLoader
            className='loading'
            color={'#5b198ab5'}
            loading={loading}
            size={100}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        ) : (
            <div className=" mt-5 text-wrap">
                <DataTable
                    // title="Employees"
                    className='DataTable'
                    columns={columns}
                    data={datafull}
                    pagination
                    highlightOnHover
                    responsive={true}
                />
            </div>
              )}
        </>
    )
}
export default GestionInacap
