import React from 'react';
import { Link } from 'react-router-dom';
import {useState} from 'react';

import back from '../../assets/back.png'
import icon from '../../assets/iconOrkesta.png'






const SideBar = () => {
  const [open, setOpen] = useState(true);
  
  const [mostrar, setMostrar] = useState(true);

  const mostrarClick = event => {

      setMostrar(current => !current);

  };
 
  const rutaservidor = "/Orkesta_CallSouth_Salcobrand";

  return (
    
    <div>
<div className='float-right mr-1 h-screen'> 
 <button onClick={mostrarClick} ><img
     src={back}
     className={`cursor-pointer -mt-4 w-8 absolute transition duration-300
                border-2 rounded-full  ${!open && "rotate-180"}`}
             onClick={() => setOpen(!open)}
   /></button>

</div>{mostrar && (

    <div className="bg-slate-400 h-full w-56 p-3 shadow " >
       <Link to={rutaservidor} className="flex w-7 gap-x-6 mt-4 items-center">
          <img src={icon} className="cursor-pointer ml-8 mt-4 duration-500"/>
     <h1 className=" text-slate-200 text-center mt-4 font-medium text-xl duration-200">

           Panel
          </h1>
        </Link>


        <div className="flex  rounded-md mb-5 p-2 cursor-pointer hover:bg-light-white text-gray-200 text-sm items-center gap-x-4 ">
          <section className="flex flex-col items-center mt-4 border-t p-2 border-gray-200 ">
            <Link  to={rutaservidor + '/Dashboard'}className='flex mr-12 items-center h-12 px-2 mt-6 hover:opacity-40 rounded'>
              <div className='ml-2  text-slate-200 text-sm font-medium'><i class="fa-solid fa-chart-line mr-2"></i> Dashboard</div>
            </Link>
            <Link  to={rutaservidor + '/Trafico'} className='flex items-center h-12 px-2 mt-6 hover:opacity-30 rounded'>
              <div className='ml-2 text-slate-200 text-sm font-medium'><i class="fa-solid fa-table-columns mr-2"></i>
               Reportes y tráficos
              </div>
            </Link>
            {/* <Link to={rutaservidor + '/Crud'} className=' flex px-2 mt-6 rounded  d-none' >
              <button className='ml-2 text-slate-200 text-sm font-medium disabled' disabled><i class="fa-solid fa-user mr-2"></i>

              Panel de Admin
              </button>
            </Link> */}
          </section>
        </div>
    </div>
)}
    </div> 
  );
};

export default SideBar;