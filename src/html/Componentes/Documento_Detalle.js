import React, { useEffect, useState, useRef } from 'react';
import * as bootstrap from 'bootstrap';
import axios from 'axios';
import { getToken, removeUserSession, setUserSession } from './Common';
import { useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';




function Documento_Detalle() {
    const [selectLlamada, setSelectedLlamada] = useState('');
    const [selectLlamadaDetalle, setSelectedLlamadaDetalle] = useState('');

    const [optionList, setOptionList] = useState([]);
    const [optionListDetalle, setOptionListDetalle] = useState([]);
    const [optionListDetalleEstado, setOptionListDetalleEstado] = useState(true);
    const [optionListDetalleEstadoSelect, setOptionListDetalleEstadoSelect] = useState('0');
    const sesiones = {
        sgui: localStorage.getItem("localgui"),
        scliente: localStorage.getItem("localcliente"),
        sid: localStorage.getItem("localid"),
        sid_usuario: localStorage.getItem("localid_usuario"),
        stoken: localStorage.getItem("token")
    };

    useEffect(() => {
        Company()
    }, []);


    const [file, setFile] = useState(null);
    const [select, setSelect] = useState(0);
    const [selectDetalle, setSelectDetalle] = useState(0);
    const [descripcion, setDescripcion] = useState('');

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];

        const allowedExtensions = /(\.pdf)$/i;

        if (!allowedExtensions.test(selectedFile.name)) {
            event.target.value = null;
            toast.error('Solo se permiten archivos PDF.', { position: toast.POSITION.TOP_RIGHT });
            setFile(null);
            setSelect(0);
            setSelectDetalle(0);
            setDescripcion('');
            return;
        }

        setFile(selectedFile);
    };




    const handleDescripcionChange = (event) => {
        setDescripcion(event.target.value);
    };



    const Company = (async () => {

        const result = await axios.post('https://app.soluziona.cl/API_v1_prod/CallSouth/API_CallSouth_CRM_LosHeroes/api/Ventas_CRM/CRM/Documentacion', { dato: null }, { headers: { "Authorization": `Bearer ${sesiones.stoken}` } })

        if (result.status === 200) {
            setOptionList(result.data)



        }

    })

    const ChangeConecta = (async (event) => {

        setSelect(parseInt(event));

        if (event === '0') {
            setOptionListDetalleEstado(true)
            setOptionListDetalleEstadoSelect('0')
            setSelectedLlamada('0')
        } else {
            const result = await axios.post('https://app.soluziona.cl/API_v1_prod/CallSouth/API_CallSouth_CRM_LosHeroes/api/Ventas_CRM/CRM/Documentacion/Detalle', { dato: event }, { headers: { "Authorization": `Bearer ${sesiones.stoken}` } })

            setSelectedLlamada(event)

            if (result.status === 200) {

                setOptionListDetalle(result.data)
                setOptionListDetalleEstado(false)

            }
        }


    })

    const ChangeConectaDetalle = (async (event) => {

        setSelectDetalle(parseInt(event));

        setOptionListDetalleEstado(false)
        setOptionListDetalleEstadoSelect(event)
        setSelectedLlamadaDetalle(event)

    })

    const refresh = () => {
        // toast.success('Archivo subido correctamente.')
        window.location.href = '/Orkesta/CallSouth/LosHeroes/CRM/Documentacion';
    }

    const [loading, setLoading] = useState(false)
    // useEffect(() => {
    //     setLoading(true)
    //     setTimeout(() => {
    //         setLoading(false)
    //     }, 3000)
    // }, [])


    const guardar = (async () => {


        const formData = new FormData();
        formData.append('file', file);
        formData.append('select', select);
        formData.append('selectDetalle', selectDetalle);
        formData.append('descripcion', descripcion);

        const result = await axios.post('https://app.soluziona.cl/API_v1_prod/CallSouth/API_CallSouth_CRM_LosHeroes/api/Ventas_CRM/CRM/Documentacion/Files', formData, { headers: { 'Content-Type': 'multipart/form-data', "Authorization": `Bearer ${sesiones.stoken}` } })

        if (result.status === 200) {


            // refresh()

            toast('Archivo subido correctamente.')
            setLoading(true)
            setTimeout(() => {
                setLoading(false)
            }, 3000)

            window.location.href = '/Orkesta/CallSouth/LosHeroes/CRM/Documentacion';
            // console.log('Archivo subido correctamente.');
            // Restablecer los valores del formulario
            // setFile(null);
            // setSelect(0);
            // setSelectDetalle(0);
            // setDescripcion('');
        }


        // .then((response) => {

        // })
        // .catch((error) => {
        //     console.error('Error al subir el archivo:', error);
        // });
    });

    return (

        <>
            <ToastContainer />
            <div className="row">




                <div className="row mt-4">
                    <div className="form-group">
                        <input type="file" className="form-control-file" id="exampleFormControlFile1" onChange={handleFileChange} accept=".pdf" />
                    </div>

                </div>

                <div className="row mt-4">
                    <div className="col-sm-12 col-md-12 col-lg-4">
                        <select className="form-control form-select" id="ddl_company" disabled={false} onChange={(e) => (ChangeConecta(e.target.value))}>
                            <option value="0">Documento</option>
                            {optionList.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.detalle}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-sm-12 col-md-12 col-lg-4">
                        <select className="form-control form-select" id="ddl_campana" disabled={optionListDetalleEstado} value={selectDetalle} onChange={(e) => ChangeConectaDetalle(e.target.value)}>
                            <option value="0">Detalle</option>
                            {optionListDetalle.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.detalle}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-sm-12 col-md-12 col-lg-4">
                        <textarea className="form-control" placeholder="Descripcion del Documento" rows={3} value={descripcion} onChange={handleDescripcionChange}></textarea>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12 col-md-12 col-lg-4">
                        <button className='btn btn-success form-control' id="btn-carga" onClick={guardar}><i className='fa-solid fa-file me-2'></i> Subir Documento</button>
                    </div>

                </div>


            </div>
        </>
    )
}
export default Documento_Detalle