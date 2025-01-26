"use client";

import { useState, useEffect } from "react";
import DocumentoCard from "@/components/custom/Documentos/DocumentoCard";
import Buscador from "@/components/custom/Documentos/Buscador";
import axios from "axios";
import { DocumentSkeleton } from "@/components/custom/document-skeleton"; // Importar el Skeleton
import { DocumentToolResult } from "@/components/custom/document"; // Importar DocumentToolResult
import { Editor } from "@/components/custom/editor";  // Importar el Editor
import { BotIcon } from "@/components/ui/icons"; // Import > get the BotIcon component

interface Documento {
  id: string;
  title: string;
  content: string;
  userId: string;
  createdAt: string;
}

export default function Biblioteca() {
  const [searchQuery, setSearchQuery] = useState("");
  const [documentos, setDocumentos] = useState<Documento[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDoc, setSelectedDoc] = useState<Documento | null>(null); // Estado para el documento seleccionado

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
    doc.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="biblioteca-container">
      <h1>Biblioteca de Documentos</h1>
      <Buscador searchQuery={searchQuery} onSearch={setSearchQuery} />

      {selectedDoc ? (
        <Editor
          content={selectedDoc.content}
          saveContent={() => {}}
          status="idle"
          isCurrentVersion={true}
          currentVersionIndex={0}
          suggestions={[]}  // Puedes ajustar las sugerencias si es necesario
        />
      ) : (
        <div className="documentos-grid">
          {loading ? (
            <DocumentSkeleton />
          ) : filteredDocumentos.length > 0 ? (
            filteredDocumentos.map((doc) => (
              <div key={doc.id} onClick={() => setSelectedDoc(doc)}>  {/* Contenedor para el onClick */}
                <DocumentToolResult
                  type="create"
                  result={doc}
                  block={{
                    documentId: doc.id,
                    content: doc.content,
                    title: doc.title,
                    isVisible: true,
                    status: 'idle',
                    boundingBox: { top: 0, left: 0, width: 0, height: 0 },
                  }}
                  setBlock={(value) => {}}
                />
                {/* Adding the BotIcon to represent the document */}
                <div className="document-preview-icon">
                  <BotIcon />
                </div>
                {/* Document Title */}
                <h2 className="document-title">{doc.title}</h2>
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
