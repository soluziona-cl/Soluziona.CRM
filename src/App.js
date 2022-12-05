import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import './App.css';
import Login from "../src/html/Login";
import Dashboard from "./html/Dashboard";
import ImportarArchivo from "../src/html/subirArchivos"
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
        <Routes>
        <Route path="/" element={<Login />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/ImportarArchivo" element={<ImportarArchivo />} />
        </Routes>
    </Router>  
  );
}

export default App;
