import './Trivia.css'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getRandomPokemons, fetchAnotherValidPokemon } from '../../services/api'

const Trivia = () => {
  const [pokemons, setPokemons] = useState([])
  const [correctName, setCorrectName] = useState('')
  const [options, setOptions] = useState([])
  const [score, setScore] = useState(0)
  const [level, setLevel] = useState(1)
  const [guessedPokemons, setGuessedPokemons] = useState([]) // Nuevo estado para los Pokémon adivinados
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      const data = await getRandomPokemons()
      if (Array.isArray(data) && data.length > 1) {
        // Validación adicional de array
        setPokemons(data)
        generateOptions(data)
      } else {
        console.warn('No se obtuvieron suficientes datos de Pokémon')
        setPokemons([]) // Asegura que pokemons es un array vacío si no hay datos válidos
      }
    }
    fetchData()
  }, [])

  const generateOptions = (pokemons) => {
    if (Array.isArray(pokemons) && pokemons.length > 1) {
      // Verifica que pokemons es un array con datos
      const correctName = pokemons[0].name
      setCorrectName(correctName)
      const otherOption = pokemons[1].name
      const shuffledOptions = [correctName, otherOption].sort(
        () => Math.random() - 0.5
      )
      setOptions(shuffledOptions)
    } else {
      setOptions([]) // Asegura que options sea un array vacío si no hay datos válidos
    }
  }

  const handleAnswer = async (selectedName) => {
    if (selectedName === correctName) {
      setScore((prevScore) => prevScore + 1)
      setGuessedPokemons((prevGuessed) => [...prevGuessed, pokemons[0]]) // Añade el Pokémon adivinado a la lista
    }

    if (level === 10) {
      navigate('/results', {
        state: {
          score: score + (selectedName === correctName ? 1 : 0),
          guessedPokemons // Enviamos los Pokémon adivinados a la página de resultados
        }
      })
    } else {
      setLevel((prevLevel) => prevLevel + 1)
      const newPokemon = await fetchAnotherValidPokemon()
      if (newPokemon) {
        const updatedPokemons = [newPokemon, await fetchAnotherValidPokemon()]
        if (updatedPokemons.every((p) => p)) {
          // Asegura que ambos Pokémon están definidos
          setPokemons(updatedPokemons)
          generateOptions(updatedPokemons)
        } else {
          console.warn(
            'No se obtuvieron datos válidos para los Pokémon adicionales'
          )
        }
      }
    }
  }

  return (
    <div className='trivia-container'>
      <h2>Trivia sobre Pokémon - Nivel {level}</h2>
      <p>Puntuación: {score}</p>
      {Array.isArray(pokemons) && pokemons.length > 0 ? (
        <div>
          <h3>¿Quién es este Pokémon?</h3>
          {pokemons[0]?.sprites?.other['official-artwork']?.front_default ? (
            <img
              src={pokemons[0].sprites.other['official-artwork'].front_default}
              alt={pokemons[0].name}
            />
          ) : (
            <p>Cargando imagen del Pokémon...</p>
          )}
          <h4>¿Cuál es el nombre de este Pokémon?</h4>
          {Array.isArray(options) && options.length > 0 ? (
            options.map((option, index) => (
              <button key={index} onClick={() => handleAnswer(option)}>
                {option}
              </button>
            ))
          ) : (
            <p>Cargando opciones...</p>
          )}
        </div>
      ) : (
        <p>Cargando pregunta...</p>
      )}
    </div>
  )
}

export default Trivia
