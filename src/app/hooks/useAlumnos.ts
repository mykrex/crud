"use client";

import { useState, useEffect } from 'react';

interface Alumno {
  id_alumno: number;
  nombre: string;
  promedio: number;
}

interface AlumnosResponse {
  data: Alumno[];
}

export const useAlumnos = () => {
  const [alumnos, setAlumnos] = useState<Alumno[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAlumnos = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/alumnos');
      
      console.log("Respuesta recibida:", response.status, response.statusText);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error en la respuesta:", errorText);
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      
      const result: AlumnosResponse = await response.json();
      setAlumnos(result.data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      console.error('Error al obtener alumnos:', err);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlumnos();
  }, []);

  const calcularPromedioGeneral = (): number => {
    if (alumnos.length === 0) return 0;
    const suma = alumnos.reduce((acc, alumno) => acc + alumno.promedio, 0);
    return Number((suma / alumnos.length).toFixed(1));
  };

  const obtenerMayorPromedio = (): number => {
    if (alumnos.length === 0) return 0;
    return Math.max(...alumnos.map(alumno => alumno.promedio));
  };

  const obtenerMenorPromedio = (): number => {
    if (alumnos.length === 0) return 0;
    return Math.min(...alumnos.map(alumno => alumno.promedio));
  };

  return {
    alumnos,
    loading,
    error,
    promedioGeneral: calcularPromedioGeneral(),
    mayorPromedio: obtenerMayorPromedio(),
    menorPromedio: obtenerMenorPromedio(),
    totalAlumnos: alumnos.length
  };
};