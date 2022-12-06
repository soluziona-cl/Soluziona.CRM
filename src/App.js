import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import './App.css';
import Dashboard from "./html/Dashboard";
import Login from "./html/Login";
import 'bootstrap/dist/css/bootstrap.min.css';
import SubirArchivos from "./html/SubirArchivos";
import ListarCargas from "./html/AdminCargas";
import RepoCarga from "./html/RepoCarga.js";
import RepoAgentes from "./html/RepoAgentes.js";



function App() {

  const rutaservidor = "/"; //Prueba

  return (
    <Router>
        <Routes>
        <Route index path={rutaservidor} element={<Login />} />
        <Route path={rutaservidor + "/login"} element={<Login />} />
        <Route path={rutaservidor + "/Dashboard"} element={<Dashboard />} />
        <Route path={rutaservidor + "/SubirArchivos"} element={<SubirArchivos />} />
        <Route path={rutaservidor + "/AdminCargas"} element={<ListarCargas />} />
        <Route path={rutaservidor + "/RepoCarga"} element={<RepoCarga />} />
        <Route path={rutaservidor + "/AdminCargas"} element={<ListarCargas />} />
        <Route path={rutaservidor + "/AdminCargas"} element={<ListarCargas />} />
        {/* <Route path="/" element={<Login />} /> */}
          {/* <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/ImportarArchivo" element={<ImportarArchivo />} /> */}
        </Routes>
    </Router>  
  );
}

export default App;
