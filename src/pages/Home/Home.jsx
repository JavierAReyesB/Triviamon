import { useNavigate } from 'react-router-dom'
import './Home.css'

const Home = () => {
  const navigate = useNavigate()

  const startGame = () => {
    navigate('/trivia')
  }

  return (
    <div className='home-container'>
      <h1>Bienvenido al Juego de Trivia de Anime</h1>
      <p>Responde preguntas sobre anime para ganar puntos.</p>
      <button onClick={startGame}>Comenzar Juego</button>
    </div>
  )
}

export default Home
