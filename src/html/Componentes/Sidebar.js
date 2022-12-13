// import React from 'react';
// // import { Link } from 'react-router-dom';
// import { useState, FC, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import icon from '../../assets/iconOrkesta.png'
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom"
import "./styles.css"

const SideBar = () => {

//   const [open, setOpen] = useState(true);

//   const [mostrar, setMostrar] = useState(true);

//   const mostrarClick = event => {

//     setMostrar(current => !current);

//   };

//   const navigate = useNavigate();
//   const rutaservidor = "";

  return (
<>

<aside class="sidebar">
<div class="sidebar-inner">
 
  <nav class="sidebar-nav">
    <button type="button">
      
      <span>Home</span>
    </button>
    <button type="button">
    
      <span>Settings</span>
    </button>
    <button type="button">
     
      <span>Levels</span>
    </button>
    <button type="button">
     
      <span>Accounts</span>
    </button>
  </nav>
    <button type="button">
      <Link to ="/Clientes">Clientes</Link>
    
      <span>Logout</span>
        </button>
 </div>
</aside>
</>

  )}

export default SideBar