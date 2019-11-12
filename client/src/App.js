import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchConfigMoves, fetchGetRanking } from './redux/actions'

import './App.css'
import Menu from './components/layout/Menu'
import Start from './components/Start'
import Round from './components/Round'
import NotFound from './components/NotFound'
import Winner from './components/Winner'
import Errors from './components/Errors'
import Ranking from './components/Ranking'
import Rules from './components/Rules'
import About from './components/About'

class App extends React.Component {
  
  componentDidMount() {
    this.props.fetchConfigMoves()
    this.props.fetchGetRanking()
  }

  render() {
    return (
        <Router>
          <div className="app">
            <Menu />
            <div className="container content">
              <div className="row justify-content-center">
                <Errors />
                <Switch>
                  <Route exact path="/" component={Start} />
                  <Route path="/game" component={Start} />
                  <Route path="/round" component={Round} />
                  <Route path="/winner" component={Winner} />
                  <Route path="/ranking" component={Ranking} />
                  <Route path="/config" component={Rules} />
                  <Route path="/about" component={About} />
                  <Route path="*" component={NotFound} />
                </Switch>
              </div>
            </div>
          </div>
        </Router>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchConfigMoves: () => dispatch(fetchConfigMoves()),
    fetchGetRanking: () => dispatch(fetchGetRanking())
  }
}

export default connect(null, mapDispatchToProps)(App)

