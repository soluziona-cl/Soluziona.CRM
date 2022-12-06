import React, { useState } from 'react';
import axios from "axios";
function ImportarArchivo() {
    const [excel, setExcel] = useState()


    const handleFile = (e) => {

        setExcel(e.target.files[0])

    }

    const coneccionApi = () => {

        var formData = new FormData()
        formData.append('postedFile', excel)
        // var requestOptions = {
        //     method: 'POST',
        //     body: formData,
        //     redirect: 'follow'
        // };
        axios.post('https://app.soluziona.cl/API_desa/Soluziona.QA/api/Contact_CRM/CRM/Files/Test', formData)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
          })
        .catch(error => console.log('error', error));
    }

    return (
        <>
            <input type="file" onChange={handleFile} />
            <button onClick={coneccionApi} className="btn btn-primary sm mt-3" >Subir</button>
        </>
    )
}
export default ImportarArchivo
