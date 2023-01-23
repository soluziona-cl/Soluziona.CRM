import React, { useEffect, useState, useRef } from 'react';
import Donut from './Componentes/Donut';
import Barras from './Componentes/Barras';
import Pie from './Componentes/Pie';
import Header from './Componentes/Header';
import Sidebar from './Componentes/Sidebar';
import Footer from './Componentes/Footer';
import DashReporteCargaTabla from './Componentes/DashReporteCargaTabla';
import ReporteIntervaloTablaDash from './Componentes/ReporteIntervaloTablaDash';
import ReporteIntervaloDetalleTablaDash from './Componentes/ReporteIntervaloDetalleTablaDash';
import DashBarras from './Componentes/DashBarras';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import DashBarrasTMO from './Componentes/DashBarrasTMO';
import Company_Campaing_Colas_Dash from './Componentes/Company_Campaing_Colas_Dash';

const DashTrafico = () => {

  const [key, setKey] = useState('trafico');


  const [mostrarGrid, setMostrarGrid] = useState(true);
  const [mostrarGrid2, setMostrarGrid2] = useState(false);

  const [company, setStartCompany] = useState('0');
  const [campana, setStartCampana] = useState('0');

  const HideLogo = () => {
    // setshowlogo(!showlogo);
    setStartCompany(document.getElementById("ddl_company").value)
    setStartCampana(document.getElementById("ddl_campana").value)

    // Filtrar(!filtrar)
  }

  const filtrar = (event) => {

    // setCompany(document.getElementById("ddl_company").value)
    setStartCampana(document.getElementById("ddl_campana").value)
    setMostrarGrid(true);
    setMostrarGrid2(false);
    // setFlujo(document.getElementById("ddl_campana").options[document.getElementById("ddl_campana").selectedIndex].text)

  };

  const filtrar2 = (event) => {

    // setStartCompany(document.getElementById("ddl_company").value)
    setStartCampana(document.getElementById("ddl_campana").value)
    setMostrarGrid(false);
    setMostrarGrid2(true);

    // setFlujo(document.getElementById("ddl_campana").options[document.getElementById("ddl_campana").selectedIndex].text)
  };
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
              <div className="row mt-2 bg-light align-items-center">

                <div className="col-sm-12 col-lg-3 mt-lg-0 mt-sm-2">
                  <h2>Dashboard</h2>
                </div>

                <Company_Campaing_Colas_Dash />


                <div className="col-sm-12 col-lg-3 mt-lg-0 mt-sm-2">
                {mostrarGrid === false && <button type="button" className="mb-0 btn btn-success" onClick={() => filtrar()}>Buscar</button>}
                  {mostrarGrid === true && <button type="button" className="mb-0 btn btn-success" onClick={() => filtrar2()}>Buscar</button>}

                </div>
              </div>

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

                          {mostrarGrid !== false && <ReporteIntervaloTablaDash flujo={campana} ></ReporteIntervaloTablaDash>}
                          {mostrarGrid2 !== false && <ReporteIntervaloTablaDash flujo={campana} ></ReporteIntervaloTablaDash>}
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
                          <Tabs
                            id="controlled-tab-example"
                            activeKey={key}
                            onSelect={(k) => setKey(k)}
                            className="mb-3">
                            <Tab eventKey="trafico" title="Trafico">
                              {mostrarGrid !== false && <DashBarras flujo={campana}></DashBarras>}
                              {mostrarGrid2 !== false && <DashBarras flujo={campana}></DashBarras>}

                            </Tab>
                            <Tab eventKey="tmo" title="TMO">
                              {mostrarGrid !== false && <DashBarrasTMO flujo={campana}></DashBarrasTMO>}
                              {mostrarGrid2 !== false && <DashBarrasTMO flujo={campana}></DashBarrasTMO>}

                            </Tab>

                          </Tabs>


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
                          {mostrarGrid !== false && <ReporteIntervaloDetalleTablaDash flujo={campana} ></ReporteIntervaloDetalleTablaDash>}
                          {mostrarGrid2 !== false && <ReporteIntervaloDetalleTablaDash flujo={campana} ></ReporteIntervaloDetalleTablaDash>}

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