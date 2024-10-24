import PropTypes from 'prop-types'
import './InfoLevels.css'

const InfoLevels = ({ levels, points }) => {
  return (
    <div className='info'>
      <p className='level'>Nivel {levels}</p>
      <p className='points'>Puntos {points}</p>
    </div>
  )
}

InfoLevels.propTypes = {
  levels: PropTypes.number.isRequired,
  points: PropTypes.number.isRequired
}

export default InfoLevels
