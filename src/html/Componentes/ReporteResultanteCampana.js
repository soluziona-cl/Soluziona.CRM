import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { getToken, removeUserSession, setUserSession } from './Common';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as XLSX from "xlsx";
import DotLoader from "react-spinners/DotLoader";

function ReporteResultanteCampana({ flujo, ini, fin }) {

    const [datafull, setData] = useState([]);
    const [authLoading, setAuthLoading] = useState(true);
    const navigate = useNavigate();
    const sesiones = {
        sgui: localStorage.getItem("localgui"),
        scliente: localStorage.getItem("localcliente"),
        sid: localStorage.getItem("localid"),
        sid_usuario: localStorage.getItem("localid_usuario"),
        stoken: localStorage.getItem("token")
    };

    function secondsToString(seconds) {
        var hour = Math.floor(seconds / 3600);
        hour = hour < 10 ? "0" + hour : hour;
        var minute = Math.floor((seconds / 60) % 60);
        minute = minute < 10 ? "0" + minute : minute;
        var second = seconds % 60;
        second = second < 10 ? "0" + second : second;
        return hour + ":" + minute + ":" + second;
    }

    const handleOnExportCarga = () => {

        //creates a new workbook
        let wb = XLSX.utils.book_new();

        var arr2 = datafull.map(v => ({
            Rut: v.rut,
            Dv: v.dv,
            Nombre: v.nombre,
            Nombre_Segundo: v.nombre_Segundo,
            Apellido_Materno: v.apellido_Materno,
            Apellido_Paterno: v.apellido_Paterno,
            Sucursal: v.sucursal,
            Fecha_Nac: v.fecha_Nac,
            Fecha_Ingreso_Caja: v.fecha_Ingreso_Caja,
            Mail: v.mail,
            Direccion: v.direccion,
            Numero: v.numero,
            Villa: v.villa,
            Comuna: v.comuna,
            Ciudad: v.ciudad,
            Region: v.region,
            Nombre_Empresa_Epp: v.nombre_Empresa_Epp,
            Rut_Empresa_Epp: v.rut_Empresa_Epp,
            Campana: v.campana,
            Preaprobado: v.preaprobado,
            Valor_Cuota: v.valor_Cuota,
            Plazo: v.plazo,
            Monto_Liquido: v.monto_Liquido,
            Cae: v.cae,
            Tasa: v.tasa,
            Monto_Final: v.monto_Final,
            Sucursal1: v.sucursal1,
            Telefono_1: v.telefono_1,
            Marca_X1: v.marca_X1,
            Fecha_X1: v.fecha_X1,
            Marca_Ejecutivo_1: v.marca_Ejecutivo_1,
            Telefono_2: v.telefono_2,
            Marca_X2: v.marca_X2,
            Fecha_X2: v.fecha_X2,
            Marca_Ejecutivo_2: v.marca_Ejecutivo_2,
            Telefono_3: v.telefono_3,
            Marca_X3: v.marca_X3,
            Fecha_X3: v.fecha_X3,
            Marca_Ejecutivo_3: v.marca_Ejecutivo_3,
            Telefono_4: v.telefono_4,
            Marca_X4: v.marca_X4,
            Fecha_X4: v.fecha_X4,
            Marca_Ejecutivo_4: v.marca_Ejecutivo_4,
            Telefono_5: v.telefono_5,
            Marca_X5: v.marca_X5,
            Fecha_X5: v.fecha_X5,
            Marca_Ejecutivo_5: v.marca_Ejecutivo_5,
            Telefono_6: v.telefono_6,
            Marca_X6: v.marca_X6,
            Fecha_X6: v.fecha_X6,
            Marca_Ejecutivo_6: v.marca_Ejecutivo_6,
            Telefono_7: v.telefono_7,
            Marca_X7: v.marca_X7,
            Fecha_X7: v.fecha_X7,
            Marca_Ejecutivo_7: v.marca_Ejecutivo_7,
            Telefono_8: v.telefono_8,
            Marca_X8: v.marca_X8,
            Fecha_X8: v.fecha_X8,
            Marca_Ejecutivo_8: v.marca_Ejecutivo_8,
            Telefono_9: v.telefono_9,
            Marca_X9: v.marca_X9,
            Fecha_X9: v.fecha_X9,
            Marca_Ejecutivo_9: v.marca_Ejecutivo_9,
            Telefono_10: v.telefono_10,
            Marca_X10: v.marca_X10,
            Fecha_X10: v.fecha_X10,
            Marca_Ejecutivo_10: v.marca_Ejecutivo_10,
            Fono_Contacto: v.fono_Contacto,
            Fecha: v.fecha,
            Nro_Nom_Usuario: v.nro_Nom_Usuario,
            Observaciones: v.observaciones,
            Duracion: v.duracion,
            Grabacion: v.grabacion,
            Telefono_Ani: v.telefono_Ani,
            Categoria: v.categoria,
            Resolucion: v.resolucion,
            Subcategoria: v.subcategoria,
            Fecha_Gestion: v.fecha_Gestion,
            Fecha_Visita_G: v.fecha_Visita_G
        }));

        let ws = XLSX.utils.json_to_sheet(arr2);
        var today = new Date()
        let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
        XLSX.utils.book_append_sheet(wb, ws, "Data");
        XLSX.writeFile(wb, "Reporte_Resultante" + date + ".xlsx");
    };

    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 3000)
    }, [])


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
                setAuthLoading(true);


            }).catch(error => {
                removeUserSession();
                setAuthLoading(true);
            });

        Datos()

    }, []);

    const Datos = (async () => {


        const result = await axios.post('https://app.soluziona.cl/API_v1_prod/CallSouth/API_CallSouth_CRM_LosHeroes/api/Ventas_CRM/CRM/Resultante/Campana',
            { dato: flujo, dato_1: ini, dato_2: fin },
            { headers: { "Authorization": `Bearer ${sesiones.stoken}` } })

        if (result.status === 200) {

            console.log(result.data)
            setData(result.data);
            // setData([{
            //     "fecha": "3/18/2022",
            //     "llamadas_dimensionadas": 83,
            //     "recibidas": 87,
            //     "atendidas": 86,
            //     "sobre_bajo_trafico": 91,
            //     "debio_atender": 92,
            //     "n_atencion_e": 99,
            //     "n_atencion_o": 85,
            //     "agentes": 85,
            //     "TMO": 94,
            //     "agentes_r": 94
            //   }]);
        }

    })


    const customStyles = {
        rows: {
            style: {
                minHeight: '30px', // override the row height
                maxHeight: '50px',
                border: '2px solid #a9dff0',
                borderRadius: '3px'
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
                fontSize: '16px',


            },
        },
    };

    const columns = [
        { name: <div className="text-wrap">Rut</div>, selector: row => row.rut, center: true, wrap: true },
        { name: <div className="text-wrap">Dv</div>, selector: row => row.dv, center: true, wrap: true },
        { name: <div className="text-wrap">Nombre</div>, selector: row => row.nombre, center: true, wrap: true },
        { name: <div className="text-wrap">Nombre Segundo</div>, selector: row => row.nombre_Segundo, center: true, wrap: true },
        { name: <div className="text-wrap">Apellido Materno</div>, selector: row => row.apellido_Materno, center: true, wrap: true },
        { name: <div className="text-wrap">Apellido Paterno</div>, selector: row => row.apellido_Paterno, center: true, wrap: true },
        { name: <div className="text-wrap">Sucursal</div>, selector: row => row.sucursal, center: true, wrap: true },
        { name: <div className="text-wrap">Fecha Nac</div>, selector: row => row.fecha_Nac, center: true, wrap: true },
        { name: <div className="text-wrap">Fecha Ingreso Caja</div>, selector: row => row.fecha_Ingreso_Caja, center: true, wrap: true },
        { name: <div className="text-wrap">Mail</div>, selector: row => row.mail, center: true, wrap: true },
        { name: <div className="text-wrap">Direccion</div>, selector: row => row.direccion, center: true, wrap: true },
        { name: <div className="text-wrap">Numero</div>, selector: row => row.numero, center: true, wrap: true },
        { name: <div className="text-wrap">Villa</div>, selector: row => row.villa, center: true, wrap: true },
        { name: <div className="text-wrap">Comuna</div>, selector: row => row.comuna, center: true, wrap: true },
        { name: <div className="text-wrap">Ciudad</div>, selector: row => row.ciudad, center: true, wrap: true },
        { name: <div className="text-wrap">Region</div>, selector: row => row.region, center: true, wrap: true },
        { name: <div className="text-wrap">Nombre Empresa Epp</div>, selector: row => row.nombre_Empresa_Epp, center: true, wrap: true },
        { name: <div className="text-wrap">Rut Empresa Epp</div>, selector: row => row.rut_Empresa_Epp, center: true, wrap: true },
        { name: <div className="text-wrap">Campana</div>, selector: row => row.campana, center: true, wrap: true },
        { name: <div className="text-wrap">Preaprobado</div>, selector: row => row.preaprobado, center: true, wrap: true },
        { name: <div className="text-wrap">Valor Cuota</div>, selector: row => row.valor_Cuota, center: true, wrap: true },
        { name: <div className="text-wrap">Plazo</div>, selector: row => row.plazo, center: true, wrap: true },
        { name: <div className="text-wrap">Monto Liquido</div>, selector: row => row.monto_Liquido, center: true, wrap: true },
        { name: <div className="text-wrap">Cae</div>, selector: row => row.cae, center: true, wrap: true },
        { name: <div className="text-wrap">Tasa</div>, selector: row => row.tasa, center: true, wrap: true },
        { name: <div className="text-wrap">Monto Final</div>, selector: row => row.monto_Final, center: true, wrap: true },
        { name: <div className="text-wrap">Sucursal1</div>, selector: row => row.sucursal1, center: true, wrap: true },
        { name: <div className="text-wrap">Telefono 1</div>, selector: row => row.telefono_1, center: true, wrap: true },
        { name: <div className="text-wrap">Marca X1</div>, selector: row => row.marca_X1, center: true, wrap: true },
        { name: <div className="text-wrap">Fecha X1</div>, selector: row => row.fecha_X1, center: true, wrap: true },
        { name: <div className="text-wrap">Marca Ejecutivo 1</div>, selector: row => row.marca_Ejecutivo_1, center: true, wrap: true },
        { name: <div className="text-wrap">Telefono 2</div>, selector: row => row.telefono_2, center: true, wrap: true },
        { name: <div className="text-wrap">Marca X2</div>, selector: row => row.marca_X2, center: true, wrap: true },
        { name: <div className="text-wrap">Fecha X2</div>, selector: row => row.fecha_X2, center: true, wrap: true },
        { name: <div className="text-wrap">Marca Ejecutivo 2</div>, selector: row => row.marca_Ejecutivo_2, center: true, wrap: true },
        { name: <div className="text-wrap">Telefono 3</div>, selector: row => row.telefono_3, center: true, wrap: true },
        { name: <div className="text-wrap">Marca X3</div>, selector: row => row.marca_X3, center: true, wrap: true },
        { name: <div className="text-wrap">Fecha X3</div>, selector: row => row.fecha_X3, center: true, wrap: true },
        { name: <div className="text-wrap">Marca Ejecutivo 3</div>, selector: row => row.marca_Ejecutivo_3, center: true, wrap: true },
        { name: <div className="text-wrap">Telefono 4</div>, selector: row => row.telefono_4, center: true, wrap: true },
        { name: <div className="text-wrap">Marca X4</div>, selector: row => row.marca_X4, center: true, wrap: true },
        { name: <div className="text-wrap">Fecha X4</div>, selector: row => row.fecha_X4, center: true, wrap: true },
        { name: <div className="text-wrap">Marca Ejecutivo 4</div>, selector: row => row.marca_Ejecutivo_4, center: true, wrap: true },
        { name: <div className="text-wrap">Telefono 5</div>, selector: row => row.telefono_5, center: true, wrap: true },
        { name: <div className="text-wrap">Marca X5</div>, selector: row => row.marca_X5, center: true, wrap: true },
        { name: <div className="text-wrap">Fecha X5</div>, selector: row => row.fecha_X5, center: true, wrap: true },
        { name: <div className="text-wrap">Marca Ejecutivo 5</div>, selector: row => row.marca_Ejecutivo_5, center: true, wrap: true },
        { name: <div className="text-wrap">Telefono 6</div>, selector: row => row.telefono_6, center: true, wrap: true },
        { name: <div className="text-wrap">Marca X6</div>, selector: row => row.marca_X6, center: true, wrap: true },
        { name: <div className="text-wrap">Fecha X6</div>, selector: row => row.fecha_X6, center: true, wrap: true },
        { name: <div className="text-wrap">Marca Ejecutivo 6</div>, selector: row => row.marca_Ejecutivo_6, center: true, wrap: true },
        { name: <div className="text-wrap">Telefono 7</div>, selector: row => row.telefono_7, center: true, wrap: true },
        { name: <div className="text-wrap">Marca X7</div>, selector: row => row.marca_X7, center: true, wrap: true },
        { name: <div className="text-wrap">Fecha X7</div>, selector: row => row.fecha_X7, center: true, wrap: true },
        { name: <div className="text-wrap">Marca Ejecutivo 7</div>, selector: row => row.marca_Ejecutivo_7, center: true, wrap: true },
        { name: <div className="text-wrap">Telefono 8</div>, selector: row => row.telefono_8, center: true, wrap: true },
        { name: <div className="text-wrap">Marca X8</div>, selector: row => row.marca_X8, center: true, wrap: true },
        { name: <div className="text-wrap">Fecha X8</div>, selector: row => row.fecha_X8, center: true, wrap: true },
        { name: <div className="text-wrap">Marca Ejecutivo 8</div>, selector: row => row.marca_Ejecutivo_8, center: true, wrap: true },
        { name: <div className="text-wrap">Telefono 9</div>, selector: row => row.telefono_9, center: true, wrap: true },
        { name: <div className="text-wrap">Marca X9</div>, selector: row => row.marca_X9, center: true, wrap: true },
        { name: <div className="text-wrap">Fecha X9</div>, selector: row => row.fecha_X9, center: true, wrap: true },
        { name: <div className="text-wrap">Marca Ejecutivo 9</div>, selector: row => row.marca_Ejecutivo_9, center: true, wrap: true },
        { name: <div className="text-wrap">Telefono 10</div>, selector: row => row.telefono_10, center: true, wrap: true },
        { name: <div className="text-wrap">Marca X10</div>, selector: row => row.marca_X10, center: true, wrap: true },
        { name: <div className="text-wrap">Fecha X10</div>, selector: row => row.fecha_X10, center: true, wrap: true },
        { name: <div className="text-wrap">Marca Ejecutivo 10</div>, selector: row => row.marca_Ejecutivo_10, center: true, wrap: true },
        { name: <div className="text-wrap">Fono Contacto</div>, selector: row => row.fono_Contacto, center: true, wrap: true },
        { name: <div className="text-wrap">Fecha</div>, selector: row => row.fecha, center: true, wrap: true },
        { name: <div className="text-wrap">Nro Nom Usuario</div>, selector: row => row.nro_Nom_Usuario, center: true, wrap: true },
        { name: <div className="text-wrap">Observaciones</div>, selector: row => row.observaciones, center: true, wrap: true },
        { name: <div className="text-wrap">Duracion</div>, selector: row => row.duracion, center: true, wrap: true },
        { name: <div className="text-wrap">Grabacion</div>, selector: row => row.grabacion, center: true, wrap: true },
        { name: <div className="text-wrap">Telefono Ani</div>, selector: row => row.telefono_Ani, center: true, wrap: true },
        { name: <div className="text-wrap">Categoria</div>, selector: row => row.categoria, center: true, wrap: true },
        { name: <div className="text-wrap">Resolucion</div>, selector: row => row.resolucion, center: true, wrap: true },
        { name: <div className="text-wrap">Subcategoria</div>, selector: row => row.subcategoria, center: true, wrap: true },
        { name: <div className="text-wrap">Fecha Gestion</div>, selector: row => row.fecha_Gestion, center: true, wrap: true },
        { name: <div className="text-wrap">Fecha Visita G</div>, selector: row => row.fecha_Visita_G, center: true, wrap: true },

    ];


    return (
        <>

            <div className="row">
                <div className="col-12">

                    <div className="col-sm-12 col-md-12 col-lg-12 text-center">
                        <div className="card mb-4 rounded-3 shadow-sm">
                            <div className="card-header">
                                <h4 className="my-0 font-weight-normal">Resultante</h4>
                            </div>
                            <div className="card-body">
                                <section className=" float-start">
                                    <button
                                        onClick={handleOnExportCarga}
                                        className="rounded inline-flex items-center py-2 px-4 text-sm font-medium text-gray-900 bg-secondary rounded-md border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 m-2 text-white">
                                        <i className="fa-solid fa-file-excel mr-2"></i>  Exportar
                                    </button>
                                </section>
                                {loading ? (
                                    <div className="d-flex justify-content-center mt-3">
                                        <DotLoader
                                            className='loading'
                                            color={'#5b198ab5'}
                                            loading={loading}
                                            size={60}
                                            aria-label="Loading Spinner"
                                            data-testid="loader"
                                        />
                                    </div>

                                ) : (
                                    <div className=" mt-5 "  >

                                        <DataTable
                                            columns={columns}
                                            data={datafull}
                                            customStyles={customStyles}
                                            noDataComponent="Los Filtros No Contiene Datos" //or your component
                                        />
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
export default ReporteResultanteCampana