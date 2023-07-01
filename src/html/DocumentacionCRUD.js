import React, { useEffect, useState, useRef } from 'react';

import Header from './Componentes/Header';
import Sidebar from './Componentes/Sidebar';
import Footer from './Componentes/Footer';

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import Documento_CRUD_Padre from './Componentes/Documento_CRUD_Padre';
import Documento_CRUD_Hijo from './Componentes/Documento_CRUD_Hijo';

function DocumentacionCRUD() {

    const [key, setKey] = useState('Padre');


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

                            <div className="card mb-4 rounded-3 shadow-sm">
                                <div className="card-header">
                                    <h4 className="my-0 font-weight-normal">Niveles</h4>
                                </div>
                                <div className="card-body">

                                    <Tabs
                                        id="controlled-tab-example"
                                        activeKey={key}
                                        onSelect={
                                            (k) => setKey(k)}
                                        className="mb-3 fw-bolder">
                                        <Tab eventKey="Padre"
                                            title="Nivel Principal"> {
                                                <Documento_CRUD_Padre />}
                                        </Tab>
                                      
                                        <Tab eventKey="Hijo"
                                            title="Nivel Detalle"> {
                                                <Documento_CRUD_Hijo />}
                                        </Tab>
                                      
                                    </Tabs>



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
export default DocumentacionCRUD