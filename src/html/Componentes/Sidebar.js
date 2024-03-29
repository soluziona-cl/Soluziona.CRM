import React from 'react';
// import { Link } from 'react-router-dom';
import { useState, FC, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import icon from '../../assets/iconOrkesta.png'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import { getToken, removeUserSession, setUserSession } from './Common';



const SideBar = () => {

  const [open, setOpen] = useState(true);

  const [mostrar, setMostrar] = useState(true);
  const [authLoading, setAuthLoading] = useState(true);
  const sesiones = {
    sgui: localStorage.getItem("localgui"),
    scliente: localStorage.getItem("localcliente"),
    sid: localStorage.getItem("localid"),
    sid_usuario: localStorage.getItem("localid_usuario"),
    stoken: localStorage.getItem("token")
  }
  // const mostrarClick = event => {

  //   setMostrar(current => !current);

  // };

  function CheckUser() {
    axios.post('https://app.soluziona.cl/API_v1_prod/CallSouth/API_CallSouth_CRM_LosHeroes/api/Ventas_CRM/CRM/Session_check', { user: sesiones.sid_usuario, gui: sesiones.sgui }, { headers: { "Authorization": `Bearer ${sesiones.stoken}` } })
      .then(response => {

        setUserSession(sesiones.sgui, sesiones.sid_usuario);
        setAuthLoading(true);
        console.log(sesiones.sid_usuario)

      }).catch(error => {
        removeUserSession();
        setAuthLoading(true);
      });

  }

  const navigate = useNavigate();
  // const rutaservidor="/"; //Pruebas
  const rutaservidor = "/Orkesta/CallSouth/Salcobrand/CRM"; //Produccion
  return (
    <>


      {sesiones.sid_usuario === "1" ?
        <div id="sidebar-nav" className="list-group border-0 rounded-0 text-sm-start min-vh-100">
          {/* <Link to={rutaservidor + '/Dashboard'} className='list-group-item    d-inline-block text-truncate'><div className='ml-2  text-slate-200 text-sm font-medium'><i className="fa-solid fa-chart-line"></i><span className="ms-1  d-none d-sm-inline">Dashboard</span></div></Link> */}
          <Link to={rutaservidor + '/DashboardCliente'} className='list-group-item    d-inline-block text-truncate'><div className='ml-2  text-slate-200 text-sm font-medium'><i className="fa-solid fa-chart-line"></i><span className="ms-1  d-none d-sm-inline">Dashboard</span></div></Link>
          
      
          <div className="dropdown ">
            <a className="d-flex align-items-center  list-group-item border-end-0   d-inline-block text-truncate link-dark text-decoration-none dropdown-toggle" href="#" data-bs-toggle="dropdown" id="navbarDropdownReportes" aria-expanded="false"><i className="fa-solid fa-bars"></i><span className="ms-1 d-none d-sm-inline  ">Reportes</span></a>
            <ul className="dropdown-menu   text-small shadow" aria-labelledby="navbarDropdownReportes">
            
              <Link to={rutaservidor + '/RepoIntervalo'} className='dropdown-item border-end-0 d-inline-block text-truncate'><div className='ml-2  text-slate-200 text-sm font-medium'><span className="ms-1  d-none d-sm-inline">Reportes Intervalo</span></div></Link>
              <Link to={rutaservidor + '/RepoEpa'} className='dropdown-item border-end-0 d-inline-block text-truncate'><div className='ml-2  text-slate-200 text-sm font-medium'><span className="ms-1  d-none d-sm-inline">Reportes EPA</span></div></Link>
              <Link to={rutaservidor + '/RepoAgente'} className='dropdown-item border-end-0 d-inline-block text-truncate'><div className='ml-2  text-slate-200 text-sm font-medium'><span className="ms-1  d-none d-sm-inline">Reportes de Agentes</span></div></Link>
              <Link to={rutaservidor + '/RepoRegion'} className='dropdown-item border-end-0 d-inline-block text-truncate'><div className='ml-2  text-slate-200 text-sm font-medium'><span className="ms-1  d-none d-sm-inline">Reportes Regiones</span></div></Link>
              <Link to={rutaservidor + '/RepoTipificaciones'} className='dropdown-item border-end-0 d-inline-block text-truncate'><div className='ml-2  text-slate-200 text-sm font-medium'><span className="ms-1  d-none d-sm-inline">Reportes Tipificaciones</span></div></Link>
             
            </ul>
          </div>

        </div> : ''

      }
      {sesiones.sid_usuario === "2" ?
        <div id="sidebar-nav" className="list-group border-0 rounded-0 text-sm-start min-vh-100">
        
          <Link to={rutaservidor + '/DashboardAgente'} className='list-group-item    d-inline-block text-truncate'><div className='ml-2  text-slate-200 text-sm font-medium'><i className="fa-solid fa-user"></i><span className="ms-1  d-none d-sm-inline">Agente</span></div></Link>
        </div> : ''

      }


      {sesiones.sid_usuario === "3" ?
        <div id="sidebar-nav" className="list-group border-0 rounded-0 text-sm-start min-vh-100">
        
          <Link to={rutaservidor + '/RepoAudios'} className='list-group-item    d-inline-block text-truncate'><div className='ml-2  text-slate-200 text-sm font-medium'><i className="fa-solid fa-bullhorn"></i><span className="ms-1  d-none d-sm-inline">Grabaciones</span></div></Link>
        </div> : ''

      }


    </>
  )
}


export default SideBar