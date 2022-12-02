import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import './App.css';
import Login from "../src/html/Login";
import Dashboard from "./html/Dashboard";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
        <Routes>
        <Route path="/" element={<Login />} />
          <Route path="/Dashboard" element={<Dashboard />} />
        </Routes>
    </Router>  
  );
}

export default App;
