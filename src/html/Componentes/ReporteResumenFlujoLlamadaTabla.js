import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { getToken, removeUserSession, setUserSession } from './Common';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as XLSX from "xlsx";
import ClockLoader from "react-spinners/ClockLoader";


function ReporteResumenFlujoLlamadaTabla({ flujo, ini, fin, nombre }) {

    const [datafull, setData] = useState([]);
    const [authLoading, setAuthLoading] = useState(true);
    const navigate = useNavigate();
    const [omit, setOmit] = useState(false);
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
            Tipo_Cliente:v.detalle.split("|")[0],
            Detalle:v.detalle.split("|")[1],
            Total:((parseInt((v._1 === null) ? 0 : v._1) +
            parseInt((v._2 === null) ? 0 : v._2) +
            parseInt((v._3 === null) ? 0 : v._3) +
            parseInt((v._4 === null) ? 0 : v._4) +
            parseInt((v._5 === null) ? 0 : v._5) +
            parseInt((v._6 === null) ? 0 : v._6) +
            parseInt((v._7 === null) ? 0 : v._7) +
            parseInt((v._8 === null) ? 0 : v._8) +
            parseInt((v._9 === null) ? 0 : v._9) +
            parseInt((v._10 === null) ? 0 : v._10) +
            parseInt((v._11 === null) ? 0 : v._11) +
            parseInt((v._12 === null) ? 0 : v._12) +
            parseInt((v._13 === null) ? 0 : v._13) +
            parseInt((v._14 === null) ? 0 : v._14) +
            parseInt((v._15 === null) ? 0 : v._15) +
            parseInt((v._16 === null) ? 0 : v._16) +
            parseInt((v._17 === null) ? 0 : v._17) +
            parseInt((v._18 === null) ? 0 : v._18) +
            parseInt((v._19 === null) ? 0 : v._19) +
            parseInt((v._20 === null) ? 0 : v._20) +
            parseInt((v._21 === null) ? 0 : v._21) +
            parseInt((v._22 === null) ? 0 : v._22) +
            parseInt((v._23 === null) ? 0 : v._23) +
            parseInt((v._24 === null) ? 0 : v._24) +
            parseInt((v._25 === null) ? 0 : v._25) +
            parseInt((v._26 === null) ? 0 : v._26) +
            parseInt((v._27 === null) ? 0 : v._27) +
            parseInt((v._28 === null) ? 0 : v._28) +
            parseInt((v._29 === null) ? 0 : v._29) +
            parseInt((v._30 === null) ? 0 : v._30) +
            parseInt((v._31 === null) ? 0 : v._31))),
           _1:v._1,
           _2:v._2,
           _3:v._3,
           _4:v._4,
           _5:v._5,
           _6:v._6,
           _7:v._7,
           _8:v._8,
           _9:v._9,
           _10:v._10,
           _11:v._11,
           _12:v._12,
           _13:v._13,
           _14:v._14,
           _15:v._15,
           _16:v._16,
           _17:v._17,
           _18:v._18,
           _19:v._19,
           _20:v._20,
           _21:v._21,
           _22:v._22,
           _23:v._23,
           _24:v._24,
           _25:v._25,
           _26:v._26,
           _27:v._27,
           _28:v._28,
           _29:v._29,
           _30:v._30,
           _31:v._31,
            // RUT_PERSONA: v.ruT_PERSONA,
            // This_Phone_number: v.this_Phone_number,
            // Call_Disposition: v.call_Disposition,
            // Call_Time: v.call_Time,
            // Dialing_Duration: v.dialing_Duration,
            // Answered_Duration: v.answered_Duration,
            // Agent: v.agent,
            // Recording_file: v.recording_file,
            // Global_Interaction_ID: v.global_Interaction_ID,
            // List_name: v.list_name
        }));

        let ws = XLSX.utils.json_to_sheet(arr2);
        var today = new Date()
        let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
        XLSX.utils.book_append_sheet(wb, ws, "Carga");
        XLSX.writeFile(wb, "ReporteFlujoLlamada_" + date + ".xlsx");
    };

    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        // setTimeout(() => {
        //     setLoading(false)
        // }, 3000)
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


        const result = await axios.post('https://app.soluziona.cl/API_v1_prod/CallSouth/API_CallSouth_CRM_LosHeroes/api/Ventas_CRM/CRM/DashTrafico/FLujo/Acumulado',
            { dato: flujo, dato_1: ini, dato_2: fin },
            { headers: { "Authorization": `Bearer ${sesiones.stoken}` } })

        if (result.status === 200) {

            // console.log(result.data)

            result.data.push({
                detalle: "Acumulado|",
                _1: getTotals(result.data, "_1"),
                _2: getTotals(result.data, "_2"),
                _3: getTotals(result.data, "_3"),
                _4: getTotals(result.data, "_4"),
                _5: getTotals(result.data, "_5"),
                _6: getTotals(result.data, "_6"),
                _7: getTotals(result.data, "_7"),
                _8: getTotals(result.data, "_8"),
                _9: getTotals(result.data, "_9"),
                _10: getTotals(result.data, "_10"),
                _11: getTotals(result.data, "_11"),
                _12: getTotals(result.data, "_12"),
                _13: getTotals(result.data, "_13"),
                _14: getTotals(result.data, "_14"),
                _15: getTotals(result.data, "_15"),
                _16: getTotals(result.data, "_16"),
                _17: getTotals(result.data, "_17"),
                _18: getTotals(result.data, "_18"),
                _19: getTotals(result.data, "_19"),
                _20: getTotals(result.data, "_20"),
                _21: getTotals(result.data, "_21"),
                _22: getTotals(result.data, "_22"),
                _23: getTotals(result.data, "_23"),
                _24: getTotals(result.data, "_24"),
                _25: getTotals(result.data, "_25"),
                _26: getTotals(result.data, "_26"),
                _27: getTotals(result.data, "_27"),
                _28: getTotals(result.data, "_28"),
                _29: getTotals(result.data, "_29"),
                _30: getTotals(result.data, "_30"),
                _31: getTotals(result.data, "_31"),

            });


            setData(result.data);
            setLoading(false)
            console.log(result.data)
        }
        else{
            setLoading(false)
        }

    })

    // const addclass=()=>{
    //     document.querySelector("row._1").classList.add('d-none');
    // }

    const getTotals = (data, key) => {
        let total = 0;
        data.forEach(item => {
            total += (item[key] === null) ? 0 : parseInt(item[key]);
        });
        return total;
    };
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
                fontSize: '12px',
            },

        },

    };

   async function esconder(row){
        console.log(console.log(row))
        console.log("prueba")
    }

    const conditionalRowStyles = [
        {
          when: row => row._1 === 0 || row._1 === null,
          headCells: {
            style: {
                paddingLeft: '8px', // override the cell padding for head cells
                paddingRight: '8px',
                backgroundColor: '#a9dff0',

            },
        },
        },
      ];

      

    const columns = [
        {
            name: <div className="text-wrap">Tipo Cliente</div>,
            selector: row => row.detalle.split("|")[0],
            center: true
        },
        {
            name: <div className="text-wrap">Detalle</div>,
            selector: row => row.detalle.split("|")[1],
            center: true,
            wrap: true,
        }
        ,
        {
            name: <div className="text-wrap">Total</div>,
            selector: row => (parseInt((row._1 === null) ? 0 : row._1) +
                parseInt((row._2 === null) ? 0 : row._2) +
                parseInt((row._3 === null) ? 0 : row._3) +
                parseInt((row._4 === null) ? 0 : row._4) +
                parseInt((row._5 === null) ? 0 : row._5) +
                parseInt((row._6 === null) ? 0 : row._6) +
                parseInt((row._7 === null) ? 0 : row._7) +
                parseInt((row._8 === null) ? 0 : row._8) +
                parseInt((row._9 === null) ? 0 : row._9) +
                parseInt((row._10 === null) ? 0 : row._10) +
                parseInt((row._11 === null) ? 0 : row._11) +
                parseInt((row._12 === null) ? 0 : row._12) +
                parseInt((row._13 === null) ? 0 : row._13) +
                parseInt((row._14 === null) ? 0 : row._14) +
                parseInt((row._15 === null) ? 0 : row._15) +
                parseInt((row._16 === null) ? 0 : row._16) +
                parseInt((row._17 === null) ? 0 : row._17) +
                parseInt((row._18 === null) ? 0 : row._18) +
                parseInt((row._19 === null) ? 0 : row._19) +
                parseInt((row._20 === null) ? 0 : row._20) +
                parseInt((row._21 === null) ? 0 : row._21) +
                parseInt((row._22 === null) ? 0 : row._22) +
                parseInt((row._23 === null) ? 0 : row._23) +
                parseInt((row._24 === null) ? 0 : row._24) +
                parseInt((row._25 === null) ? 0 : row._25) +
                parseInt((row._26 === null) ? 0 : row._26) +
                parseInt((row._27 === null) ? 0 : row._27) +
                parseInt((row._28 === null) ? 0 : row._28) +
                parseInt((row._29 === null) ? 0 : row._29) +
                parseInt((row._30 === null) ? 0 : row._30) +
                parseInt((row._31 === null) ? 0 : row._31)),
            center: true
        }
        ,
        // addclass(),
        //{ row == 0 ? className="d-none" : className="text-wrap" }
        // { row === null ? className="d-none" : className="text-wrap"}
        // className={`${et xt-wrap"}`}


        { name: <div id="row._1" className="text-wrap">{ini.substring(0, 6)}01</div>, selector: row => row._1, center: true, },
        { name: <div id="row._2" className="text-wrap">{ini.substring(0, 6)}02</div>, selector: row => row._2, center: true, },
        { name: <div id="row._3" className="text-wrap">{ini.substring(0, 6)}03</div>, selector: row => row._3, center: true },
        { name: <div id="row._4" className="text-wrap">{ini.substring(0, 6)}04</div>, selector: row => row._4, center: true },
        { name: <div id="row._5" className="text-wrap">{ini.substring(0, 6)}05</div>, selector: row => row._5, center: true },
        { name: <div id="row._6" className="text-wrap">{ini.substring(0, 6)}06</div>, selector: row => row._6, center: true },
        { name: <div id="row._7" className="text-wrap">{ini.substring(0, 6)}07</div>, selector: row => row._7, center: true },
        { name: <div id="row._8" className="text-wrap">{ini.substring(0, 6)}08</div>, selector: row => row._8, center: true },
        { name: <div id="row._9" className="text-wrap">{ini.substring(0, 6)}09</div>, selector: row => row._9, center: true },
        { name: <div id="row._10" className="text-wrap">{ini.substring(0, 6)}10</div>, selector: row => row._10, center: true },
        { name: <div id="row._11" className="text-wrap">{ini.substring(0, 6)}11</div>, selector: row => row._11, center: true },
        { name: <div id="row._12" className="text-wrap">{ini.substring(0, 6)}12</div>, selector: row => row._12, center: true },
        { name: <div id="row._13" className="text-wrap">{ini.substring(0, 6)}13</div>, selector: row => row._13, center: true },
        { name: <div id="row._14" className="text-wrap">{ini.substring(0, 6)}14</div>, selector: row => row._14, center: true },
        { name: <div id="row._15" className="text-wrap">{ini.substring(0, 6)}15</div>, selector: row => row._15, center: true },
        { name: <div id="row._16" className="text-wrap">{ini.substring(0, 6)}16</div>, selector: row => row._16, center: true, omit : () =>esconder()},
        // { name: <div id="row._16" className="text-wrap">{ini.substring(0, 6)}16</div>, selector: row => row._16 == null || row._16 == 0 ? setOmit(true) : setOmit(false) , center: true, omit : omit },
        // == null || row._16 == 0 ? {omit: true} : {omit : false}
        { name: <div id="row._17" className="text-wrap">{ini.substring(0, 6)}17</div>, selector: row => row._17, center: true },
        { name: <div id="row._18" className="text-wrap">{ini.substring(0, 6)}18</div>, selector: row => row._18, center: true },
        { name: <div id="row._19" className="text-wrap">{ini.substring(0, 6)}19</div>, selector: row => row._19, center: true },
        { name: <div id="row._20" className="text-wrap">{ini.substring(0, 6)}20</div>, selector: row => row._20, center: true },
        { name: <div id="row._21" className="text-wrap">{ini.substring(0, 6)}21</div>, selector: row => row._21, center: true },
        { name: <div id="row._22" className="text-wrap">{ini.substring(0, 6)}22</div>, selector: row => row._22, center: true },
        { name: <div id="row._23" className="text-wrap">{ini.substring(0, 6)}23</div>, selector: row => row._23, center: true },
        { name: <div id="row._24" className="text-wrap">{ini.substring(0, 6)}24</div>, selector: row => row._24, center: true },
        { name: <div id="row._25" className="text-wrap">{ini.substring(0, 6)}25</div>, selector: row => row._25, center: true },
        { name: <div id="row._26" className="text-wrap">{ini.substring(0, 6)}26</div>, selector: row => row._26, center: true },
        { name: <div id="row._27" className="text-wrap">{ini.substring(0, 6)}27</div>, selector: row => row._27, center: true },
        { name: <div id="row._28" className="text-wrap">{ini.substring(0, 6)}28</div>, selector: row => row._28, center: true },
        { name: <div id="row._29" className="text-wrap">{ini.substring(0, 6)}29</div>, selector: row => row._29, center: true },
        { name: <div id="row._30" className="text-wrap">{ini.substring(0, 6)}30</div>, selector: row => row._30, center: true },
        { name: <div id="row._31" className="text-wrap">{ini.substring(0, 6)}31</div>, selector: row => row._31, center: true },
        esconder()
        

        // { name: <div className="text-wrap">{ini.substring(0, 6)}01</div>, selector: row => row._1, center: true },
        // { name: <div className="text-wrap">{ini.substring(0, 6)}02</div>, selector: row => row._2, center: true },
     
        { name: <div className="text-wrap">01{"/"+ini.substring(4, 6)+"/"+ ini.slice(0, 4) }</div>, selector: row => row._1, center: true },
        { name: <div className="text-wrap">02{"/"+ini.substring(4, 6)+"/"+ ini.slice(0, 4)}</div>, selector: row => row._1, center: true},
        { name: <div className="text-wrap">03{"/"+ini.substring(4, 6)+"/"+ ini.slice(0, 4) }</div>, selector: row => row._1, center: true},
        { name: <div className="text-wrap">04{"/"+ini.substring(4, 6)+"/"+ ini.slice(0, 4) }</div>, selector: row => row._1, center: true},
        { name: <div className="text-wrap">05{"/"+ini.substring(4, 6)+"/"+ ini.slice(0, 4) }</div>, selector: row => row._5, center: true },
        { name: <div className="text-wrap">06{"/"+ini.substring(4, 6)+"/"+ ini.slice(0, 4) }</div>, selector: row => row._6, center: true },
        { name: <div className="text-wrap">07{"/"+ini.substring(4, 6)+"/"+ ini.slice(0, 4) }</div>, selector: row => row._7, center: true },
        { name: <div className="text-wrap">08{"/"+ini.substring(4, 6)+"/"+ ini.slice(0, 4) }</div>, selector: row => row._8, center: true },
        { name: <div className="text-wrap">09{"/"+ini.substring(4, 6)+"/"+ ini.slice(0, 4) }</div>, selector: row => row._9, center: true },
        { name: <div className="text-wrap">10{"/"+ini.substring(4, 6)+"/"+ ini.slice(0, 4) }</div>, selector: row => row._10, center: true },
        { name: <div className="text-wrap">11{"/"+ini.substring(4, 6)+"/"+ ini.slice(0, 4) }</div>, selector: row => row._11, center: true },
        { name: <div className="text-wrap">12{"/"+ini.substring(4, 6)+"/"+ ini.slice(0, 4) }</div>, selector: row => row._12, center: true },
        { name: <div className="text-wrap">13{"/"+ini.substring(4, 6)+"/"+ ini.slice(0, 4) }</div>, selector: row => row._13, center: true },
        { name: <div className="text-wrap">14{"/"+ini.substring(4, 6)+"/"+ ini.slice(0, 4) }</div>, selector: row => row._14, center: true },
        { name: <div className="text-wrap">15{"/"+ini.substring(4, 6)+"/"+ ini.slice(0, 4) }</div>, selector: row => row._15, center: true },
        { name: <div className="text-wrap">16{"/"+ini.substring(4, 6)+"/"+ ini.slice(0, 4) }</div>, selector: row => row._16, center: true },
        { name: <div className="text-wrap">17{"/"+ini.substring(4, 6)+"/"+ ini.slice(0, 4) }</div>, selector: row => row._17, center: true },
        { name: <div className="text-wrap">18{"/"+ini.substring(4, 6)+"/"+ ini.slice(0, 4) }</div>, selector: row => row._18, center: true },
        { name: <div className="text-wrap">19{"/"+ini.substring(4, 6)+"/"+ ini.slice(0, 4) }</div>, selector: row => row._19, center: true },
        { name: <div className="text-wrap">20{"/"+ini.substring(4, 6)+"/"+ ini.slice(0, 4) }</div>, selector: row => row._20, center: true },
        { name: <div className="text-wrap">21{"/"+ini.substring(4, 6)+"/"+ ini.slice(0, 4) }</div>, selector: row => row._21, center: true },
        { name: <div className="text-wrap">22{"/"+ini.substring(4, 6)+"/"+ ini.slice(0, 4) }</div>, selector: row => row._22, center: true },
        { name: <div className="text-wrap">23{"/"+ini.substring(4, 6)+"/"+ ini.slice(0, 4) }</div>, selector: row => row._23, center: true },
        { name: <div className="text-wrap">24{"/"+ini.substring(4, 6)+"/"+ ini.slice(0, 4) }</div>, selector: row => row._24, center: true },
        { name: <div className="text-wrap">25{"/"+ini.substring(4, 6)+"/"+ ini.slice(0, 4) }</div>, selector: row => row._25, center: true },
        { name: <div className="text-wrap">26{"/"+ini.substring(4, 6)+"/"+ ini.slice(0, 4) }</div>, selector: row => row._26, center: true },
        { name: <div className="text-wrap">27{"/"+ini.substring(4, 6)+"/"+ ini.slice(0, 4) }</div>, selector: row => row._27, center: true },
        { name: <div className="text-wrap">28{"/"+ini.substring(4, 6)+"/"+ ini.slice(0, 4) }</div>, selector: row => row._28, center: true },
        { name: <div className="text-wrap">29{"/"+ini.substring(4, 6)+"/"+ ini.slice(0, 4) }</div>, selector: row => row._29, center: true },
        { name: <div className="text-wrap">30{"/"+ini.substring(4, 6)+"/"+ ini.slice(0, 4) }</div>, selector: row => row._30, center: true },
        { name: <div className="text-wrap">31{"/"+ini.substring(4, 6)+"/"+ ini.slice(0, 4) }</div>, selector: row => row._31, center: true },
       
    ];
  

    return (
        <>
            <div className="row mb-3">
                <div className="col-12">

                    <div className="col-sm-12 col-md-12 col-lg-12 text-center">
                        <div className="card mb-4 rounded-3 shadow-sm">
                            <div className="card-header">
                                <h4 className="my-0 font-weight-normal">Resumen Flujo LLamado - {nombre}</h4>
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
                                        <ClockLoader
                                            className='loading'
                                            color={'#5b198ab5'}
                                            loading={loading}
                                            size={60}
                                            aria-label="Loading Spinner"
                                            data-testid="loader"
                                        />
                                    </div>

                                ) : (
                                    <div className=" mt-5 mb-5 "  >

                                        <DataTable
                                            columns={columns}
                                            data={datafull}
                                            customStyles={customStyles}
                                            conditionalRowStyles={conditionalRowStyles}
                                            striped
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
export default ReporteResumenFlujoLlamadaTabla