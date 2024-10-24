import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Trivia from './pages/Trivia/Trivia'
import Results from './pages/Results/Results'
import Header from './components/Header/Header'
import TriviaPlus from './pages/TriviaPlus/TriviaPlus'
import PokemonDetailPlus from './pages/TriviaPlus/PokemonDetailPlus'

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/trivia' element={<Trivia />} />
        <Route path='/results' element={<Results />} />
        <Route path='/trivia-plus' element={<TriviaPlus />} />
        <Route path='/pokemon-plus/:id' element={<PokemonDetailPlus />} />
      </Routes>
    </div>
  )
}

export default App
