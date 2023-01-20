import React, { useEffect, useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

import "jquery/dist/jquery.min.js";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import "datatables.net-buttons/js/dataTables.buttons.js";
import "datatables.net-buttons/js/buttons.colVis.js";
import "datatables.net-buttons/js/buttons.flash.js";
import "datatables.net-buttons/js/buttons.html5.js";
import "datatables.net-buttons/js/buttons.print.js";
import $, { data } from "jquery";

function TablaTrafico() {
    const [data, setData] = useState([]);
    const [datashow, setDataShow] = useState([]);

    useEffect(() => {
        (async () => {
            const result = await axios.post("https://app.soluziona.cl/API_desa/Soluziona.Dashboard.Salcobrand/api/Contact_CRM/CRM/Trafico/Inbound/Intervalo")
            setData(result.data);
            console.log(result)
            console.log(result.data)
            // myObjStr.forEach(item)
            // console.log(result)
            // console.log(columns)
        })();
        componentDidMount()
    }, []);

    const componentDidMount = () => {
        if (!$.fn.DataTable.isDataTable("#myTable")) {
            $(document).ready(function () {
                setTimeout(function () {
                    $("#table").DataTable({
                        language: {
                            url: "//cdn.datatables.net/plug-ins/1.11.3/i18n/es-cl.json"
                        },
                        destroy: true,
                        //pagingType: "full_numbers",
                        pageLength: 10,
                        //processing: true,
                        dom: "Bfrtip",
                        select: {
                            style: "single",
                        },
                        //buttons tiene varios botones, pero por ahora solo uno activado
                        buttons: [
                            // {
                            //     extend: "pageLength",
                            //     className: "btn btn-secondary bg-secondary",
                            // },
                            // {
                            //     extend: "copy",
                            //     className: "btn btn-secondary bg-secondary",
                            // },
                            // {
                            //     extend: "csv",
                            //     className: "btn btn-secondary bg-secondary",
                            // },
                            // {
                            //     extend: "print",
                            //     customize: function (win) {
                            //         $(win.document.body).css("font-size", "10pt");
                            //         $(win.document.body)
                            //             .find("table")
                            //             .addClass("compact")
                            //             .css("font-size", "inherit");
                            //     },
                            //     className: "btn btn-secondary bg-secondary",
                            // },
                        ],

                        fnRowCallback: function (
                            nRow,
                            aData,
                            iDisplayIndex,
                            iDisplayIndexFull
                        ) {
                            var index = iDisplayIndexFull + 1;
                            $("td:first", nRow).html(index);
                            return nRow;
                        },

                        lengthMenu: [
                            [10, 20, 30, 50, -1],
                            [10, 20, 30, 50, "All"],
                        ],
                        columnDefs: [
                            {
                                targets: 0,
                                render: function (data, type, row, meta) {
                                    return type === "export" ? meta.row + 1 : data;
                                },
                            },
                        ],
                    });
                }, 2000);
            });
        }

    }


    const showTable = () => {

        try {
            return data.map((data, index) => {
                return (
                    <tr key={index + 1}>
                        <td scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">{data.intervalo}</td>
                        <td className="py-4 px-6">{data.recibidas}</td>
                        <td className="py-4 px-6">{data.contestadas}</td>
                        <td className="py-4 px-6">{data.abandonadas}</td>
                        <td className="py-4 px-6">-</td>
                        <td className="py-4 px-6">{data.contestadas / data.recibidas}</td>
                        <td className="py-4 px-6">{data.abandonadas / data.contestadas}</td>
                    </tr>

                );
            });
        } catch (e) {
            alert(e.message);
        }
        // if (alertas != 0) { setAlert(true) }
    };

    return (
        <>
            <div className=" flex">
                <div className=" flex ">
                    <table id="table" className="w-full text-sm text-left text-gray-500 ">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 border rounded-2xl ">
                            <tr>
                                <th scope="col" className="py-3 px-6">
                                    Intervalo
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    Recibido
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    Contestado
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    Abandonado
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    Nivel de Atención
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    Nivel de Servicio
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    Nivel de Abandono
                                </th>

                            </tr>
                        </thead>
                        <tbody>
                            {showTable()}


                        </tbody>
                    </table>
                </div>

            </div>
        </>
    );
};

export default TablaTrafico