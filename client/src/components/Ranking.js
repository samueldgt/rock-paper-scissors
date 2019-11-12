import React from 'react'
import { connect } from 'react-redux'

class Ranking extends React.Component {

  getRanking() {
    const ranking = this.props.stats.ranking.map( rank => {
      return (
        <tr key={ rank._id }>
          <th scope="row"><span className="player-name">{ rank.player }</span></th>
          <td>{ rank.victories }</td>
        </tr>
      )
    })
    return ranking
  }

  render() {
    return (
      <div className="ranking col-sm-12 col-md-8 col-lg-6">
        <h2 className="text-center">Ranking</h2>
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Player</th>
              <th scope="col">Victories</th>
            </tr>
          </thead>
          <tbody>
            {this.getRanking()}
          </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    stats: state.stats
  }
}

export default connect(mapStateToProps)(Ranking)