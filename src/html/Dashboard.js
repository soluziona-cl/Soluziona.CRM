import React from 'react';
import Donut from './Componentes/Donut';
import Header from './Componentes/Header';
import SideBar from './Componentes/Sidebar';
import Footer from './Componentes/Footer';


const Dashboard = () => {

  return (
    <>
    <div className='h-full bg-white'>
    <Header />
    <div className=' flex flex-row'>
        <SideBar />
     <div className=' '>
    
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


export default Dashboard;