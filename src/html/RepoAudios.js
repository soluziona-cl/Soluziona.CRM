import "../css/styleRepoCarga.css";
import { useState, useEffect } from "react";
import "react-data-grid/lib/styles.css";
import axios from 'axios';
import { format } from "date-fns";
import Header from './Componentes/Header';
import Sidebar from './Componentes/Sidebar';
import Footer from './Componentes/Footer';
import DatePicker, { registerLocale } from "react-datepicker";
import es from 'date-fns/locale/es'

import "react-datepicker/dist/react-datepicker.css";
import { getMonth, getYear } from "date-fns";
import range from "lodash/range";
import 'bootstrap/dist/css/bootstrap.min.css';
import Company_Campaing from './Componentes/Company_Campaing';
import ReporteGestionTabla from './Componentes/ReporteGestionTabla'
import GestionInacap from "./Componentes/GestionInacap.js"
import GestionUSS from "./Componentes/GestionUSS.js"
import Select from 'react-select'
import RepoAudiosBuscador from "./Componentes/RepoAudiosBuscador";

registerLocale('es', es)

//con DataTable
const RepoAudios = () => {
  const [optionList, setOptionList] = useState([]);
  const [selectLlamada, setSelectedLlamada] = useState('');
  const [mostrarGrid, setMostrarGrid] = useState(false);
  const [mostrarGrabacion, setMostrarGridGrabacion] = useState(false);

  const [mostrarfilter1, setMostrarfilter1] = useState(false);
  const [mostrarfilter2, setMostrarfilter2] = useState(false);
  const [mostrarfilter3, setMostrarfilter3] = useState(false);
  const [mostrarfilter4, setMostrarfilter4] = useState(false);
  const [mostrarfilter5, setMostrarfilter5] = useState(false);
  const [optionListDetalleEstadoSelect, setOptionListDetalleEstadoSelect] = useState('0');

  const [startdateini, setStartDateIni] = useState(new Date());
  const [startdatefin, setStartDateFin] = useState(new Date());
  const [company, setStartCompany] = useState('');
  const [campana, setStartCampana] = useState('');

  const years = range(2022, getYear(new Date()) + 2, 1);
  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  // useEffect(() => {
  //   FullTable()
  //   // IntervaleFullTable()

  // }, []);

  //metodos para editar
  const filtrar = (event) => {

    setMostrarGridGrabacion(true)

    setStartCompany(document.getElementById("ddl_company").value)
    setStartCampana(document.getElementById("ddl_campana").value)

  

  };


  const ChangeConecta = (async (event) => {

    // if (event === '0') {
    //     setOptionListDetalleEstado(true)
    //     setOptionListDetalleEstadoSelect('0')
    //     setSelectedLlamada('0')
    // }
    // else {
    //     const result = await axios.post('https://app.soluziona.cl/API_v1_prod/Procollect/CRM/api/Ventas_CRM/CRM/Campaign', { dato: event }, { headers: { "Authorization": `Bearer ${sesiones.stoken}` } })

    //     setSelectedLlamada(event)

    //     if (result.status === 200) {

    //         setOptionListDetalle(result.data)
    //         setOptionListDetalleEstado(false)

    //     }
    // }


  })


  const handleChange = (selected) => {
    console.log(selected.value);
    console.log(selected.label);

    if (selected.value === '1') {

      setMostrarfilter1(true)
      setMostrarfilter2(false)
      setMostrarfilter3(false)
      setMostrarfilter4(false)
      setMostrarfilter5(false)
    } else if (selected.value === '2') {
      setMostrarfilter1(false)
      setMostrarfilter2(true)
      setMostrarfilter3(false)
      setMostrarfilter4(false)
      setMostrarfilter5(false)
    } else if (selected.value === '3') {
      setMostrarfilter1(false)
      setMostrarfilter2(false)
      setMostrarfilter3(true)
      setMostrarfilter4(false)
      setMostrarfilter5(false)
    } else if (selected.value === '4') {
      setMostrarfilter1(false)
      setMostrarfilter2(false)
      setMostrarfilter3(false)
      setMostrarfilter4(true)
      setMostrarfilter5(false)
    } else if (selected.value === '5') {
      setMostrarfilter1(false)
      setMostrarfilter2(false)
      setMostrarfilter3(false)
      setMostrarfilter4(false)
      setMostrarfilter5(true)
    } else {

      setMostrarfilter1(false)
      setMostrarfilter2(false)
      setMostrarfilter3(false)
      setMostrarfilter4(false)
      setMostrarfilter5(false)
    }


    console.log(mostrarfilter1)
    console.log(mostrarfilter2)
    console.log(mostrarfilter3)
    console.log(mostrarfilter4)
    console.log(mostrarfilter5)
  };

  const options = [
    { value: '1', label: 'ID' },
    { value: '2', label: 'Fono' },
    { value: '3', label: 'Agente' },
    { value: '4', label: 'Fecha' },
    { value: '5', label: 'Rut' }
  ]
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

            <div className="m-xs-0 m-lg-4"> <div className="page-header pt-3">
              <h2 className="page-header col-sm-12 col-lg-3 mt-lg-0 mt-sm-2 text-black">Grabaciones</h2>
            </div>
              <hr />
              <div className="row">
                <div className="col-12">
                  <Company_Campaing />

                  <div className="row mt-2 bg-light align-items-center mt-4">
                    <div className="page-header col-sm-12 col-lg-2 mt-lg-0 mt-sm-2">
                      <h3>Tipo Busqueda</h3>
                    </div>
                    <div className="col-sm-12 col-lg-1 mt-lg-0 mt-sm-2">
                      <Select options={options}
                        onChange={handleChange}
                      />
                    </div>
                    {mostrarfilter1 !== false && <div className="col-sm-12 col-lg-1 mt-lg-0 mt-sm-2">  <input id="search_id" className="form-control" placeholder="ID"></input></div>}
                    {mostrarfilter2 !== false && <div className="col-sm-12 col-lg-1 mt-lg-0 mt-sm-2">  <input id="search_fono" className="form-control" placeholder="9 digitos"></input></div>}
                    {mostrarfilter3 !== false && <div className="col-sm-12 col-lg-1 mt-lg-0 mt-sm-2">
                      <DatePicker
                        id="ini"
                        locale='es'
                        className="form-control rounded-md text-center h-10 hover:bg-gray-200 hover:border-blue-700 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700"
                        //  customInput={<ExampleCustomInput />}
                        renderCustomHeader={({
                          date,
                          changeYear,
                          changeMonth,
                          decreaseMonth,
                          increaseMonth,
                          prevMonthButtonDisabled,
                          nextMonthButtonDisabled,
                        }) => (
                          <div
                            style={{
                              margin: 10,
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <button
                              onClick={decreaseMonth}
                              disabled={prevMonthButtonDisabled}
                            >
                              {"<"}
                            </button>
                            <select
                              value={getYear(date)}
                              onChange={({ target: { value } }) => changeYear(value)}
                            >
                              {years.map((option) => (
                                <option key={option} value={option}>
                                  {option}
                                </option>
                              ))}
                            </select>

                            <select
                              value={months[getMonth(date)]}
                              onChange={({ target: { value } }) =>
                                changeMonth(months.indexOf(value))
                              }
                            >
                              {months.map((option) => (
                                <option key={option} value={option}>
                                  {option}
                                </option>
                              ))}
                            </select>

                            <button
                              onClick={increaseMonth}
                              disabled={nextMonthButtonDisabled}
                            >
                              {">"}
                            </button>
                          </div>
                        )}
                        selected={startdateini}
                        dateFormat="dd/MM/yyyy"
                        maxDate={new Date()}
                        onChange={(date) => {
                          setStartDateIni(date);

                        }}
                      />
                    </div>
                    }
                    {mostrarfilter3 !== false && <div className="col-sm-12 col-lg-1 mt-lg-0 mt-sm-2">
                      <DatePicker
                        id="fin"
                        locale='es'
                        className="form-control rounded-md text-center h-10 hover:bg-gray-200 hover:border-blue-700 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700"
                        //  customInput={<ExampleCustomInput />}
                        renderCustomHeader={({
                          date,
                          changeYear,
                          changeMonth,
                          decreaseMonth,
                          increaseMonth,
                          prevMonthButtonDisabled,
                          nextMonthButtonDisabled,
                        }) => (
                          <div
                            style={{
                              margin: 10,
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <button
                              onClick={decreaseMonth}
                              disabled={prevMonthButtonDisabled}
                            >
                              {"<"}
                            </button>
                            <select
                              value={getYear(date)}
                              onChange={({ target: { value } }) => changeYear(value)}
                            >
                              {years.map((option) => (
                                <option key={option} value={option}>
                                  {option}
                                </option>
                              ))}
                            </select>

                            <select
                              value={months[getMonth(date)]}
                              onChange={({ target: { value } }) =>
                                changeMonth(months.indexOf(value))
                              }
                            >
                              {months.map((option) => (
                                <option key={option} value={option}>
                                  {option}
                                </option>
                              ))}
                            </select>

                            <button
                              onClick={increaseMonth}
                              disabled={nextMonthButtonDisabled}
                            >
                              {">"}
                            </button>
                          </div>
                        )}
                        selected={startdatefin}
                        dateFormat="dd/MM/yyyy"
                        maxDate={new Date()}
                        onChange={(date) => {
                          setStartDateFin(date);

                        }}
                      />
                    </div>
                    }
                    {mostrarfilter3 !== false && <div className="col-sm-12 col-lg-1 mt-lg-0 mt-sm-2">
                      <select className="form-control form-select" id="ddl_agente"
                        disabled={false}
                        // value={select}
                        onChange={(e) => (ChangeConecta(e.target.value))}>
                        <option value="0">Seleccione</option>
                        {optionList.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.detalle}
                          </option>
                        ))}
                      </select>
                    </div>
                    }
                    {mostrarfilter4 !== false && <div className="col-sm-12 col-lg-1 mt-lg-0 mt-sm-2">
                      <DatePicker
                        id="ini"
                        locale='es'
                        className="form-control rounded-md text-center h-10 hover:bg-gray-200 hover:border-blue-700 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700"
                        //  customInput={<ExampleCustomInput />}
                        renderCustomHeader={({
                          date,
                          changeYear,
                          changeMonth,
                          decreaseMonth,
                          increaseMonth,
                          prevMonthButtonDisabled,
                          nextMonthButtonDisabled,
                        }) => (
                          <div
                            style={{
                              margin: 10,
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <button
                              onClick={decreaseMonth}
                              disabled={prevMonthButtonDisabled}
                            >
                              {"<"}
                            </button>
                            <select
                              value={getYear(date)}
                              onChange={({ target: { value } }) => changeYear(value)}
                            >
                              {years.map((option) => (
                                <option key={option} value={option}>
                                  {option}
                                </option>
                              ))}
                            </select>

                            <select
                              value={months[getMonth(date)]}
                              onChange={({ target: { value } }) =>
                                changeMonth(months.indexOf(value))
                              }
                            >
                              {months.map((option) => (
                                <option key={option} value={option}>
                                  {option}
                                </option>
                              ))}
                            </select>

                            <button
                              onClick={increaseMonth}
                              disabled={nextMonthButtonDisabled}
                            >
                              {">"}
                            </button>
                          </div>
                        )}
                        selected={startdateini}
                        dateFormat="dd/MM/yyyy"
                        maxDate={new Date()}
                        onChange={(date) => {
                          setStartDateIni(date);

                        }}
                      />
                    </div>
                    }
                    {mostrarfilter4 !== false && <div className="col-sm-12 col-lg-1 mt-lg-0 mt-sm-2">
                      <DatePicker
                        id="fin"
                        locale='es'
                        className="form-control rounded-md text-center h-10 hover:bg-gray-200 hover:border-blue-700 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700"
                        //  customInput={<ExampleCustomInput />}
                        renderCustomHeader={({
                          date,
                          changeYear,
                          changeMonth,
                          decreaseMonth,
                          increaseMonth,
                          prevMonthButtonDisabled,
                          nextMonthButtonDisabled,
                        }) => (
                          <div
                            style={{
                              margin: 10,
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <button
                              onClick={decreaseMonth}
                              disabled={prevMonthButtonDisabled}
                            >
                              {"<"}
                            </button>
                            <select
                              value={getYear(date)}
                              onChange={({ target: { value } }) => changeYear(value)}
                            >
                              {years.map((option) => (
                                <option key={option} value={option}>
                                  {option}
                                </option>
                              ))}
                            </select>

                            <select
                              value={months[getMonth(date)]}
                              onChange={({ target: { value } }) =>
                                changeMonth(months.indexOf(value))
                              }
                            >
                              {months.map((option) => (
                                <option key={option} value={option}>
                                  {option}
                                </option>
                              ))}
                            </select>

                            <button
                              onClick={increaseMonth}
                              disabled={nextMonthButtonDisabled}
                            >
                              {">"}
                            </button>
                          </div>
                        )}
                        selected={startdatefin}
                        dateFormat="dd/MM/yyyy"
                        maxDate={new Date()}
                        onChange={(date) => {
                          setStartDateFin(date);

                        }}
                      />
                    </div>
                    }
                    {mostrarfilter5 !== false && <div className="col-sm-12 col-lg-1 mt-lg-0 mt-sm-2">  <input id="search_rut" className="form-control" placeholder="Rut sin DV"></input></div>}
                    <div className="col-sm-12 col-lg-3 mt-lg-0 mt-sm-2">
                      <button
                        className="mb-0 btn btn-success"
                        onClick={filtrar}
                      >Buscar
                      </button>
                    </div>
                  </div>
                  <section className="mt-2">
                    {/* <TablaFull /> */}
                    {/* {mostrarGrid !== false && <ReporteGestionTabla flujo={company} campana={campana} ini={format(startdateini, "yyyyMMdd")} fin={format(startdatefin, "yyyyMMdd")} />} */}
                    {mostrarGrabacion !== false && <RepoAudiosBuscador grab_flujo={company} grab_lead_id={company}  grab_rut={company}  grab_ini={format(startdateini, "yyyyMMdd")}  grab_fin={format(startdatefin, "yyyyMMdd")} grab_agente={company} grab_company={company}  />}
               
                  </section>

                </div>
              </div>
            </div>


          </main>

        </div>
        <Footer />
      </div>



    </>
  );
};

export default RepoAudios;
