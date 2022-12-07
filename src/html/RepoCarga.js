import "../css/styleRepoCarga.css";

import { useState, useEffect } from "react";

import "react-data-grid/lib/styles.css";
import axios from "axios";

//importando de DataTablr
import DataTable from "react-data-table-component";
//importando libreria para exportar excel
import * as XLSX from "xlsx";
import { format } from "date-fns";

import Header from './Componentes/Header';
import SideBar from './Componentes/Sidebar';
import Footer from './Componentes/Footer';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getMonth, getYear } from "date-fns";
import range from "lodash/range";

//con DataTable
const RepoCarga = () => {
  const [mostrarGrid, setMostrarGrid] = useState(false);

  const [startdateini, setStartDateIni] = useState(new Date());
  const [startdatefin, setStartDateFin] = useState(new Date());

  const [datafull, setDataFull] = useState([]);
  const [datafullIntervalo, setDataFullIntervalo] = useState([]);

  
  function secondsToString(seconds) {
    var hour = Math.floor(seconds / 3600);
    hour = hour < 10 ? "0" + hour : hour;
    var minute = Math.floor((seconds / 60) % 60);
    minute = minute < 10 ? "0" + minute : minute;
    var second = seconds % 60;
    second = second < 10 ? "0" + second : second;
    return hour + ":" + minute + ":" + second;
  }

  const years = range(2022, getYear(new Date()) + 1, 1);
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
    // setUsuario(event.target.value);
    FullTable(startdateini, startdatefin);
    FullTableIntervalo(startdateini, startdatefin);
    setMostrarGrid(true);
    TablaFull();
    TablaTraficoIntervalo();
  };

  const FullTable = async (startdateini, startdatefin) => {
    const result = await axios.post(
      "https://app.soluziona.cl/API_desa/Soluziona.Dashboard.Salcobrand/api/Contact_CRM/CRM/Trafico/Inbound/Full/Fechas",
      {
        dato: format(startdateini, "yyyyMMdd"),
        dato_1: format(startdatefin, "yyyyMMdd"),
      }
    );
    setDataFull(result.data);
  };

  const FullTableIntervalo = (async (startdateini, startdatefin) => {
    const result = await axios.post("https://app.soluziona.cl/API_desa/Soluziona.Dashboard.Salcobrand/api/Contact_CRM/CRM/Trafico/Inbound/Intervalo/Fechas", { dato: format(startdateini, "yyyyMMdd"), dato_1: format(startdatefin, "yyyyMMdd") })
    setDataFullIntervalo(result.data);

  })
  // const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
  //   <button className="example-custom-input" onClick={onClick} ref={ref}>
  //     {value}
  //   </button>
  // ));

  // const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
  //   <button className="example-custom-input" onClick={onClick} ref={ref}>
  //     {value}
  //   </button>
  // ));

  const handleOnExportFull = () => {
   
    //creates a new workbook
    let wb = XLSX.utils.book_new();

    var arr2 = datafull.map((v) => ({
      fecha: v.fecha,
      recibidas: v.recibidas,
      contestadas: v.contestadas,
      abandonadas: v.abandonadas,
      natencion: v.natencion,
      nservicio: v.nservicio,
      nabandono: 100 - v.natencion,
      tmo: secondsToString(parseInt(v.tmo)),
    }));

    //this function converts the json into a sheet
    //const ws = XLSX.utils.aoa_to_sheet(sheetData);
    let ws = XLSX.utils.json_to_sheet(arr2);
    var today = new Date();
    let date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();

    XLSX.utils.book_append_sheet(wb, ws, "Intervalo");

    XLSX.writeFile(wb, "Gestion_intervalo_" + date + ".xlsx");
  };

  const handleOnExportIntervalo = () => {
    
    //creates a new workbook
    let wb = XLSX.utils.book_new();

    var arr2 = datafullIntervalo.map(v => ({
      intervalo: v.intervalo,
      recibidas: v.recibidas,
      contestadas: v.contestadas,
      abandonadas: v.abandonadas,
      natencion: v.natencion,
      nservicio: v.nservicio,
      nabandono: 100 - v.natencion,
      tmo: secondsToString(parseInt(v.tmo))
    }));


    //this function converts the json into a sheet
    //const ws = XLSX.utils.aoa_to_sheet(sheetData);
    let ws = XLSX.utils.json_to_sheet(arr2);
    var today = new Date()
    let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()

    XLSX.utils.book_append_sheet(wb, ws, "Intervalo");

    XLSX.writeFile(wb, "Gestion_intervalo_" + date + ".xlsx");
  };


  const TablaFull = () => {
    return (
      <>
        <section className="flex flex-row ">
          <button
            onClick={handleOnExportFull}
            className="inline-flex items-center py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-md border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700"
          >
            <i className="fa-solid fa-file-excel mr-2"></i>Exportar
          </button>
        </section>
        <div className="container mt-2">
          <div className=" overflow-y-scroll max-h-fit">
            <table className="w-full text-sm text-left text-gray-500 ">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                <tr>
                  <th scope="col" className="py-3 px-6">
                    Fecha
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Recibido
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Contestado
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Abandonado
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Nivel de Atención
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Nivel de Servicio
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Nivel de Abandono
                  </th>

                  <th scope="col" className="py-3 px-6">
                    TMO
                  </th>
                </tr>
              </thead>
              <tbody>
                {datafull.map((data, index) => (
                  <tr
                    key={index}
                    className="bg-white border-b"
                  >
                    <td
                      scope="row"
                      className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap "
                    >
                      {data.fecha}
                    </td>
                    <td className="py-4 px-6">{data.recibidas}</td>
                    <td className="py-4 px-6">{data.contestadas}</td>
                    <td className="py-4 px-6">{data.abandonadas}</td>
                    <td className="py-4 px-6">-</td>
                    <td className="py-4 px-6">
                      {data.contestadas / data.recibidas}
                    </td>
                    <td className="py-4 px-6">
                      {data.abandonadas / data.contestadas}
                    </td>
                    <td className="py-4 px-6">
                      {secondsToString(parseInt(data.tmo))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  };

  const TablaTraficoIntervalo = () => {

    return (

      <>
        <section className="flex flex-row ">

          <button
            onClick={handleOnExportIntervalo}
            className="inline-flex items-center py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-md border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700">
            <i className="fa-solid fa-file-excel mr-2"></i>Exportar
          </button>
        </section><div className="container mt-2">
          <div className="overflow-y-scroll ">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="py-3 px-6">
                    Intervalo
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Recibido
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Contestado
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Abandonado
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Nivel de Atención
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Nivel de Servicio
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Nivel de Abandono
                  </th>

                  <th scope="col" className="py-3 px-6">
                    TMO
                  </th>
                </tr>
              </thead>
              <tbody>
                {datafullIntervalo.map((data, index) => (
                  <tr key={index} className="bg-white border-b">
                    <td scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">{data.intervalo}</td>
                    <td className="py-4 px-6">{data.recibidas}</td>
                    <td className="py-4 px-6">{data.contestadas}</td>
                    <td className="py-4 px-6">{data.abandonadas}</td>
                    <td className="py-4 px-6">-</td>
                    <td className="py-4 px-6">{data.contestadas / data.recibidas}</td>
                    <td className="py-4 px-6">{data.abandonadas / data.contestadas}</td>
                    <td className="py-4 px-6">{secondsToString(parseInt(data.tmo))}</td>
                  </tr>
                ))}

              </tbody>
            </table>
          </div>

        </div>
      </>
    )

  }
  return (
    <>
      <div className="h-full">
        <Header />
        <div className="flex flex-row">
          <SideBar />
          <section className="w-screen flex flex-col items-center m-8">
            <section className=" justify-start">
              <div className="flex flex-row justify-start">
                <div className="flex flex-col justify-start items-center mr-20">
                  <p> Fecha Inicio:</p>

                  <DatePicker
                    className=" rounded-md text-center h-10 hover:bg-gray-200 hover:border-blue-700 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700"
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
                    onChange={(date) => {
                      setStartDateIni(date);
                      setMostrarGrid(date);
                    }}
                  />
                </div>
                <div className="flex flex-col justify-start items-center mr-10">
                  <p>Fecha Termino:</p>
                  <DatePicker
                    id="fin"
                    dateFormat="dd/MM/yyyy"
                    // customInput={<ExampleCustomInput />}
                    selected={startdatefin}
                    onChange={(date) => {
                      setStartDateFin(date);
                      setMostrarGrid(date);
                    }}
                    className=" rounded-md text-center h-10 hover:bg-gray-200 hover:border-blue-700 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700"
                  />
                </div>
                {/* Fecha Inicio:<DatePicker id="ini"  />
                Fecha Termino:<DatePicker id="fin" /> */}
                <div className="flex flex-col justify-end items-end">
                  <button
                    type="button"
                    className=" h-10 inline-flex items-center py-2 px-4 text-sm font-medium text-white bg-slate-400 rounded-md border border-gray-200 hover:bg-gray-100 hover:border-blue-700 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 "
                    value="Buscar"
                    onClick={filtrar}
                  >
                    Buscar
                  </button>
                </div>
              </div>
            </section>
            <section className="w-fit flex flex-col justify-center items-end mt-2">
              {/* <TablaFull /> */}
              {mostrarGrid !== false && <TablaFull />}
            </section>
            <section className="w-fit  flex flex-col justify-center items-end mt-2">
              {mostrarGrid !== false && <TablaTraficoIntervalo />}
            </section>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RepoCarga;
