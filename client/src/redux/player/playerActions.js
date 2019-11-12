import { SET_NAME, INCREMENT_SCORE } from './playerTypes'

export const setName = (player, name) => {
  return {
    type: SET_NAME,
    data: {
      player,
      name
    }
  }
}

export const incrementScore = player => {
  return {
    type: INCREMENT_SCORE,
    data: {
      player
    }
  }
}