import { 
  FETCH_CONFIG_MOVES_REQUEST, 
  FETCH_CONFIG_MOVES_SUCCESS, 
  FETCH_CONFIG_MOVES_FAILURE,
  FETCH_UPDATE_MOVES_RULES_REQUEST,
  FETCH_UPDATE_MOVES_RULES_SUCCESS,
  FETCH_UPDATE_MOVES_RULES_FAILURE } from './configTypes'

const initialState = {
  loading: false,
  moves: [],
  error: ''
}

const configReducer = (state = initialState, action) => {
  const data = action.data
  switch (action.type) {
    // GET --------------------------------------------------------------------
    case FETCH_CONFIG_MOVES_REQUEST:
      return {
        ...state,
        loading: true
      }
    case FETCH_CONFIG_MOVES_SUCCESS:
      return {
        ...state,
        loading: false,
        moves: data.moves,
        error: ''
      }
    case FETCH_CONFIG_MOVES_FAILURE:
      return {
        ...state,
        loading: false,
        error: data.error
      }

    // UPDATE --------------------------------------------------------------------
    case FETCH_UPDATE_MOVES_RULES_REQUEST:
      return {
        ...state,
        loading: true
      }
    case FETCH_UPDATE_MOVES_RULES_SUCCESS:
      return {
        ...state,
        loading: false,
        moves: data.moves,
        error: ''
      }
    case FETCH_UPDATE_MOVES_RULES_FAILURE:
      return {
        ...state,
        loading: false,
        error: data.error
      }
    default:
      return state
  }
}

export default configReducer