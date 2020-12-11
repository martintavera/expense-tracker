import * as actions from '../actions/types';

const initialState = {
  msg: {},
  state: null,
  id: null
}

export default function(state = initialState, action) {
  switch(action.type){
    case actions.GET_RETURN_MESSAGE:
      return {
        msg: action.payload.msg,
        status: action.payload.status,
        id: action.payload.id
      }
    case actions.CLEAR_RETURN_MESSAGE:
      return {
        msg: {},
        state: null,
        id: null
      }
    default:
      return state
  }
}