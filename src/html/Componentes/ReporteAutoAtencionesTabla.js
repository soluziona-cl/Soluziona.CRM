import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import axios from "axios";
import { Modal } from "./Modal";
import { useNavigate } from 'react-router-dom';
import { getToken, removeUserSession, setUserSession } from './Common';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as XLSX from "xlsx";
import DotLoader from "react-spinners/DotLoader";

function ReporteAutoAtencionesTabla({ flujo, campana, ini, fin }) {

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
        XLSX.utils.book_append_sheet(wb, ws, "Carga");
        XLSX.writeFile(wb, "Gestion_Carga_" + date + ".xlsx");
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


        const result = await axios.post('https://app.soluziona.cl/API_v1_prod/CallSouth/API_CallSouth_CRM_LosHeroes/api/Ventas_CRM/CRM/Resultado/Cargas',
            { dato: flujo, dato_1: campana, dato_2: ini, dato_3: fin },
            { headers: { "Authorization": `Bearer ${sesiones.stoken}` } })

        if (result.status === 200) {

            console.log(result.data)
            setData(result.data);
        }

    })


    const columns = [
        { name: 'MES', selector: '', },
        { name: 'Auto atención Licencias Médicas', selector: '', },
        { name: 'Auto atención Saldo Favor', selector: '', },
        { name: 'Fecha y lugar de pago pensión', selector: '', },
        { name: 'Apertura y horario de atención Sucursales', selector: '', },
        { name: 'Horario de atención Call Center FH', selector: '', },
        { name: 'Cambio forma de pago', selector: '', },
        { name: 'Deriva Prepago', selector: '', },
        { name: 'Grabación de Parques', selector: '', },
        { name: 'Info. Crédito vigente', selector: '', },
        { name: 'Bono Gobierno Deriva (101)', selector: '', },
        { name: 'TAM', selector: '', },
        { name: 'Autorización para pagos de LM con transferencias electrónicas', selector: '', },
        { name: 'AFA Estado', selector: '', },
        { name: 'AFA documentos', selector: '', },
    ];


    return (
        <>
            <section className=" float-end">
                <button
                    onClick={handleOnExportCarga}
                    className="inline-flex items-center py-2 px-4 text-sm font-medium text-gray-900 bg-secondary rounded-md border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 m-2 text-white">
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
                        highlightOnHover
                    />
                </div>
            )}

        </>
    )
}
export default ReporteAutoAtencionesTabla