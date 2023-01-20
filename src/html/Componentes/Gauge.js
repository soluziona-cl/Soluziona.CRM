import axios from "axios";
import React, { useMemo, useState, useEffect } from "react";
import ReactEcharts from "echarts-for-react";

function Gauge_2() {

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
        axios.post("https://app.soluziona.cl/API_desa/Soluziona.Dashboard.Salcobrand/api/Contact_CRM/CRM/Trafico/Inbound/Full")
            .then((response) => {

                var arrr = response.data;
                // console.log(arrr)
                setData(arrr)

            })

    }, []);


    console.log(data_gauge)


    let tmo = 0
    data_gauge.forEach((element) => {

        tmo = (element.tmo);

    });

    console.log(tmo)
    console.log(secondsToString(parseInt(tmo)))


    const option_gauge = {

        tooltip: {
            formatter: function (params) {
              return `${secondsToString(params.data.value)} <br />`;
            }
          },
          title: {
            text: 'TMO',
            left: 'center',
            position: 'center'
          },
        series: [
            {
                name: 'TMO',
                type: 'gauge',
                min: 0,
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
                style={{ width: "28rem", height: "28rem"  }}
            ></ReactEcharts>

        </>
    );
}

export default Gauge_2