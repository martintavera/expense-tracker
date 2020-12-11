import * as actions from '../actions/types';

const initialState = {
  liability: [],
  loading: false
}

const liabilityReducer = (state = initialState, action) => {
  switch(action.type) {
    case actions.GET_LIABILITIES:
      return {
        ...state,
        liability: action.payload,
        loading: false
      }
    case actions.ADD_LIABILITY:
      return {
        ...state,
        liability: action.payload,
        loading: false
      }
    case actions.DELETE_LIABILITY:
      return {
        ...state,
        liability: state.liability.filter(liability => liability._id !== action.payload)
      }
    case actions.LIABILITY_LOADING:
      return {
        ...state,
        loading: true
      }
    case actions.ADD_LIABILITY_SUCCESS:
    case actions.ADD_LIABILITY_FAIL:
      return {
        ...state,
        loading: false
      }
    default:
      return state
  }
}

export default liabilityReducer;