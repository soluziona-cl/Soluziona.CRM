import React from 'react';
// import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import icon from '../../assets/iconOrkesta.png'
import 'bootstrap/dist/css/bootstrap.min.css';



const SideBar = () => {

  const [open, setOpen] = useState(true);

  const [mostrar, setMostrar] = useState(true);

  const mostrarClick = event => {

    setMostrar(current => !current);

  };

  const navigate = useNavigate();
  const rutaservidor = "";

  return (

    <div id="sidebar-nav" className="list-group border-0 rounded-0 text-sm-start min-vh-100">
      <a href="/Dashboard" className="list-group-item border-end-0 d-inline-block text-truncate" data-bs-parent="#sidebar"><i className="fa-solid fa-chart-line"></i><span className="ms-1 d-none d-sm-inline">Dashboard</span></a>
      <a href="/SubirArchivos" className="list-group-item border-end-0 d-inline-block text-truncate" data-bs-parent="#sidebar"><i className="fa-solid fa-upload"></i><span className="ms-1 d-none d-sm-inline">Subir Archivos</span></a>
      <a href="/AdminCargas" className="list-group-item border-end-0 d-inline-block text-truncate" data-bs-parent="#sidebar"><i className="fa-solid fa-user"></i><span className="ms-1 d-none d-sm-inline">Administrador de Cargas</span></a>
      <div className="dropdown">
        <a className="d-flex align-items-center list-group-item border-end-0 d-inline-block text-truncate link-dark text-decoration-none dropdown-toggle" href="#" data-bs-toggle="dropdown" id="navbarDropdownReportes" aria-expanded="false"><i className="fa-solid fa-bars"></i><span className="ms-1 d-none d-sm-inline">Reportes</span></a>
        <ul className="dropdown-menu  text-small shadow" aria-labelledby="navbarDropdownReportes">
          <li><a className="dropdown-item border-end-0 d-inline-block text-truncate" href="/RepoCarga"> Reportes de Carga</a></li>
          <li><a className="dropdown-item border-end-0 d-inline-block text-truncate" href="/RepoGestion"> Reportes de Gestión</a></li>
          <li><a className="dropdown-item border-end-0 d-inline-block text-truncate" href="/RepoAgentes">Reportes de Agentes</a></li>
          <li><a className="dropdown-item border-end-0 d-inline-block text-truncate" href="/RepoCalidad">Reportes de Calidad</a></li>
        </ul>
      </div>

    </div>

  
  )
}


export default SideBar