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

import DatePicker, { registerLocale } from "react-datepicker";
import es from 'date-fns/locale/es'

import "react-datepicker/dist/react-datepicker.css";
import { getMonth, getYear } from "date-fns";
import range from "lodash/range";


const Dashboard = () => {


  const [mostrarGrid, setMostrarGrid] = useState(true);
  const [mostrarGrid2, setMostrarGrid2] = useState(false);
  const [carga, setCarga] = useState('');

  const [company, setStartCompany] = useState('');
  const [campana, setStartCampana] = useState('');

  const [startdateini, setStartDateIni] = useState(new Date());
  const [startdatefin, setStartDateFin] = useState(new Date());

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
                <div className="col-sm-12 col-lg-3 mt-lg-0 mt-sm-2">
                  {mostrarGrid === false && <button type="button" className="mb-0 btn btn-success" onClick={() => filtrar()}>Actualizar</button>}
                  {mostrarGrid === true && <button type="button" className="mb-0 btn btn-success" onClick={() => filtrar2()}>Actualizar</button>}

                </div>
              </div>

            </div>
            <hr />
            <div className="row">

              <div className='row'>
                <div className='col-3'>
                  <div className='row'>
                    <Animated animationIn="bounceInUp" animationOut="fadeOut" isVisible={true}>
                      <div className="card mb-4 rounded-3 shadow-sm">
                        <div className="card-header">
                          <h4 className="my-0 font-weight-normal">Trafico</h4>
                        </div>
                        <div className="card-body">
                          <div className="table-responsive overflow-x: hidden;">
                            {mostrarGrid !== false && <DonutTrafico  ini={format(startdateini, "yyyyMMdd")} fin={format(startdatefin, "yyyyMMdd")} />}
                            {mostrarGrid2 !== false && <DonutTrafico  ini={format(startdateini, "yyyyMMdd")} fin={format(startdatefin, "yyyyMMdd")} />}

                          </div>

                        </div>
                      </div>
                    </Animated>
                    <Animated animationIn="bounceInUp" animationOut="fadeOut" isVisible={true}>
                      <div className="card mb-4 rounded-3 shadow-sm">
                        <div className="card-header">
                          <h4 className="my-0 font-weight-normal">TMO</h4>
                        </div>
                        <div className="card-body">

                          <div className='mt-lg-0 mt-sm-0 ml-4 w-100 p-3 h-100 d-inline-block'>
                            <div className="p-2">  {mostrarGrid !== false && <Gauge ini={format(startdateini, "yyyyMMdd")} fin={format(startdatefin, "yyyyMMdd")}  />}
                              {mostrarGrid2 !== false && <Gauge ini={format(startdateini, "yyyyMMdd")} fin={format(startdatefin, "yyyyMMdd")} />}</div>

                          </div>
                        </div>
                      </div>
                    </Animated>
                  </div>
                </div>
                <div className='col-9'>

                  <div className='row'>
                    <Animated animationIn="bounceInUp" animationOut="fadeOut" isVisible={true}>
                      <div className="row">
                        <div className="col-12">
                          <div className="card mb-4 rounded-3 shadow-sm">
                            <div className="card-header">
                              <h4 className="my-0 font-weight-normal">Trafico</h4>
                            </div>
                            <div className="card-body">
                              {mostrarGrid !== false && <Grafico  ini={format(startdateini, "yyyyMMdd")} fin={format(startdatefin, "yyyyMMdd")}  />}
                              {mostrarGrid2 !== false && <Grafico  ini={format(startdateini, "yyyyMMdd")} fin={format(startdatefin, "yyyyMMdd")}  />}

                            </div>
                          </div>

                        </div>
                      </div>

                    </Animated>
                    <Animated animationIn="bounceInUp" animationOut="fadeOut" isVisible={true}>
                      <div className="row">
                        <div className="col-12">
                          <div className="card mb-4 rounded-3 shadow-sm">
                            <div className="card-header">
                              <h4>Intervalos</h4>

                            </div>
                            <div className="card-body">
                              {mostrarGrid !== false && <TablaTrafico  ini={format(startdateini, "yyyyMMdd")} fin={format(startdatefin, "yyyyMMdd")} />}
                              {mostrarGrid2 !== false && <TablaTrafico  ini={format(startdateini, "yyyyMMdd")} fin={format(startdatefin, "yyyyMMdd")} />}

                            </div>
                          </div>
                        </div>
                      </div>

                    </Animated>
                  </div>

                </div>
              </div>




            </div>
          </main>

        </div>
        <Footer />
      </div>


    </>
  )
};


export default Dashboard;