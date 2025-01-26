import { NextResponse } from "next/server";
import { db } from "../../lib/db"; // Importar la conexión de drizzle
import { Document } from "@"; // Importar el esquema de la tabla 'documentos'

export async function GET() {
  try {
    // Usamos drizzle-orm para seleccionar los documentos ordenados por fecha_creacion
    const documentos = await db
      .select()
      .from(document) // Accede a la tabla 'documentos'
      .orderBy("fecha_creacion", "desc");

    // Devuelve los documentos en formato JSON
    return NextResponse.json(documentos);
  } catch (error) {
    // Si ocurre un error, lo mostramos en la consola y devolvemos un error 500
    console.error("Error al obtener documentos:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
