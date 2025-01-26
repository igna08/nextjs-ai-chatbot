"use client";

import { useState, useEffect } from "react";
import DocumentoCard from "@/components/custom/Documentos/DocumentoCard";
import Buscador from "@/components/custom/Documentos/Buscador";
import axios from "axios";
import { DocumentSkeleton } from "@/components/custom/document-skeleton"; // Importar el Skeleton
import { DocumentToolResult } from "@/components/custom/document"; // Importar DocumentToolResult

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
          // Mostrar skeleton mientras cargan los documentos
          <DocumentSkeleton />
        ) : filteredDocumentos.length > 0 ? (
          filteredDocumentos.map((doc) => (
            // Utilizar DocumentToolResult para una vista más detallada
            <DocumentToolResult
              key={doc.id}
              type="create"
              result={doc}
              block={{
                documentId: doc.id,        // ID del documento
                content: doc.content,      // Contenido del documento
                title: doc.title,          // Título del documento
                isVisible: true,           // Puedes ajustarlo según tu lógica (por ejemplo, con un estado)
                status: 'idle',            // Ajusta el estado según corresponda
                boundingBox: { top: 0, left: 0, width: 0, height: 0 }, // Puedes ajustar el boundingBox basado en el evento onClick
              }}
              setBlock={(value) => {}} // Implementa la función setBlock según tus necesidades
            />
          ))
        ) : (
          <p>No se encontraron documentos.</p>
        )}
      </div>
    </div>
  );
}

