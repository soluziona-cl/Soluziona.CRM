import axios from "axios";
import React, { useMemo, useState, useEffect } from "react";
import ReactEcharts from "echarts-for-react";

function Gauge({ini,fin}) {

    const [data_gauge, setData] = useState([]);
    const [etiquetas, setEtiquetas] = useState([]);

    function secondsToString(seconds) {
        var hour = Math.floor(seconds / 3600);
        hour = (hour < 10)? '0' + hour : hour;
        var minute = Math.floor((seconds / 60) % 60);
        minute = (minute < 10)? '0' + minute : minute;
        var second = seconds % 60;
        second = (second < 10)? '0' + second : second;
        return hour + ':' + minute + ':' + second;
      }

    useEffect(() => {
      
      
        Tiempo()

    }, []);


    const Tiempo = (async() => {

        const result = await axios.post('https://app.soluziona.cl/API_v1_prod/CallSouth/API_CallSouth.Salcobrand.CRM/api/Contact_CRM_Vocalcom/CRM/Trafico/Informe_Intervalos', { dato: ini, dato_1: fin })

        if (result.status === 200) {
            setData(result.data)

        }

    })

    let tiempo = 0
    let contestadas = 1

    data_gauge.forEach((element) => {
        contestadas += element.atenD_FRONT;

    });
    data_gauge.forEach((element) => {
        tiempo += element.tmo;

    });

    let tmo = parseInt((tiempo/contestadas).toFixed(0))
    // data_gauge.forEach((element) => {

    //     tmo = (element.tmo);

    // });

   

    const option_gauge = {

        tooltip: {
            formatter: function (params) {
              return `${secondsToString(params.data.value)} <br />`;
            }
          },
          title: {
            // text: 'TMO',
            left: 'center',
            position: 'center'
          },
        series: [
            {
                name: 'TMO',
                type: 'gauge',
                min: 0,
                top: 10,
                bottom: 10,
                max: parseInt(tmo) + parseInt(tmo*0.3),
                progress: {
                    show: true
                },
                
                detail: {
                    valueAnimation: true,
                    formatter: function (value) {
                        return  secondsToString(value.toFixed(0));
                      },
                    // formatter: '{value}'
                },
                data: [
                    {
                        value: (parseInt(tmo)),
                        // name: secondsToString((tmo))+' / '+'Segundos'
                    }
                ]
            }
        ]
    }


    return (
        <>
            <ReactEcharts
                option={option_gauge}
                  style={{  height: "24rem"  }}
            ></ReactEcharts>

        </>
    );
}

export default Gauge