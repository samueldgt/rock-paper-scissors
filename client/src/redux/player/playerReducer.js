import { SET_NAME, INCREMENT_SCORE } from './playerTypes'

const initialState = {
  player1: {
    name: '',
    score: 0
  },
  player2: {
    name: '',
    score: 0
  }
}

const playerReducer = (state = initialState, action) => {
  const data = action.data
  switch (action.type) {
    case SET_NAME: 
      return {
        ...state,
        [data.player]:{
          ...state[data.player],
          name: data.name
        }
      }
    case INCREMENT_SCORE: 
      return {
        ...state,
        [data.player]:{
          ...state[data.player],
          score: state[data.player].score + 1
        }
      }
    default:
      return state
  }
}

export default playerReducer