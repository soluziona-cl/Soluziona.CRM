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


const TextField = styled.input`
height: 32px;
width: 200px;
border-radius: 3px;
border-top-left-radius: 5px;
border-bottom-left-radius: 5px;
border-top-right-radius: 0;
border-bottom-right-radius: 0;
border: 1px solid #e5e5e5;
padding: 0 32px 0 16px;

&:hover {
    cursor: pointer;
}`;

const ClearButton = styled(Button)`
border-top-left-radius: 0;
border-bottom-left-radius: 0;
border-top-right-radius: 5px;
border-bottom-right-radius: 5px;
height: 34px;
width: 32px;
text-align: center;
display: flex;
align-items: center;
justify-content: center;`;

const FilterComponent = ({ filterText, onFilter, onClear }) => (
    <>
        <TextField
            id="search"
            type="text"
            placeholder="Filtro por Nombre"
            aria-label="Search Input"
            value={filterText}
            onChange={onFilter}
        />
        {/* <ClearButton type="button" onClick={onClear}>
            X
        </ClearButton> */}
    </>
);

function Documento_CRUD_Hijo() {

    const [datafull, setData] = useState([]);
    const [selectPrincipal, setSelectedPrincipal] = useState('0');
    const [optionListDetalleEstadoSelect, setOptionListDetalleEstadoSelect] = useState('0');
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

        const result = await axios.post('https://app.soluziona.cl/API_v1_prod/CallSouth/API_CallSouth_CRM_LosHeroes/api/Ventas_CRM/CRM/Documentacion/Crud/hijo', { dato: 'S1', dato_1: '', dato_2: '' },
            { headers: { "Authorization": `Bearer ${sesiones.stoken}` } })

        if (result.status === 200) {

            setData(result.data)
            setLoading(false)
        } else {
            setLoading(false)
        }

    })


    const Principal = (async () => {

        const result = await axios.post('https://app.soluziona.cl/API_v1_prod/CallSouth/API_CallSouth_CRM_LosHeroes/api/Ventas_CRM/CRM/Documentacion/Crud/Padre', { dato: 'S1', dato_1: '', dato_2: '' }, { headers: { "Authorization": `Bearer ${sesiones.stoken}` } })

        if (result.status === 200) {
            setOptionList(result.data)


        }

    })

    const ChangeConecta = (async (event) => {

        if (event === '0') {

            setSelectedPrincipal('')
            toast.error('Debe Seleccionar Principal')
            return
        } else {


            setSelectedPrincipal(event)


        }


    })

    const handleEdit = (item) => {

        setDetalle(item.detalle);
        setDetalleId(item.id)
        setIsEditing(true);
        setIsAdd(false);
    };

    const handleSave = (async () => {

        const result = await axios.post('https://app.soluziona.cl/API_v1_prod/CallSouth/API_CallSouth_CRM_LosHeroes/api/Ventas_CRM/CRM/Documentacion/Crud/hijo', { dato: 'U4', dato_1: detalle, dato_2: detalleid },
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


        if (selectPrincipal === '0') {
            toast.error('Debe Seleccionar Principal')
            return
        }

      




        const result = await axios.post('https://app.soluziona.cl/API_v1_prod/CallSouth/API_CallSouth_CRM_LosHeroes/api/Ventas_CRM/CRM/Documentacion/Crud/hijo', { dato: 'I3', dato_1: detalleadd, dato_2: selectPrincipal },
            { headers: { "Authorization": `Bearer ${sesiones.stoken}` } })

        if (result.status === 200) {

            toast.success('Registro Ingresado')
            setDetalleAdd('');
            setIsAdd(false);
            setIsEditing(false);
            setSelectedPrincipal('0')
            Listar()

        } else {

            toast.error('Registro No Ingresado')
            setDetalleAdd('');
            setIsAdd(false);
            setIsEditing(false);
            Listar()
        }



    });


    const handleAdd = () => {

        setIsAdd(true)
        setIsEditing(false)
        Principal()
    }

    const handleDelete = (async (itemId) => {

        const result = await axios.post('https://app.soluziona.cl/API_v1_prod/CallSouth/API_CallSouth_CRM_LosHeroes/api/Ventas_CRM/CRM/Documentacion/Crud/hijo', { dato: 'D5', dato_1: '', dato_2: itemId },
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

        const result = await axios.post('https://app.soluziona.cl/API_v1_prod/CallSouth/API_CallSouth_CRM_LosHeroes/api/Ventas_CRM/CRM/Documentacion/Crud/hijo', { dato: 'D6', dato_1: '', dato_2: itemId },
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

    const [filterText, setFilterText] = React.useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
    const filteredItems = datafull.filter(
        item => item.detalle && item.detalle.toLowerCase().includes(filterText.toLowerCase()),
    );

    const subHeaderComponentMemo = React.useMemo(() => {
        const handleClear = () => {
            if (filterText) {
                setResetPaginationToggle(!resetPaginationToggle);
                setFilterText('');
            }
        };

        return (
            <FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
        );
    }, [filterText, resetPaginationToggle]);



    const columns = [

        {
            name: <div className="text-wrap">Principal</div>,
            selector: row => row.padre,
            center: true,
        },
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
            selector: row => row.estado==='1'? <button className="btn btn-warning mt-4" onClick={() => handleDelete(row.id)}>Desactivar</button>: <button className="btn btn-light mt-4" onClick={() => handleDeleteReverse(row.id)}>Activar</button>,
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
                                    <h4 className="my-0 font-weight-normal">Detalle</h4>
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
                                            <div className="mt-5"  >
                                                <button className="btn btn-primary" onClick={() => handleAdd()}>Agregar</button>
                                                <DataTable
                                                    columns={columns}
                                                    data={filteredItems}
                                                    customStyles={customStyles}
                                                    pagination
                                                    paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
                                                    subHeader
                                                    subHeaderComponent={subHeaderComponentMemo}
                                                    // selectableRows
                                                    persistTableHead

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
                                                    <div className='row flex-end'>
                                                        <select className="form-control form-select" id="ddl_company"
                                                            disabled={false}
                                                            value={selectPrincipal}
                                                            onChange={(e) => (ChangeConecta(e.target.value))}>
                                                            <option value="0">Principal</option>
                                                            {optionList.map((item) => (
                                                                <option key={item.id} value={item.id}>
                                                                    {item.detalle}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
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
export default Documento_CRUD_Hijo