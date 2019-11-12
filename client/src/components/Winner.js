import React from 'react'
import { connect } from 'react-redux'

class Winner extends React.Component {

  checkGameState = () => {
    const round = this.props.currentGame.round
    const p1Score = this.props.players.player1.score
    const p2Score = this.props.players.player2.score
    if (round === 0 || (p1Score < 3 && p2Score < 3)) this.props.history.goBack()
  }

  handleClick = (e) => {
    this.props.playAgain()
    this.props.history.push('/game')
  }

  componentDidMount() {
    this.checkGameState()
  }

  componentDidUpdate() {
    this.checkGameState()
  }

  render() {
    const p1Score = this.props.players.player1.score

    const winnerName = (p1Score >= 3) ? this.props.players.player1.name : this.props.players.player2.name
    return (
      <div className="winner col-sm-12 col-md-8 col-lg-6 text-center">
        <h2>We have a WINNER!!</h2>
        <h1><span className="player-name">{winnerName}</span> is the new EMPEROR!</h1>
        <button className="btn btn-info btn-play-again" onClick={this.handleClick}>Play Again</button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    players: state.players,
    currentGame: state.currentGame
  }
}

const mapDispatchToProps = dispatch => {
  return {
    playAgain: () => dispatch({type: 'PLAY_AGAIN'}),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Winner)