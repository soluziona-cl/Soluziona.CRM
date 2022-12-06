import React from 'react';
import { Link } from 'react-router-dom';
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';



const SideBar = () => {
    const navigate = useNavigate();
  const rutaservidor = "/";

  return (
      
   <div className=' float-sm-start bg-white'> 
    <div className=" flex-column m-2 " >
     <h1 className=" text-center form-control-sm ">
        Menú
          </h1>
         
        <div className=" text-black">
          <section className="items-center mt-2 p-2 border-gray-200 ">
          

          <Link  to={rutaservidor + '/Dashboard'} >
              <div className='mt-2 text-black'> 
              Dashboard
              </div>
            </Link>
            <Link  to={rutaservidor + '/SubirArchivos'} >
              <div className='pt-2 text-black'><i class="fa-solid fa-upload"></i> 
              Cargador
              </div>
            </Link>
            <Link  to={rutaservidor + '/Admin'}>
              <div className='pt-2 text-black mt-3'><i class="fa-solid fa-user"></i>
              Admin
              </div>
            </Link>
            <Link  to={rutaservidor + '/Reportes'}>
              <div className='pt-2 text-black mt-3 mb-2'><i class="fa-solid fa-bars "></i>
              Reportes
              </div>
            </Link>
            <Link  to={rutaservidor + '/Repo-Carga'} >
              <div className='flex text-black mr-12 items-center h-12 px-2 mt-6 hover:opacity-40 rounded'>
              Repo-Carga
              </div>
            </Link>
            <Link  to={rutaservidor + '/Repo-Gestión'} >
              <div className='flex text-black mr-12 items-center h-12 px-2 mt-6 hover:opacity-40 rounded'>
              Repo-Gestión
              </div>
            </Link>
            <Link  to={rutaservidor + '/Repo-Agentes'} >
              <div className='flex text-black mr-12 items-center h-12 px-2 mt-6 hover:opacity-40 rounded'>
              Repo-Agentes
              </div>
            </Link>
          </section>
        </div>
    </div>

    </div> 
  )
};

export default SideBar;


// import React from 'react';
// import { Link } from 'react-router-dom';
// import {useState} from 'react';

// // import back from '../../assets/back.png'
// // import icon from '../../assets/iconOrkesta.png'

// import Nav from 'react-bootstrap/Nav';

// // import img from "procollect.png" ;


// const SideBar = () => {
//   const rutaservidor = " /"; //Prueba
//   // const rutaservidor = "/Orkesta_CallSouth_Salcobrand";

//   return (
//     <>
//     <div className="container-fluid position-absolute">
//     <div className="row flex-nowrap">
//         <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0">
//             <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
//             <Link  to={rutaservidor + '/'} img src={img}className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
//                     <span className="fs-5 d-none d-sm-inline">Menu</span>
//                     </Link>
//                 <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
//                  <Link  to={rutaservidor + '/cargador'}className='flex mr-12 items-center h-12 px-2 mt-6 hover:opacity-40 rounded'>
//               <div className='ml-2  text-slate-200 text-sm font-medium'><i class="fa-solid fa-download"></i> Cargador</div></Link>
//                     <li>
//                     <Link  to={rutaservidor + '/Reportes'} className="nav-link px-0 align-middle"><i class="fa-solid fa-user"></i>
//                            <span className="ms-1 d-none d-sm-inline"> Reportes </span></Link>
//                     </li>
//                     <li>
//                     <Link  to={rutaservidor + '/Repo-Carga'} className="nav-link px-0 align-middle"><i class="fa-solid fa-user"></i>
//                            <span className="ms-1 d-none d-sm-inline">Repo-Carga</span>  </Link>
//                     </li>
//                     <li>
//                     <Link  to={rutaservidor + '/Repo-Gestió'} className="nav-link px-0 align-middle"><i class="fa-solid fa-user"></i>
//                            <span className="ms-1 d-none d-sm-inline">Repo-Gestión</span>  </Link>
//                     </li>
//                     <li>
//                     <Link  to={rutaservidor + '/Repo-Agentes'} className="nav-link px-0 align-middle"><i class="fa-solid fa-user"></i>
//                            <span className="ms-1 d-none d-sm-inline">Repo-Agentes</span>  </Link>
//                     </li>
//                 </ul>
              
           
//             </div>
//         </div>
//     </div>
// </div>

// </>

// );
// };

// export default SideBar;