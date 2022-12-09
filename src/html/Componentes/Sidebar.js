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
      <a href="/SubirArchivos" className="list-group-item border-end-0 d-inline-block text-truncate" data-bs-parent="#sidebar"><i className="fa-solid fa-upload"></i><span className="ms-1 d-none d-sm-inline">SubirArchivos</span></a>
      <a href="/AdminCargas" className="list-group-item border-end-0 d-inline-block text-truncate" data-bs-parent="#sidebar"><i className="fa-solid fa-user"></i><span className="ms-1 d-none d-sm-inline">AdminCargas</span></a>
      <div className="dropdown">
        <a className="d-flex align-items-center list-group-item border-end-0 d-inline-block text-truncate link-dark text-decoration-none dropdown-toggle" href="#" data-bs-toggle="dropdown" id="navbarDropdownReportes" aria-expanded="false"><i className="fa-solid fa-bars"></i><span className="ms-1 d-none d-sm-inline">Reportes</span></a>
        <ul className="dropdown-menu  text-small shadow" aria-labelledby="navbarDropdownReportes">
          <li><a className="dropdown-item border-end-0 d-inline-block text-truncate" href="/RepoCarga"> RepoCarga</a></li>
          <li><a className="dropdown-item border-end-0 d-inline-block text-truncate" href="/RepoGestion"> RepoGestión</a></li>
          <li><a className="dropdown-item border-end-0 d-inline-block text-truncate" href="/RepoAgentes">RepoAgentes</a></li>
        </ul>
      </div>

    </div>

    // <div>
    //   <nav id="sidebarMenu" className="collapse d-lg-block sidebar collapse bg-light">
    //     <div className="position-sticky">
    //       <div className=' float-sm-start rounded' id='sidebar'>
    //         <button onClick={mostrarClick} ><img
    //           src={icon} id={"back"}
    //           className={` rounded'sm  ${!open}`}
    //           onClick={() => setOpen(!open)}
    //         /></button>

    //       </div>{mostrar && (
    //         <div className=" flex-column m-2 " >
    //           <h1 className=" text-center form-control-md mt-2 ">
    //             Menú
    //           </h1>
    //           <div className=" text-black ">
    //             <section className="items-center justify-content-around mt-2 p-5 border-gray-200 ">
    //               <ul>
    //                 <a className="dropdown-item text-black pt-2 mt-3" href="/Dashboard"><i className="fa-solid fa-chart-line"></i> Dashboard </a>
    //                 <a className="dropdown-item text-black pt-2 mt-3" href="/SubirArchivos"><i className="fa-solid fa-upload"></i> SubirArchivos </a>
    //                 <a className="dropdown-item text-black pt-2 mt-3" href="/AdminCargas"><i className="fa-solid fa-user"></i> AdminCargas </a>
    //               </ul>

    //               <div className=" dropdown mt-4">
    //                 <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="true"><i className="fa-solid fa-bars"></i>
    //                   Reportes
    //                 </a>
    //                 <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
    //                   <li><a className="dropdown-item" href="/RepoCarga"> RepoCarga</a></li>
    //                   <li><a className="dropdown-item" href="/RepoGestion"> RepoGestión</a></li>
    //                   <li><a className="dropdown-item" href="/RepoAgentes">RepoAgentes</a></li>
    //                 </ul>
    //               </div>
    //             </section>
    //           </div>

    //         </div>
    //       )}
    //     </div>
    //   </nav>
    // </div>
  )
}


export default SideBar