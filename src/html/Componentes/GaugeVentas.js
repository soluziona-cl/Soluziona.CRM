import axios from "axios";
import React, { useMemo, useState, useEffect } from "react";
import ReactEcharts from "echarts-for-react";

function GaugeVentas({ ini, fin }) {

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


    let ventas = 0
   

    data_gauge.forEach((element) => {
        ventas += element.ventasIngresadas;
    });
  
   console.log('Ventas')
   console.log(ventas)


    return (
        <>

            <h1 className="text-warning font-weight-bold display-3">{Intl.NumberFormat('cl-CL').format(ventas)}</h1>

            {/* <ReactEcharts
                option={option_gauge}
            //   style={{  height: "24rem"  }}
            ></ReactEcharts> */}

        </>
    );
}

export default GaugeVentas