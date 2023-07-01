import React, { useEffect, useState, useRef } from 'react';
import DataTable from 'react-data-table-component';
import * as bootstrap from 'bootstrap';
import axios from 'axios';
import { getToken, removeUserSession, setUserSession } from './Common';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import ClockLoader from "react-spinners/ClockLoader";

import { Button } from 'react-bootstrap';



function Documento_CRUD_Padre() {

    const [datafull, setData] = useState([]);

    const [optionList, setOptionList] = useState([]);
    const [detalle, setDetalle] = useState('');
    const [detalleadd, setDetalleAdd] = useState('');
    const [detalleid, setDetalleId] = useState('');
    const [padre, setPadre] = useState(null);
    const [agenda, setAgenda] = useState('');
    const [estado, setEstado] = useState(null);
    const [estadoTexto, setEstadoTexto] = useState('');
    const [company, setCompany] = useState('');
    const [tipContactados, setTipContactados] = useState('');
    const [tipEfectivos, setTipEfectivos] = useState('');
    const [tipEstado, setTipEstado] = useState('');
    const [tipAccion, setTipAccion] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [isAdd, setIsAdd] = useState(false);
    const [gridData, setGridData] = useState([]);


    const sesiones = {
        sgui: localStorage.getItem("localgui"),
        scliente: localStorage.getItem("localcliente"),
        sid: localStorage.getItem("localid"),
        sid_usuario: localStorage.getItem("localid_usuario"),
        stoken: localStorage.getItem("token")
    };

    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        // setTimeout(() => {
        //     setLoading(false)
        // }, 3000)
    }, [])
    useEffect(() => {
        // Aquí puedes hacer la llamada a tu endpoint para obtener los datos iniciales
        Listar()
    }, []);


    const Listar = (async () => {

        const result = await axios.post('https://app.soluziona.cl/API_v1_prod/CallSouth/API_CallSouth_CRM_LosHeroes/api/Ventas_CRM/CRM/Documentacion/Crud/padre', { dato: 'S1', dato_1: '', dato_2: '' },
            { headers: { "Authorization": `Bearer ${sesiones.stoken}` } })

        if (result.status === 200) {

            setData(result.data)
            setLoading(false)
        } else {
            setLoading(false)
        }

    })


    const handleEdit = (item) => {

        setDetalle(item.detalle);
        setDetalleId(item.id)
        setIsEditing(true);
        setIsAdd(false);
    };

    const handleSave = (async () => {

        const result = await axios.post('https://app.soluziona.cl/API_v1_prod/CallSouth/API_CallSouth_CRM_LosHeroes/api/Ventas_CRM/CRM/Documentacion/Crud/padre', { dato: 'U4', dato_1: detalle, dato_2: detalleid },
            { headers: { "Authorization": `Bearer ${sesiones.stoken}` } })

        if (result.status === 200) {

            toast.success('Registro Actualizado')
            setDetalle('');
            setDetalleId('')
            setIsEditing(false);
            setIsAdd(false);
            Listar()

        } else {

            toast.error('Registro No Actualizado')
            setDetalle('');
            setDetalleId('')
            setIsEditing(false);
            setIsAdd(false);
            Listar()
        }




    });

    const handleSaveAdd = (async () => {

        const result = await axios.post('https://app.soluziona.cl/API_v1_prod/CallSouth/API_CallSouth_CRM_LosHeroes/api/Ventas_CRM/CRM/Documentacion/Crud/padre', { dato: 'I3', dato_1: detalleadd, dato_2: '' },
            { headers: { "Authorization": `Bearer ${sesiones.stoken}` } })

        if (result.status === 200) {

            toast.success('Registro Ingresado')
            setDetalleAdd('');
            setIsAdd(false);
            setIsEditing(false);
            Listar()

        } else {

            toast.error('Registro No Ingresado')
            setDetalleAdd('');
            setIsAdd(false);
            setIsEditing(false);
            Listar()
        }



    });

    const handleDelete = (async (itemId) => {

        const result = await axios.post('https://app.soluziona.cl/API_v1_prod/CallSouth/API_CallSouth_CRM_LosHeroes/api/Ventas_CRM/CRM/Documentacion/Crud/padre', { dato: 'D5', dato_1: '', dato_2: itemId },
            { headers: { "Authorization": `Bearer ${sesiones.stoken}` } })

        if (result.status === 200) {

            toast.success('Registro Desactivado')
            setDetalleAdd('');
            setIsAdd(false);
            setIsEditing(false);
            Listar()

        } else {

            toast.error('Registro No Desactivado')
            setDetalleAdd('');
            setIsAdd(false);
            setIsEditing(false);
            Listar()
        }

    });

    const handleDeleteReverse = (async (itemId) => {

        const result = await axios.post('https://app.soluziona.cl/API_v1_prod/CallSouth/API_CallSouth_CRM_LosHeroes/api/Ventas_CRM/CRM/Documentacion/Crud/padre', { dato: 'D6', dato_1: '', dato_2: itemId },
            { headers: { "Authorization": `Bearer ${sesiones.stoken}` } })

        if (result.status === 200) {

            toast.success('Registro Activado')
            setDetalleAdd('');
            setIsAdd(false);
            setIsEditing(false);
            Listar()

        } else {

            toast.error('Registro No Activado')
            setDetalleAdd('');
            setIsAdd(false);
            setIsEditing(false);
            Listar()
        }

    });


    const customStyles = {
        rows: {
            style: {
                minHeight: '40px', // override the row height
                maxHeight: '60px',

            },
        },
        headCells: {
            style: {
                paddingLeft: '8px', // override the cell padding for head cells
                paddingRight: '8px',
                backgroundColor: '#a9dff0',
                fontSize: '16px',

            },
        },
        cells: {
            style: {
                paddingLeft: '8px', // override the cell padding for data cells
                paddingRight: '8px',
                fontSize: '16px',


            },
        },
    };




    const columns = [

        {
            name: <div className="text-wrap">Detalle</div>,
            selector: row => row.detalle,
            center: true,
        },
        {
            name: <div className="text-wrap"></div>,
            selector: row => <button className="btn btn-primary mt-4" onClick={() => handleEdit(row)}>Editar</button>,
            center: true
        },
        {
            name: <div className="text-wrap"></div>,
            selector: row => row.estado === '1' ? <button className="btn btn-warning mt-4" onClick={() => handleDelete(row.id)}>Desactivar</button> : <button className="btn btn-light mt-4" onClick={() => handleDeleteReverse(row.id)}>Activar</button>,
            center: true
        },

    ];



    return (

        <>
            <ToastContainer />
            <div className="row">
                <div className="row">
                    <div className="col-12">

                        <div className="col-sm-12 col-md-12 col-lg-12 text-center">
                            <div className="card mb-4 rounded-3 shadow-sm">
                                <div className="card-header">
                                    <h4 className="my-0 font-weight-normal">Principal</h4>
                                </div>
                                <div className="card-body">

                                    <div className='row'>
                                        <div className='col-6'> {loading ? (
                                            <div className="d-flex justify-content-center mt-3">

                                                <ClockLoader
                                                    className='loading'
                                                    color={'#5b198a'}
                                                    loading={loading}
                                                    size={70}
                                                    aria-label="Loading Spinner"
                                                    data-testid="loader"
                                                />
                                            </div>

                                        ) : (
                                            <div className=" mt-5 "  >
                                                <button className="btn btn-primary mt-4" onClick={() => (setIsAdd(true), setIsEditing(false))}>Agregar</button>
                                                <DataTable
                                                    columns={columns}
                                                    data={datafull}
                                                    customStyles={customStyles}

                                                />


                                            </div>
                                        )}</div>
                                        <div className='col-6'>

                                            {isEditing && (
                                                <div>
                                                    <label>Detalle:</label>
                                                    <input
                                                        type="text"
                                                        className='form-control'
                                                        value={detalle}
                                                        onChange={e => setDetalle(e.target.value)}
                                                    />

                                                    <button className="btn btn-primary mt-4" onClick={handleSave}>Guardar</button>
                                                </div>
                                            )}
                                            {isAdd && (
                                                <div>
                                                    <div className='row flex-end'><button className="btn btn-secondary mt-4 mb-4 col-2 " onClick={() => setIsAdd(false)}>Cerrar</button></div>
                                                    <div className='row'> <label>Detalle:</label>
                                                        <input
                                                            type="text"
                                                            className='form-control'
                                                            onChange={e => setDetalleAdd(e.target.value)}
                                                        />

                                                        <button className="btn btn-primary mt-4 col-4" onClick={handleSaveAdd}>Guardar</button></div>


                                                </div>
                                            )}
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                    </div>

                </div>




            </div>
        </>
    )
}
export default Documento_CRUD_Padre