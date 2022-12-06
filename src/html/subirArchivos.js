import Header from './Componentes/Header';
import SideBar from './Componentes/Sidebar';
import Footer from './Componentes/Footer';

import ImportarArchivo from '../html/Componentes/ImportarArchivo';


function OnlineView() {
    return (        
        <>
         <div className=' d-block'>
        {/* <Header />   */}
        <div>
        {/* <SideBar /> */}
            <div className=' justify-content-center align-items-center'>
                <ImportarArchivo />
            </div>
            </div>
            </div>
            <Footer/>
        </>
    )
}
export default OnlineView