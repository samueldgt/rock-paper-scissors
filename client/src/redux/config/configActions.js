import axios from 'axios'
import { API_PORT } from '../../env'
import { 
  FETCH_CONFIG_MOVES_REQUEST, 
  FETCH_CONFIG_MOVES_SUCCESS, 
  FETCH_CONFIG_MOVES_FAILURE,
  FETCH_UPDATE_MOVES_RULES_REQUEST,
  FETCH_UPDATE_MOVES_RULES_SUCCESS,
  FETCH_UPDATE_MOVES_RULES_FAILURE } from './configTypes'

// GET ACTIONS -------------------------------------------------------------------

const fetchConfigMovesRequest = () => {
  return {
    type: FETCH_CONFIG_MOVES_REQUEST
  }
}

const fetchConfigMovesSuccess = moves => {
  return {
    type: FETCH_CONFIG_MOVES_SUCCESS,
    data: {
      moves
    }
  }
}

const fetchConfigMovesFailure = error => {
  return {
    type: FETCH_CONFIG_MOVES_FAILURE,
    data: {
      error
    }
  }
}

export const fetchConfigMoves = () => {
  return dispatch => {
    dispatch(fetchConfigMovesRequest())
    axios.get(`http://localhost:${API_PORT}/moves`)
    .then(response => {
      const moves = response.data.moves
      dispatch(fetchConfigMovesSuccess(moves))
    })
    .catch(error => {
      dispatch(fetchConfigMovesFailure(error.message))
    })
  }
}


// UPDATE ACTIONS -------------------------------------------------------------------

const fetchUpdateMovesRulesRequest = () => {
  return {
    type: FETCH_UPDATE_MOVES_RULES_REQUEST
  }
}

const fetchUpdateMovesRulesSuccess = moves => {
  return {
    type: FETCH_UPDATE_MOVES_RULES_SUCCESS,
    data: {
      moves
    }
  }
}

const fetchUpdateMovesRulesFailure = error => {
  return {
    type: FETCH_UPDATE_MOVES_RULES_FAILURE,
    data: {
      error
    }
  }
}

export const fetchUpdateMovesRules = moves => {
  return dispatch => {
    dispatch(fetchUpdateMovesRulesRequest())
    axios.post(`http://localhost:${API_PORT}/moves`, moves)
    .then(response => {
      const moves = response.data.moves
      console.log(response)
      dispatch(fetchUpdateMovesRulesSuccess(moves))
    })
    .catch(error => {
      dispatch(fetchUpdateMovesRulesFailure(error.message))
    })
  }
}