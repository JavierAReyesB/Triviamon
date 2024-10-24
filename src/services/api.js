import axios from 'axios'

const API_URL = 'https://pokeapi.co/api/v2/pokemon'

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export const fetchPokemonById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`)
    return response.data
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.log(`Pokémon con ID ${id} no encontrado. Buscando otro...`)
      return null
    } else {
      console.error(`Error obteniendo Pokémon con ID ${id}:`, error)
      return null
    }
  }
}

export const fetchAnotherValidPokemon = async () => {
  let validPokemon = null
  let attempts = 0

  while (!validPokemon && attempts < 5) {
    const randomId = Math.floor(Math.random() * 150) + 1
    validPokemon = await fetchPokemonById(randomId)
    attempts++
    await delay(1000)
  }

  if (!validPokemon) {
    console.log('No se encontró un Pokémon válido después de varios intentos.')
    return null
  }

  return validPokemon
}

export const getRandomPokemons = async () => {
  try {
    const pokemon1 = await fetchPokemonById(Math.floor(Math.random() * 150) + 1)
    const pokemon2 = await fetchPokemonById(Math.floor(Math.random() * 150) + 1)
    return [pokemon1, pokemon2]
  } catch (error) {
    console.error('Error obteniendo datos de la PokeAPI:', error)
    return null
  }
}
