import "../css/styleRepoCarga.css";
import { useState, useEffect } from "react";
import "react-data-grid/lib/styles.css";
import axios from "axios";
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
import Company_Campaing_600 from "./Componentes/Company_Campaing_600";
import ReporteResumenFlujoLlamadaTabla from "./Componentes/ReporteResumenFlujoLlamadaTabla";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

registerLocale('es', es)

//con DataTable
const OcrResultados = () => {
    const [datafull, setData] = useState([]);
    const [dataList, setDataList] = useState([]);
    const [mostrarGrid, setMostrarGrid] = useState(false);
    const [mostrarGrid2, setMostrarGrid2] = useState(false);

    const [startdateini, setStartDateIni] = useState(new Date());
    const [startdatefin, setStartDateFin] = useState(new Date());
    const [company, setStartCompany] = useState('');
    const [campana, setStartCampana] = useState('');
    const [flujo, setFlujo] = useState('');
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.post('https://app.soluziona.cl/API_v1_prod/Soluziona/OCRBonos/api/OCR/QA/OCR/Informacion/JsonProcesados', { dato: "" }, { headers: { "Authorization": `Bearer ${""}` } });

                if (result.status === 200) {
                    console.log(result.data);
                    const newData = result.data.map(item => {
                        const detalleObject = JSON.parse(item.detalle);
                        return {
                            ...item,
                            NumeroDenuncio: detalleObject.dato.NumeroDenuncio,
                            NumDocumentos: detalleObject.dato.NumDocumentos,
                            DocBase64: detalleObject.dato.DocBase64,
                            NumItem: detalleObject.dato.ListaDocumentos[0].NumItem,
                            EstadoDocumento: detalleObject.dato.ListaDocumentos[0].EstadoDocumento,
                            NombreFisicoDoc: detalleObject.dato.ListaDocumentos[0].NombreFisicoDoc,
                            NombreDocumento: detalleObject.dato.ListaDocumentos[0].NombreDocumento,
                            FolioDocumento: detalleObject.dato.ListaDocumentos[0].FolioDocumento,
                            PrestadorRut: detalleObject.dato.ListaDocumentos[0].PrestadorRut,
                            PrestadorNombre: detalleObject.dato.ListaDocumentos[0].PrestadorNombre,
                            FechaDoc: detalleObject.dato.ListaDocumentos[0].FechaDoc,
                            RutTitular: detalleObject.dato.ListaDocumentos[0].RutTitular,
                            RutBeneficiario: detalleObject.dato.ListaDocumentos[0].RutBeneficiario,
                            Prevision: detalleObject.dato.ListaDocumentos[0].Prevision,
                            CorrelativoPrestacion: detalleObject.dato.ListaDocumentos[0].ListaPrestacionesDocJson[0].CorrelativoPrestacion,
                            CodPrestacion: detalleObject.dato.ListaDocumentos[0].ListaPrestacionesDocJson[0].CodPrestacion,
                            NombrePrestacion: detalleObject.dato.ListaDocumentos[0].ListaPrestacionesDocJson[0].NombrePrestacion,
                            CantPrestacion: detalleObject.dato.ListaDocumentos[0].ListaPrestacionesDocJson[0].CantPrestacion,
                            ValorPrestacion: detalleObject.dato.ListaDocumentos[0].ListaPrestacionesDocJson[0].ValorPrestacion,
                            ValorIsapre: detalleObject.dato.ListaDocumentos[0].ListaPrestacionesDocJson[0].ValorIsapre,
                            ValorSegCom: detalleObject.dato.ListaDocumentos[0].ListaPrestacionesDocJson[0].ValorSegCom,
                            ValorCopago: detalleObject.dato.ListaDocumentos[0].ListaPrestacionesDocJson[0].ValorCopago,
                        };
                    });
                    setData(newData);
                }
            } catch (error) {
                console.error("Error al tarer la data", error);
                toast.error("Error al tarer la data");
            }
        };

        fetchData(); // Call the fetch function directly

    }, []);


    const filtrar3 = (event) => {

        setStartCampana(document.getElementById("ddl_campana").value)
        if (document.getElementById("ddl_campana").value == '0') {
            toast.error("Por favor seleccionar Campaña");
            // console.log(campana)
        } else {
            (event === '1') ? filtrar() : filtrar2()
        }
    };

    //metodos para editar
    const filtrar = (event) => {

        setStartCompany(document.getElementById("ddl_company").value)
        setStartCampana(document.getElementById("ddl_campana").value)
        setMostrarGrid(true);
        setMostrarGrid2(false);
        setFlujo(document.getElementById("ddl_campana").options[document.getElementById("ddl_campana").selectedIndex].text)
    };

    const filtrar2 = (event) => {

        setStartCompany(document.getElementById("ddl_company").value)
        setStartCampana(document.getElementById("ddl_campana").value)
        setMostrarGrid(false);
        setMostrarGrid2(true);

        setFlujo(document.getElementById("ddl_campana").options[document.getElementById("ddl_campana").selectedIndex].text)

    };
    

    // const Datos = (async () => {

    //     const result = await axios.post('https://app.soluziona.cl/API_v1_prod/Soluziona/OCRBonos/api/OCR/QA/OCR/Informacion/JsonProcesados', { dato: "" }, { headers: { "Authorization": `Bearer ${""}` } })

    //     if (result.status === 200) {

    //         console.log(result.data)
    //         setData(result.data);
    //         datoMap(datafull)
    //     }

    // })


    // const datoMap = (datafull) => {
    //     console.log("empece");
    //     datafull.forEach((item) => {
    //       const detalleString = item.detalle;
    //       const detalleObject = JSON.parse(detalleString);
      
    //       // Add the parsed properties to the item
    //       item.NumeroDenuncio = detalleObject.dato.NumeroDenuncio;
    //       item.NumDocumentos = detalleObject.dato.NumDocumentos;
    //       item.NombreDocumento = detalleObject.dato.ListaDocumentos[0].NombreDocumento;
    //       item.NombrePrestacion = detalleObject.dato.ListaDocumentos[0].ListaPrestacionesDocJson[0].NombrePrestacion;
    //     });
    //   };


    return (
        <>
            <ToastContainer />
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
                            <h2 className="page-header col-sm-12 col-lg-3 mt-lg-0 mt-sm-2 text-black">Ocr Resultados</h2>
                        </div>
                            <hr />



                            
          <section className="col-lg-12 col-md-12 col-sm-12 mt-2">
            <div className="mt-2 mb-2">
              <section className="float-end"></section>
              <div className="mt-5">
                <table className="table">
                  <thead>
                    <tr>
                      {/* ... existing headers ... */}
                      <th> Numero Denuncio </th>
                      <th> Num Documentos </th>
                      <th> Doc Base 64 </th>
                      <th> Num Item </th>
                      <th> Estado Documento </th>
                      <th> Nombre Fisico Doc </th>
                      <th> Nombre Documento </th>
                      <th> Folio Documento </th>
                      <th> Prestador Rut </th>
                      <th> Prestador Nombre </th>
                      <th> Fecha Doc </th>
                      <th> Rut Titular </th>
                      <th>data.RutBeneficiario</th>
                        <th>data.Prevision</th>
                        <th>CorrelativoPrestacion</th>
                        <th>CodPrestacion</th>
                        <th>NombrePrestacion</th>
                        <th>CantPrestacion</th>
                        <th>ValorPrestacion</th>
                        <th>ValorIsapre</th>
                        <th>ValorSegCom</th>
                        <th>ValorCopago</th>
                    </tr>
                  </thead>
                  <tbody>
                    {datafull.map((data, index) => (
                      <tr key={index}>
                        {/* ... existing data ... */}
                        <td>{data.NumeroDenuncio}</td>
                        <td>{data.NumDocumentos}</td>
                        <td>{data.DocBase64}</td>


                        <td>{data.NumItem}</td>
                        <td>{data.EstadoDocumento}</td>
                        <td>{data.NombreFisicoDoc}</td>
                        <td>{data.NombreDocumento}</td>
                        <td>{data.FolioDocumento}</td>
                        <td>{data.PrestadorRut}</td>
                        <td>{data.PrestadorNombre}</td>
                        <td>{data.FechaDoc}</td>
                        <td>{data.RutTitular}</td>
                        <td>{data.RutBeneficiario}</td>


                        
                        <td>{data.Prevision}</td>
                        <td>{data.CorrelativoPrestacion}</td>
                        <td>{data.CodPrestacion}</td>
                        <td>{data.NombrePrestacion}</td>
                        <td>{data.CantPrestacion}</td>
                        <td>{data.ValorPrestacion}</td>
                        <td>{data.ValorIsapre}</td>
                        <td>{data.ValorSegCom}</td>
                        <td>{data.ValorCopago}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
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

export default OcrResultados;