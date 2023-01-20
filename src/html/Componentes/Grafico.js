import axios from "axios";
import React, { useMemo, useState, useEffect } from "react";
import ReactEcharts from "echarts-for-react";

//TODO variable global para pasar por Json el rol del usuario en el metodo guardar nuevo

function Grafico({ ini, fin }) {
    //funciones para mostrar los botones

    const [data, setData] = useState([]);
    const [etiquetas, setEtiquetas] = useState([]);
    // const [valores, setValores] = useState([]);
    // const [columns, setColumns] = useState([])

    //DataTable, inyectando la data en las columnas

    // Using useEffect to call the API once mounted and set the data
    useEffect(() => {

        Tiempo()

      
    }, []);

    const Tiempo = (async () => {

        const result = await axios.post('https://app.soluziona.cl/API_v1_prod/CallSouth/API_CallSouth.Salcobrand.CRM/api/Contact_CRM_Vocalcom/CRM/Trafico/Informe_Intervalos', { dato: ini, dato_1: fin })

        if (result.status === 200) {
            setData(result.data)

        }

    })


    let columns = []
    let recibidas = []
    let contestadas = []
    let abandonadas = []

    data.forEach((element) => {

        recibidas.push(parseInt(element.totaL_RECIBIDAS))
        contestadas.push(parseInt(element.atenD_FRONT))
        abandonadas.push(parseInt(element.totaL_ABANDON))
        columns.push(element.hora)
    });

      

    // const options = {
    //     grid: { top: 20, right: 40, bottom: 20, left: 40 },
    //     xAxis: {
    //         type: "category",
    //         data: columns
    //     },
    //     yAxis: {
    //         type: "value"
    //     },
    //     series: [
    //         {
    //             data: valores,
    //             type: "bar",
    //             smooth: true
    //         }
    //     ],
    //     tooltip: {
    //         trigger: "axis"
    //     }
    // }

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
            data: ['Ingresadas', 'Atendidas', 'Abandonadas']
        },
        toolbox: {
            show: true,

        },


        // Add custom colors
        color: ['#666EE8', '#20A464','#FF4961'],

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
                return value.max + 10;
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
            name: 'Atendidas',
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
        },
        {
            name: 'Abandonadas',
            type: 'bar',
            data: abandonadas,
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
    return (
        <>
            <ReactEcharts
                option={opction_multibar}
                // style={{ width: "80rem", height: "30rem" }}
            ></ReactEcharts>

        </>
    );
}

export default Grafico