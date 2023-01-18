import React, { useEffect, useState, useRef } from 'react';
import Donut from './Componentes/Donut';
import Barras from './Componentes/Barras';
import Pie from './Componentes/Pie';
import Header from './Componentes/Header';
import Sidebar from './Componentes/Sidebar';
import Footer from './Componentes/Footer';
import Company_Campaing_Dash from './Componentes/Company_Campaing_Dash';
import { Animated } from "react-animated-css";

import { ToastContainer, toast } from "react-toastify";


import DashReporteCargaTabla from './Componentes/DashReporteCargaTabla';
import DashReporteCargaTablaFilter from './Componentes/DashReporteCargaTablaFilter';
import PieGestion from './Componentes/PieGestion';
import DashReporteFechaPago from './Componentes/DashReporteFechaPago';

import axios from 'axios';

function muestraReloj() {
  var fechaHora = new Date();
  var horas = fechaHora.getHours();
  var minutos = fechaHora.getMinutes();
  var segundos = fechaHora.getSeconds();

  if(horas < 10) { horas = '0' + horas; }
  if(minutos < 10) { minutos = '0' + minutos; }
  if(segundos < 10) { segundos = '0' + segundos; }

  document.getElementById("duracion").innerHTML = horas+':'+minutos+':'+segundos;
}

const DashboardAgente = () => {


  const [mostrarGrid, setMostrarGrid] = useState(false);
  const [mostrarGrid2, setMostrarGrid2] = useState(false);
  const [carga, setCarga] = useState('');
  const [contador, setContador] = useState(0);

  const [company, setStartCompany] = useState('');
  const [campana, setStartCampana] = useState('');
  const sesiones = {
    sgui: localStorage.getItem("localgui"),
    scliente: localStorage.getItem("localcliente"),
    sid: localStorage.getItem("localid"),
    sid_usuario: localStorage.getItem("localid_usuario"),
    stoken: localStorage.getItem("token")
  };

  const filtrar = (event) => {

    setStartCompany(document.getElementById("ddl_company").value)
    setStartCampana(document.getElementById("ddl_campana").value)
    setMostrarGrid(true);
    setMostrarGrid2(false);
    // setFlujo(document.getElementById("ddl_campana").options[document.getElementById("ddl_campana").selectedIndex].text)

  };

  const filtrar2 = (event) => {

    setStartCompany(document.getElementById("ddl_company").value)
    setStartCampana(document.getElementById("ddl_campana").value)
    setMostrarGrid(false);
    setMostrarGrid2(true);

    // setFlujo(document.getElementById("ddl_campana").options[document.getElementById("ddl_campana").selectedIndex].text)
  };


  const ChangeConecta = (async (event) => {

    setInterval(muestraReloj, 1000);

    // const result = await axios.post('https://app.soluziona.cl/API_v1_prod/Procollect/CRM/api/Ventas_CRM/CRM/EstadoAgente', { dato: event }, { headers: { "Authorization": `Bearer ${sesiones.stoken}` } })
    // if (result.status === 200) {

    //   toast('Su estado a cambiado a '+ event)

    // }


  })

  return (
    <>

      <ToastContainer />
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
              <div className="row mt-2 bg-light align-items-center">

                <div className="col-sm-12 col-lg-3 mt-lg-0 mt-sm-2">
                  <h2>Estados</h2>
                </div>
                <div className="col-sm-12 col-lg-3 mt-lg-0 mt-sm-2">

                  <select className="form-control form-select" id="ddl_estado"
                    disabled={false}
                    // value={select}
                    onChange={(e) => (ChangeConecta(e.target.value), setContador(0))}>
                    <option selected>Activo/Llamando</option>
                    <option>Reunion</option>
                    <option>Break</option>
                    <option>Capacitacion</option>
                    <option>Almuerzo</option>
                    <option>Baño</option>
                    <option>Calidad</option>
                    <option>Permiso</option>
                  </select>
                </div>
                <div className="col-sm-12 col-lg-3 mt-lg-0 mt-sm-2">
                  Duracion del Estado:  <label id="duracion"> seg.</label>
                </div>
              </div>
            </div>
            <hr />
            <div className="row">

              <div className="row">
                <div className="col-12">
                  <div className="row row-cols-1 row-cols-md-3 mb-3 text-center">
                    <div className="col-sm-12 col-lg-4">
                      <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true}>
                        <div className="card mb-4 rounded-3 shadow-sm">
                          <div className="card-header">
                            <h4 className="my-0 font-weight-normal">Gestionado</h4>
                          </div>
                          <div className="card-body">


                            {mostrarGrid !== false && <Pie company={campana}></Pie>}
                            {mostrarGrid2 !== false && <Pie company={campana}></Pie>}



                          </div>
                        </div>
                      </Animated>
                    </div>
                    <div className="col-sm-12 col-lg-8">
                      <Animated animationIn="bounceInRight" animationOut="fadeOut" isVisible={true}>
                        <div className="card mb-4 rounded-3 shadow-sm">
                          <div className="card-header">
                            <h4 className="my-0 font-weight-normal">Recorrido</h4>
                          </div>
                          <div className="card-body">
                            {mostrarGrid !== false && <Barras company={campana}></Barras>}
                            {mostrarGrid2 !== false && <Barras company={campana}></Barras>}

                          </div>
                        </div>
                      </Animated>
                    </div>
                  </div>
                </div>
              </div>
              <Animated animationIn="bounceInUp" animationOut="fadeOut" isVisible={true}>
                <div className="row">
                  <div className="col-12">
                    <div className="row row-cols-1 row-cols-md-2 mb-2 text-center">
                      <div className="col-sm-12 col-lg-4">
                        <div className="card mb-4 rounded-3 shadow-sm">
                          <div className="card-header">
                            <h4 className="my-0 font-weight-normal">Gestion de Cargas</h4>
                          </div>
                          <div className="card-body">
                            <div className="table-responsive overflow-x: hidden;">
                              {mostrarGrid !== false && <DashReporteCargaTabla company={campana}></DashReporteCargaTabla>}
                              {mostrarGrid2 !== false && <DashReporteCargaTabla company={campana}></DashReporteCargaTabla>}


                            </div>

                          </div>
                        </div>
                      </div>
                      <div className="col-sm-12 col-lg-4">
                        <div className="card mb-4 rounded-3 shadow-sm">
                          <div className="card-header">
                            <h4 className="my-0 font-weight-normal">Compromiso de Pagos</h4>
                          </div>
                          <div className="card-body">
                            {mostrarGrid !== false && <PieGestion company={campana}></PieGestion>}
                            {mostrarGrid2 !== false && <PieGestion company={campana}></PieGestion>}

                          </div>
                        </div>
                      </div>
                      <div className="col-sm-12 col-lg-4">
                        <div className="card mb-4 rounded-3 shadow-sm">
                          <div className="card-header">
                            <h4 className="my-0 font-weight-normal">Fechas Compromiso</h4>
                          </div>
                          <div className="card-body">
                            {mostrarGrid !== false && <DashReporteFechaPago company={campana}></DashReporteFechaPago>}
                            {mostrarGrid2 !== false && <DashReporteFechaPago company={campana}></DashReporteFechaPago>}


                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </Animated>

            </div>
          </main>

        </div>
        <Footer />
      </div>


    </>
  )
};


export default DashboardAgente;