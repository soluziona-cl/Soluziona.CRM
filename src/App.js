import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import './App.css';
import Dashboard from "./html/Dashboard";
import Login from "./html/Login";
import 'bootstrap/dist/css/bootstrap.min.css';

import RepoAgentes from "./html/RepoAgentes.js";
import DashTrafico from "./html/DashTrafico";
import RepoIntervalo from "./html/RepoIntervalo";
import RepoTelefonicoAcumulado from "./html/RepoTelefonicoAcumulado";
import RepoAutoAtenciones from "./html/RepoAutoAtenciones";
import RepoResumenFlujoLLamada from "./html/RepoResumenFlujoLLamada";
import RepoDetalleFlujoLLamada from "./html/RepoDetalleFlujoLLamada";
import RepoTipificadasAgente from "./html/RepoTipificadasAgente";
import RepoExcel from "./html/RepoExcel";
import SubirArchivos from "./html/subirArchivos";
import RepoResultanteCampana from "./html/RepoResultanteCampana";
import RepoResultanteAcumuladoCampana from "./html/RepoResultanteAcumuladoCampana";
import EditorHTML from "./html/EditorHTML";

import Documentacion from "./html/Documentacion";


function App() {

  // const rutaservidor="/"; //Pruebas
  const rutaservidor = "/Orkesta/CallSouth/LosHeroes/CRM"; //Produccion

  return (
    <Router>
      <Routes>
        <Route index path={rutaservidor} element={<Login />} />
        <Route path={rutaservidor + "/Dashboard"} element={<Dashboard />} />
        <Route path={rutaservidor + "/DashTrafico"} element={<DashTrafico />} />
        <Route path={rutaservidor + "/RepoAgentes"} element={<RepoAgentes />} />
        <Route path={rutaservidor + "/RepoIntervalo"} element={<RepoIntervalo />} />
        <Route path={rutaservidor + "/RepoTelefonicoAcumulado"} element={<RepoTelefonicoAcumulado />} />
        <Route path={rutaservidor + "/RepoAutoAtenciones"} element={<RepoAutoAtenciones />} />
        <Route path={rutaservidor + "/RepoResumenFlujoLLamada"} element={<RepoResumenFlujoLLamada />} />
        <Route path={rutaservidor + "/RepoDetalleFlujoLLamada"} element={<RepoDetalleFlujoLLamada />} />
        <Route path={rutaservidor + "/RepoTipificadasAgente"} element={<RepoTipificadasAgente />} />
        <Route path={rutaservidor + "/RepoExcel"} element={<RepoExcel />} />
        <Route path={rutaservidor + "/SubirArchivos"} element={<SubirArchivos />} />
        <Route path={rutaservidor + "/RepoResultanteCampana"} element={<RepoResultanteCampana />} />
        <Route path={rutaservidor + "/RepoResultanteAcumuladoCampana"} element={<RepoResultanteAcumuladoCampana />} />
        <Route path={rutaservidor + "/EditorHTML"} element={<EditorHTML />} />
        <Route path={rutaservidor + "/Documentacion"} element={<Documentacion />} />
      </Routes>
    </Router>
  );
}

export default App;
