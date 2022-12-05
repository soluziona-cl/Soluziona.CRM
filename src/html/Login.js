import "../css/styleLogin.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import logo from "../assets/LogoOrkesta.png";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';


const Login = () => {
  const [user, setUsuario] = useState('');
  const [pass, setPass] = useState('');

  const handleChangeUsuario = event => {
    setUsuario(event.target.value);
  };
  const handleChangePassword = event => {
    setPass(event.target.value);
  };
  // console.log(user);
  // console.log(pass);
  const navigate = useNavigate();



  function inicio_sesion() {
    axios
      .post(
        "https://app.soluziona.cl/API_v1_prod/Procollect/CRM/api/Ventas_CRM/CRM/Login",

        { username: user, password: pass }
      )
      .then((response) => {
        console.log(response);

        var id = "";
        var login = {
          gui: "",
          cliente: "",
          id: "",
          id_usuario: "",
          token: "",
        };

        var arrr = response.data;

        arrr.forEach((element) => {
          id = element.id_usuario;
          login.id_usuario = element.id_usuario;
          login.id = element.id;
          login.cliente = element.cliente;
          login.gui = element.gui;
          login.token = element.token;

          localStorage.setItem("localgui", login.gui);
          localStorage.setItem("localid_usuario", login.id_usuario);
          localStorage.setItem("localcliente", login.cliente);
          localStorage.setItem("localid", login.id);
          localStorage.setItem("token", login.token);
        });

        console.log(login);
        if (id === "-1") {
          console.log("NOP");
          alert("credenciales erróneas");
        } else {
          console.log("SIP");


        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <>

      <main className="main-container" id="main-container">
        {/* <div
          className=" w-full h-screen flex items-center justify-center flex-col"
          id="cover"
        >
          <div className="bg-[#FAFBFC]/50 backdrop-blur-xl bg-opacity-70 max-w-md drop-shadow-lg rounded-xl px-12 p-10 text-center w-96">
            <section className="flex items-center justify-center flex-col">
              <img src="./logoOrkestaWhite.png" className="h-14" />

              <span className="py-6 inline-block text-base">
                CRM <br /> <br /><b>Salcobrand</b>
               
              </span>
            </section>

            <label className="text-[#43484C] text-sm flex justify-start mb-2">
              Usuario
            </label>
            <input
              className="bg-[#EEEEEE] bg-opacity-70 backdrop-blur-xl h-10 w-full mb-6 border-[#B4B4B4] border rounded"
              type="text"
              name="user"
              onChange={handleChangeUsuario}
            ></input>
            <label className="text-[#43484C] text-sm flex justify-start mb-2">
              Clave
            </label>
            <input
              className="bg-[#EEEEEE] bg-opacity-70 backdrop-blur-xl h-10 w-full mb-6 border-[#B4B4B4] border rounded"
              type="password"
              name="password"
              onChange={handleChangePassword}
            ></input>
            <div className="group">
              <button
                type="button"
                onClick={inicio_sesion}
                className="btn btn-primary btn-sm">
                Ingresar
              </button>
            </div>
          </div>
        </div> */}
        <div className="container-sm-lg-6 col-sm-4">
          <div className="card" id="card" >
            <div className="row justify-content-md-center ">
              <div className="mb-3 flex-column col-lg-6 col-sm-4">

                <img className="img-fluid" src={logo} />
                <p className="mt-2 mb-4">Bienvenido Procollect CRM</p>


                <label for="label_user" className="form-label">Ingrese usuario</label>
                <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Usuario"
                  onChange={handleChangeUsuario} />
                <label for="label_pass" className="form-label">Ingrese contraseña</label>
                <input type="password" className="form-control" id="formGroupExampleInput2" placeholder="Contraseña"
                  onChange={handleChangePassword} />
                <div className="d-flex justify-content-center">
                  <button type="button" className="btn btn-primary sm mt-3"
                    onClick={inicio_sesion}>Ingresar</button>
                </div>

              </div>
            </div>
          </div>
        </div>

      </main>

    </>

  )

}
export default Login;