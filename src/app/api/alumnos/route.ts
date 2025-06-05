import { NextRequest, NextResponse } from "next/server";
import { supabase } from "../../lib/supabase";

export async function GET(request: NextRequest) {
  try {
    // Sacamos id_alumno, nombre y promedio desde la tabla alumno
    const { data, error } = await supabase
      .from("alumno")
      .select(`
        id_alumno,
        nombre,
        promedio
      `);

    if (error) {
      console.error("Error al obtener a los alumnos con promedio:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data || data.length === 0) {
      console.log("No se encontraron alumnos registrados");
      return NextResponse.json({ error: "No se encontraron alumnos registrados" }, { status: 404 });
    }

    return NextResponse.json({ data }, { status: 200 });
    
  } catch (error) {
    console.error("Error inesperado:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}