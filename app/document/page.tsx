"use client"; // Asegúrate de incluir esto para el renderizado del cliente

import { useState, useEffect } from "react";
import DocumentoCard from "@/components/custom/Documentos/DocumentoCard"; // Asegúrate de que este componente exist
import Buscador from "@/components/custom/Documentos/Buscador"; // Asegúrate de que este componente exist
import axios from "axios";
import { DocumentSkeleton } from "@/components/custom/document-skeleton"; // Importar el componente de esqueleto
import { Editor } from "@/components/custom/editor"; // Importar el Editor

interface Documento {
  id: string;
  title: string;
  content: string;
  userId: string;
  createdAt: string; // Puedes usar Date si es preferido
}

export default function Biblioteca() {
  const [searchQuery, setSearchQuery] = useState("");
  const [documentos, setDocumentos] = useState<Documento[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDoc, setSelectedDoc] = useState<Documento | null>(null); // Estado del documento seleccionado

  // Efecto para cargar documentos al montar el componente
  useEffect(() => {
    fetchDocumentos();
  }, []);

  // Función para cargar documentos desde la API
  const fetchDocumentos = async () => {
    try {
      const respuesta = await axios.get("/api/documentos");
      setDocumentos(respuesta.data);
      setLoading(false);
    } catch (error) {
      console.error("Error al cargar documentos:", error);
      setLoading(false); // Desactiva la carga en caso de error
    }
  };

  const filteredDocumentos = documentos.filter((doc) =>
    doc.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="biblioteca-container">
      <h1> Biblioteca de Documentos </h1>
      <Buscador searchQuery={searchQuery} onSearch={setSearchQuery} />

      {selectedDoc ? (
        // Renderizar el Editor si hay un documento seleccionado
        <Editor 
          content={selectedDoc.content} 
          saveContent={() => {}} 
          status="idle" 
          isCurrentVersion={true} 
          currentVersionIndex={0} 
          suggestions={[]} // Ajustar las sugerencias si es necesario 
        />
      ) : (
        <div className="documentos-grid">
          {loading ? (
            // Mostrar skeleton mientras se cargan los documentos
            <DocumentSkeleton />
          ) : filteredDocumentos.length > 0 ? (
            filteredDocumentos.map((doc) => (
              <div key={doc.id} onClick={() => setSelectedDoc(doc)}>
                <DocumentoCard doc={doc} /> {/* Componente para mostrar un documento */}
              </div>
            ))
          ) : (
            <p>No se encontraron documentos.</p>
          )}
        </div>
      )}
    </div>
  );
}
