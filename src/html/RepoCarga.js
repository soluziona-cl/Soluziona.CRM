import React from 'react';
import Donut from './Componentes/Donut';
import Header from './Componentes/Header';
import SideBar from './Componentes/Sidebar';
import Footer from './Componentes/Footer';


const RepoCarga = () => {

  return (
    <>
    <div className='  bg-white'>
    <Header />
    <div className=' flex-lg-row'>
        <SideBar />
     <div className=' flex-md-row'>
    
    <h1 className='text-3xl text-[#003767] text-center ml-4 my-6 font-bold font-sans'> Titulo</h1>
          <section className=" flex flex-col">
              <Donut />
            </section>
            </div>
            </div>
          </div>
          <Footer />
          </>
  )
};


export default RepoCarga;