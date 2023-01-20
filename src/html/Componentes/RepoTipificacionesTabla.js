import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { getToken, removeUserSession, setUserSession } from './Common';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as XLSX from "xlsx";
import DotLoader from "react-spinners/DotLoader";

function RepoTipificacionesTabla({ ini, fin }) {

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
            CUENTA_VENTA: v.cuenta_venta,
            CUENTA_NOVENTA: v.cuenta_Noventa,
            APRECIOMEDICAMENTO: v.aprecioMedicamento,
            SINCOBERTURA: v.sinCobertura,
            SINSTOCK: v.sinStock,
            SEARREPIENTE: v.seArrepiente,
            COSTEALTO: v.costeAlto,
            CLIENTENOACEPTATIEMPO: v.clienteNoAceptaTiempo,
            SINOPCION: v.sinOpcion,
            TOTALTIPIFICADOSINTENCIONVENTA: v.totalTipificadosIntencionVenta,
            TOTALTIPIFICADOSSININTENCIONVENTA: v.totalTipificadosSinIntencionVenta,
            CONSULTAS: v.consultas,
            ANULA: v.anula,
            OTROS: v.otros,
            OTROSEQUIVOCADA: v.otrosEquivocada,
            OTROSPITANZA: v.otrosPitanza,
            OTROSPRUEBA: v.otrosPrueba,
            CONSULTACOMPRAANTERIOR: v.consultaCompraAnterior,
            CONSULTADESPACHOCURSO: v.consultaDespachoCurso,
            CONSULTAPRECIOMEDICAMENTO: v.consultaPrecioMedicamento,
            CONSULTASTOCKTIENDA: v.consultaStockTienda,
            CONSULTACUPOSBPAY: v.consultaCupoSBPAY,
            CONSULTAPAGINAWEB: v.consultaPaginaWeb,
            CONSULTACLIENTEGES: v.consultaClienteGES,
            CONSULTAESTADOCUENTA: v.consultaEstadoCuenta,
            TOTALTIPIFICADOS: v.totalTipificados


        }));

        let ws = XLSX.utils.json_to_sheet(arr2);
        var today = new Date()
        let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
        XLSX.utils.book_append_sheet(wb, ws, "Datos");
        XLSX.writeFile(wb, "Reporte_Tipificados_" + date + ".xlsx");
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
        const rutaservidor = "/Orkesta/CallSouth/Salcobrand/CRM"
        if (!token) {
            // console.log('Vacio')
            navigate(rutaservidor);
            return;
        }


        axios.post('https://app.soluziona.cl/API_v1_prod/CallSouth/API_CallSouth.Salcobrand.CRM/api/Ventas_CRM/CRM/Session_check', { user: sesiones.sid_usuario, gui: sesiones.sgui }, { headers: { "Authorization": `Bearer ${sesiones.stoken}` } })
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


        const result = await axios.post('https://app.soluziona.cl/API_v1_prod/CallSouth/API_CallSouth.Salcobrand.CRM/api/Contact_CRM_Vocalcom/CRM/Tipi', { dato: ini, dato_1: fin })

        if (result.status === 200) {
            setData(result.data)

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
                fontSize: '12px',
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
        { name: <div className="text-wrap">CUENTA VENTA</div>, selector: row => row.cuenta_venta, center: true },
        { name: <div className="text-wrap">CUENTA NOVENTA</div>, selector: row => row.cuenta_Noventa, center: true },
        { name: <div className="text-wrap">A PRECIO MEDICAMENTO</div>, selector: row => row.aprecioMedicamento, center: true },
        { name: <div className="text-wrap">SIN COBERTURA</div>, selector: row => row.sinCobertura, center: true },
        { name: <div className="text-wrap">SIN STOCK</div>, selector: row => row.sinStock, center: true },
        { name: <div className="text-wrap">SE ARREPIENTE</div>, selector: row => row.seArrepiente, center: true },
        { name: <div className="text-wrap">COSTE ALTO</div>, selector: row => row.costeAlto, center: true },
        { name: <div className="text-wrap">CLIENTE NO ACEPTA TIEMPO</div>, selector: row => row.clienteNoAceptaTiempo, center: true },
        { name: <div className="text-wrap">SIN OPCION</div>, selector: row => row.sinOpcion, center: true },
        { name: <div className="text-wrap">TOTAL TIPIFICADOS INTENCION VENTA</div>, selector: row => row.totalTipificadosIntencionVenta, center: true },
        { name: <div className="text-wrap">TOTAL TIPIFICADOS SIN INTENCION VENTA</div>, selector: row => row.totalTipificadosSinIntencionVenta, center: true },
        { name: <div className="text-wrap">CONSULTAS</div>, selector: row => row.consultas, center: true },
        { name: <div className="text-wrap">ANULA</div>, selector: row => row.anula, center: true },
        { name: <div className="text-wrap">OTROS</div>, selector: row => row.otros, center: true },
        { name: <div className="text-wrap">OTROS EQUIVOCADA</div>, selector: row => row.otrosEquivocada, center: true },
        { name: <div className="text-wrap">OTROS PITANZA</div>, selector: row => row.otrosPitanza, center: true },
        { name: <div className="text-wrap">OTROS PRUEBA</div>, selector: row => row.otrosPrueba, center: true },
        { name: <div className="text-wrap">CONSULTA COMPRA ANTERIOR</div>, selector: row => row.consultaCompraAnterior, center: true },
        { name: <div className="text-wrap">CONSULTA DESPACHO CURSO</div>, selector: row => row.consultaDespachoCurso, center: true },
        { name: <div className="text-wrap">CONSULTA PRECIO MEDICAMENTO</div>, selector: row => row.consultaPrecioMedicamento, center: true },
        { name: <div className="text-wrap">CONSULTA STOCK TIENDA</div>, selector: row => row.consultaStockTienda, center: true },
        { name: <div className="text-wrap">CONSULTA CUPOS BPAY</div>, selector: row => row.consultaCupoSBPAY, center: true },
        { name: <div className="text-wrap">CONSULTA PAGINA WEB</div>, selector: row => row.consultaPaginaWeb, center: true },
        { name: <div className="text-wrap">CONSULTA CLIENTE GES</div>, selector: row => row.consultaClienteGES, center: true },
        { name: <div className="text-wrap">CONSULTA ESTADO CUENTA</div>, selector: row => row.consultaEstadoCuenta, center: true },
        { name: <div className="text-wrap">TOTAL TIPIFICADOS</div>, selector: row => row.totalTipificados, center: true },


    ];


    return (
        <>

            <div className="row">
                <div className="col-12">

                    <div className="col-sm-12 col-md-12 col-lg-12 text-center">
                        <div className="card mb-4 rounded-3 shadow-sm">
                            <div className="card-header">
                                <h4 className="my-0 font-weight-normal">Reporte Tipificaciones</h4>
                            </div>
                            <div className="card-body">
                                <section className=" float-end">
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
export default RepoTipificacionesTabla