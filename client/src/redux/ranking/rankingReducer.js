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

const initialState = {
  loading: false,
  ranking: [],
  error: ''
}

const rankingReducer = (state = initialState, action) => {
  const data = action.data
  switch (action.type) {
    // GET ----------------------------------------------------------
    case FETCH_GET_RANKING_REQUEST:
      return {
        ...state,
        loading: true
      }
    case FETCH_GET_RANKING_SUCCESS:
      return {
        ...state,
        loading: false,
        ranking: data.ranking,
        error: ''
      }
    case FETCH_GET_RANKING_FAILURE:
      return {
        ...state,
        loading: false,
        error: data.error
      }
    // INSERT ----------------------------------------------------------
    case FETCH_INSERT_RANKING_REQUEST:
      return {
        ...state,
        loading: true
      }
    case FETCH_INSERT_RANKING_SUCCESS:
      return {
        ...state,
        loading: false,
        ranking: [
          ...state.ranking,
          data.ranking
        ],
        error: ''
      }
    case FETCH_INSERT_RANKING_FAILURE:
      return {
        ...state,
        loading: false,
        error: data.error
      }
    // UPDATE ----------------------------------------------------------
    case FETCH_UPDATE_RANKING_REQUEST:
      return {
        ...state,
        loading: true
      }
    case FETCH_UPDATE_RANKING_SUCCESS:
      const index = state.ranking.findIndex(rank => {
        return data.ranking._id === rank._id
      })
      let ranking = [...state.ranking]
      if (index >= 0) ranking[index] = data.ranking
      return {
        ...state,
        loading: false,
        ranking,
        error: ''
      }
    case FETCH_UPDATE_RANKING_FAILURE:
      return {
        ...state,
        loading: false,
        error: data.error
      }
    default:
      return state
  }
}

export default rankingReducer