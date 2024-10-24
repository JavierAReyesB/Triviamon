import './PokemonDetailPlus.css'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchPokemonById } from '../../services/api'

const PokemonDetailPlus = () => {
  const { id } = useParams()
  const [pokemon, setPokemon] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getPokemon = async () => {
      const data = await fetchPokemonById(id)
      console.log(data)
      setPokemon(data)
      setLoading(false)
    }

    getPokemon()
  }, [id])

  if (loading)
    return (
      <p className='pokemon-detail-plus-loading'>
        Cargando detalles del Pokémon...
      </p>
    )

  return (
    <div className='pokemon-detail-plus-container'>
      {pokemon ? (
        <>
          <h2 className='pokemon-detail-plus-title'>{pokemon.name}</h2>
          <img
            className='pokemon-detail-plus-image'
            src={pokemon.sprites.other['official-artwork'].front_default}
            alt={pokemon.name}
          />
          <p className='pokemon-detail-plus-info'>Altura: {pokemon.height}</p>
          <p className='pokemon-detail-plus-info'>Peso: {pokemon.weight}</p>
          <p className='pokemon-detail-plus-info'>
            Tipos: {pokemon.types.map((type) => type.type.name).join(', ')}
          </p>{' '}
          <p className='pokemon-detail-plus-info'>
            Habilidades:{' '}
            {pokemon.abilities
              .map((ability) => ability.ability.name)
              .join(', ')}
          </p>{' '}
          <h4 className='pokemon-detail-plus-stats-title'>Estadísticas:</h4>
          <ul className='pokemon-detail-plus-stats-list'>
            {pokemon.stats.map((stat) => (
              <li
                key={stat.stat.name}
                className='pokemon-detail-plus-stat-item'
              >
                {stat.stat.name}: {stat.base_stat}
              </li>
            ))}{' '}
          </ul>
        </>
      ) : (
        <p className='pokemon-detail-plus-not-found'>Pokémon no encontrado.</p>
      )}
    </div>
  )
}

export default PokemonDetailPlus
