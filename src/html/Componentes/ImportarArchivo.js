import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate, Link } from 'react-router-dom';
// import { Link } from 'react-router';

import { getToken, removeUserSession, setUserSession } from './Common';

//toast
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';



// const notify = () => toast("Wow so easy!");

function ImportarArchivo() {
    const [excel, setExcel] = useState()
    const [authLoading, setAuthLoading] = useState(true);

    const navigate = useNavigate();
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
    const Flujo = (async() => {

        var flujo = document.getElementById("ddl_campana").value;

        // console.log(flujo)

        const result = await axios.post('https://app.soluziona.cl/API_v1_prod/CallSouth/API_CallSouth_CRM_LosHeroes/api/Ventas_CRM/CRM/FlujosCarga', { dato: sesiones.sid, dato_2: flujo }, { headers: { "Authorization": `Bearer ${sesiones.stoken}` } })
        if (result.status === 200) {

            // console.log(result.data)
            var arrr = result.data;
            arrr.forEach((element) => {
                // console.log(element.id);
                UploadFile(element.id)
            });

        }

    })

    const UploadFile = (async(url) => {

        var formData = new FormData()
        formData.append('postedFile', excel)

        await axios.post(url, formData, { headers: { "Authorization": `Bearer ${sesiones.stoken}` } })
            .then(function(response) {
                toast(response.data.flujo)
            })
            .catch(function(error) {
                toast('Archivo No Valido. Verificar Formato')

            })

    })

    if (authLoading && getToken()) {
        return <div className = "content" > Checking Authentication... < /div>

    }


    return ( <
        >
        <
        ToastContainer / >
        <
        div className = 'row mt-3' >
        <
        Link to = "/Orkesta/CallSouth/LosHeroes/CRM/Formato_Inacap.xlsx"
        target = "_blank"
        download > < i className = 'fa-solid fa-file m-lg-2' > < /i>Formato Inacap</Link >
        <
        Link to = "/Orkesta/CallSouth/LosHeroes/CRM/Formato_USS.xlsx"
        target = "_blank"
        download > < i className = 'fa-solid fa-file m-lg-2' > < /i>Formato USS</Link >
        <
        /div> <
        div className = 'row mt-5' >
        <
        div className = 'col-3' > < input type = "file"
        onChange = { handleFile }
        /></div >
        <
        /div> <
        div className = 'row mt-5' >
        <
        div className = 'col-sm-12 col-lg-3 mt-2' > < button className = 'btn btn-success form-control'
        id = "btn-carga"
        onClick = { Flujo } > < i className = "fa-solid fa-upload m-2" > < /i>Subir</button > < /div> <
        /div> { /* <button className='btn btn-danger' onClick={notify}></button> */ } <
        />
    )
}
export default ImportarArchivo