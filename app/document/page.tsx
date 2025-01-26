"use client";

import { useState, useEffect } from "react";
import DocumentoCard from "@/components/custom/Documentos/DocumentoCard";
import Buscador from "@/components/custom/Documentos/Buscador";
import axios from "axios";

interface Documento {
  id: string;
  nombre: string;
  fecha_creacion: string;
  tipo: string;
  url_archivo: string;
}

export default function Biblioteca() {
  const [searchQuery, setSearchQuery] = useState("");
  const [documentos, setDocumentos] = useState<Documento[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDocumentos();
  }, []);

  const fetchDocumentos = async () => {
    try {
      const response = await axios.get("/api/documentos");
      setDocumentos(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error al cargar documentos:", error);
      setLoading(false);
    }
  };

  const filteredDocumentos = documentos.filter((doc) =>
    doc.nombre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="biblioteca-container">
      <h1>Biblioteca de Documentos</h1>
      <Buscador searchQuery={searchQuery} onSearch={setSearchQuery} />
      <div className="documentos-grid">
        {loading ? (
          <p>Cargando documentos...</p>
        ) : filteredDocumentos.length > 0 ? (
          filteredDocumentos.map((doc) => (
            <DocumentoCard
              key={doc.id}
              id={doc.id}
              nombre={doc.nombre}
              fecha_creacion={doc.fecha_creacion}
              tipo={doc.tipo}
              url_archivo={doc.url_archivo}
            />
          ))
        ) : (
          <p>No se encontraron documentos.</p>
        )}
      </div>
    </div>
  );
}
