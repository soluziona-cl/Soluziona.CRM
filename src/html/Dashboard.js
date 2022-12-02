// import Header from "../htmls/componentes/Header";
// import Footer from "../htmls/componentes/Footer";
// import SideBar from "./componentes/General/SideBar"
// import Grafico from "./componentes/General/Grafico";
// import Pie from "./componentes/General/Pie";
import React from 'react';
// import Funnel from "./componentes/General/Funnel";
import Donut from './Componentes/Donut';
// import Gauge_2 from "./componentes/General/Gauge_2";
// import TablaTrafico from "./componentes/General/TablaTrafico";

const Dashboard = () => {

  return (
    <>
    
    <div className='h-full'>
      {/* <Header /> */}
      <div className='flex flex-row'>
        {/* <SideBar /> */}
        <div className='w-screen flex flex-col items-center m-16'>
       
          <div className='flex flex-col gap-4 mb-6'>
          <h1 className='text-3xl text-[#003767] text-center ml-4 my-6 font-bold font-sans'>Resumen llamadas</h1>
          <section className=" flex flex-col">
             <div className='flex gap-12 justify-items-center'>
            <section className='flex border-t text-center border-[#D8D8D8] gap-1'>
              <Donut />
              {/* <Funnel />
              <Gauge_2 /> */}
            </section>
            </div>
            {/* <div className='flex flex-col items-center justify--center  '>
              <section className='flex  border mb-8 border-[#2ECC71] rounded-2xl '>
              <Grafico />
              </section>
              <section className='flex border mb-8 border-[#2ECC71]'>
                <TablaTrafico />
              </section>
            </div> */}
            </section>
         

            </div>
          </div>

          </div>


          </div>
          {/* <Footer/> */}
          </>
  )
};


export default Dashboard;