import React from 'react'
import { connect } from 'react-redux'
import { fetchUpdateMovesRules } from '../redux/actions'

class Rules extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      index: '',
      id: '',
      move: '',
      kills: '',
      action: 'add',
      rules: [],
      moveInputStyle: '',
      killsInputStyle: '',
      errors: [],
      savingErrors: []
    }
  }

  handleClick = (e, index, moveInfo, action) => {
    e.preventDefault()
    if (action === 'edit') {
      this.setState({
        index,
        id: moveInfo._id,
        move: moveInfo.move,
        kills: moveInfo.kills,
        action,
        moveInputStyle: '',
        killsInputStyle: '',
        errors: [],
        savingErrors: []
      })
      document.getElementById('move').focus()
    } else if (action === 'delete') {
      let newRules = [...this.state.rules]
      newRules.splice(index, 1)
      this.setState({
        index: '',
        id: '',
        move: '',
        kills: '',
        action: 'add',
        rules: newRules,
        moveInputStyle: '',
        killsInputStyle: '',
        errors: [],
        savingErrors: []
      })
    }
  }
  
  handleChange = (e) => {
    const name = e.target.id
    const value = e.target.value
    this.setState({
      [name]: value,
      errors: [],
      savingErrors: [],
      moveInputStyle: '',
      killsInputStyle: ''
    })
  }

  handleCancel = (e) => {
    e.preventDefault()
    this.setState({
      index: '',
      id: '',
      move: '',
      kills: '',
      action: 'add',
      moveInputStyle: '',
      killsInputStyle: '',
      errors: [],
      savingErrors: []
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const errors = this.validate()
    if (errors.length > 0){
      this.setState({
        errors
      })
    } else {
      let newRules = [...this.state.rules]

      if (this.state.action === 'add') {
        newRules.push({
          _id: '',
          move: this.state.move.toLowerCase(),
          kills: this.state.kills.toLowerCase()
        })
        this.setState({
          index: '',
          id: '',
          move: '',
          kills: '',
          action: 'add',
          rules: newRules,
          moveInputStyle: '',
          killsInputStyle: '',
          errors: [],
          savingErrors: []
        })
      } else if (this.state.action === 'edit') {
        newRules[this.state.index] = {
          ...newRules[this.state.index],
          move: this.state.move.toLowerCase(),
          kills: this.state.kills.toLowerCase()
        }
        this.setState({
          index: '',
          id: '',
          move: '',
          kills: '',
          action: 'add',
          rules: newRules,
          moveInputStyle: '',
          killsInputStyle: '',
          errors: [],
          savingErrors: []
        })
      }
    }
  }

  validate = () => {
    const { move, kills } = this.state
    let moveInputStyle, killsInputStyle = ''
    let errors = []
    if (move === '') {
      errors.push('Move cannot be blank.')
      moveInputStyle = 'is-invalid'
    }
    if (kills === '') {
      errors.push('Kills cannot be blank.')
      killsInputStyle = 'is-invalid'
    }
    if (move !== '' && kills !== '' && move === kills) {
      errors.push('A move cannot kills itself.')
      moveInputStyle = 'is-invalid'
      killsInputStyle = 'is-invalid'
    }
    this.setState({
      moveInputStyle,
      killsInputStyle
    })
    return errors
  }

  removeDuplicates = (arr) => {
    let s = new Set(arr);
    let it = s.values();
    return Array.from(it);
  }

  handleSave = (e) => {
    e.preventDefault()
    let errors = []

    const moves = []
    const kills = []
    const movesMapped = {}
    const killsMapped = {}

    if (this.state.rules.length === 0) {
      errors.push('There is no rule set.')
    }
    
    this.state.rules.forEach( rule => {
      moves.push(rule.move)
      kills.push(rule.kills)
      movesMapped[rule.move] = rule.kills
      killsMapped[rule.kills] = rule.move
    })

    const movesClean = this.removeDuplicates(moves)
    if (moves.length !== movesClean.length) {
      errors.push('There is reppeated moves.')
    }

    const killsClean = this.removeDuplicates(kills)
    if (kills.length !== killsClean.length) {
      errors.push('There is reppeated kills.')
    }


    for (let move in movesMapped){
      if (!killsMapped[move]) {
        errors.push(`The move "${move}" has no killer.`)
      }
      if (movesMapped[movesMapped[move]] === move) {
        errors.push(`The move "${move}" kills ${movesMapped[move]} and is killed by him too.`)
      }
    }

    for (let kills in killsMapped){
      if (!movesMapped[kills]) {
        errors.push(`The kill "${kills}" doesn't exist as move.`)
      }
    }

    if (errors.length === 0) {
      console.log('porakivoy')
      this.props.fetchUpdateMovesRules(this.state.rules)
      this.setState({
        index: '',
        id: '',
        move: '',
        kills: '',
        action: 'add',
        rules: [],
        moveInputStyle: '',
        killsInputStyle: '',
        errors: [],
        savingErrors: errors
      })
    } else {
      console.log('nu vamos')
      this.setState({
        index: '',
        id: '',
        move: '',
        kills: '',
        action: 'add',
        moveInputStyle: '',
        killsInputStyle: '',
        errors: [],
        savingErrors: errors
      })
    }
    
  }

  getRulesRows = () => {
    const moves = this.state.rules.map( (moveInfo, index) => {
      return (
        <tr key={ `row-${index}` }>
          <th scope="row"><span className="player-name">{ moveInfo.move }</span></th>
          <td>{ moveInfo.kills }</td>
          <td>
            <button key={ `edit-${index}` } onClick={ (e) => this.handleClick(e, index, moveInfo, 'edit') }
              className="btn btn-info mr-3" >Edit</button>
            <button key={ `delete-${index}` } onClick={ (e) => this.handleClick(e, index, moveInfo, 'delete') }
              className="btn btn-danger" >Delete</button>
          </td>
        </tr>
      )
    })
    return moves
  }

  getForm = () => {
    const errors = this.getErrors(this.state.errors)
    const action = (this.state.action === 'edit') ? 
    `Editing: ${this.state.move} => kills => ${this.state.kills}` : 'Adding a new move'
    return (
      <div className="rules-form col-sm-12 col-md-6 col-lg-5 offset-lg-1">
        <h2 className="text-center">Moves Form</h2>
        <span className="content-heading text-center">{action}</span>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="move">Move</label>
            <input id="move" type="text" className={`form-control ${this.state.moveInputStyle}`}
              onChange={this.handleChange} value={this.state.move} />
          </div>
          <div className="form-group">
            <label htmlFor="kills">Kills</label>
            <input id="kills" type="text" className={`form-control ${this.state.killsInputStyle}`}
              onChange={this.handleChange} value={this.state.kills} />
          </div>
          <input id="id" type="hidden" value={this.state.id}/>
          <input id="action" type="hidden" value={this.state.action}/>
          { errors }
          <button type="submit" className="btn btn-info action-tittle mr-3">{this.state.action} Rule</button>
          <button type="button" className="btn btn-danger action-tittle" onClick={this.handleCancel}>Cancel</button>
        </form>
      </div> 
    )
  }

  getSaveConditions = () => {
    let conditions = [
      'Moves and kills cannot be duplicate.',
      'A move cannot exist without it correspondient killer.',
      'A move have to be killed extrictly by another move, it cannot be killed by itself.',
      'A Kill caannot exist without ir correspondient Move.',
      'A move cannot be killed by the same killer that it kills. Example:',
      'if (paper => kills => rock) then (rock => cannot kills => paper) '
    ]

    return conditions.map( (text, index) => {
      return (
        <div key={ `condition-${index}` } className="alert alert-secondary" role="alert">
          { text }
        </div>
      )
    })
  }

  getSaveConfirm = () => {
    return (
      <div className="save-conditions col-sm-12 col-md-12 col-lg-10 offset-lg-1 text-center mt-5">
        <h3>Conditions to properly save the new cofiguration</h3>
        {this.getErrors(this.state.savingErrors)}
        {this.getSaveConditions()}
        <button type="button" className="btn btn-success action-tittle" onClick={this.handleSave}>Save Changes</button>
      </div>
    )
  }

  getErrors = (errors) => {
    return errors.map( (error, key) => {
      return (
        <div key={ `error-${key}` } className="alert alert-danger" role="alert">
          { error }
        </div>
      )
    })
  }

  getLoading = () => {
    return (
      <div className="start col-sm-12 col-md-6 col-lg-6 text-center mt-5">
        <img src="/loading.gif" className="mt-5" alt="Loading..."/>
      </div>
    )
  }

  componentDidMount() {
    this.setState({
      rules: this.props.config.moves
    })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.config.loading === true && this.props.config.loading === false && this.state.rules.length === 0) {
      this.setState({
        rules: this.props.config.moves
      })
    }
  }

  getRulesTable = () => {
    return (
      <div className="rules col-sm-12 col-md-6 col-lg-5">
        <h2 className="text-center">Game Rules</h2>
        <table className="table text-center">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Move</th>
              <th scope="col">Kills</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {this.getRulesRows()}
          </tbody>
        </table>
      </div>
    )
  }

  displayRules = () => {
    return (
      <>
      {this.getForm()} {this.getRulesTable()} {this.getSaveConfirm()}
      </>
    )
  }

  render() {
    return (this.props.config.loading) ? this.getLoading() : this.displayRules()
  }
}

const mapStateToProps = state => {
  return {
    config: state.config
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchUpdateMovesRules: (moves) => dispatch(fetchUpdateMovesRules(moves))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Rules)