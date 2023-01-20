import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import './App.css';
import Dashboard from "./html/Dashboard";
import Login from "./html/Login";
import 'bootstrap/dist/css/bootstrap.min.css';
import RepoIntervalo from "./html/RepoIntervalo";
import RepoEpa from "./html/RepoEpa";
import RepoAgente from "./html/RepoAgente";
import RepoRegion from "./html/RepoRegion";
import RepoTipificaciones from "./html/RepoTipificaciones";

// import AdminCargas2 from "./html/AdminCargas2";

function App() {

    // const rutaservidor="/"; //Pruebas
    const rutaservidor = "/Orkesta/CallSouth/Salcobrand/CRM"; //Produccion

  return (
    <Router>
        <Routes>
        <Route index path={rutaservidor} element={<Login />} />
        {/* <Route path={rutaservidor + "/login"} element={<Login />} /> */}
        <Route path={rutaservidor + "/Dashboard"} element={<Dashboard />} />
        <Route path={rutaservidor + "/RepoIntervalo"} element={<RepoIntervalo />} />
        <Route path={rutaservidor + "/RepoEpa"} element={<RepoEpa />} />
        <Route path={rutaservidor + "/RepoAgente"} element={<RepoAgente />} />
        <Route path={rutaservidor + "/RepoRegion"} element={<RepoRegion />} />
        <Route path={rutaservidor + "/RepoTipificaciones"} element={<RepoTipificaciones />} />
      
        {/* <Route path={rutaservidor + "/AdminCargas2"} element={<AdminCargas2 />} /> */}
        {/* <Route path="/" element={<Login />} /> */}
          {/* <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/ImportarArchivo" element={<ImportarArchivo />} /> */}
        </Routes>
    </Router>  
  );
}

export default App;
