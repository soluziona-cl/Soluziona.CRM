import React from 'react';
// import { Link } from 'react-router-dom';
import { useState, FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import icon from '../../assets/iconOrkesta.png'
import 'bootstrap/dist/css/bootstrap.min.css';

import "./styles.css";


const menuItems = [
  {
    name: "Dashboard",
    icon: "dashboard",
    path: '/Dashboard',
   
  },
  {
    name: "Subir Archivos",
    icon: "upload",
    path: '/SubirArchivos',
  },
  {
    name: "Administrador de Cargas",
    icon: "person",
    path: '/AdminCargas',
  },
  {
    name: "Reportes",
    icon: "lab_profile",
    path: '/Dashboard',
  },
  {
    name: "Reportes de Cargas",
    path: '/RepoCarga',
    icon: " ",
  },
  {
    name: "Reportes de Gestión",
    path: '/RepoGestion',
    icon: "",
  },
  {
    name: "Reportes de Agentes ",
    path: '/RepoAgentes',
    icon: " ",
  },
  {
    name: "Reportes de Calidad",
    path: '/RepoCalidad',
    icon: "",
  },

];

const Icon = ({ icon }) => (React.createElement("span", { className: "material-symbols-outlined" }, icon));

 const tabs = [" "];
 const NavHeader = ({ activeTab, onTabClicked }) => (React.createElement("header", { className: "sidebar-header" },
 tabs.map((tab, index) => (React.createElement("button", { key: tab, type: "button", onClick: () => onTabClicked(index), className: `${activeTab === index ? "active" : ""}` },
     React.createElement(Icon, { icon: tab })))),
 React.createElement("div", { className: "underline", style: {
         translate: `${activeTab * 100}% 0`,
     } })));
const NavButton = ({ name, icon }) => (React.createElement("button", { type: "button" },
 icon && React.createElement(Icon, { icon: icon }),
 React.createElement("span", null, name)));
const Sidebar = () => {
 const [activeTab, setActiveTab] = useState(0);
 const handleTabClicked = (tab) => {
     setActiveTab(tab);
 };
 return (React.createElement("aside", { className: "sidebar" },
     React.createElement(NavHeader, { activeTab: activeTab, onTabClicked: handleTabClicked }),
     React.createElement("div", { className: "tabs" },
         React.createElement("div", { style: {
                 translate: `-${activeTab === 0 ? 0 : (activeTab / tabs.length) * 100}%`,
             } },
             React.createElement("div", null, menuItems.map((item) => (React.createElement(NavButton, { name: item.name, icon: item.icon })))),
             React.createElement("div", null)))));
};
// type HeaderProps = {
//   activeTab: number;
//   onTabClicked: (tab: number) => void;

// };

// const NavHeader: FC<HeaderProps> = ({ activeTab, onTabClicked }) => (
//   <header className="sidebar-header">
//     {tabs.map((tab, index) => (
//       <button
//         key={tab}
//         type="button"
//         onClick={() => onTabClicked(index)}
//         className={`${activeTab === index ? "active" : ""}`}
//       >
//         <Icon icon={tab} />
     
//       </button>
      
//     ))}
//     <div
//       className="underline"
//       style={{
//         translate: `${activeTab * 100}% 0`,
//       }}
//     />
//   </header>
// );

// type ButtonProps = {
//   name: string;
//   icon?: string;
// };

// const NavButton: FC<ButtonProps> = ({ name, icon }) => (
//   <button type="button">
//     {icon && <Icon icon={icon} />}
//     <span>{name}</span>
//   </button>
// );

// export const Sidebar = () => {
//   const [activeTab, setActiveTab] = useState<number>(0);

//   const handleTabClicked = (tab: number) => {
//     setActiveTab(tab);
//   };

//   return (
//     <aside className="sidebar">
//       <NavHeader activeTab={activeTab} onTabClicked={handleTabClicked} />

//       <div className="tabs">
//         <div
//           style={{
//             translate: `-${
//               activeTab === 0 ? 0 : (activeTab / tabs.length) * 100
//             }%`,
//           }}
//         >
          //  <div>
          // {menuItems.map((item) => (
          //     <button name={item.name} icon={item.icon} />
          //    ))}
          // </div>
//         <div>
            
//           </div>
//         </div>
//       </div>
//     </aside>
//   );
// };





// const SideBar = () => {

//   const [open, setOpen] = useState(true);

//   const [mostrar, setMostrar] = useState(true);

//   const mostrarClick = event => {

//     setMostrar(current => !current);

//   };

//   const navigate = useNavigate();
//   const rutaservidor = "";

//   return (
// <>



//     <div id="sidebar-nav" className="list-group rounded-0 text-sm-start min-vh-100">
//       <a href="/Dashboard" className="list-group-item    d-inline-block text-truncate" data-bs-parent="#sidebar"><i className="fa-solid fa-chart-line"></i><span className="ms-1  my-3  d-none d-sm-inline">Dashboard</span></a>
//       <a href="/SubirArchivos" className="list-group-item  my-3   d-inline-block text-truncate" data-bs-parent="#sidebar"><i className="fa-solid fa-upload"></i><span className="ms-1 d-none d-sm-inline">Subir Archivos</span></a>
//       <a href="/AdminCargas" className="list-group-item  d-inline-block text-truncate" data-bs-parent="#sidebar"><i className="fa-solid fa-user"></i><span className="ms-1 d-none d-sm-inline">Administrador de Cargas</span></a>
//       <div className="dropdown ">
//         <a className="d-flex align-items-center  list-group-item border-end-0   d-inline-block text-truncate link-dark text-decoration-none dropdown-toggle" href="#" data-bs-toggle="dropdown" id="navbarDropdownReportes" aria-expanded="false"><i className="fa-solid fa-bars"></i><span className="ms-1 d-none d-sm-inline  my-3 ">Reportes</span></a>
//         <ul className="dropdown-menu my-3  text-small shadow" aria-labelledby="navbarDropdownReportes">
//           <li><a className="dropdown-item border-end-0 d-inline-block text-truncate" href="/RepoCarga"> Reportes de Carga</a></li>
//           <li><a className="dropdown-item border-end-0 d-inline-block text-truncate" href="/RepoGestion"> Reportes de Gestión</a></li>
//           <li><a className="dropdown-item border-end-0 d-inline-block text-truncate" href="/RepoAgentes">Reportes de Agentes</a></li>
//           <li><a className="dropdown-item border-end-0 d-inline-block text-truncate" href="/RepoCalidad">Reportes de Calidad</a></li>
//         </ul>
//       </div>

//     </div>

//     </>
//   )
// }


export default Sidebar