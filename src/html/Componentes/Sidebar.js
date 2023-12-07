import React from 'react';
// import { Link } from 'react-router-dom';
import { useState, FC, useEffect } from 'react';
import { useNavigate,Link } from 'react-router-dom';
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
    {/* <Link  to={rutaservidor + '/Dashboard'} className='list-group-item    d-inline-block text-truncate'><div className='ml-2  text-slate-200 text-sm font-medium'><i className="fa-solid fa-chart-line"></i><span className="ms-1  d-none d-sm-inline">Dashboard</span></div></Link> */}
    <Link  to={rutaservidor + '/DashTrafico'} className='list-group-item    d-inline-block text-truncate'><div className='ml-2  text-slate-200 text-sm font-medium'><i className="fa-solid fa-chart-line"></i><span className="ms-1  d-none d-sm-inline">Panel Trafico Dia</span></div></Link>
     
      {/* <a href={rutaservidor + "/Dashboard"} className="list-group-item    d-inline-block text-truncate" data-bs-parent="#sidebar"><i className="fa-solid fa-chart-line"></i><span className="ms-1  d-none d-sm-inline">Dashboard</span></a> */}
      {/* <a href={rutaservidor + "/SubirArchivos"} className="list-group-item   d-inline-block text-truncate" data-bs-parent="#sidebar"><i className="fa-solid fa-upload"></i><span className="ms-1 d-none d-sm-inline">Subir Archivos</span></a>
      <a href={rutaservidor + "/AdminCargas"} className="list-group-item  d-inline-block text-truncate" data-bs-parent="#sidebar"><i className="fa-solid fa-user"></i><span className="ms-1 d-none d-sm-inline">Administrador de Cargas</span></a> */}
      <div className="dropdown ">
        <a className="d-flex align-items-center  list-group-item border-end-0   d-inline-block text-truncate link-dark text-decoration-none dropdown-toggle" href="#" data-bs-toggle="dropdown" id="navbarDropdownReportes" aria-expanded="false"><i className="fa-solid fa-bars"></i><span className="ms-1 d-none d-sm-inline  ">Reportes</span></a>
        <ul className="dropdown-menu   text-small shadow" aria-labelledby="navbarDropdownReportes">
        <Link  to={rutaservidor + '/RepoIntervalo'}   className='dropdown-item border-end-0 d-inline-block text-truncate'><div className='ml-2  text-slate-200 text-sm font-medium'><span className="ms-1  d-none d-sm-inline">Telefonico Intervalo</span></div></Link>
        <Link  to={rutaservidor + '/RepoTelefonicoAcumulado'}   className='dropdown-item border-end-0 d-inline-block text-truncate'><div className='ml-2  text-slate-200 text-sm font-medium'><span className="ms-1  d-none d-sm-inline">Telefonico Acumulado</span></div></Link>
        <Link  to={rutaservidor + '/RepoAutoAtenciones'}   className='dropdown-item border-end-0 d-inline-block text-truncate'><div className='ml-2  text-slate-200 text-sm font-medium'><span className="ms-1  d-none d-sm-inline">AutoAtenciones</span></div></Link>
        <Link  to={rutaservidor + '/RepoResumenFlujoLLamada'}   className='dropdown-item border-end-0 d-inline-block text-truncate'><div className='ml-2  text-slate-200 text-sm font-medium'><span className="ms-1  d-none d-sm-inline">Flujo Llamadas</span></div></Link>
        <Link  to={rutaservidor + '/RepoDetalleFlujoLLamada'}   className='dropdown-item border-end-0 d-inline-block text-truncate'><div className='ml-2  text-slate-200 text-sm font-medium'><span className="ms-1  d-none d-sm-inline">Detalle Flujo Llamadas</span></div></Link>
        <Link  to={rutaservidor + '/RepoTipificadasAgente'}   className='dropdown-item border-end-0 d-inline-block text-truncate'><div className='ml-2  text-slate-200 text-sm font-medium'><span className="ms-1  d-none d-sm-inline">Tipificadas Ejecutivo</span></div></Link>
        <Link  to={rutaservidor + '/RepoExcel'}   className='dropdown-item border-end-0 d-inline-block text-truncate'><div className='ml-2  text-slate-200 text-sm font-medium'><span className="ms-1  d-none d-sm-inline">Reporte Excel</span></div></Link>
       
        </ul>
      </div>

      <div className="dropdown ">
        <a className="d-flex align-items-center  list-group-item border-end-0   d-inline-block text-truncate link-dark text-decoration-none dropdown-toggle" href="#" data-bs-toggle="dropdown" id="navbarDropdownReportes" aria-expanded="false"><i className="fa-solid fa-bars"></i><span className="ms-1 d-none d-sm-inline  ">OCR</span></a>
        <ul className="dropdown-menu   text-small shadow" aria-labelledby="navbarDropdownReportes">
        <Link  to={rutaservidor + '/OCR'}   className='dropdown-item border-end-0 d-inline-block text-truncate'><div className='ml-2  text-slate-200 text-sm font-medium'><span className="ms-1  d-none d-sm-inline">OCR</span></div></Link>
        <Link  to={rutaservidor + '/OcrResultados'}   className='dropdown-item border-end-0 d-inline-block text-truncate'><div className='ml-2  text-slate-200 text-sm font-medium'><span className="ms-1  d-none d-sm-inline">Resultados OCR</span></div></Link>
        <Link  to={rutaservidor + '/OcrFiltro'}   className='dropdown-item border-end-0 d-inline-block text-truncate'><div className='ml-2  text-slate-200 text-sm font-medium'><span className="ms-1  d-none d-sm-inline">Ocr Filtrado</span></div></Link>
       
        
        </ul>
      </div>

    </div>

    </>
  )
}


export default SideBar