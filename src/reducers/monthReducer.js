import * as actions from '../actions/types';

const initialState = {
  months: [],
  loading: false
}

const monthReducer = (state = initialState, action) => {
  switch(action.type) {
    case actions.GET_MONTHS:
      return {
        ...state,
        months: action.payload,
        loading: false
      }
    case actions.MONTH_LOADING:
      return {
        ...state,
        loading: true
      }
    default:
      return state
  }
}

export default monthReducer;