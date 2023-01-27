import React, { useEffect, useState, useRef } from 'react';
import Header from './Componentes/Header';
import Sidebar from './Componentes/Sidebar';
import Footer from './Componentes/Footer';
import Jitsi from './Componentes/Jitsi';

import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { getToken, removeUserSession, setUserSession } from '../html/Componentes/Common';
import 'bootstrap/dist/css/bootstrap.min.css';

import "jquery/dist/jquery.min.js";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import "datatables.net-buttons/js/dataTables.buttons.js";
import "datatables.net-buttons/js/buttons.colVis.js";
import "datatables.net-buttons/js/buttons.flash.js";
import "datatables.net-buttons/js/buttons.html5.js";
import "datatables.net-buttons/js/buttons.print.js";
import $, { data } from "jquery";

const Dashboard = () => {
  const [authLoading, setAuthLoading] = useState(true);
  const navigate = useNavigate();
  const [filtrar, Filtrar] = useState(false);
  const [company, setCompany] = useState('');
  const [carga, setCarga] = useState('');
  const [datashow, setDataShow] = useState([]);
  const [datamodal, setDataModal] = useState([]);
  const [dataccion, setDataAccion] = useState([]);

  const [mostrarJitsi, setMostrarJitsi] = useState(false);
  const [cerrarJitsi, setCerrarJitsi] = useState(false);
  

  const HideLogo = () => {
    // setshowlogo(!showlogo);
    setCompany(document.getElementById("ddl_company").value)
    setCarga(document.getElementById("ddl_campana").value)

    Filtrar(!filtrar)
  }

  const sesiones = {
    sgui: localStorage.getItem("localgui"),
    scliente: localStorage.getItem("localcliente"),
    sid: localStorage.getItem("localid"),
    sid_usuario: localStorage.getItem("localid_usuario"),
    stoken: localStorage.getItem("token")
  };

  useEffect(() => {
    const token = getToken();

    if (!token) {
      console.log('Vacio')
      navigate("/");
      return;
    }

    axios.post('https://app.soluziona.cl/API_desa/Soluziona.Videollamada/api/Ventas_CRM/CRM/Session_Check', { user: sesiones.sid_usuario, gui: sesiones.sgui }, { headers: { "Authorization": `Bearer ${sesiones.stoken}` } })
      .then(response => {

        setUserSession(sesiones.sgui, sesiones.sid_usuario);
        setAuthLoading(false);


      }).catch(error => {
        removeUserSession();
        setAuthLoading(false);
      });

    Datos()
    componentDidMount()
  }, []);

  const Datos = (async () => {
    console.log("show")
    const response = await axios.post('https://app.soluziona.cl/API_desa/Soluziona.Videollamada/api/Ventas_CRM/CRM/Historial_Show', { dato: null }, { headers: { "Authorization": `Bearer ${sesiones.stoken}` } })

    if (response.status === 200) {
      console.log(response)
      // console.log(response.data)
      // console.log(response.data)
      setDataShow(response.data)
      console.log(datashow)
    }
  })

  const componentDidMount = () => {
    if (!$.fn.DataTable.isDataTable("#myTable")) {
      $(document).ready(function () {
        setTimeout(function () {
          $("#table").DataTable({
            language: {
              url: "//cdn.datatables.net/plug-ins/1.11.3/i18n/es-cl.json"
            },
            destroy: true,
            //pagingType: "full_numbers",
            pageLength: 10,
            //processing: true,
            dom: "Bfrtip",
            select: {
              style: "single",
            },
            //buttons tiene varios botones, pero por ahora solo uno activado
            buttons: [
              // {
              //     extend: "pageLength",
              //     className: "btn btn-secondary bg-secondary",
              // },
              // {
              //     extend: "copy",
              //     className: "btn btn-secondary bg-secondary",
              // },
              // {
              //     extend: "csv",
              //     className: "btn btn-secondary bg-secondary",
              // },
              // {
              //     extend: "print",
              //     customize: function (win) {
              //         $(win.document.body).css("font-size", "10pt");
              //         $(win.document.body)
              //             .find("table")
              //             .addClass("compact")
              //             .css("font-size", "inherit");
              //     },
              //     className: "btn btn-secondary bg-secondary",
              // },
            ],

            fnRowCallback: function (
              nRow,
              aData,
              iDisplayIndex,
              iDisplayIndexFull
            ) {
              var index = iDisplayIndexFull + 1;
              $("td:first", nRow).html(index);
              return nRow;
            },

            lengthMenu: [
              [10, 20, 30, 50, -1],
              [10, 20, 30, 50, "All"],
            ],
            columnDefs: [
              {
                targets: 0,
                render: function (data, type, row, meta) {
                  return type === "export" ? meta.row + 1 : data;
                },
              },
            ],
          });
        }, 2000);
      });
    }

  }

  const showTable = () => {

    try {
      return datashow.map((data, index) => {
        return (
          <tr key={index + 1}>
            <td></td>
            <td className="text-xs font-weight-bold">{data.nombre}</td>
            <td className="text-xs font-weight-bold">{data.fecha}</td>
            <td className="text-xs font-weight-bold">{data.estado}</td>
            <td className="text-xs font-weight-bold">{data.observacion}</td>
            <td><button type="button" className="btn btn-success" data-bs-toggle="modal"
              data-bs-target="#modalJitsi" onClick={() => datalModal(data)}>
              Ver detalles</button></td>
          </tr>
        );
      });
    } catch (e) {
      alert(e.message);
    }
    // if (alertas != 0) { setAlert(true) }
  };

  const mostrar = () => {
    setMostrarJitsi(true);
    // mostrarJitsi.show();
    console.log("mostrar");
  };

  const datalModal = (async (data) => {
    // console.log(data)
    setDataModal(data)
    console.log(data.nombre)


    const response = await axios.post('https://app.soluziona.cl/API_desa/Soluziona.Videollamada/api/Ventas_CRM/CRM/Envio_id', { dato: datamodal.id }, { headers: { "Authorization": `Bearer ${sesiones.stoken}` } })
    console.log(response)

    // console.log(response.data)
    // console.log(response.data[0].idaccion)
    // setDataAccion(response.data[0])
    // console.log(dataccion)
    // console.log(dataccion.idaccion)
  })

  const cerrar = () => {
    setCerrarJitsi(true);
    console.log("cerrar");
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
              <h2>Dashboard</h2>
            </div>
            <hr />



            <div className="row">
              <div className="col-12">
                <div className="row row-cols-3 row-cols-md-3 mb-3 text-center">

                  <div className="col-sm-12 col-lg-11">
                    <div className="card mb-4 rounded-3 shadow-sm">
                      <div className="card-header">
                        <h4 className="my-0 font-weight-normal">Llamadas pendientes</h4>
                      </div>

                      <table id="table" className="table table-striped table-bordered base-style display text-nowrap text-sm">
                        <thead>
                          <tr>
                            <th></th>
                            <th>Nombre</th>
                            <th>Fecha</th>
                            <th>Estado</th>
                            <th>Observacion</th>
                            <th>Accion</th>
                          </tr>
                        </thead>
                        <tbody>
                          {showTable()}
                        </tbody>
                      </table>
                      <div>

                      </div>

                      {/* inicio modal jitsi*/}
                      <div class="modal" tabindex="-1" id="modalJitsi">
                        <div class="modal-dialog modal-fullscreen">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h5 class="modal-title">Llamada de {datamodal.nombre}</h5>
                            </div>
                            <div className="row">
                              <div class="modal-body">
                                <div className="row">
                                  {/* <div className="col-6">
                                    <div className="mb-3">
                                      <label for="recipient-name" className="col-form-label">Nombre: {datamodal.nombre}</label><br />
                                    </div>
                                    <div className="mb-3">
                                      <label for="recipient-name" className="col-form-label">Rut: {datamodal.rut} </label><br />
                                    </div>
                                    <div className="mb-3">
                                      <label for="recipient-name" className="col-form-label">Fecha: {datamodal.fecha}</label><br />
                                    </div>
                                    <div className="mb-3">
                                      <label for="recipient-name" className="col-form-label">Celular: {datamodal.celular}</label><br />
                                    </div>
                                    <div className="mb-3">
                                      <label for="recipient-name" className="col-form-label">Correo: {datamodal.correo}</label><br />
                                    </div>
                                    <div className="mb-3">
                                      <label for="recipient-name" className="col-form-label">Link: {datamodal.Link}</label><br />
                                    </div>
                                    <div className="mb-3">
                                      <label for="recipient-name" className="col-form-label">Observacion: {datamodal.observacion}</label><br />
                                    </div>


                                  </div> */}

                                  <div className="col">
                                    <button type="button" className="btn btn-success" onClick={mostrar}>llamar</button>
                                    {mostrarJitsi !== false && cerrarJitsi !== true && <Jitsi />}
                                  </div>
                                  
                                </div>
                                <div class="modal-footer">
                                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"onClick={cerrar}>Close</button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* fin modal jitsi */}

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