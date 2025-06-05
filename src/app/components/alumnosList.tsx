'use client'

import React from 'react';
import { useAlumnos } from '../hooks/useAlumnos';

const AlumnosList: React.FC = () => {
  const { alumnos, loading, error } = useAlumnos();

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <span className="ml-2 text-gray-600">Cargando alumnos...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 m-4">
        <h3 className="text-red-800 font-medium">Error al cargar los alumnos</h3>
        <p className="text-red-600 text-sm mt-1">{error}</p>
      </div>
    );
  }

  if (alumnos.length === 0) {
    return (
      <div className="text-center p-8 text-gray-500">
        <p className="text-lg">No hay alumnos registrados</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Lista de Alumnos</h2>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 font-semibold text-gray-700 border-b">
          <div>Nombre</div>
          <div>Promedio</div>
        </div>
        
        {alumnos.map((alumno) => (
          <div
            key={alumno.id_alumno}
            className="grid grid-cols-3 gap-4 p-4 border-b last:border-b-0 hover:bg-gray-50 transition-colors"
          >
            <div className="font-medium text-gray-800">
              {alumno.nombre}
            </div>
            <div className="flex items-center">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${ alumno.promedio >= 70 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800' }`}>
                {alumno.promedio.toFixed(1)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlumnosList;