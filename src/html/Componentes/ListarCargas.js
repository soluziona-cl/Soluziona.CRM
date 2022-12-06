import React, { useState, useEffect } from 'react';
import axios from "axios";


import { useNavigate } from 'react-router-dom';
import { getToken, removeUserSession, setUserSession } from './Common';

function ListarCargas() {
    const [data, setData] = useState([]);
    const [excel, setExcel] = useState()
    const [authLoading, setAuthLoading] = useState(true);

    const navigate = useNavigate();
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

        Buscar()

    }, []);


    const sesiones = {
        sgui: localStorage.getItem("localgui"),
        scliente: localStorage.getItem("localcliente"),
        sid: localStorage.getItem("localid"),
        sid_usuario: localStorage.getItem("localid_usuario"),
        stoken: localStorage.getItem("token")
    };

    // 


    const Buscar = (async () => {

        var flujo = document.getElementById("ddl_campana").value;

        console.log(flujo)

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

    if (authLoading && getToken()) {
        return <div className="content">Checking Authentication...</div>

    }


    const info = () => {


    }

    return (
        <>
            <div className=" container-lg">
                <div className=" flex-column ">
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
                                <tr>
                                    <td>{data.camp_1}</td>
                                    <td>{data.camp_2}</td>
                                    <td>{data.camp_3}</td>
                                    <td>{data.camp_3}</td>
                                    <td>{data.camp_4}</td>
                                    <td>{data.camp_5}</td>
                                    <td>{data.camp_6}%</td>
                                    <td>{data.camp_7}%</td>
                                    <td>{data.camp_9}%</td>
                                    <td><button onClick={info(data.camp_1)} class="btn btn-success">Detalle</button></td>

                                </tr>
                            ))}

                        </tbody>

                    </table>
                </div>

            </div>
        </>
    )
}
export default ListarCargas
