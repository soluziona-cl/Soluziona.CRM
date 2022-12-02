import React from 'react';
import Donut from './Componentes/Donut';


const Dashboard = () => {

  return (
    <>
    <div className='h-full bg-secondary'>
     <div className=' '>
    
          <h1 className='text-3xl text-[#003767] text-center ml-4 my-6 font-bold font-sans'>Resumen llamadas</h1>
          <section className=" flex flex-col">
              <Donut />
            </section>
            </div>
          </div>
          </>
  )
};


export default Dashboard;