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
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      const data = await getRandomPokemons()
      if (data && data.length > 1) {
        setPokemons(data)
        generateOptions(data)
      }
    }
    fetchData()
  }, [])

  const generateOptions = (pokemons) => {
    const correctName = pokemons[0].name
    setCorrectName(correctName)
    const otherOption = pokemons[1].name
    const shuffledOptions = [correctName, otherOption].sort(
      () => Math.random() - 0.5
    )
    setOptions(shuffledOptions)
  }

  const handleAnswer = async (selectedName) => {
    if (selectedName === correctName) {
      setScore((prevScore) => prevScore + 1)
    }

    if (level === 10) {
      navigate('/results', {
        state: { score: score + (selectedName === correctName ? 1 : 0) }
      })
    } else {
      setLevel((prevLevel) => prevLevel + 1)
      const newPokemon = await fetchAnotherValidPokemon()
      if (newPokemon) {
        const updatedPokemons = [newPokemon, await fetchAnotherValidPokemon()]
        setPokemons(updatedPokemons)
        generateOptions(updatedPokemons)
      }
    }
  }

  return (
    <div className='trivia-container'>
      <h2>Trivia sobre Pokémon - Nivel {level}</h2>
      <p>Puntuación: {score}</p> {/* Mostrar la puntuación actual */}
      {pokemons.length > 0 ? (
        <div>
          <h3>¿Quién es este Pokémon?</h3>
          <img
            src={pokemons[0].sprites.other['official-artwork'].front_default}
            alt={pokemons[0].name}
          />
          <h4>¿Cuál es el nombre de este Pokémon?</h4>
          {options.map((option, index) => (
            <button key={index} onClick={() => handleAnswer(option)}>
              {option}
            </button>
          ))}
        </div>
      ) : (
        <p>Cargando pregunta...</p>
      )}
    </div>
  )
}

export default Trivia
