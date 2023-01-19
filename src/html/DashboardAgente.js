import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
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
import PieAgente from './Componentes/PieAgente';
import BarrasAgente from './Componentes/BarrasAgente';
import DashReporteCargaTablaAgente from './Componentes/DashReporteCargaTablaAgente';
import PieGestionAgente from './Componentes/PieGestionAgente';
import DashReporteFechaPagoAgente from './Componentes/DashReporteFechaPagoAgente';


import axios from 'axios';

// function muestraReloj() {
//   var fechaHora = new Date();
//   var horas = fechaHora.getHours();
//   var minutos = fechaHora.getMinutes();
//   var segundos = fechaHora.getSeconds();

//   if(horas < 10) { horas = '0' + horas; }
//   if(minutos < 10) { minutos = '0' + minutos; }
//   if(segundos < 10) { segundos = '0' + segundos; }

//   document.getElementById("duracion").innerHTML = horas+':'+minutos+':'+segundos;
// }

const DashboardAgente = () => {

  const navigate = useNavigate();
  const [mostrarGrid, setMostrarGrid] = useState(true);
  const [mostrarGrid2, setMostrarGrid2] = useState(false);
  // const [carga, setCarga] = useState('');
  // const [contador, setContador] = useState(0);

  // const [company, setStartCompany] = useState('');
  const [campana, setStartCampana] = useState('');
  const sesiones = {
    sgui: localStorage.getItem("localgui"),
    scliente: localStorage.getItem("localcliente"),
    sid: localStorage.getItem("localid"),
    sid_usuario: localStorage.getItem("localid_usuario"),
    stoken: localStorage.getItem("token")
  };


  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(true);
  const [actualiza, setActualiza] = useState(true);

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (!running) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running]);


  const filtrar = (event) => {

    // setStartCompany(document.getElementById("ddl_company").value)
    // setStartCampana(document.getElementById("ddl_campana").value)
    setMostrarGrid(true);
    setMostrarGrid2(false);
    // setFlujo(document.getElementById("ddl_campana").options[document.getElementById("ddl_campana").selectedIndex].text)

  };

  const filtrar2 = (event) => {

    // setStartCompany(document.getElementById("ddl_company").value)
    // setStartCampana(document.getElementById("ddl_campana").value)
    setMostrarGrid(false);
    setMostrarGrid2(true);

    // setFlujo(document.getElementById("ddl_campana").options[document.getElementById("ddl_campana").selectedIndex].text)
  };


  const ChangeConecta = (async (event) => {


    // console.log(document.getElementById("duracion").value)
    // console.log(document.getElementById("ddl_estado").options[document.getElementById("ddl_estado").selectedIndex].text)

    const result = axios.post('https://app.soluziona.cl/API_v1_prod/Procollect/CRM/api/Ventas_CRM/CRM/EstadoAgente',
      { dato_1: document.getElementById("duracion").value, dato: document.getElementById("ddl_estado").options[document.getElementById("ddl_estado").selectedIndex].text, dato_2: sesiones.scliente },
      { headers: { "Authorization": `Bearer ${sesiones.stoken}` } })
    if (result.status === 200) {

      toast('Su estado a cambiado a ' + event)

    }

    event === 'Terminar' ? setRunning(false) : setRunning(true)

    if (!running) {
      // console.log("esta andando")
    } else {
      // console.log("nope")
      setTime(0)
    }


  })
  const handleLogout = (async (event) => {


    // console.log(document.getElementById("duracion").value)
    // console.log(document.getElementById("ddl_estado").options[document.getElementById("ddl_estado").selectedIndex].text)

    const result = await axios.post('https://app.soluziona.cl/API_v1_prod/Procollect/CRM/api/Ventas_CRM/CRM/EstadoAgente',
      { dato_1: document.getElementById("duracion").value, dato: document.getElementById("ddl_estado").options[document.getElementById("ddl_estado").selectedIndex].text, dato_2: sesiones.scliente },
      { headers: { "Authorization": `Bearer ${sesiones.stoken}` } })
    if (result.status === 200) {

      toast('Su estado a cambiado a ' + event)

    }

    event === 'Terminar' ? setRunning(false) : setRunning(true)

    if (!running) {
      // console.log("esta andando")
    } else {
      // console.log("nope")
      setTime(0)
    }


    const result2 = await axios.post('https://app.soluziona.cl/API_v1_prod/Procollect/CRM/api/Ventas_CRM/CRM/EstadoAgente',
      { dato_1: '', dato: 'Logout', dato_2:sesiones.scliente },
      { headers: { "Authorization": `Bearer ${sesiones.stoken}` } })
    if (result2.status === 200) {

      navigate("/Orkesta/Procollect/CRM");
      return

    }

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
                    onChange={(e) => (ChangeConecta(e.target.value))}>
                    <option value="Activo/Llamando" selected>Activo/Llamando</option>
                    <option value="Reunion">Reunion</option>
                    <option value="Break">Break</option>
                    <option value="Capacitacion">Capacitacion</option>
                    <option value="Almuerzo">Almuerzo</option>
                    <option value="Baño">Baño</option>
                    <option value="Calidad">Calidad</option>
                    <option value="Permiso">Permiso</option>

                  </select>
                </div>
                <div className="col-sm-12 col-lg-2 mt-lg-0 mt-sm-2">
                  Duracion del Estado:
                </div>
                <div className="col-sm-12 col-lg-1 mt-lg-0 mt-sm-2">
                  <input id="duracion" className='form-input form-control' disabled value={(("0" + Math.floor((time / 30000) % 60 % 60)).slice(-2)).concat(':').concat((("0" + Math.floor((time / 30000) % 60)).slice(-2))).concat(':').concat(("0" + Math.floor((time / 500) % 60)).slice(-2))} />
                </div>
              </div>
            </div>
            <hr />
            <div className="d-flex justify-content-between mt-lg-0 mt-sm-0">
              <div className="p-2">  {mostrarGrid === false && <button className="btn btn-success" onClick={() => filtrar()}>Actualizar</button>}
                {mostrarGrid === true && <button className="btn btn-success" onClick={() => filtrar2()}>Actualizar</button>}</div>

              <div className="p-2"> <button onClick={() => handleLogout('Terminar')} className="btn btn-danger" >Terminar Dia</button></div>
            </div>
            <div className="row">

              <div className="row">


                <div className="col-sm-12 col-lg-4">
                  <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true}>
                    <div className="card mb-4 rounded-3 shadow-sm">
                      <div className="card-header">
                        <h4 className="my-0 font-weight-normal">Gestionado</h4>
                      </div>
                      <div className="card-body">

                        {mostrarGrid !== false && <PieAgente company={campana} agente={sesiones.scliente}></PieAgente>}
                        {mostrarGrid2 !== false && <PieAgente company={campana} agente={sesiones.scliente}></PieAgente>}

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
                        {mostrarGrid !== false && <BarrasAgente company={campana} agente={sesiones.scliente}></BarrasAgente>}
                        {mostrarGrid2 !== false && <BarrasAgente company={campana} agente={sesiones.scliente}></BarrasAgente>}

                      </div>
                    </div>
                  </Animated>
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
                              {mostrarGrid !== false && <DashReporteCargaTablaAgente company={campana} agente={sesiones.scliente} ></DashReporteCargaTablaAgente>}
                              {mostrarGrid2 !== false && <DashReporteCargaTablaAgente company={campana} agente={sesiones.scliente} ></DashReporteCargaTablaAgente>}


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
                            {mostrarGrid !== false && <PieGestionAgente company={campana} agente={sesiones.scliente}></PieGestionAgente>}
                            {mostrarGrid2 !== false && <PieGestionAgente company={campana} agente={sesiones.scliente}></PieGestionAgente>}

                          </div>
                        </div>
                      </div>
                      <div className="col-sm-12 col-lg-4">
                        <div className="card mb-4 rounded-3 shadow-sm">
                          <div className="card-header">
                            <h4 className="my-0 font-weight-normal">Fechas Compromiso</h4>
                          </div>
                          <div className="card-body">
                            {mostrarGrid !== false && <DashReporteFechaPagoAgente company={campana} agente={sesiones.scliente}></DashReporteFechaPagoAgente>}
                            {mostrarGrid2 !== false && <DashReporteFechaPagoAgente company={campana} agente={sesiones.scliente}></DashReporteFechaPagoAgente>}


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