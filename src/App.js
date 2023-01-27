import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import './App.css';
import Dashboard from "./html/Dashboard";
import Login from "./html/Login";
import 'bootstrap/dist/css/bootstrap.min.css';

import RepoIntervalo from "./html/RepoIntervalo";
import RepoTelefonicoAcumulado from "./html/RepoTelefonicoAcumulado";
import RepoResumenFlujoLLamada from "./html/RepoResumenFlujoLLamada";
import RepoTipificadasAgente from "./html/RepoTipificadasAgente";
import RepoExcel from "./html/RepoExcel";
import Historial from "./html/Historial";


function App() {

    // const rutaservidor="/"; //Pruebas
    const rutaservidor = "/Orkesta/CallSouth/LosHeroes/CRM"; //Produccion

  return (
    <Router>
        <Routes>
        <Route index path={rutaservidor} element={<Login />} />
        <Route path={rutaservidor + "/Dashboard"} element={<Dashboard />} />
        <Route path={rutaservidor + "/Historial"} element={<Historial />} />
        <Route path={rutaservidor + "/RepoIntervalo"} element={<RepoIntervalo />} />
        <Route path={rutaservidor + "/RepoTelefonicoAcumulado"} element={<RepoTelefonicoAcumulado />} />
        <Route path={rutaservidor + "/RepoResumenFlujoLLamada"} element={<RepoResumenFlujoLLamada />} />
        <Route path={rutaservidor + "/RepoTipificadasAgente"} element={<RepoTipificadasAgente />} />
        <Route path={rutaservidor + "/RepoExcel"} element={<RepoExcel />} />
        </Routes>
    </Router>  
  );
}

export default App;
