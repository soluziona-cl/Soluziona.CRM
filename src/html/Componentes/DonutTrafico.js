import axios from "axios";
import React, { useMemo, useState, useEffect } from "react";
import ReactEcharts from "echarts-for-react";

import * as echarts from 'echarts';
//TODO variable global para pasar por Json el rol del usuario en el metodo guardar nuevo


// import 'animate.css';

function DonutTrafico({ ini, fin }) {
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
    let valores = []
    let valores_rec = {}
    let valores_cont = {}
    let valores_aba = {}
    let valores_fue = {}


    let recibidas = 0
    let contestadas = 0
    let abandonadas = 0
    data.forEach((element) => {
        recibidas += element.totaL_RECIBIDAS;

    });
    data.forEach((element) => {
        contestadas += element.atenD_FRONT;

    });
    data.forEach((element) => {
        abandonadas += element.totaL_ABANDON;

    });

    
    valores_rec["value"] = recibidas;
    valores_rec["name"] = "Recibidas";

    valores_cont["value"] = contestadas;
    valores_cont["name"] = "Contestadas";

    valores_aba["value"] = abandonadas;
    valores_aba["name"] = "Abandonadas";

    valores.push(valores_rec)
    valores.push(valores_aba)
    valores.push(valores_cont)


    const option_donut = {

        // Add tooltip
        tooltip: {
            trigger: 'item'
        },

        // title: {
        //   text: 'Tráfico',
        //   left: 'center',
        //   position: 'center'

        // },
        // Add legend
        series: [
            {

                name: 'Llamadas',
                type: 'pie',
                left: '25%',
                top: 10,
                bottom: 10,
                width: '60%',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                emphasis: {
                    focus: 'self'
                },
                label: {
                    formatter: (params) => params.name + '\n' + params.value + ' /' + params.percent + '%',
                    show: true,
                    position: "outside"
                },

                data: valores
            }
        ]



    }
    return (
        <>
            <ReactEcharts
                option={option_donut}
                style={{ height: "24rem" }}
            ></ReactEcharts>

        </>
    );
}

export default DonutTrafico