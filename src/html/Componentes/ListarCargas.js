import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Modal } from "../../html/Componentes/Modal";
import { useNavigate } from 'react-router-dom';
import { getToken, removeUserSession, setUserSession } from './Common';
import 'bootstrap/dist/css/bootstrap.min.css';

function ListarCargas() {
    const [data, setData] = useState([]);
    const [excel, setExcel] = useState()
    const [authLoading, setAuthLoading] = useState(true);

    //modal
    const [mostrarModal, setMostrarModal] = useState(false)
    const handleOnCerrar = () => setMostrarModal(false)


    // const abrirModal = event =>{
    //     setMostrarModal(true)
    //     console.log("abrir modal")
    // }

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
                                    <td><button onClick={""} data-bs-toggle="modal" data-bs-target="#staticBackdrop" className="btn btn-success">Detalle</button></td>

                                </tr>
                            ))}

                        </tbody>

                    </table>
                    {/* <Modal onCierre={handleOnCerrar} visible={mostrarModal}/> */}





                    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div class="modal-fullscreen">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="staticBackdropLabel">Detalle</h5>

                                </div>
                                <div class="modal-body">
                                    aca va el body del detalle
                                </div>

                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                    {/* <button type="button" class="btn btn-primary">Understood</button> */}
                                </div>
                            </div>
                        </div>
                    </div>


                </div>

            </div>
        </>
    )
}
export default ListarCargas
