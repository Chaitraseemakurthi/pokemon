// src/components/PokemonCard.jsx
import React from 'react';


const PokemonCard = ({ pokemon }) => {
  return (
    <div className="pokemon-card">
      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        className="pokemon-image"
      />
      <h3>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h3>
      <p>#{pokemon.id}</p>
      <div className="types">
        {pokemon.types.map((typeObj) => (
          <span
            key={typeObj.type.name}
            className={`type ${typeObj.type.name}`}
          >
            {typeObj.type.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PokemonCard;
