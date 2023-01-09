import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import './App.css';
import Dashboard from "./html/Dashboard";
import Login from "./html/Login";
import 'bootstrap/dist/css/bootstrap.min.css';
import SubirArchivos from "./html/subirArchivos";
import ListarCargas from "./html/AdminCargas";
import RepoCarga from "./html/RepoCarga.js";
import RepoAgentes from "./html/RepoAgentes.js";
import RepoGestion from "./html/RepoGestion";
import RepoCalidad from "./html/RepoCalidad";
import RepoAudios from "./html/RepoAudios";
// import AdminCargas2 from "./html/AdminCargas2";

function App() {

    // const rutaservidor="/"; //Pruebas
    const rutaservidor = "/Orkesta/Procollect/CRM"; //Produccion

  return (
    <Router>
        <Routes>
        <Route index path={rutaservidor} element={<Login />} />
        {/* <Route path={rutaservidor + "/login"} element={<Login />} /> */}
        <Route path={rutaservidor + "/Dashboard"} element={<Dashboard />} />
        <Route path={rutaservidor + "/SubirArchivos"} element={<SubirArchivos />} />
        <Route path={rutaservidor + "/AdminCargas"} element={<ListarCargas />} />
        <Route path={rutaservidor + "/RepoCarga"} element={<RepoCarga />} />
        <Route path={rutaservidor + "/RepoGestion"} element={<RepoGestion />} />
        <Route path={rutaservidor + "/RepoAgentes"} element={<RepoAgentes />} />
        <Route path={rutaservidor + "/RepoCalidad"} element={<RepoCalidad />} />
        <Route path={rutaservidor + "/AdminCargas"} element={<ListarCargas />} />
        <Route path={rutaservidor + "/RepoAudios"} element={<RepoAudios />} />
        {/* <Route path={rutaservidor + "/AdminCargas2"} element={<AdminCargas2 />} /> */}
        {/* <Route path="/" element={<Login />} /> */}
          {/* <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/ImportarArchivo" element={<ImportarArchivo />} /> */}
        </Routes>
    </Router>  
  );
}

export default App;
