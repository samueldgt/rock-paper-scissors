import React from 'react'
import { connect } from 'react-redux'

class Errors extends React.Component {

  render() {

    let errors = []
    const message = '(If the problem persist, please check the server PORT configuration)'
    if (this.props.config.error !== '') {
      const error = (
        <div key={errors.length} className="alert alert-danger text-center" role="alert">
          { this.props.config.error } { message }
        </div>
      )
      errors.push(error)
    }
    if (this.props.stats.error !== '') {
      const error = (
        <div key={errors.length} className="alert alert-danger text-center" role="alert">
          { this.props.stats.error } { message }
        </div>
      )
      errors.push(error)
    }

    return (
      <div className="global-errors col-12">
        {errors}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    config: state.config,
    stats: state.stats
  }
}

export default connect(mapStateToProps)(Errors)