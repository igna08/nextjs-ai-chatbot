import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});

export async function GET() {
  try {
    const result = await pool.query("SELECT * FROM documentos ORDER BY fecha_creacion DESC");
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Error al obtener documentos:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
