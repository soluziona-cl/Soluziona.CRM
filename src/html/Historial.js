import React, { useEffect, useState, useRef } from 'react';
import Header from './Componentes/Header';
import Sidebar from './Componentes/Sidebar';
import Footer from './Componentes/Footer';

import "jquery/dist/jquery.min.js";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import "datatables.net-buttons/js/dataTables.buttons.js";
import "datatables.net-buttons/js/buttons.colVis.js";
import "datatables.net-buttons/js/buttons.flash.js";
import "datatables.net-buttons/js/buttons.html5.js";
import "datatables.net-buttons/js/buttons.print.js";
import $, { data } from "jquery";

const Historial = () => {


  useEffect(() => {
    // const token = getToken();

    // axios.post('https://app.soluziona.cl/API_desa/Soluziona.Alertas_2/api/Ventas_CRM/CRM/Session_Check', { user: sesiones.sid_usuario, gui: sesiones.sgui }, { headers: { "Authorization": `Bearer ${sesiones.stoken}` } })
    //   .then(response => {

    //     setUserSession(sesiones.sgui, sesiones.sid_usuario);
    //     setAuthLoading(false);


    //   }).catch(error => {
    //     removeUserSession();
    //     setAuthLoading(false);
    //   });


    //Datos()

    componentDidMount()
  }, []);

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

  // const showTable = () => {

  //   try {
  //     return datashow.map((data, index) => {
  //       return (
  //         <tr key={index + 1}>
  //           <td></td>
  //           <td className="text-xs font-weight-bold">nombre de ejemplo</td>
  //           <td className="text-xs font-weight-bold">fecha de ejemplo</td>
  //           <td><button type="button" onClick={() => MostrarSegunIP(data.id)} class="btn btn-info">ver</button> </td>
  //         </tr>

  //       );
  //     });
  //   } catch (e) {
  //     alert(e.message);
  //   }
  //   // if (alertas != 0) { setAlert(true) }
  // };


  const showTable = () => {



    return (
      <tr>
        <td></td>
        <td className="text-xs font-weight-bold">nombre de ejemplo</td>
        <td className="text-xs font-weight-bold">fecha de ejemplo</td>
        <td className="text-xs font-weight-bold">"(boton)"</td>
      </tr>
    );

    // if (alertas != 0) { setAlert(true) }
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

                  <div className="col-sm-12 col-lg-10">
                    <div className="card mb-4 rounded-3 shadow-sm">
                      <div className="card-header">
                        <h4 className="my-0 font-weight-normal">historial de llamadas</h4>
                      </div>

                      <table id="table" className="table table-striped table-bordered base-style display text-nowrap text-sm">
                        <thead>
                          <tr>
                            <th></th>
                            <th>Nombre</th>
                            <th>Fecha</th>
                            <th>Accion</th>
                          </tr>
                        </thead>
                        <tbody>
                          {showTable()}
                        </tbody>
                      </table>
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


export default Historial;