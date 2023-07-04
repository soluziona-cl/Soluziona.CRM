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

function Documento_Detalle_Listado() {
    const [fileDetails, setFileDetails] = useState(null);
    const [fileData, setFileData] = useState(null);
    const [pressed, setPressed] = useState(null);
    const [datafull, setData] = useState([]);
    const [fileUrlView, setFileUrlView] = useState(false);
    const [fileUrl, setFileUrl] = useState(null);

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
        Listar()
    }, []);



    const Listar = (async () => {

        const result = await axios.post('https://app.soluziona.cl/API_v1_prod/CallSouth/API_CallSouth_CRM_LosHeroes/api/Ventas_CRM/CRM/Documentacion/Files/View/Data', { dato: null },
            { headers: { "Authorization": `Bearer ${sesiones.stoken}` } })

        if (result.status === 200) {

            setData(result.data)
            setLoading(false)
        } else {
            setLoading(false)
        }

    })


    const getFileDetails = (async (id) => {




        setFileUrl(id);
        setFileUrlView(true);
        setPressed(true);



        // }


    });

    const [filterText, setFilterText] = React.useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
    const filteredItems = datafull.filter(
        item => item.nombre && item.nombre.toLowerCase().includes(filterText.toLowerCase()),
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

    const handleMouseOver = (row) => {
        console.log(`Mouse over row with ID: ${row}`);
        // Realiza las acciones adicionales que desees aquí
    };

    const restaurar =() =>{
        setFileUrlView(false)
    }


    const columns = [
        {
            name: <div className="text-wrap"></div>,
            selector: row => <button className="btn btn-primary mt-4" onClick={() => getFileDetails(row.direccion)}><i className='fa-solid fa-file'></i></button>,
            width: '56px',
        },
        {
            name: <div className="text-wrap">Fecha</div>,
            selector: row => row.fecha,
            center: true,


        },
        {
            name: <div className="text-wrap">Nombre</div>,
            selector: row => row.nombre,
            center: true
        },
        {
            name: <div className="text-wrap">Nivel 1</div>,
            selector: row => row.selectValue,
            center: true
        },
        {
            name: <div className="text-wrap">Nivel 2</div>,
            selector: row => row.selectDetalleValue,
            center: true
        },
        {
            name: <div className="text-wrap">Descripcion</div>,
            selector: row => <div onMouseOver={() => handleMouseOver(row.descripcion)}>{row.descripcion}</div>,
            center: true
        }


    ];

    return (

        <>
            <div className="row">
                <div className="col-12">

                    <div className="col-sm-12 col-md-12 col-lg-12 text-center">
                        <div className="card mb-4 rounded-3 shadow-sm">
                            <div className="card-header">
                                <h4 className="my-0 font-weight-normal">Listado</h4>
                            </div>
                            <div className="card-body">
                               
                                        
                                            {fileUrlView !== true && (
                                                <div className=" mt-5 col-12" id='original'> 

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
                                            )}
                                    

                                     {fileUrlView !== false && (
                                        <div classname='row' id='ambos'>
                                        <button
                                            className="mb-0 btn btn-success"
                                            onClick={restaurar}
                                        >volver
                                        </button>
                                            <div className='col-3'>
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


                                            <div className='col-8'>
                                                <p>Archivo cargado:</p>
                                                {/* <button onClick={downloadFile}>Descargar Archivo</button> */}
                                                <embed src={'https://app.soluziona.cl/API_v1_prod/CallSouth/API_CallSouth_CRM_LosHeroes/Documentacion/' + fileUrl} title="Archivo" />
                                            </div>
                                        </div>
                                    )}
                                </div>

                            </div>
                        </div>
                    </div>

                </div>


        </>
    )
}
export default Documento_Detalle_Listado