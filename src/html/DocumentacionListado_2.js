import Header from './Componentes/Header';
import Sidebar from './Componentes/Sidebar';
import Footer from './Componentes/Footer';


import "../css/styleCategorias.css";


import Documento_Detalle_Listado from './Componentes/Documento_Detalle_Listado';

import Documento_Detalle_Listado_Conocimiento from './Componentes/Documento_Detalle_Listado_Conocimiento';

function DocumentacionListado_2() {
    return (
        <>

            <div className="container-fluid">
                <div className="row flex-nowrap"><Header /></div>
                <div className="row flex-nowrap">
                    <div className="col-auto px-0">
                        <div id="sidebar" className="collapse collapse-horizontal show border-end">
                            <Sidebar />
                        </div>
                    </div>
                    <main className="col ps-md-2 pt-2">
                        <a href="#" data-bs-target="#sidebar" data-bs-toggle="collapse" className="border rounded-3 p-1 text-decoration-none"><i className="fa-solid fa-bars py-2 p-1"></i> Menu</a>

                        <hr />
                        <div className="row justify-space-center m-3 col-md-10">

                            <div className="row">
                                <div className="col-12">

                                    <div className="col-sm-12 col-md-12 col-lg-12 text-center">
                                        <div className="card rounded-3 shadow-sm">
                                            <div className="card-header">
                                                <h4 className="my-0 font-weight-normal" style={{ "color": "#30B800" }}>Welcome to our Knowledge Base</h4>
                                            </div>

                                        </div>
                                        <Documento_Detalle_Listado_Conocimiento />

                                    </div>
                                </div>
                            </div>

                        </div>


                    </main>

                </div>
                <Footer />
            </div>

        </>
    )
}
export default DocumentacionListado_2