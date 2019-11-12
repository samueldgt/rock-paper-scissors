import React from 'react'
import { connect } from 'react-redux'

const MovesInput = (props) => {
  const optionMoves = props.config.moves.map((move, key) => {
    return (
      <option key={key+1} value={move.move}>{move.move}</option>
    )
  })
    
  return (
    <select id={props.id} className={`form-control ${props.inputStyle}`} value={props.getMove()} onChange={(e) => props.handleChange(e)} >
      <option key="0" value="" defaultValue >Moves...</option>
      {optionMoves}
    </select>
  )
}

const mapStateToProps = state => {
  return {
    config: state.config
  }
}

export default connect(mapStateToProps)(MovesInput)