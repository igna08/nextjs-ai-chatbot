import { NextResponse } from "next/server";
import { getAllDocuments } from "@/db/queries"; // Importar la función que obtiene todos los documentos

export async function GET() {
  try {
    // Llamamos a la función que ya definiste para obtener los documentos
    const documentos = await getAllDocuments();

    // Devuelve los documentos en formato JSON
    return NextResponse.json(documentos);
  } catch (error) {
    // Si ocurre un error, lo mostramos en la consola y devolvemos un error 500
    console.error("Error al obtener documentos:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
