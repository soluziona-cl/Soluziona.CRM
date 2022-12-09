import Header from './Componentes/Header';
import SideBar from './Componentes/Sidebar';
import Footer from './Componentes/Footer';

import ImportarArchivo from './Componentes/ImportarArchivo';
import Company_Campaing from './Componentes/Company_Campaing';


function SubirArchivos() {
    return (
        <>

            <div className="container-fluid">
                <div className="row flex-nowrap"><Header /></div>
                <div className="row flex-nowrap">
                    <div className="col-auto px-0">
                        <div id="sidebar" className="collapse collapse-horizontal show border-end">
                            <SideBar />
                        </div>
                    </div>
                    <main className="col ps-md-2 pt-2">
                        <a href="#" data-bs-target="#sidebar" data-bs-toggle="collapse" className="border rounded-3 p-1 text-decoration-none"><i className="fa-solid fa-bars py-2 p-1"></i> Menu</a>
                        <div className="page-header pt-3">
                            <h2>Subir Archivos</h2>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-12">
                                <Company_Campaing />
                                <ImportarArchivo />
                            </div>
                        </div>
                    </main>

                </div>
                <Footer />
            </div>

        </>
    )
}
export default SubirArchivos