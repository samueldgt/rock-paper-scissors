import { INCREMENT_ROUND, PERFORM_MOVE, INSERT_ROUND_WINNER } from './roundTypes'

const initialState = {
  round: 0,
  moveHistory: [],
  roundWinners: []
}

const roundReducer = (state = initialState, action) => {
  const data = action.data
  switch (action.type) {
    case INCREMENT_ROUND:
      return {
        ...state,
        round: state.round + 1
      }
    case PERFORM_MOVE:
      return {
        ...state,
        moveHistory: [
          ...state.moveHistory,
          {
            round: state.round,
            player: data.player,
            move: data.move
          }
        ]
      }
    case INSERT_ROUND_WINNER:
      return {
        ...state,
        roundWinners: [
          ...state.roundWinners,
          {
            round: data.round,
            playerName: data.playerName,
          }
        ]
      }
    default:
      return state
  }
}

export default roundReducer