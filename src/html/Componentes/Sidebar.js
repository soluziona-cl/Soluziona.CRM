import React from 'react';
import { Link } from 'react-router-dom';
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';



const SideBar = () => {
    const navigate = useNavigate();
  const rutaservidor = "";

  return (
      
   <div className=' float-sm-start rounded' id='sidebar'> 
    <div className=" flex-column m-2 " >
     <h1 className=" text-center form-control-md mt-2 ">
        Menú
          </h1>
        <div className=" text-black">
          <section className="items-center mt-2 p-5 border-gray-200 ">
          <Link  to={rutaservidor + '/Dashboard'} >
              <div className='pt-1 text-black'><i class="fa-solid fa-chart-line"></i>
             Dashboard
              </div>
            </Link>
            <Link  to={rutaservidor + '/SubirArchivos'} >
              <div className='pt-2 mt-3 text-black'><i className="fa-solid fa-upload"></i> 
              Cargador
              </div>
            </Link>
            <Link  to={rutaservidor + '/AdminCargas'}>
              <div className='pt-2 text-black mt-3'><i className="fa-solid fa-user"></i>
              Admin
              </div>
            </Link>
              <div className=" dropdown mt-4">
          <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="true"><i className="fa-solid fa-bars"></i>
          Reportes
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><a class="dropdown-item" href="/RepoCarga"> RepoCarga</a></li>
            <li><a class="dropdown-item" href="/RepoGestion"> RepoGestión</a></li>
            <li><a class="dropdown-item" href="/RepoAgentes">RepoAgentes</a></li>
          </ul>
        </div>
            {/* <Link  to={rutaservidor + '/RepoCarga'} >
              <div className='flex text-black mr-12 items-center h-12 px-2 mt-6 hover:opacity-40 rounded'>
              RepoCarga
              </div>
            </Link>
            <Link  to={rutaservidor + '/RepoGestion'} >
              <div className='flex text-black mr-12 items-center h-12 px-2 mt-6 hover:opacity-40 rounded'>
              RepoGestión
              </div>
            </Link>
            <Link  to={rutaservidor + '/RepoAgentes'} >
              <div className='flex text-black mr-12 items-center h-12 px-2 mt-6 hover:opacity-40 rounded'>
              RepoAgentes
              </div>
            </Link> */}
          </section>
        </div>
    </div>

    </div> 
  )
};

export default SideBar;