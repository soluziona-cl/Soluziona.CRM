import axios from "axios";
import React, { useMemo, useState, useEffect } from "react";
import ReactEcharts from "echarts-for-react";

function GaugeTMO({ ini, fin }) {

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


    let tiempo = 0
    let contestadas = 0

    data_gauge.forEach((element) => {
        tiempo += element.tmo;
    });
    data_gauge.forEach((element) => {
        contestadas += element.atenD_FRONT;
    });

    console.log(contestadas)
    console.log(contestadas)

    let servicio = parseInt(((tiempo / contestadas)).toFixed(0))


    let tmo = (secondsToString(servicio))
    

    return (
        <>

            <h1 className="text-primary font-weight-bold display-3">{tmo}</h1>

            {/* <ReactEcharts
                option={option_gauge}
            //   style={{  height: "24rem"  }}
            ></ReactEcharts> */}

        </>
    );
}

export default GaugeTMO