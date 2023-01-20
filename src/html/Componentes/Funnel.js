import axios from "axios";
import React, { useMemo, useState, useEffect } from "react";
import ReactEcharts from "echarts-for-react";

import * as echarts from 'echarts';
//TODO variable global para pasar por Json el rol del usuario en el metodo guardar nuevo


// import 'animate.css';

function Funnel() {
    //funciones para mostrar los botones

    const [data, setData] = useState([]);
    const [etiquetas, setEtiquetas] = useState([]);
    // const [valores, setValores] = useState([]);
    // const [columns, setColumns] = useState([])

    //DataTable, inyectando la data en las columnas

    // Using useEffect to call the API once mounted and set the data
    useEffect(() => {
        axios.post("https://app.soluziona.cl/API_desa/Soluziona.Dashboard.Salcobrand/api/Contact_CRM/CRM/Trafico/Inbound/Full")
            .then((response) => {

                var arrr = response.data;
                // console.log(arrr)
                setData(arrr)

            })

    }, []);

    let columns = []
    let valores = []
    let valores_rec = {}
    let valores_cont = {}
    let valores_aba = {}
    let valores_fue = {}



    data.forEach((element) => {
        let title = "value";
        let valor = element.recibidas;
        valores_rec[title] = valor;
        valores_rec[title] = valor;
        title = "name";
        valor = "Recibidas";
        valores_rec[title] = valor;
    });

    data.forEach((element) => {
        let title = "value";
        let valor = element.contestadas;
        valores_cont[title] = valor;
        valores_cont[title] = valor;
        title = "name";
        valor = "Contestadas";
        valores_cont[title] = valor;

    });

    data.forEach((element) => {
        let title = "value";
        let valor = element.abandonadas;
        valores_aba[title] = valor;
        valores_aba[title] = valor;
        title = "name";
        valor = "Abandonadas";
        valores_aba[title] = valor;

    });

    data.forEach((element) => {
        let title = "value";
        let valor = element.fuerahorario;
        valores_fue[title] = valor;
        valores_fue[title] = valor;
        title = "name";
        valor = "Fuera de Horario";
        valores_fue[title] = valor;

    });

    valores.push(valores_rec)
    valores.push(valores_cont)
    valores.push(valores_aba)
    valores.push(valores_fue)
    // console.log(valores)



    const option_funnel = {

        tooltip: {
            trigger: 'item'
        },
        title: {
            text: 'Recibidas',
            left: 'center',
            position: 'center'  
        },
        // Add legend
        series: [
            {
                name: 'Llamadas',
                type: 'funnel',
                data: valores,
                left: '10%',
                top: 60,
                bottom: 60,
                width: '60%',
                label: {
                    position: 'inside',
                    formatter: '{b}:{c}',
                    color: '#fff'
                  },
                labelLine: {
                    show: false
                },
                itemStyle: {
                    opacity: 0.7
                },
                emphasis: {
                    itemStyle: {
                        shadowBlur: 8,
                        shadeIntensity: 0.4,
                        shadowOffsetX: 1,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ],
        toolbox: {
            show: true
        },
    }
    return (
        <>
            <ReactEcharts
                option={option_funnel}
                style={{  width: "36rem", height: "36rem"  }}
            ></ReactEcharts>

        </>
    );
}

export default Funnel