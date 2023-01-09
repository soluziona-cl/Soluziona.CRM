import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import axios from "axios";
import { Modal } from "./Modal";
import { useNavigate } from 'react-router-dom';
import { getToken, removeUserSession, setUserSession } from './Common';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as XLSX from "xlsx";
import DotLoader from "react-spinners/DotLoader";



function RepoAudiosBuscador({ grab_flujo,grab_lead_id, grab_rut, grab_ini, grab_fin,grab_agente,grab_company }) {

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


        const result = await axios.post('https://app.soluziona.cl/API_v1_prod/Procollect/CRM/api/Ventas_CRM/CRM/Grabaciones/Search',
            { dato: grab_flujo, dato_2: grab_lead_id, dato_3: grab_rut, dato_4: grab_ini, dato_5: grab_fin, dato_6: grab_agente, dato_7: grab_company },
            { headers: { "Authorization": `Bearer ${sesiones.stoken}` } })

        if (result.status === 200) {

            console.log(result.data)
            setData(result.data);
        }

    })


    const columns = [
        {
            name: "Id",
            selector: (row) => row.lead_id
        },
        {
            name: "Id Grabacion",
            selector: (row) => row.recording_id
        },
        // {
        //     name: "Tipo",
        //     selector: ""
        // },
        {
            name: "Agente",
            selector: (row) => row.users
        },
        {
            name: "Fecha",
            selector: (row) => row.start_time
        },
        {
            name: "Telefono",
            selector: (row) => row.filenames
        },
        {
            name: "Duracion",
            selector: (row) => row.length_in_sec
        },
        {
            name: "Grabacion",
            selector: (row) => <a href={row.locations} target="_blank"><i class="fa fa-play"></i> Escuchar Grabación</a> 
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
            <div className="mt-5 text-wrap">
                <DataTable
                    // title="Employees"
                    className='table table-striped table-bordered base-style display text-nowrap text-sm'
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
export default RepoAudiosBuscador
