import React from 'react';

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
    <div className="search-bar" style={{ marginBottom: '20px' }}> {/* Espaciado con margen inferior */}
      <input
        type="text"
        placeholder="Buscar documentos..."
        value={searchQuery}
        onChange={(e) => onSearch(e.target.value)}
        onKeyDown={handleKeyDown} // Agregar el manejador de teclas
      />
      <button onClick={handleSearchClick} style={{ marginLeft: '10px' }}> {/* Espaciado entre el input y el botón */}
        Buscar
      </button>
    </div>
  );
};

export default Buscador;
