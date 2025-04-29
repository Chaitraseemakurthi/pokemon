import React, { useEffect, useState } from "react";
import Header from "./Components/Header.jsx";
import SearchFilter from "./Components/SearchFilter.jsx";
import PokemonList from "./Components/PokemonList.jsx";

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=150");
        const data = await res.json();
        const promises = data.results.map(async (pokemon) => {
          const res = await fetch(pokemon.url);
          return await res.json();
        });
        const results = await Promise.all(promises);
        setPokemons(results);
        setFilteredPokemons(results);
      } catch (err) {
        setError("Failed to fetch Pokémon.");
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, []);

  useEffect(() => {
    let filtered = pokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (selectedType) {
      filtered = filtered.filter((pokemon) =>
        pokemon.types.some((typeInfo) => typeInfo.type.name === selectedType)
      );
    }

    setFilteredPokemons(filtered);
  }, [searchTerm, selectedType, pokemons]);

  if (loading) return <div className="loading">Loading Pokémon...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="container">
      <Header />
      <SearchFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
      />
      <PokemonList pokemons={filteredPokemons} />
    </div>
  );
}

export default App;
