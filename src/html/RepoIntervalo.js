import "../css/styleRepoCarga.css";
import { useState, useEffect } from "react";
import "react-data-grid/lib/styles.css";

import { format } from "date-fns";
import Header from './Componentes/Header';
import SideBar from './Componentes/Sidebar';
import Footer from './Componentes/Footer';
import DatePicker, { registerLocale } from "react-datepicker";
import es from 'date-fns/locale/es'

import "react-datepicker/dist/react-datepicker.css";
import { getMonth, getYear } from "date-fns";
import range from "lodash/range";
import 'bootstrap/dist/css/bootstrap.min.css';
import Company_Campaing from './Componentes/Company_Campaing';
import ReporteIntervaloTabla from './Componentes/ReporteIntervaloTabla'
import ReporteIntervaloTablaDetalle from "./Componentes/ReporteIntervaloTablaDetalle";

registerLocale('es', es)

//con DataTable
const RepoIntervalo = () => {
  const [mostrarGrid, setMostrarGrid] = useState(false);
  const [mostrarGrid2, setMostrarGrid2] = useState(false);

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



  //metodos para editar
  const filtrar = (event) => {

    setMostrarGrid(true);
    setMostrarGrid2(false);


  };

  const filtrar2 = (event) => {


    setMostrarGrid(false);
    setMostrarGrid2(true);


  };


  // const onClick = useCallback(event => {
  //   console.log('Clicked Item : ', event.currentTarget);
  // }, [item]);


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

            <div className="m-xs-0 m-lg-4"> <div className="page-header pt-3">
              <h2 className="page-header col-sm-12 col-lg-3 mt-lg-0 mt-sm-2 text-black">Reporte de Intervalo</h2>
            </div>
              <hr />

              <div className="row">
                <div className="col-12">
                  <div className="row row-cols-1 row-cols-md-2 mb-2 text-center">
                    <div className="col-sm-12 col-md-12 col-lg-8">
                      <div className="card mb-4 rounded-3">
                        <div className="card-body">
                          <div className="row mt-2 align-items-center">
                            <div className="col-sm-12 col-md-3 col-lg-3 mt-lg-0 mt-sm-2">
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
                              /></div>
                            <div className="col-sm-12 col-md-3 col-lg-3 mt-lg-0 mt-sm-2">
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
                              /></div>
                            <div className="col-sm-12 col-md-3 col-lg-3 mt-lg-0 mt-sm-2">

                              {mostrarGrid === false && <button type="button" className="mb-0 btn btn-success" onClick={() => filtrar()}>Buscar</button>}
                              {mostrarGrid === true && <button type="button" className="mb-0 btn btn-success" onClick={() => filtrar2()}>Buscar</button>}

                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              <section className="col-lg-12 col-md-12 col-sm-12 mt-2">
                {/* <TablaFull /> */}
                <div className="mt-2">
                  {mostrarGrid !== false && <ReporteIntervaloTabla flujo={campana} ini={format(startdateini, "yyyyMMdd")} fin={format(startdatefin, "yyyyMMdd")} />}
                  {mostrarGrid !== false && <ReporteIntervaloTablaDetalle flujo={campana} ini={format(startdateini, "yyyyMMdd")} fin={format(startdatefin, "yyyyMMdd")} />}
                  {mostrarGrid2 !== false && <ReporteIntervaloTabla flujo={campana} ini={format(startdateini, "yyyyMMdd")} fin={format(startdatefin, "yyyyMMdd")} />}
                  {mostrarGrid2 !== false && <ReporteIntervaloTablaDetalle flujo={campana} ini={format(startdateini, "yyyyMMdd")} fin={format(startdatefin, "yyyyMMdd")} />}
                </div>

              </section>
            </div>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default RepoIntervalo;
