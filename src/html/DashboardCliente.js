import React, { useEffect, useState, useRef } from 'react';

import { format } from "date-fns";
import Header from './Componentes/Header';
import Sidebar from './Componentes/Sidebar';
import Footer from './Componentes/Footer';
import Company_Campaing_Dash from './Componentes/Company_Campaing_Dash';
import { Animated } from "react-animated-css";


import Gauge from "./Componentes/Gauge";
import DonutTrafico from './Componentes/DonutTrafico';
import Grafico from "./Componentes/Grafico";
import TablaTrafico from './Componentes/TablaTrafico';
import GaugeNServicio from './Componentes/GaugeNServicio';
import GaugeNAtencion from './Componentes/GaugeNAtencion';
import GaugeTMO from './Componentes/GaugeTMO';
import GaugeVentas from './Componentes/GaugeVentas';
import GaugeEPA from './Componentes/GaugeEPA';


import GraficoNAtencion from './Componentes/GraficoNAtencion';
import GraficoNServicio from './Componentes/GraficoNServicio';
import GraficoVentas from './Componentes/GraficoVentas';
import GraficoEPA from './Componentes/GraficoEPA';

import DatePicker, { registerLocale } from "react-datepicker";
import es from 'date-fns/locale/es'

import "react-datepicker/dist/react-datepicker.css";
import { getMonth, getYear } from "date-fns";
import range from "lodash/range";


