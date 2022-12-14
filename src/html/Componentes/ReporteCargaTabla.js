import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import axios from "axios";
import { Modal } from "./Modal";
import { useNavigate } from 'react-router-dom';
import { getToken, removeUserSession, setUserSession } from './Common';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as XLSX from "xlsx";

function ReporteCargaTabla({ flujo, campana, ini, fin }) {

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


    useEffect(() => {
        const token = getToken();

        if (!token) {
            // console.log('Vacio')
            navigate("/Login");
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


        const result = await axios.post('https://app.soluziona.cl/API_v1_prod/Procollect/CRM/api/Ventas_CRM/CRM/Resultado/Cargas',
            { dato: flujo, dato_1: campana, dato_2: ini, dato_3: fin },
            { headers: { "Authorization": `Bearer ${sesiones.stoken}` } })

        if (result.status === 200) {

            console.log(result.data)
            setData(result.data);
        }

    })


    const columns = [
        {
            name: 'RUT_PERSONA',
            selector: 'ruT_PERSONA',
           
        },
        {
            name: 'This_Phone_number',
            selector: 'this_Phone_number',
          
        },
        {
            name: 'Call_Disposition',
            selector: 'call_Disposition',
          
        },
        {
            name: 'Call_Time',
            selector: 'call_Time',
           
        },
        {
            name: 'Dialing_Duration',
            selector: 'dialing_Duration',
           
        },
        {
            name: 'Answered_Duration',
            selector: 'answered_Duration',
          
        },
        {
            name: 'Agent',
            selector: 'agent',
          
        },
        {
            name: 'Recording_file',
            selector: 'recording_file',
         
        },
        {
            name: 'Global_Interaction_ID',
            selector: 'global_Interaction_ID',
          
        },
        {
            name: 'List_name',
            selector: 'list_name',
         
        },
    ];


    return (
        <>
            <section className="flex flex-row ">
                <button
                    onClick={handleOnExportCarga}
                    className="inline-flex items-center py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-md border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700">
                    <i className="fa-solid fa-file-excel mr-2"></i>Exportar
                </button>
            </section>
            <div className="container mt-2">


                <DataTable
                    // title="Employees"
                    columns={columns}
                    data={datafull}
                    pagination
                    highlightOnHover
                    responsive={true}
                />


                {/* <table className="table">
                    <thead>
                        <tr>
                            <th>RUT_PERSONA</th>
                            <th>This Phone number</th>
                            <th>Call Disposition</th>
                            <th>Call Time</th>
                            <th>Dialing Duration</th>
                            <th>Answered Duration</th>
                            <th>Agent</th>
                            <th>Recording file</th>
                            <th>Global Interaction ID</th>
                            <th>List name</th>
                          
                        </tr>
                    </thead>
                    <tbody>
                        {datafull.map((data, index) => (
                        
                            <tr key={index}>
                                <td>{data.RUT_PERSONA}</td>
                                <td>{data.This_Phone_number}</td>
                                <td>{data.Call_Disposition}</td>
                                <td>{data.Call_Time}</td>
                                <td>{data.Dialing_Duration}</td>
                                <td>{data.Answered_Duration}</td>
                                <td>{data.Agent}</td>
                                <td>{data.Recording_file}</td>
                                <td>{data.Global_Interaction_ID}</td>
                                <td>{data.List_name}</td>
                                <td>-</td>
                                {/* <td>{data.contestadas / data.recibidas}</td>
                                <td>{data.abandonadas / data.contestadas}</td>
                                <td>{secondsToString(parseInt(data.tmo))}</td>
                                <td>{secondsToString(parseInt(data.tmo))}</td> */}
                            {/* </tr>
                        ))}
                    </tbody>
                </table> */} 

            </div>
        </>
    )
}
export default ReporteCargaTabla