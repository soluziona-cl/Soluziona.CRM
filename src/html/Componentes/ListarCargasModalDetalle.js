import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Modal } from "./Modal";
import { useNavigate } from 'react-router-dom';
import { getToken, removeUserSession, setUserSession } from './Common';
import 'bootstrap/dist/css/bootstrap.min.css';

function ListarCargasModalDetalle({detalleModal}) {

    const [data, setData] = useState([]);
    const [excel, setExcel] = useState()
    const [authLoading, setAuthLoading] = useState(true);

    //modal
    const [mostrarModal, setMostrarModal] = useState(false)
    const handleOnCerrar = () => setMostrarModal(false)

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

        if (!token) {
            // console.log('Vacio')
            navigate("/Login");
            return;
        }

          DetalleModal()
    }, []);

    const DetalleModal = (async () => {


        console.log(detalleModal)

        var flujo = document.getElementById("ddl_campana").value;
        const result = await axios.post('https://app.soluziona.cl/API_v1_prod/Procollect/CRM/api/Ventas_CRM/CRM/DetalleCargas/CargasDetalleResumenDash/Full', { dato: flujo }, { headers: { "Authorization": `Bearer ${sesiones.stoken}` } })

        if (result.status === 200) {

            console.log(result.data)
            setData(result.data);
        
        }

    })

    return (
        <>
            <div className=" container-lg">
                <div className=" flex-column ">
                    <table id="tbl_acumulado_dia" className="table table-striped table-sm text-nowrap text-sm" width="100%">
                        <thead>
                            <tr>
                                <th>Estado</th>
                                <th>Cantidad</th>                                
                                <th>Accion</th>

                            </tr>
                        </thead>
                        <tbody>
                            {data.map((data, index) => (
                                <tr>
                                    <td>{data.camp_1}</td>
                                    <td>{data.camp_2}</td>
                                    <td><button onClick={""} className="btn btn-success">Liberar</button></td>

                                </tr>
                            ))}

                        </tbody>

                    </table>
                  
                </div>

            </div>
        </>
    )
}
export default ListarCargasModalDetalle