const DashboardCliente = () => {


  const [mostrarGrid, setMostrarGrid] = useState(true);
  const [mostrarGrid2, setMostrarGrid2] = useState(false);
  const [carga, setCarga] = useState('');

  const [company, setStartCompany] = useState('');
  const [campana, setStartCampana] = useState('');

  const [startdateini, setStartDateIni] = useState(new Date());
  const [startdatefin, setStartDateFin] = useState(new Date());


  const years = range(2022, getYear(new Date()) + 2, 1);
  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const filtrar = (event) => {


    setMostrarGrid(true);
    setMostrarGrid2(false);


  };

  const filtrar2 = (event) => {


    setMostrarGrid(false);
    setMostrarGrid2(true);

  };


  return (
    <>
      <div className="container-fluid">
        <div className="row flex-nowrap"><Header /></div>
        <div className="row flex-nowrap">
          <div className="col-auto px-0">
            <div id="sidebar" className="collapse collapse-horizontal show border-end">
              <Sidebar />
            </div>
          </div>
          <main className="col ps-md-2 pt-2">
            <a href="#" data-bs-target="#sidebar" data-bs-toggle="collapse" className="border rounded-3 p-1 text-decoration-none"><i className="fa-solid fa-bars py-2 p-1"></i> Menu</a>
            <div className="page-header pt-3">
              <div className="row mt-2 bg-light align-items-center">

                <div className="col-sm-12 col-lg-3 mt-lg-0 mt-sm-2">
                  <h2>Dashboard</h2>
                </div>
              </div>
              <hr />
              <div className="flex d-flex justify-content-start mt-1 mb-3">
                <div className="col-sm-12 col-md-1 col-lg-1 mt-lg-0">
                  <DatePicker
                    id="ini"
                    locale='es'
                    className="form-control rounded-md text-center h-10 hover:bg-gray-200 hover:border-blue-700 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700"
                    //  customInput={<ExampleCustomInput />}
                    renderCustomHeader={({
                      date,
                      changeYear,
                      changeMonth,
                      decreaseMonth,
                      increaseMonth,
                      prevMonthButtonDisabled,
                      nextMonthButtonDisabled,
                    }) => (
                      <div
                        style={{
                          margin: 10,
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <button
                          onClick={decreaseMonth}
                          disabled={prevMonthButtonDisabled}
                        >
                          {"<"}
                        </button>
                        <select
                          value={getYear(date)}
                          onChange={({ target: { value } }) => changeYear(value)}
                        >
                          {years.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>

                        <select
                          value={months[getMonth(date)]}
                          onChange={({ target: { value } }) =>
                            changeMonth(months.indexOf(value))
                          }
                        >
                          {months.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>

                        <button
                          onClick={increaseMonth}
                          disabled={nextMonthButtonDisabled}
                        >
                          {">"}
                        </button>
                      </div>
                    )}
                    selected={startdateini}
                    dateFormat="dd/MM/yyyy"
                    maxDate={new Date()}
                    onChange={(date) => {
                      setStartDateIni(date);

                    }}
                  /></div>
                <div className="col-sm-12 col-md-1 col-lg-1 mt-lg-0">
                  <DatePicker
                    id="fin"
                    locale='es'
                    className="form-control rounded-md text-center h-10 hover:bg-gray-200 hover:border-blue-700 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700"
                    //  customInput={<ExampleCustomInput />}
                    renderCustomHeader={({
                      date,
                      changeYear,
                      changeMonth,
                      decreaseMonth,
                      increaseMonth,
                      prevMonthButtonDisabled,
                      nextMonthButtonDisabled,
                    }) => (
                      <div
                        style={{
                          margin: 10,
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <button
                          onClick={decreaseMonth}
                          disabled={prevMonthButtonDisabled}
                        >
                          {"<"}
                        </button>
                        <select
                          value={getYear(date)}
                          onChange={({ target: { value } }) => changeYear(value)}
                        >
                          {years.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>

                        <select
                          value={months[getMonth(date)]}
                          onChange={({ target: { value } }) =>
                            changeMonth(months.indexOf(value))
                          }
                        >
                          {months.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>

                        <button
                          onClick={increaseMonth}
                          disabled={nextMonthButtonDisabled}
                        >
                          {">"}
                        </button>
                      </div>
                    )}
                    selected={startdatefin}
                    dateFormat="dd/MM/yyyy"
                    maxDate={new Date()}
                    onChange={(date) => {
                      setStartDateFin(date);

                    }}
                  /></div>
                <div className="col-sm-12 col-lg-3 mt-lg-0">
                  {mostrarGrid === false && <button type="button" className="mb-0 btn btn-success" onClick={() => filtrar()}>Actualizar</button>}
                  {mostrarGrid === true && <button type="button" className="mb-0 btn btn-success" onClick={() => filtrar2()}>Actualizar</button>}

                </div>
              </div>

            </div>
            <hr />

            <div className='row justify-content-center'>

              <div className="card col-xl-2 col-md-12 col-sm-12 col-lg-2 mb-4 ms-2 border-0 rounded-3">
                <div className="card-header align-items-center text-center" style={{ backgroundColor: '#92D050',}}>
                  <h4 className="my-0 font-weight-normal">Nivel de Atención</h4>
                </div>
                <div className="card-body">
                  <div className="table-responsive overflow-x: hidden;">
                    {mostrarGrid !== false && <GaugeNAtencion ini={format(startdateini, "yyyyMMdd")} fin={format(startdatefin, "yyyyMMdd")} />}
                    {mostrarGrid2 !== false && <GaugeNAtencion ini={format(startdateini, "yyyyMMdd")} fin={format(startdatefin, "yyyyMMdd")} />}

                  </div>

                </div>
              </div>
              <div className="card col-xl-2 col-md-12 col-sm-12 col-lg-2 mb-4 ms-2 border-0 rounded-3 ">
                <div className="card-header  align-items-center text-center" style={{ backgroundColor: '#C4D79B',}}>
                  <h4 className="my-0 font-weight-normal">Nivel de Servicio</h4>
                </div>
                <div className="card-body">
                  <div className="table-responsive overflow-x: hidden;">
                    {mostrarGrid !== false && <GaugeNServicio ini={format(startdateini, "yyyyMMdd")} fin={format(startdatefin, "yyyyMMdd")} />}
                    {mostrarGrid2 !== false && <GaugeNServicio ini={format(startdateini, "yyyyMMdd")} fin={format(startdatefin, "yyyyMMdd")} />}

                  </div>

                </div>
              </div>
              <div className="card col-xl-2 col-md-12 col-sm-12 col-lg-2 mb-4 ms-2 border-0 rounded-3 ">
                <div className="card-header align-items-center text-center"  style={{ backgroundColor: '#558ED5',}}>
                  <h4 className="my-0 font-weight-normal" >EPA</h4>
                </div>
                <div className="card-body">
                  <div className="table-responsive overflow-x: hidden;">
                    {mostrarGrid !== false && <GaugeEPA ini={format(startdateini, "yyyyMMdd")} fin={format(startdatefin, "yyyyMMdd")} />}
                    {mostrarGrid2 !== false && <GaugeEPA ini={format(startdateini, "yyyyMMdd")} fin={format(startdatefin, "yyyyMMdd")} />}

                  </div>

                </div>
              </div>
              <div className="card col-xl-2 col-md-12 col-sm-12 col-lg-2 mb-4 ms-2 border-0 rounded-3 ">
                <div className="card-header align-items-center text-center  text-white" style={{ backgroundColor: '#376092',}}>
                  <h4 className="my-0 font-weight-normal">Ventas</h4>
                </div>
                <div className="card-body">

                  <div className='d-flex justify-content-center align-middle h-75'>

                    <div class="row justify-content-center align-self-center">
                      {mostrarGrid !== false && <GaugeVentas ini={format(startdateini, "yyyyMMdd")} fin={format(startdatefin, "yyyyMMdd")} />}
                      {mostrarGrid2 !== false && <GaugeVentas ini={format(startdateini, "yyyyMMdd")} fin={format(startdatefin, "yyyyMMdd")} />}

                    </div>
                  </div>

                </div>
              </div>
              <div className="card col-xl-2 col-md-12 col-sm-12 col-lg-2 mb-4 ms-2 border-0 rounded-3 ">
                <div className="card-header align-items-center text-center" style={{ backgroundColor: '#FFFF99',}}>
                  <h4>TMO</h4>
                </div>
                <div className="card-body">
                  <div className='d-flex justify-content-center align-middle h-75'>

                    <div class="row justify-content-center align-self-center">
                      {mostrarGrid !== false && <GaugeTMO ini={format(startdateini, "yyyyMMdd")} fin={format(startdatefin, "yyyyMMdd")} />}
                      {mostrarGrid2 !== false && <GaugeTMO ini={format(startdateini, "yyyyMMdd")} fin={format(startdatefin, "yyyyMMdd")} />}
                    </div>
                  </div>

                </div>
              </div>
            </div>
            <div className='row justify-content-center'>

              <div className="card col-xl-2 col-md-12 col-sm-12 col-lg-2 mb-4 ms-2 border-0 rounded-3">
                <div className="card-header  align-items-center text-center" style={{ backgroundColor: '#92D050',}}>
                  <h4 className="my-0 font-weight-normal ">Nivel de Atención</h4>
                </div>
                <div className="card-body">
                  <div className="table-responsive overflow-x: hidden;">
                    {mostrarGrid !== false && <GraficoNAtencion ini={format(startdateini, "yyyyMMdd")} fin={format(startdatefin, "yyyyMMdd")} />}
                    {mostrarGrid2 !== false && <GraficoNAtencion ini={format(startdateini, "yyyyMMdd")} fin={format(startdatefin, "yyyyMMdd")} />}

                  </div>

                </div>
              </div>
              <div className="card col-xl-2 col-md-12 col-sm-12 col-lg-2 mb-4 ms-2 border-0 rounded-3 ">
                <div className="card-header align-items-center text-center" style={{ backgroundColor: '#C4D79B',}}>
                  <h4 className="my-0 font-weight-normal">Nivel de Servicio</h4>
                </div>
                <div className="card-body">
                  <div className="table-responsive overflow-x: hidden;">
                    {mostrarGrid !== false && <GraficoNServicio ini={format(startdateini, "yyyyMMdd")} fin={format(startdatefin, "yyyyMMdd")} />}
                    {mostrarGrid2 !== false && <GraficoNServicio ini={format(startdateini, "yyyyMMdd")} fin={format(startdatefin, "yyyyMMdd")} />}

                  </div>

                </div>
              </div>
              <div className="card col-xl-2 col-md-12 col-sm-12 col-lg-2 mb-4 ms-2 border-0 rounded-3 ">
                <div className="card-header align-items-center text-center"  style={{ backgroundColor: '#558ED5',}}>
                  <h4 className="my-0 font-weight-normal">EPA</h4>
                </div>
                <div className="card-body">
                  <div className="table-responsive overflow-x: hidden;">
                    {mostrarGrid !== false && <GraficoEPA ini={format(startdateini, "yyyyMMdd")} fin={format(startdatefin, "yyyyMMdd")} />}
                    {mostrarGrid2 !== false && <GraficoEPA ini={format(startdateini, "yyyyMMdd")} fin={format(startdatefin, "yyyyMMdd")} />}

                  </div>

                </div>
              </div>
              <div className="card col-xl-2 col-md-12 col-sm-12 col-lg-2 mb-4 ms-2 border-0 rounded-3 ">
                <div className="card-header align-items-center text-center  text-white"  style={{ backgroundColor: '#376092',}}>
                  <h4 className="my-0 font-weight-normal">Ventas</h4>
                </div>
                <div className="card-body">

                  <div className="table-responsive overflow-x: hidden;">
                    {mostrarGrid !== false && <GraficoVentas ini={format(startdateini, "yyyyMMdd")} fin={format(startdatefin, "yyyyMMdd")} />}
                    {mostrarGrid2 !== false && <GraficoVentas ini={format(startdateini, "yyyyMMdd")} fin={format(startdatefin, "yyyyMMdd")} />}
                  </div>


                </div>
              </div>
              <div className="card col-xl-2 col-md-12 col-sm-12 col-lg-2 mb-4 ms-2 border-0 rounded-3 ">
                
              </div>
            </div>


          </main>

        </div>
        <Footer />
      </div>


    </>
  )
};


export default DashboardCliente;