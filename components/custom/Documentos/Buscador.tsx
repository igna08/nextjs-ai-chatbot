interface BuscadorProps {
  searchQuery: string;
  onSearch: (query: string) => void;
}

const Buscador: React.FC<BuscadorProps> = ({ searchQuery, onSearch }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Buscar documentos..."
        value={searchQuery}
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
};

export default Buscador;
