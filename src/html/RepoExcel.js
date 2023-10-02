import "../css/styleRepoCarga.css";
import { useState, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';
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
import ReporteTipificadasAgenteTabla from './Componentes/ReporteTipificadasAgenteTabla'

import { getToken, removeUserSession, setUserSession } from '../html/Componentes/Common';


registerLocale('es', es)

//con DataTable
const RepoExcel = () => {
  const [mostrarGrid, setMostrarGrid] = useState(false);

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

  const [authLoading, setAuthLoading] = useState(true);
  const navigate = useNavigate();

  const sesiones = {
    sgui: localStorage.getItem("localgui"),
    scliente: localStorage.getItem("localcliente"),
    sid: localStorage.getItem("localid"),
    sid_usuario: localStorage.getItem("localid_usuario"),
    stoken: localStorage.getItem("token")
  };

  // useEffect(() => {
  //   FullTable()
  //   // IntervaleFullTable()

  // }, []);

  //metodos para editar

  useEffect(() => {
    const token = getToken();
    const rutaservidor = "/Orkesta/CallSouth/LosHeroes/CRM"
    if (!token) {

      // console.log('Vacio')
      navigate(rutaservidor);
      return;

    }
    setAuthLoading(false);


  }, []);

  const filtrar = (event) => {

    setStartCompany(document.getElementById("ddl_company").value)
    setStartCampana(document.getElementById("ddl_campana").value)
    setMostrarGrid(true);

  };


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
              <h2 className="page-header col-sm-12 col-lg-3 mt-lg-0 mt-sm-2 text-black">Reporte Excel</h2>
            </div>
              <hr />
              <div className="row">
                <div className="col-12">
                  <div className="row mt-2 bg-light align-items-center">

                  </div>
                  <section className="col-lg-12 col-sm-8 mt-2">

                    <table className="table">
                      <thead>
                        <tr>
                          <td>Mes</td>
                          <td>Archivo</td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Enero</td>
                          <td> <Link to="/Orkesta/CallSouth/LosHeroes/CRM/Reportes_Enero.xlsx" target="_blank" download><i className='fa-solid fa-file m-lg-2'></i>Archivo Reportes Enero</Link></td>
                        </tr>
                        <tr>
                          <td>Febrero</td>
                          <td> <Link to="/Orkesta/CallSouth/LosHeroes/CRM/Reportes_Febrero.xlsx" target="_blank" download><i className='fa-solid fa-file m-lg-2'></i>Archivo Reportes Febrero</Link></td>
                        </tr>
                        <tr>
                          <td>Marzo</td>
                          <td> <Link to="/Orkesta/CallSouth/LosHeroes/CRM/Reportes_Marzo.xlsx" target="_blank" download><i className='fa-solid fa-file m-lg-2'></i>Archivo Reportes Marzo</Link></td>
                        </tr>
                        <tr>
                          <td>Abril</td>
                          <td> <Link to="/Orkesta/CallSouth/LosHeroes/CRM/Reportes_Abril.xlsx" target="_blank" download><i className='fa-solid fa-file m-lg-2'></i>Archivo Reportes Abril</Link></td>
                        </tr>
                        <tr>
                          <td>Mayo</td>
                          <td> <Link to="/Orkesta/CallSouth/LosHeroes/CRM/Reportes_Mayo.xlsx" target="_blank" download><i className='fa-solid fa-file m-lg-2'></i>Archivo Reportes Mayo</Link></td>
                        </tr>
                        <tr>
                          <td>Junio</td>
                          <td> <Link to="/Orkesta/CallSouth/LosHeroes/CRM/Reportes_Junio.xlsx" target="_blank" download><i className='fa-solid fa-file m-lg-2'></i>Archivo Reportes Junio</Link></td>
                        </tr>
                        <tr>
                          <td>Julio</td>
                          <td> <Link to="/Orkesta/CallSouth/LosHeroes/CRM/Reportes_Julio.xlsx" target="_blank" download><i className='fa-solid fa-file m-lg-2'></i>Archivo Reportes Julio</Link></td>
                        </tr>
                        <tr>
                          <td>Agosto</td>
                          <td> <Link to="/Orkesta/CallSouth/LosHeroes/CRM/Reportes_Agosto.xlsx" target="_blank" download><i className='fa-solid fa-file m-lg-2'></i>Archivo Reportes Agosto</Link></td>
                        </tr>
                        <tr>
                          <td>Septiembre</td>
                          <td> <Link to="/Orkesta/CallSouth/LosHeroes/CRM/Reportes_Septiembre.xlsx" target="_blank" download><i className='fa-solid fa-file m-lg-2'></i>Archivo Reportes Septiembre</Link></td>
                        </tr>
                        <tr>
                          <td>Octubre</td>
                          <td> <Link to="/Orkesta/CallSouth/LosHeroes/CRM/Reportes_Octubre.xlsx" target="_blank" download><i className='fa-solid fa-file m-lg-2'></i>Archivo Reportes Octubre</Link></td>
                        </tr>
                      </tbody>
                    </table>

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

export default RepoExcel;
