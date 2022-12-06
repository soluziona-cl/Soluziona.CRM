import Header from './Componentes/Header';
import SideBar from './Componentes/Sidebar';
import Footer from './Componentes/Footer';

import ImportarArchivo from './Componentes/ImportarArchivo';
import Company_Campaing from './Componentes/Company_Campaing';


function SubirArchivos() {
    return (        
        <>
         <div className=' d-block'>
        <Header />  
        <div>
        <SideBar />
            <div className=' justify-content-center align-items-center'>
                <Company_Campaing />
            </div>
            <div className=' justify-content-center align-items-center mt-2'>
                <ImportarArchivo />
            </div>
            </div>
            </div>
            <Footer/>
        </>
    )
}
export default SubirArchivos