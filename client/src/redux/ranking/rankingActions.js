import axios from 'axios'
import { API_PORT } from '../../env'
import { 
  FETCH_INSERT_RANKING_REQUEST, 
  FETCH_INSERT_RANKING_SUCCESS, 
  FETCH_INSERT_RANKING_FAILURE,
  FETCH_GET_RANKING_REQUEST,
  FETCH_GET_RANKING_SUCCESS,
  FETCH_GET_RANKING_FAILURE,
  FETCH_UPDATE_RANKING_REQUEST,
  FETCH_UPDATE_RANKING_SUCCESS,
  FETCH_UPDATE_RANKING_FAILURE } from './rankingTypes'

// GET ACTIONS --------------------------------------------------

const fetchGetRankingRequest = () => {
  return {
    type: FETCH_GET_RANKING_REQUEST
  }
}

const fetchGetRankingSuccess = ranking => {
  return {
    type: FETCH_GET_RANKING_SUCCESS,
    data: {
      ranking
    }
  }
}

const fetchGetRankingFailure = error => {
  return {
    type: FETCH_GET_RANKING_FAILURE,
    data: {
      error
    }
  }
}

export const fetchGetRanking = ranking => {
  return dispatch => {
    dispatch(fetchGetRankingRequest())
    axios.get(`http://localhost:${API_PORT}/ranking`)
    .then(response => {
      const ranking = response.data.ranking
      dispatch(fetchGetRankingSuccess(ranking))
    })
    .catch(error => {
      dispatch(fetchGetRankingFailure(error.message))
    })
  }
}

// INSERT ACTIONS --------------------------------------------------

const fetchInsertRankingRequest = () => {
  return {
    type: FETCH_INSERT_RANKING_REQUEST
  }
}

const fetchInsertRankingSuccess = ranking => {
  return {
    type: FETCH_INSERT_RANKING_SUCCESS,
    data: {
      ranking
    }
  }
}

const fetchInsertRankingFailure = error => {
  return {
    type: FETCH_INSERT_RANKING_FAILURE,
    data: {
      error
    }
  }
}

export const fetchInsertRanking = ranking => {
  return dispatch => {
    dispatch(fetchInsertRankingRequest())
    axios.post(`http://localhost:${API_PORT}/ranking`, ranking)
    .then(response => {
      const ranking = response.data.ranking
      dispatch(fetchInsertRankingSuccess(ranking))
    })
    .catch(error => {
      dispatch(fetchInsertRankingFailure(error.message))
    })
  }
}

// UPDATE ACTIONS --------------------------------------------------

const fetchUpdateRankingRequest = () => {
  return {
    type: FETCH_UPDATE_RANKING_REQUEST
  }
}

const fetchUpdateRankingSuccess = ranking => {
  return {
    type: FETCH_UPDATE_RANKING_SUCCESS,
    data: {
      ranking
    }
  }
}

const fetchUpdateRankingFailure = error => {
  return {
    type: FETCH_UPDATE_RANKING_FAILURE,
    data: {
      error
    }
  }
}

export const fetchUpdateRanking = ranking => {
  return dispatch => {
    dispatch(fetchUpdateRankingRequest())
    axios.patch(`http://localhost:${API_PORT}/ranking/${ranking._id}`, ranking)
    .then(response => {
      const ranking = response.data.ranking
      dispatch(fetchUpdateRankingSuccess(ranking))
    })
    .catch(error => {
      dispatch(fetchUpdateRankingFailure(error.message))
    })
  }
}