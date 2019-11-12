import React from 'react'
import { connect } from 'react-redux'
import { 
  incrementScore, 
  performMove, 
  incrementRound, 
  insertRoundWinnner, 
  fetchInsertRanking, 
  fetchUpdateRanking } from '../redux/actions'
import MovesInput from './MovesInput'
import Score from './Score'

class Round extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      move: '',
      error: '',
      inputStyle:''
    }
  }

  getMove = () => {
    return this.state.move
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
      inputStyle: '',
      error: ''
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const move = this.state.move
    if (move !== '') {
      const whoPlays = this.props.currentGame.moveHistory.length % 2
      const currentPlayer = (whoPlays === 0) ? 'player1' : 'player2'
      this.props.performMove(currentPlayer, move)
      this.setState({
        move: ''
      })
    } else {
      this.showError()
    }
  }

  findMovesPerRound = (round) => {
    let moves = []
    this.props.currentGame.moveHistory.forEach(moveInfo => {
      if (moveInfo.round === round) moves.push(moveInfo)
    })
    return moves
  }

  mapMovesAndKillers = () => {
    let killedBy = {}
    this.props.config.moves.forEach(moveInfo => {
      killedBy[moveInfo.move] = moveInfo.kills 
    })
    return killedBy
  }

  setCurrentScore() {
    const roundMoves = this.findMovesPerRound(this.props.currentGame.round - 1)
    const killedBy = this.mapMovesAndKillers()
    
    if(roundMoves.length === 2) {
      let p1Move = roundMoves[0].move
      let p2Move = roundMoves[1].move
            
      if (killedBy[p1Move] === p2Move) {
        this.props.insertRoundWinnner(this.props.currentGame.round - 1, this.props.players.player1.name)
        this.props.incrementScore('player1')
      } else if (killedBy[p2Move] === p1Move) {
        this.props.insertRoundWinnner(this.props.currentGame.round - 1, this.props.players.player2.name)
        this.props.incrementScore('player2')
      } else {
        this.props.insertRoundWinnner(this.props.currentGame.round - 1, '*Draw*')
      }
    }
  }

  showError = () => {
    const error = (
      <div className="alert alert-danger" role="alert">
        Please choose a move.
      </div>
    )
    this.setState({
      error,
      inputStyle: 'is-invalid'
    })
  }

  checkGameState = () => {
    const round = this.props.currentGame.round
    const p1Name = this.props.players.player1.name
    const p2Name = this.props.players.player2.name
    if (round === 0 || p1Name === '' || p2Name === '') this.props.history.replace('/game')
  }

  getPlayerRank = (name) => {
    return this.props.stats.ranking.find(rank => {
      return rank.player === name
    })
  }

  fetchRank = (name) => {
    let rank = this.getPlayerRank(name)
    if (!rank) {
      rank = {
        player: name,
        victories: 1
      }
      this.props.fetchInsertRanking(rank)
    } else {
      rank.victories++
      this.props.fetchUpdateRanking(rank)
    }
  }

  componentDidMount() {
    this.checkGameState()
  }
  
  componentDidUpdate(prevProps) {
    this.checkGameState()
    if (this.props.currentGame.moveHistory.length !== prevProps.currentGame.moveHistory.length) {
      const whoPlays = this.props.currentGame.moveHistory.length % 2
      const currentPlayer = (whoPlays !== 0) ? 'player1' : 'player2'
      if (currentPlayer === 'player2' && this.props.players.player1.score < 3 && this.props.players.player2.score < 3) {
        this.props.incrementRound()
      }
      this.props.history.push('/round')
    }
    if (this.props.currentGame.round !== prevProps.currentGame.round) {
      this.setCurrentScore()
    }
    if (this.props.players.player1.score !== prevProps.players.player1.score && this.props.players.player1.score >= 3 ) {
      this.fetchRank(this.props.players.player1.name)
      this.props.history.push('/winner')
    }
    if (this.props.players.player2.score !== prevProps.players.player2.score && this.props.players.player2.score >= 3 ) {
      this.fetchRank(this.props.players.player2.name)
      this.props.history.push('/winner')
    }
  }

  render() {
    const round = this.props.currentGame.round
    const p1Name = this.props.players.player1.name
    const p2Name = this.props.players.player2.name

    const currentPlayerName = ((this.props.currentGame.moveHistory.length % 2) === 0) ? p1Name : p2Name
  
    return (
      <div className="col-12">
        <div className="row">
          <div className="round col-sm-12 col-md-8 col-lg-6 offset-md-2 offset-lg-3">
            <form onSubmit={(e)=> this.handleSubmit(e)} >
              <h2 className="text-center">Round {round}</h2>
              <span className="content-heading">{ currentPlayerName }</span>
              <div className="form-group">
                <label htmlFor="move">Select Move</label>
                <MovesInput id="move" handleChange={this.handleChange.bind(this)} 
                  inputStyle={this.state.inputStyle} getMove={this.getMove} />
              </div>
              {this.state.error}
              <button type="submit" className="btn btn-info">Ok</button>
            </form>
          </div>
          <Score />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    players: state.players,
    currentGame: state.currentGame,
    config: state.config,
    stats: state.stats
  }
}

const mapDispatchToProps = dispatch => {
  return {
    incrementScore: player => dispatch(incrementScore(player)),
    performMove: (player, move) => dispatch(performMove(player, move)),
    incrementRound: () => dispatch(incrementRound()),
    insertRoundWinnner: (round, playerName) => dispatch(insertRoundWinnner(round, playerName)),
    fetchInsertRanking: (ranking) => dispatch(fetchInsertRanking(ranking)),
    fetchUpdateRanking: (ranking) => dispatch(fetchUpdateRanking(ranking)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Round)