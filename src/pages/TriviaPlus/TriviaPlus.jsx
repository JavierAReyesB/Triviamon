import './TriviaPlus.css'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getRandomPokemons, fetchAnotherValidPokemon } from '../../services/api'

const TriviaPlus = () => {
  const [pokemons, setPokemons] = useState([])
  const [correctName, setCorrectName] = useState('')
  const [options, setOptions] = useState([])
  const [score, setScore] = useState(0)
  const [level, setLevel] = useState(1)
  const [showDetailsButton, setShowDetailsButton] = useState(false)
  const [isSilhouette, setIsSilhouette] = useState(true)
  const [guessedPokemons, setGuessedPokemons] = useState([])
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
    setShowDetailsButton(false)
    setIsSilhouette(true)
  }

  const handleAnswer = async (selectedName) => {
    if (selectedName === correctName) {
      setScore((prevScore) => prevScore + 1)
      setShowDetailsButton(true)
      setIsSilhouette(false)

      setGuessedPokemons((prevGuessed) => [...prevGuessed, pokemons[0]])
    }

    if (level === 10) {
      navigate('/results', {
        state: {
          score: score + (selectedName === correctName ? 1 : 0),
          guessedPokemons
        }
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

  const openDetails = () => {
    window.open(`/pokemon-plus/${pokemons[0].id}`, '_blank')
  }

  return (
    <div className='trivia-plus-container'>
      <h2>Trivia Plus - Nivel {level}</h2>
      <p>Puntuación: {score}</p>
      {pokemons.length > 0 ? (
        <div>
          <h3>¿Quién es este Pokémon?</h3>
          <img
            className={isSilhouette ? 'trivia-plus-silhouette' : ''}
            src={pokemons[0].sprites.other['official-artwork'].front_default}
            alt={pokemons[0].name}
          />
          <h4>¿Cuál es el nombre de este Pokémon?</h4>
          {options.map((option, index) => (
            <button key={index} onClick={() => handleAnswer(option)}>
              {option}
            </button>
          ))}
          {showDetailsButton && (
            <button onClick={openDetails}>Ver Detalles</button>
          )}
        </div>
      ) : (
        <p>Cargando pregunta...</p>
      )}
    </div>
  )
}

export default TriviaPlus
