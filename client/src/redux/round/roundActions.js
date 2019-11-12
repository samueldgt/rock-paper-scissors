import { INCREMENT_ROUND, PERFORM_MOVE, INSERT_ROUND_WINNER } from './roundTypes'

export const incrementRound = () => {
  return {
    type: INCREMENT_ROUND
  }
}

export const performMove = (player, move) => {
  return {
    type: PERFORM_MOVE,
    data: {
      player,
      move
    }
  }
}

export const insertRoundWinnner = (round, playerName) => {
  return {
    type: INSERT_ROUND_WINNER,
    data: {
      round,
      playerName
    }
  }
}