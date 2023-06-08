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

import { getToken, removeUserSession, setUserSession } from './Componentes/Common';

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

registerLocale('es', es)

//con DataTable
const EditorHTML = () => {
  const [mostrarGrid, setMostrarGrid] = useState(false);
  const [text, setText] = useState("");

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



  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      setText(e.target.result);
    };
    reader.readAsText(file);
  };

  const handleSave = () => {
    // Save the file with the same name as the loaded file
    // and overwrite it without prompting
    const blob = new Blob([text], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "filename.html");
    link.click();
  };

  const handleClear = () => {
    setText("");
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
              <h2 className="page-header col-sm-12 col-lg-3 mt-lg-0 mt-sm-2 text-black">Editor HTML</h2>
            </div>
              <hr />
              <div className="row">
                <div className="col-12">
                  <div className="row mt-2 bg-light align-items-center">

                  </div>
                  <section className="col-lg-12 col-sm-8 mt-2">

                    <div className="row col-4">
                      <div className="col-4"><button onClick={handleSave} className="btn btn-success ms-4">Guardar</button></div>
                      <div className="col-4"><button onClick={handleClear} className="btn btn-warning ms-4">Limpiar</button></div>


                    </div>
                    <input type="file" onChange={handleFileChange} />

                    <ReactQuill value={text} onChange={setText} className="mt-4" />



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

export default EditorHTML;
