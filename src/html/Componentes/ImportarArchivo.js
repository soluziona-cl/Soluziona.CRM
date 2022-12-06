import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { getToken, removeUserSession, setUserSession } from './Common';

function ImportarArchivo() {
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
    }, []);


    const sesiones = {
        sgui: localStorage.getItem("localgui"),
        scliente: localStorage.getItem("localcliente"),
        sid: localStorage.getItem("localid"),
        sid_usuario: localStorage.getItem("localid_usuario"),
        stoken: localStorage.getItem("token")
    };

    const handleFile = (e) => {

        setExcel(e.target.files[0])

    }
    const Flujo = (async () => {

        var flujo = document.getElementById("ddl_campana").value;

        console.log(flujo)

        const result = await axios.post('https://app.soluziona.cl/API_v1_prod/Procollect/CRM/api/Ventas_CRM/CRM/FlujosCarga', { dato: sesiones.sid, dato_2: flujo }, { headers: { "Authorization": `Bearer ${sesiones.stoken}` } })

        if (result.status === 200) {
            console.log("archivo arriba")
            alert("archivo arriba")
            console.log(result.data)
            var arrr = result.data;

            arrr.forEach((element) => {
                console.log(element.id);
                 UploadFile(element.id)
            });

        }

    })

    const UploadFile = (async (url) => {

        var formData = new FormData()
        formData.append('postedFile', excel)

        const result = await axios.post(url, formData, { headers: { "Authorization": `Bearer ${sesiones.stoken}` } })

        if (result.status === 200) {

            console.log(result.data)

        }

    })

    if (authLoading && getToken()) {
        return <div className="content">Checking Authentication...</div>

    }

    return (
        <>
            <input type="file" onChange={handleFile} />
            <button className='btn btn-success' id="btn-carga" onClick={Flujo}><i className="fa-solid fa-upload m-2"></i>Subir</button>
        </>
    )
}
export default ImportarArchivo
