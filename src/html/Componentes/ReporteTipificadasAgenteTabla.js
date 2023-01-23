import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { getToken, removeUserSession, setUserSession } from './Common';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as XLSX from "xlsx";
import DotLoader from "react-spinners/DotLoader";

function ReporteTipificadasAgenteTabla({ flujo, ini, fin, nombre }) {

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
            Nombres_o_Razón_Social_Empresa: v.nombresorazonsocialempresa,
            Apellido_Paterno: v.apellidopaterno,
            Apellido_Materno: v.apellidomaterno,
            Rut: v.rut,
            DV: v.dv,
            Telefono: v.telefono,
            Codigo_Area: v.codigoarea,
            Calle: v.calle,
            Numero: v.numero,
            Poblacion: v.poblacion,
            Comuna: v.comuna,
            Ciudad: v.ciudad,
            Region: v.region,
            Mail: v.mail,
            Canal: v.canal,
            Tipo_Afiliado: v.tipoafiliado,
            Nro_Atencion: v.nroatencion,
            Nro_De_Ticket: v.nrodeticket,
            ANI: v.ani,
            Fecha: v.fecha,
            Hora: v.hora,
            Habilidad: v.habilidad,
            Operación: v.operacion,
            SubOperación: v.suboperacion,
            Tipo: v.tipo,
            Script: v.script,
            Estado_Actual_del_Ticket: v.estadoactualdelticket,
            Ejecutivo_de_atención: v.ejecutivodeatencion,
            Supervisor: v.supervisor,
            Fecha_Asignado: v.fechaasignado,
            Hora_Asignado: v.horaasignado,
            Fecha_En_Proceso: v.fechaenproceso,
            Hora_en_Proceso: v.horaenproceso,
            Ejecutivo_En_Proceso: v.ejecutivoenproceso,
            Fecha_Solucionado: v.fechasolucionado,
            Hora_Solucionado: v.horasolucionado,
            Resolutor_de_la_atención: v.resolutordelaatencion,
            Fecha_Cerrado: v.fechacerrado,
            Hora_de_cierre: v.horadecierre,
            Ejecutivo_de_cierre_del_requerimiento: v.ejecutivodecierredelrequerimiento,
            Observación_Requerimiento: v.observacionrequerimiento,
            Motivo: v.motivo,
            Fecha_y_Hora_que_recibió_el_correo: v.fechayhoraquerecibioelcorreo,
            Antiguedad_Laboral: v.antiguedadlaboral,
            Cupo_máximo_disponible: v.cupomáximodisponible,
            Monto_a_solicitar: v.montoasolicitar,
            Renta_Liquida: v.rentaliquida,
            Sucursal: v.sucursal,
            Sucursal_de_pago: v.sucursaldepago,
            Sucursal_De_Tramitacion: v.sucursaldetramitacion,
            Teléfono: v.teléfono,
            Tipo_de_renta_Fija_o_Variable: v.tipoderentafijaovariable
        }));

        let ws = XLSX.utils.json_to_sheet(arr2);
        var today = new Date()
        let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
        XLSX.utils.book_append_sheet(wb, ws, "ReporteTipificaionAgente");
        XLSX.writeFile(wb, "Reporte_Tipificaion_Agente_" + date + ".xlsx");
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


        const result = await axios.post('https://app.soluziona.cl/API_v1_prod/CallSouth/API_CallSouth_CRM_LosHeroes/api/Ventas_CRM/CRM/DashTrafico/Agente/Detalle',
            { dato: flujo, dato_1: ini, dato_2: fin },
            { headers: { "Authorization": `Bearer ${sesiones.stoken}` } })

        if (result.status === 200) {

            console.log(result.data)
            setData(result.data);
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
        { name: <div className="text-wrap">Nombres o Razón Social Empresa</div>, selector: row => row.nombresorazonsocialempresa, center: true, wrap: true }
        , { name: <div className="text-wrap">Apellido Paterno</div>, selector: row => row.apellidopaterno, center: true }
        , { name: <div className="text-wrap">Apellido Materno</div>, selector: row => row.apellidomaterno, center: true }
        , { name: <div className="text-wrap">Rut</div>, selector: row => row.rut, center: true }
        , { name: <div className="text-wrap">DV</div>, selector: row => row.dv, center: true }
        , { name: <div className="text-wrap">Telefono</div>, selector: row => row.telefono, center: true }
        , { name: <div className="text-wrap">Codigo Area</div>, selector: row => row.codigoarea, center: true }
        , { name: <div className="text-wrap">Calle</div>, selector: row => row.calle, center: true }
        , { name: <div className="text-wrap">Numero</div>, selector: row => row.numero, center: true }
        , { name: <div className="text-wrap">Poblacion</div>, selector: row => row.poblacion, center: true }
        , { name: <div className="text-wrap">Comuna</div>, selector: row => row.comuna, center: true }
        , { name: <div className="text-wrap">Ciudad</div>, selector: row => row.ciudad, center: true }
        , { name: <div className="text-wrap">Region</div>, selector: row => row.region, center: true }
        , { name: <div className="text-wrap">Mail</div>, selector: row => row.mail, center: true }
        , { name: <div className="text-wrap">Canal</div>, selector: row => row.canal, center: true }
        , { name: <div className="text-wrap">Tipo Afiliado</div>, selector: row => row.tipoafiliado, center: true }
        , { name: <div className="text-wrap">Nro. Atención</div>, selector: row => row.nroatencion, center: true }
        , { name: <div className="text-wrap">Nro. De Ticket</div>, selector: row => row.nrodeticket, center: true }
        , { name: <div className="text-wrap">ANI</div>, selector: row => row.ani, center: true }
        , { name: <div className="text-wrap">Fecha</div>, selector: row => row.fecha, center: true }
        , { name: <div className="text-wrap">Hora</div>, selector: row => row.hora, center: true }
        , { name: <div className="text-wrap">Habilidad</div>, selector: row => row.habilidad, center: true }
        , { name: <div className="text-wrap">Operación</div>, selector: row => row.operacion, center: true }
        , { name: <div className="text-wrap">SubOperación</div>, selector: row => row.suboperacion, center: true }
        , { name: <div className="text-wrap">Tipo</div>, selector: row => row.tipo, center: true }
        , { name: <div className="text-wrap">Script</div>, selector: row => row.script, center: true }
        , { name: <div className="text-wrap">Estado Actual del Ticket</div>, selector: row => row.estadoactualdelticket, center: true }
        , { name: <div className="text-wrap">Ejecutivo de atención</div>, selector: row => row.ejecutivodeatencion, center: true }
        , { name: <div className="text-wrap">SUPERVISOR</div>, selector: row => row.supervisor, center: true }
        , { name: <div className="text-wrap">Fecha Asignado</div>, selector: row => row.fechaasignado, center: true }
        , { name: <div className="text-wrap">Hora Asignado</div>, selector: row => row.horaasignado, center: true }
        , { name: <div className="text-wrap">Fecha En Proceso</div>, selector: row => row.fechaenproceso, center: true }
        , { name: <div className="text-wrap">Hora en Proceso</div>, selector: row => row.horaenproceso, center: true }
        , { name: <div className="text-wrap">Ejecutivo "En Proceso"</div>, selector: row => row.ejecutivoenproceso, center: true }
        , { name: <div className="text-wrap">Fecha Solucionado</div>, selector: row => row.fechasolucionado, center: true }
        , { name: <div className="text-wrap">Hora Solucionado</div>, selector: row => row.horasolucionado, center: true }
        , { name: <div className="text-wrap">Resolutor de la atención</div>, selector: row => row.resolutordelaatencion, center: true }
        , { name: <div className="text-wrap">Fecha Cerrado</div>, selector: row => row.fechacerrado, center: true }
        , { name: <div className="text-wrap">Hora de cierre</div>, selector: row => row.horadecierre, center: true }
        , { name: <div className="text-wrap">Ejecutivo de cierre del requerimiento</div>, selector: row => row.ejecutivodecierredelrequerimiento, center: true }
        , { name: <div className="text-wrap">Observación Requerimiento</div>, selector: row => row.observacionrequerimiento, center: true }
        , { name: <div className="text-wrap">Motivo</div>, selector: row => row.motivo, center: true }
        , { name: <div className="text-wrap">Fecha y Hora que recibió el correo</div>, selector: row => row.fechayhoraquerecibioelcorreo, center: true }
        , { name: <div className="text-wrap">Antiguedad Laboral</div>, selector: row => row.antiguedadlaboral, center: true }
        , { name: <div className="text-wrap">Cupo máximo disponible</div>, selector: row => row.cupomáximodisponible, center: true }
        , { name: <div className="text-wrap">Monto a solicitar</div>, selector: row => row.montoasolicitar, center: true }
        , { name: <div className="text-wrap">Renta Liquida</div>, selector: row => row.rentaliquida, center: true }
        , { name: <div className="text-wrap">Sucursal</div>, selector: row => row.sucursal, center: true }
        , { name: <div className="text-wrap">Sucursal de pago</div>, selector: row => row.sucursaldepago, center: true }
        , { name: <div className="text-wrap">Sucursal De Tramitacion</div>, selector: row => row.sucursaldetramitacion, center: true }
        , { name: <div className="text-wrap">Teléfono</div>, selector: row => row.teléfono, center: true }
        , { name: <div className="text-wrap">Tipo de renta (Fija o Variable)</div>, selector: row => row.tipoderentafijaovariable, center: true }

    ];


    return (
        <>
            <div className="row">
                <div className="col-12">

                    <div className="col-sm-12 col-md-12 col-lg-12 text-center">
                        <div className="card mb-4 rounded-3 shadow-sm">
                            <div className="card-header">
                                <h4 className="my-0 font-weight-normal">Detalle Agente Tipificadas - {nombre}</h4>
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
                                            pagination
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
export default ReporteTipificadasAgenteTabla