import React, { useEffect, useState } from "react";
import DataTable from 'react-data-table-component';

import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

function TablaTrafico({ ini, fin }) {
    const [data, setData] = useState([]);
    const [datashow, setDataShow] = useState([]);

    useEffect(() => {
        Datos()

    }, []);


    const Datos = (async () => {


        const result = await axios.post('https://app.soluziona.cl/API_v1_prod/CallSouth/API_CallSouth.Salcobrand.CRM/api/Contact_CRM_Vocalcom/CRM/Trafico/Informe_Intervalos', { dato: ini, dato_1: fin })

        if (result.status === 200) {
            setData(result.data)

        }


    })

    const customStyles = {
        rows: {
            style: {
                minHeight: '30px', // override the row height
                maxHeight: '50px',
                border: '1px solid #a9dff0',
                borderRadius: '3px'
            },
            striped: {
                backgroundColor: '#a9dff0',
            },
        },
        headCells: {
            style: {
                paddingLeft: '8px', // override the cell padding for head cells
                paddingRight: '8px',
                backgroundColor: '#a9dff0',

            },
        },
        cells: {
            style: {
                paddingLeft: '8px', // override the cell padding for data cells
                paddingRight: '8px',
                fontSize: '14px',

            },

        },

    };


    const columns = [
        {
            name: 'Intervalo',
            selector: row => row.hora,
            center: true
        },
        {
            name: <div className="text-wrap">Recibido</div>,
            selector: row => row.totaL_RECIBIDAS,
            center: true
        },
        {
            name: <div className="text-wrap">Contestado</div>,
            selector: row => row.atenD_FRONT,
            center: true
        },
        {
            name: <div className="text-wrap">Abandonado</div>,
            selector: row => row.totaL_ABANDON,
            center: true
        },
        {
            name: <div className="text-wrap">Nivel de Atención</div>,
            selector: row => (100 * (row.atenD_FRONT / (row.totaL_RECIBIDAS === '0' ? 1 : row.totaL_RECIBIDAS))).toFixed(2),
            center: true
        },
        {
            name: <div className="text-wrap">Nivel de Servicio</div>,
            selector: row => (100 * (row.atenD_ANTES_20 / (row.atenD_FRONT === '0' ? 1 : row.atenD_FRONT))).toFixed(2),
            center: true
        },
        {
            name: <div className="text-wrap">Nivel de Abandono</div>,
            selector: row => (row.totaL_RECIBIDAS) === '0' ? 0 : (100 - 100 * (row.atenD_FRONT / (row.totaL_RECIBIDAS === '0' ? 1 : row.totaL_RECIBIDAS))).toFixed(2),
            center: true
        }
    ];


    return (
        <>

            <div className="mt-1">

                <DataTable
                    columns={columns}
                    data={data}
                    // highlightOnHover
                    striped
                    customStyles={customStyles}

                />
            </div>

        </>
    );
};

export default TablaTrafico