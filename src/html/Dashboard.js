import React from 'react';
import Donut from './Componentes/Donut';
import Header from './Componentes/Header';
import SideBar from './Componentes/Sidebar';
import Footer from './Componentes/Footer';


const Dashboard = () => {

  return (
    <>
      <div class="container-fluid">
        <div class="row flex-nowrap"><Header /></div>
        <div class="row flex-nowrap">
          <div class="col-auto px-0">
            <div id="sidebar" class="collapse collapse-horizontal show border-end">            
                <SideBar />              
            </div>
          </div>
          <main class="col ps-md-2 pt-2">
            <a href="#" data-bs-target="#sidebar" data-bs-toggle="collapse" class="border rounded-3 p-1 text-decoration-none"><i class="fa-solid fa-bars py-2 p-1"></i> Menu</a>
            <div class="page-header pt-3">
              <h2>Dashboard</h2>
            </div>
            <hr />
            <div class="row">
              <div class="col-12">
              <Donut />
              </div>
            </div>
          </main>
         
        </div>
        <Footer />
      </div>

      {/* <div className=' bg-white'>

        <div className=' flex-lg-row'>

          <div className=' flex-md-row'>

            <h1 className='text-3xl text-[#003767] text-center ml-4 my-6 font-bold font-sans'> Titulo</h1>
            <section className=" flex flex-col">
             
            </section>
          </div>
        </div>
      </div>
      */}
    </>
  )
};


export default Dashboard;