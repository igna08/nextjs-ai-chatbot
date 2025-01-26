"use client";

import { useState, useEffect } from "react";
import DocumentoCard from "@/components/custom/Documentos/DocumentoCard";
import Buscador from "@/components/custom/Documentos/Buscador";
import axios from "axios";
import { DocumentSkeleton } from "@/components/custom/document-skeleton"; // Importar el Skeleton
import { DocumentToolResult } from "@/components/custom/document"; // Importar DocumentToolResult
import { Editor } from "@/components/custom/editor";  // Importar el Editor

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
              <DocumentToolResult
                key={doc.id}
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
                onClick={() => setSelectedDoc(doc)} // Al hacer clic en un documento, se actualiza el estado
              />
            ))
          ) : (
            <p>No se encontraron documentos.</p>
          )}
        </div>
      )}
    </div>
  );
}

