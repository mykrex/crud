'use client'

import CalificationCard from "./components/calificationCard";
import AlumnosList from "./components/alumnosList";
import { useAlumnos } from "./hooks/useAlumnos";

export default function Home() {
  const { 
    loading, 
    error, 
    promedioGeneral, 
    mayorPromedio, 
    menorPromedio
  } = useAlumnos();

  if (loading) {
    return (
      <div>
        <main>
          <h1 className="items-center">Seguimiento de alumnos</h1>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <main>
          <h1 className="items-center">Seguimiento de alumnos</h1>
          <strong>Error:</strong> {error}
        </main>
      </div>
    );
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div>
          <h1 className="text-2xl font-bold text-white"> Seguimiento de alumnos</h1>
        </div>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <CalificationCard tittle="Promedio general" num={promedioGeneral}/>
          <CalificationCard tittle="Mayor calificación" num={mayorPromedio}/>
          <CalificationCard tittle="Menor calificación" num={menorPromedio}/>
        </div>

        <AlumnosList/>
      </main>
    </div>
  );
}