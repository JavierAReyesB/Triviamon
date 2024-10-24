import './Results.css'
import { Link, useLocation } from 'react-router-dom'
import InfoLevels from '../../components/InfoLevels/InfoLevels'

const Results = () => {
  const location = useLocation()
  const { score, guessedPokemons } = location.state || {
    score: 0,
    guessedPokemons: []
  }

  const handlePokemonClick = (id) => {
    window.open(`/pokemon-plus/${id}`, '_blank')
  }

  return (
    <div className='results-container'>
      <h2>Resultados Finales</h2>
      <InfoLevels levels={10} points={score} />
      <p>Tu puntuación fue: {score}</p>

      <h3>Pokémon acertados:</h3>
      <div className='guessed-pokemons'>
        {guessedPokemons.length > 0 ? (
          guessedPokemons.map((pokemon) => (
            <div
              key={pokemon.id}
              className='pokemon-item'
              onClick={() => handlePokemonClick(pokemon.id)}
            >
              <img
                src={pokemon.sprites.other['official-artwork'].front_default}
                alt={pokemon.name}
              />
              <p>{pokemon.name}</p>
            </div>
          ))
        ) : (
          <p>No has adivinado ningún Pokémon.</p>
        )}
      </div>

      <Link to='/'>
        <button>Volver al Inicio</button>
      </Link>
    </div>
  )
}

export default Results
