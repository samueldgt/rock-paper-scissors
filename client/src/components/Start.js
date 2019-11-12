import React from 'react'
import { connect } from 'react-redux'
import { setName, incrementRound } from '../redux/actions'

class Start extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      player1: '',
      player2: '',
      errors: [],
      p1InputStyle: '',
      p2InputStyle: ''
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const errors = this.validate()
    if (errors.length > 0){
      this.setState({
        errors
      })
    } else {
      this.props.setName('player1', this.state.player1) 
      this.props.setName('player2', this.state.player2) 
      this.props.incrementRound()
      this.props.history.push('/round')
    }
  }

  handleChange = (e) => {
    const name = e.target.id
    const value = e.target.value
    this.setState({
      [name]: value,
      errors: [],
      p1InputStyle: '',
      p2InputStyle: ''
    })
  }

  validate = () => {
    const { player1, player2 } = this.state
    let p1InputStyle, p2InputStyle = ''
    let errors = []
    if (player1 === '') {
      errors.push({
        field: 'p1',
        message: 'Player 1 name cannot be blank.'
      })
      p1InputStyle = 'is-invalid'
    }
    if (player2 === '') {
      errors.push({
        field: 'p2',
        message: 'Player 2 name cannot be blank.'
      })
      p2InputStyle = 'is-invalid'
    }
    if (player1 !== '' && player2 !== '' && player1 === player2) {
      errors.push({
        field: 'both',
        message: 'Both players cannot have the same name.'
      })
      p1InputStyle = 'is-invalid'
      p2InputStyle = 'is-invalid'
    }

    this.setState({
      p1InputStyle,
      p2InputStyle
    })
    return errors
  }

  getErrors = () => {
    return this.state.errors.map( (error, key) => {
      return (
        <div key={key} className="alert alert-danger" role="alert">
          { error.message }
        </div>
      )
    })
  }

  render() {
    const errors = this.getErrors()
    const loading = (
      <div className="start col-sm-12 col-md-6 col-lg-6 text-center mt-5">
        <img src="/loading.gif" className="mt-5" alt="Loading..."/>
      </div>
    )
    const start = (
      <div className="start col-sm-12 col-md-8 col-lg-6">
        <h2 className="text-center">New Game</h2>
        <span className="content-heading text-center">Enter Player's Names</span>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="player1">Player 1</label>
            <input id="player1" type="text" className={`form-control ${this.state.p1InputStyle}`} placeholder="Enter the name"
              onChange={this.handleChange} value={this.state.player1} />
          </div>
          <div className="form-group">
            <label htmlFor="player2">Player 2</label>
            <input id="player2" type="text" className={`form-control ${this.state.p2InputStyle}`} placeholder="Enter the name"
              onChange={this.handleChange} value={this.state.player2} />
          </div>
          { errors }
          <button type="submit" className="btn btn-info">Start</button>
        </form>
      </div>
    )
    return this.props.config.loading ? loading : start
  }
}

const mapStateToProps = state => {
  return {
    config: state.config
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setName: (player, name) => dispatch(setName(player, name)),
    incrementRound: () => dispatch(incrementRound())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Start)