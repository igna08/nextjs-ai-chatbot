"use client";

import { useState, useEffect } from "react";
import DocumentoCard from "@/components/custom/Documentos/DocumentoCard";
import Buscador from "@/components/custom/Documentos/Buscador";
import axios from "axios";

interface Documento {
  id: string;
  title: string;
  content: string;
  userId: string;
  createdAt: string; // O puedes usar Date si lo prefieres
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
    doc.title.toLowerCase().includes(searchQuery.toLowerCase()) // Cambio 'nombre' por 'title'
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
              nombre={doc.title} // Cambié 'nombre' por 'title'
              fecha_creacion={doc.createdAt} // Cambié 'fecha_creacion' por 'createdAt'
              tipo={doc.content} // Si necesitas el tipo, puedes ajustarlo aquí según lo que desees
              url_archivo={doc.userId} // Asegúrate de cambiar esto a la URL correspondiente
            />
          ))
        ) : (
          <p>No se encontraron documentos.</p>
        )}
      </div>
    </div>
  );
}
