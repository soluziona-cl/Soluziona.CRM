import axios from "axios";
import React, { useMemo, useState, useEffect } from "react";
import ReactEcharts from "echarts-for-react";

function GaugeNServicio({ ini, fin }) {

    const [data_gauge, setData] = useState([]);
    const [etiquetas, setEtiquetas] = useState([]);

    function secondsToString(seconds) {
        var hour = Math.floor(seconds / 3600);
        hour = (hour < 10) ? '0' + hour : hour;
        var minute = Math.floor((seconds / 60) % 60);
        minute = (minute < 10) ? '0' + minute : minute;
        var second = seconds % 60;
        second = (second < 10) ? '0' + second : second;
        return hour + ':' + minute + ':' + second;
    }

    useEffect(() => {


        Tiempo()

    }, []);


    const Tiempo = (async () => {

        const result = await axios.post('https://app.soluziona.cl/API_v1_prod/CallSouth/API_CallSouth.Salcobrand.CRM/api/Contact_CRM_Vocalcom/CRM/Trafico/Informe_Intervalos/Total', { dato: ini, dato_1: fin })

        if (result.status === 200) {
            setData(result.data)

        }

    })


    let nservicio = 0
    let contestadas = 0
    let recibidas = 0

    data_gauge.forEach((element) => {
        recibidas += element.totaL_RECIBIDAS;
    });

    data_gauge.forEach((element) => {
        contestadas += element.atenD_ANTES_20;
    });

    let servicio = parseInt((100 * (contestadas / recibidas)).toFixed(0))
 
    const datos = [
        {
            value: servicio,
            detail: {
                valueAnimation: true,
                color:'#00B050',
                width: '60%',
                height: '60%',
                offsetCenter: ['0%', '-5%'],
                fontSize: '30px'
            }
        }
    ];

    const option_gauge = {

        series: [
            {
                type: 'gauge',
                startAngle: 90,
                endAngle: -270,
                pointer: {
                    show: false
                },
                progress: {
                    show: true,
                    overlap: false,
                    roundCap: false,
                    clip: false,
                    itemStyle: {
                        borderWidth: 1,
                        borderColor: '#C3D69B',
                        color:'#C3D69B'
                    }
                },
                axisLine: {
                    lineStyle: {
                        width: 20
                    }
                },
                splitLine: {
                    show: false,
                    distance: 0,
                    length: 10
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    show: false,
                    distance: 50
                },
                data: datos,
                title: {
                    fontSize: 14
                },
                detail: {
                    width: 50,
                    height: 14,
                    fontSize: 14,
                    color: 'inherit',
                    // borderColor: 'inherit',
                    // borderRadius: 10,
                    // borderWidth: 1,
                    formatter: '{value}%'
                }
            }
        ]
    };


    return (
        <>
            <ReactEcharts
                option={option_gauge}
            //   style={{  height: "24rem"  }}
            ></ReactEcharts>

        </>
    );
}

export default GaugeNServicio