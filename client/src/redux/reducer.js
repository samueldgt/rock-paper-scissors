import { combineReducers } from 'redux'
import playerReducer from './player/playerReducer'
import roundReducer from './round/roundReducer'
import configReducer from './config/configReducer'
import rankingReducer from './ranking/rankingReducer'


const appReducer = combineReducers({
  players: playerReducer,
  currentGame: roundReducer,
  config: configReducer,
  stats: rankingReducer
})

const rootReducer = (state, action) => {
  // when a play again action is dispatched it will reset redux state
  if (action.type === 'PLAY_AGAIN') {
    // we keep a reference of the keys we want to maintain
    // other keys will be passed as undefined and this will call
    // reducers with an initial state
    const { config, stats } = state;

    state = { config, stats };
  }

  return appReducer(state, action);
};

export default rootReducer