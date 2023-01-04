import React, { useState, useEffect } from "react";

export function Modal({visible, onCierre}){
    if (!visible) return null;
    return (
      <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
      <div name="FormularioCreacion" className="" >
          <section className="bg-white dark:bg-gray-900">
              <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                  <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Modificar Usuario: <label id="idUser"> </label></h2>
                  <form>
                      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                          <div className="sm:col-span-2">
                              <label for="nombre" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre del usuario</label>
                              <input type="text" id="nombre" 
                                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required
                              />
                          </div>
                          <div className="w-full">
                              <label for="user" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Usuario</label>
                              <input type="user" id="user" 
                                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required />
                          </div>
                          <div className="w-full">
                              <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contraseña</label>
                              <input type="password" id="password"
                                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required />
                          </div>

                          <div className="selectTipoUsuario">
                              <label for="rol" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Rol del usuario</label>
                              <select id="rol"  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                                      focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                  <option value="0">Seleccione un rol</option>
                                  <option value="1">Administrador</option>
                                  <option value="2">Supervisor</option>
                              </select>
                          </div>

                      </div>

                      <div className="botoneraCrear flex justify-between space-x-1.5">
                          <button  type="button" className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-sol-green rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-500 hover:bg-sol-orange" value="Actualizar">
                              Actualizar
                          </button>

                          <button type="button" className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-sol-green rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-500 hover:bg-sol-orange"
                              onClick={onCierre}>
                              Cancelar
                          </button>
                      </div>

                  </form>
              </div>
          </section>
      </div>

  </div>

    );
}
export default Modal