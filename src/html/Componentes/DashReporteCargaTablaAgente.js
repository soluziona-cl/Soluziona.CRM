import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Modal } from "./Modal";
import { useNavigate } from 'react-router-dom';
import { getToken, removeUserSession, setUserSession } from './Common';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as XLSX from "xlsx";

function DashReporteCargaTablaAgente({company,agente}) {

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

        const result = await axios.post('https://app.soluziona.cl/API_v1_prod/Procollect/CRM/api/Ventas_CRM/CRM/Panel/Gestion/Cargas/Agente',
         { dato: null , dato_1: company, dato_3:agente  }, 
         { headers: { "Authorization": `Bearer ${sesiones.stoken}` } })

        if (result.status === 200) {

            console.log(result.data)
            setData(result.data);
        }

    })


    return (
        <>
            <table className="table">
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Nombre</th>
                        <th>Cargados</th>
                        <th>Realizadas</th>
                        <th>Conectadas</th>
                        <th>No Conectadas</th>
                        <th>Compromisos de Pago</th>
                    </tr>
                </thead>
                <tbody>
                    {datafull.map((data, index) => (
                        <tr key={index}>
                            <td>{data.fecha_carga_base}</td>
                            <td>{data.nombre_carga}</td>
                            <td>{data.cargados}</td>
                            <td>{data.realizadas}</td>
                            <td>{data.conectadas}</td>
                            <td>{data.no_conectadas}</td>
                            <td>{data.compromisospago}</td>

                        </tr>
                    ))}
                </tbody>
            </table>


        </>
    )
}
export default DashReporteCargaTablaAgente