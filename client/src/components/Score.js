import React from 'react'
import { connect } from 'react-redux'

class Score extends React.Component {

  getScoresPerRound() {
    const scores = this.props.currentGame.roundWinners.map( winner => {
      return (
        <tr key={ winner.round }>
          <th scope="row">{ winner.round }</th>
          <td><span className="player-name">{ winner.playerName }</span></td>
        </tr>
      )
    })
    return scores
  }

  render() {
    return (
      <div className="score col-sm-12 col-md-2 col-lg-3">
        <h2 className="text-center">Score</h2>
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Round</th>
              <th scope="col">Winner</th>
            </tr>
          </thead>
          <tbody>
            {this.getScoresPerRound()}
          </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentGame: state.currentGame
  }
}


export default connect(mapStateToProps)(Score)