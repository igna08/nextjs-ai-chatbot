import React from 'react';
import { Button } from '@/components/ui/button'; // Ruta corregida para importar el componente Button

interface BuscadorProps {
  searchQuery: string;
  onSearch: (query: string) => void;
}

const Buscador: React.FC<BuscadorProps> = ({ searchQuery, onSearch }) => {
  // Función para manejar la búsqueda al presionar Enter
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch(searchQuery); // Llamar a onSearch con la consulta actual
    }
  };

  // Función para manejar el clic en el botón de buscar
  const handleSearchClick = () => {
    onSearch(searchQuery); // Llamar a onSearch con la consulta actual
  };

  return (
    <div className="search-bar" style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
      {/* Input de búsqueda */}
      <input
        type="text"
        placeholder="Buscar documentos..."
        value={searchQuery}
        onChange={(e) => onSearch(e.target.value)}
        onKeyDown={handleKeyDown}
        style={{
          flex: 1, // Ocupa todo el espacio disponible
          padding: '8px 12px',
          borderRadius: '6px',
          border: '1px solid #ccc',
          fontSize: '14px',
          marginRight: '10px', // Espaciado entre el input y el botón
        }}
      />

      {/* Botón de búsqueda personalizado */}
      <Button
        variant="default" // Puedes cambiar la variante según tus necesidades
        size="default" // Puedes cambiar el tamaño según tus necesidades
        onClick={handleSearchClick}
      >
        Buscar
      </Button>
    </div>
  );
};

export default Buscador;