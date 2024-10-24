import { NavLink } from 'react-router-dom'
import './Header.css'
import { useState } from 'react'

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  return (
    <header>
      <div className='burger-menu' onClick={toggleMenu}>
        <span className='burger-bar'></span>
        <span className='burger-bar'></span>
        <span className='burger-bar'></span>
      </div>

      <nav className={menuOpen ? 'mobile-menu open' : 'mobile-menu'}>
        <ul>
          <li>
            <NavLink to='/' onClick={toggleMenu}>
              Inicio
            </NavLink>
          </li>
          <li>
            <NavLink to='/trivia' onClick={toggleMenu}>
              Trivia
            </NavLink>
          </li>
          <li>
            <NavLink to='/trivia-plus' onClick={toggleMenu}>
              Trivia Plus
            </NavLink>
          </li>
          <li>
            <NavLink to='/results' onClick={toggleMenu}>
              Resultados
            </NavLink>
          </li>
        </ul>
      </nav>

      <nav className='desktop-menu'>
        <ul>
          <li>
            <NavLink to='/'>Inicio</NavLink>
          </li>
          <li>
            <NavLink to='/trivia'>Trivia</NavLink>
          </li>
          <li>
            <NavLink to='/trivia-plus'>Trivia Plus</NavLink>
          </li>
          <li>
            <NavLink to='/results'>Resultados</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
