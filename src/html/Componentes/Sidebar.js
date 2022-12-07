import React from 'react';
// import { Link } from 'react-router-dom';
import {useState} from 'react';
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
   
    <div>
        <nav id="sidebarMenu" class="collapse d-lg-block sidebar collapse bg-white">
              <div class="position-sticky">
   <div className=' float-sm-start rounded' id='sidebar'> 
   <button onClick={mostrarClick} ><img
     src={icon} id={"back"}
     className={` rounded'sm  ${!open }`}
             onClick={() => setOpen(!open)}
   /></button>

</div>{mostrar && (
    <div className=" flex-column m-2 " >
     <h1 className=" text-center form-control-md mt-2 ">
        Menú
          </h1>
        <div className=" text-black ">
          <section className="items-center justify-content-around mt-2 p-5 border-gray-200 ">
          <ul>   
            <a class="dropdown-item text-black pt-2 mt-3" href="/Dashboard"><i class="fa-solid fa-chart-line"></i> Dashboard </a>
            <a class="dropdown-item text-black pt-2 mt-3" href="/SubirArchivos"><i className="fa-solid fa-upload"></i> SubirArchivos </a>
            <a class="dropdown-item text-black pt-2 mt-3" href="/AdminCargas"><i className="fa-solid fa-user"></i> AdminCargas </a>
          </ul>
      
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
          </section>
        </div>
        
    </div>
    )}
</div>
</nav>
</div>
)}


export default SideBar