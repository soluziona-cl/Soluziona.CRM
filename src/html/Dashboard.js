import React from 'react';
import Donut from './Componentes/Donut';
import Header from './Componentes/Header';
import SideBar from './Componentes/Sidebar';
import Footer from './Componentes/Footer';
import Company_Campaing_Dash from './Componentes/Company_Campaing_Dash';

const Dashboard = () => {

  return (
    <>
      <div className="container-fluid">
        <div className="row flex-nowrap"><Header /></div>
        <div className="row flex-nowrap">
          <div className="col-auto px-0">
            <div id="sidebar" className="collapse collapse-horizontal show border-end">
              <SideBar />
            </div>
          </div>
          <main className="col ps-md-2 pt-2">
            <a href="#" data-bs-target="#sidebar" data-bs-toggle="collapse" className="border rounded-3 p-1 text-decoration-none"><i className="fa-solid fa-bars py-2 p-1"></i> Menu</a>
            <div className="page-header pt-3">
              <h2>Dashboard</h2>
            </div>
            <hr />
            <div className="row">

              <div className="row">
                <div className="col-12">
                  <div class="row row-cols-1 row-cols-md-3 mb-3 text-center">
                    <div class="col">
                      <div class="card mb-4 rounded-3 shadow-sm">
                        <div className="card-header">
                          <h4 className="my-0 font-weight-normal">Agentes Conectados</h4>
                        </div>
                        <div className="card-body">
                          <Donut></Donut>
                        </div>
                      </div>
                    </div>
                    <div class="col">
                      <div class="card mb-4 rounded-3 shadow-sm">
                        <div className="card-header">
                          <h4 className="my-0 font-weight-normal">Agentes Hablando</h4>
                        </div>
                        <div className="card-body">
                          <Donut></Donut>
                        </div>
                      </div>
                    </div>
                    <div class="col">
                      <div class="card mb-4 rounded-3 shadow-sm border-primary">
                        <div className="card-header">
                          <h4 className="my-0 font-weight-normal">Agentes Espera</h4>
                        </div>
                        <div className="card-body">
                          <Donut></Donut>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <div class="row row-cols-1 row-cols-md-2 mb-2 text-center">
                    <div class="col-sm-12 col-lg-4">
                      <div class="card mb-4 rounded-3 shadow-sm">
                        <div className="card-header">
                          <h4 className="my-0 font-weight-normal">Gestion de Cargas</h4>
                        </div>
                        <div className="card-body">
                          <table className='table'>
                            <thead>
                              <tr>
                                <td>Campaña</td>
                                <td>Carga</td>
                                <td>Recorrido</td>
                                <td>Contactdo</td>
                                <td>Acepta</td>
                                <td>% Conta.</td>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>Campaña</td>
                                <td>Carga</td>
                                <td>Recorrido</td>
                                <td>Contactdo</td>
                                <td>Acepta</td>
                                <td>% Conta.</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-12 col-lg-8">
                      <div class="card mb-4 rounded-3 shadow-sm">
                        <div className="card-header">
                          <h4 className="my-0 font-weight-normal">Trafico Intervalo</h4>
                        </div>
                        <div className="card-body">
                          <Donut></Donut>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">

                <div className="col-12">
                  <div class="row row-cols-1 row-cols-md-2 mb-2 text-center">
                    <div class="col-sm-12 col-lg-12">
                      <div class="card mb-4 rounded-3 shadow-sm">
                        <div className="card-header">
                          <h4 className="my-0 font-weight-normal">Gestion Ultimos 10 Dias</h4>
                          <hr />
                          <div className="row mt-2 bg-light align-items-center">

                            <Company_Campaing_Dash></Company_Campaing_Dash>

                            <div className="col-sm-12 col-lg-3 mt-lg-0 mt-sm-2">
                              <button
                                className="mb-0 btn btn-success"
                              // onClick={filtrar}
                              >Buscar
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="card-body">
                          <table className='table'>
                            <thead>
                              <tr>
                                <td>Fecha</td>
                                <td>Carga</td>
                                <td>Recorrido</td>
                                <td>Contactdo</td>
                                <td>Acepta</td>
                                <td>% Conta.</td>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>Fecha</td>
                                <td>Carga</td>
                                <td>Recorrido</td>
                                <td>Contactdo</td>
                                <td>Acepta</td>
                                <td>% Conta.</td>
                              </tr>
                            </tbody>
                          </table>
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


export default Dashboard;