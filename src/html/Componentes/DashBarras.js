import axios from "axios";
import React, { useMemo, useState, useEffect } from "react";
import ReactEcharts from "echarts-for-react";
import { useNavigate } from 'react-router-dom';
import { getToken, removeUserSession, setUserSession } from './Common';

//TODO variable global para pasar por Json el rol del usuario en el metodo guardar nuevo

function DashBarras({flujo}) {

    const [data, setData] = useState([]);
    const [etiquetas, setEtiquetas] = useState([]);
    const [authLoading, setAuthLoading] = useState(true);
    const navigate = useNavigate();
    const sesiones = {
        sgui: localStorage.getItem("localgui"),
        scliente: localStorage.getItem("localcliente"),
        sid: localStorage.getItem("localid"),
        sid_usuario: localStorage.getItem("localid_usuario"),
        stoken: localStorage.getItem("token")
    };

    useEffect(() => {
        const token = getToken();

        const rutaservidor = "/Orkesta/Procollect/CRM"
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

        Datos()

    }, []);

    const Datos = (async() => {

        const result = await axios.post('https://app.soluziona.cl/API_v1_prod/CallSouth/API_CallSouth_CRM_LosHeroes/api/Ventas_CRM/CRM/DashTrafico/Intervalo/Detalle',
        { dato: flujo },
        { headers: { "Authorization": `Bearer ${sesiones.stoken}` } })

    if (result.status === 200) {

        console.log(result.data)
          setData(result.data);
        // setData([
        //     {"intervalo":"08:30","llamadas_dimensionadas":83,"recibidas":87,"atendidas":86,"sobre_bajo_trafico":91,"debio_atender":92,"n_atencion_e":99,"n_atencion_o":85,"agentes":85,"TMO":94,"agentes_r":94},
        //     {"intervalo":"09:00","llamadas_dimensionadas":83,"recibidas":87,"atendidas":86,"sobre_bajo_trafico":91,"debio_atender":92,"n_atencion_e":99,"n_atencion_o":85,"agentes":85,"TMO":94,"agentes_r":94},
        //     {"intervalo":"09:30","llamadas_dimensionadas":83,"recibidas":87,"atendidas":86,"sobre_bajo_trafico":91,"debio_atender":92,"n_atencion_e":99,"n_atencion_o":85,"agentes":85,"TMO":94,"agentes_r":94},
        //     {"intervalo":"10:00","llamadas_dimensionadas":83,"recibidas":87,"atendidas":86,"sobre_bajo_trafico":91,"debio_atender":92,"n_atencion_e":99,"n_atencion_o":85,"agentes":85,"TMO":94,"agentes_r":94},
        //     {"intervalo":"10:30","llamadas_dimensionadas":83,"recibidas":87,"atendidas":86,"sobre_bajo_trafico":91,"debio_atender":92,"n_atencion_e":99,"n_atencion_o":85,"agentes":85,"TMO":94,"agentes_r":94},
        //     {"intervalo":"11:00","llamadas_dimensionadas":83,"recibidas":87,"atendidas":86,"sobre_bajo_trafico":91,"debio_atender":92,"n_atencion_e":99,"n_atencion_o":85,"agentes":85,"TMO":94,"agentes_r":94},
        //     {"intervalo":"11:30","llamadas_dimensionadas":83,"recibidas":87,"atendidas":86,"sobre_bajo_trafico":91,"debio_atender":92,"n_atencion_e":99,"n_atencion_o":85,"agentes":85,"TMO":94,"agentes_r":94},
        //     {"intervalo":"12:00","llamadas_dimensionadas":83,"recibidas":87,"atendidas":86,"sobre_bajo_trafico":91,"debio_atender":92,"n_atencion_e":99,"n_atencion_o":85,"agentes":85,"TMO":94,"agentes_r":94},
        //     {"intervalo":"12:30","llamadas_dimensionadas":83,"recibidas":87,"atendidas":86,"sobre_bajo_trafico":91,"debio_atender":92,"n_atencion_e":99,"n_atencion_o":85,"agentes":85,"TMO":94,"agentes_r":94},
        //     {"intervalo":"13:00","llamadas_dimensionadas":83,"recibidas":87,"atendidas":86,"sobre_bajo_trafico":91,"debio_atender":92,"n_atencion_e":99,"n_atencion_o":85,"agentes":85,"TMO":94,"agentes_r":94}
            
        //     ]);
    }

    })

    let columns = []
    let recibidas = []
    let contestadas = []
    // let acepta = []

    data.forEach((element) => {

        recibidas.push(parseInt(element.recibidas))
        contestadas.push(parseInt(element.atendidas))
        // acepta.push(parseInt(element.natencion))
        columns.push(element.intervalo)
    });

    const opction_multibar = {

        grid: {
            x: 40,
            x2: 40,
            y: 35,
            y2: 25
        },

        // Add tooltip
        tooltip: {
            trigger: 'axis'
        },

        // Add legend
        legend: {
            // data: ['Recorrido', 'Contactado', 'Acepta']
            data: ['Ingresadas', 'Contestadas']
        },
        toolbox: {
            show: true,

        },


        // Add custom colors
        // color: ['#666EE8', '#20A464', '#FFFF00'],
        color: ['#666EE8', '#20A464'],
        // Enable drag recalculate
        calculable: true,

        // Horizontal axis
        xAxis: [{
            type: 'category',
            data: columns,
        }],

        // Vertical axis
        yAxis: [{
            type: 'value',
            min: 0,
            max: function (value) {
                return value.max + 20;
            },
            name: 'Cantidad'
        }],

        // Add series
        series: [{
                name: 'Ingresadas',
                type: 'bar',
                data: recibidas,
                itemStyle: {
                    normal: {
                        label: {
                            show: true,
                            textStyle: {
                                fontWeight: 500
                            }
                        }
                    }
                },
                markPoint: {
                    data: [
                        { type: 'max', name: 'Max' },
                        { type: 'min', name: 'Min' }
                    ]
                },
                markLine: {
                    data: [{ type: 'average', name: 'Promedio' }]
                }
            },
            {
                name: 'Contestadas',
                type: 'bar',
                data: contestadas,
                itemStyle: {
                    normal: {
                        label: {
                            show: true,
                            textStyle: {
                                fontWeight: 500
                            }
                        }
                    }
                },
                markPoint: {
                    data: [
                        { type: 'max', name: 'Max' },
                        { type: 'min', name: 'Min' }
                    ]
                },
                markLine: {
                    data: [{ type: 'average', name: 'Promedio' }]
                }
            }
        ]


    }
    return ( <>
        <ReactEcharts option = { opction_multibar }
        // style={{ width: "80rem", height: "30rem" }}
        >
        </ReactEcharts>

        </>
    );
}

export default DashBarras