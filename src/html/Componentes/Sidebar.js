import React from 'react';
// import { Link } from 'react-router-dom';
import { useState, FC, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import icon from '../../assets/iconOrkesta.png'
import 'bootstrap/dist/css/bootstrap.min.css';



const SideBar = () => {

  const [open, setOpen] = useState(true);

  const [mostrar, setMostrar] = useState(true);

  const mostrarClick = event => {

    setMostrar(current => !current);

  };

  const navigate = useNavigate();
  // const rutaservidor="/"; //Pruebas
  const rutaservidor = "/Orkesta/CallSouth/LosHeroes/CRM"; //Produccion
  return (
    <>



      <div id="sidebar-nav" className="list-group border-0 rounded-0 text-sm-start min-vh-100">

        <Link to={rutaservidor + '/Dashboard'} className='list-group-item    d-inline-block text-truncate'><div className='ml-2  text-slate-200 text-sm font-medium'><i className="fa-solid fa-chart-line"></i><span className="ms-1  d-none d-sm-inline">Panel Trafico Dia</span></div></Link>
        <Link to={rutaservidor + '/Historial'} className='list-group-item    d-inline-block text-truncate'><div className='ml-2  text-slate-200 text-sm font-medium'><i className="fa-solid fa-chart-line"></i><span className="ms-1  d-none d-sm-inline">Historial de llamadas</span></div></Link>
      </div>

    </>
  )
}


export default SideBar