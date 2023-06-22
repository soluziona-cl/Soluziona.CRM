import axios from "axios";
import React, { useMemo, useState, useEffect } from "react";
import ReactEcharts from "echarts-for-react";

//TODO variable global para pasar por Json el rol del usuario en el metodo guardar nuevo

function GraficoEPA({ ini, fin }) {
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

        const result = await axios.post('https://app.soluziona.cl/API_v1_prod/CallSouth/API_CallSouth.Salcobrand.CRM/api/Contact_CRM_Vocalcom/CRM/Trafico/Informe_Intervalos/Total/Meses/EPA', { dato: ini, dato_1: fin })

        if (result.status === 200) {
            setData(result.data)

        }

    })


    let columns = []
    let natencion = []

    data.forEach((element) => {

        natencion.push(parseInt(element.epa))
        columns.push(element.hora)
    });

    console.log(columns)
    console.log(natencion)

    const opction_multibar = {

        grid: {
            x: 40,
            x2: 50,
            y: 55,
            y2: 25
        },

        // Add tooltip
        tooltip: {
            trigger: 'axis'
        },

        // Add legend
        legend: {
            data: ['EPA']
        },
        toolbox: {
            show: true,

        },


        // Add custom colors
        color: ['#4F81BD'],

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
                return value.max + 100;
            },
            name: '%'
        }],

        // Add series
        series: [{
            name: 'EPA',
            type: 'bar',
            data: natencion,
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

export default GraficoEPA