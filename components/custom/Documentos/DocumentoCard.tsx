interface DocumentoProps {
  id: string;
  nombre: string;
  fecha_creacion: string;
  tipo: string;
  url_archivo: string;
}

const DocumentoCard: React.FC<DocumentoProps> = ({ nombre, fecha_creacion, tipo, url_archivo }) => {
  return (
    <div className="document-card">
      <h2>{nombre}</h2>
      <p>Fecha: {new Date(fecha_creacion).toLocaleDateString()}</p>
      <p>Tipo: {tipo}</p>
      <div className="actions">
        <a href={url_archivo} target="_blank" rel="noopener noreferrer">
          Ver Documento
        </a>
      </div>
    </div>
  );
};

export default DocumentoCard;
