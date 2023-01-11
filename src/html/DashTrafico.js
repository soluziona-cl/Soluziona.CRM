import React, { useEffect, useState, useRef } from 'react';
import Donut from './Componentes/Donut';
import Barras from './Componentes/Barras';
import Pie from './Componentes/Pie';
import Header from './Componentes/Header';
import Sidebar from './Componentes/Sidebar';
import Footer from './Componentes/Footer';
import DashReporteCargaTabla from './Componentes/DashReporteCargaTabla';
import ReporteIntervaloTablaDash from './Componentes/ReporteIntervaloTablaDash';


const DashTrafico = () => {


  const [filtrar, Filtrar] = useState(false);
  const [company, setCompany] = useState('');
  const [carga, setCarga] = useState('');

  const HideLogo = () => {
    // setshowlogo(!showlogo);
    setCompany(document.getElementById("ddl_company").value)
    setCarga(document.getElementById("ddl_campana").value)

    Filtrar(!filtrar)
  }


  return (
    <>
      <div className="container-fluid">
        <div className="row flex-nowrap"><Header /></div>
        <div className="row flex-nowrap">
          <div className="col-auto px-0">
            <div id="sidebar" className="collapse collapse-horizontal show border-end">
              <Sidebar />
            </div>
          </div>
          <main className="col ps-md-2 pt-2">
            <a href="#" data-bs-target="#sidebar" data-bs-toggle="collapse" className="border rounded-3 p-1 text-decoration-none"><i className="fa-solid fa-bars py-2 p-1"></i> Menu</a>
            <div className="page-header pt-3">
              <h2>Trafico</h2>
            </div>
            <hr />
            <div className="row">
              <div className="row">
                <div className="col-12">
                  <div className="row row-cols-1 row-cols-md-2 mb-2 text-center">
                    <div className="col-sm-12 col-lg-12">
                      <div className="card mb-4 rounded-3 shadow-sm">
                        <div className="card-header">
                          <h4 className="my-0 font-weight-normal">Trafico Dia</h4>
                        </div>
                        <div className="card-body">
                          <ReporteIntervaloTablaDash flujo='1' campana='1' ini='20230101' fin='20230106' ></ReporteIntervaloTablaDash>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
              <div className="row">
                <div className="col-12">
                  <div className="row row-cols-1 row-cols-md-2 mb-2 text-center">
                    <div className="col-sm-12 col-lg-12">
                      <div className="card mb-4 rounded-3 shadow-sm">
                        <div className="card-header">
                          <h4 className="my-0 font-weight-normal">Evolucion Dia</h4>
                        </div>
                        <div className="card-body">
                          <Barras></Barras>
                          {/* {filtrar !== false &&
                            <DashReporteCargaTablaFilter company={company} carga={carga}></DashReporteCargaTablaFilter>} */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              <div className="row">
                <div className="col-12">
                  <div className="row row-cols-1 row-cols-md-2 mb-2 text-center">
                    <div className="col-sm-12 col-lg-12">
                      <div className="card mb-4 rounded-3 shadow-sm">
                        <div className="card-header">
                          <h4 className="my-0 font-weight-normal">Detalle Intervalo</h4>
                        </div>
                        <div className="card-body">
                          <ReporteIntervaloTablaDash flujo='1' campana='1' ini='20230101' fin='20230106' ></ReporteIntervaloTablaDash>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>


            </div>
          </main>

        </div>
        <Footer />
      </div>


    </>
  )
};


export default DashTrafico;