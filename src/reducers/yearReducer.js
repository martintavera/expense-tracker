import * as actions from '../actions/types';

const initialState = {
  years: [],
  loading: false
}

const yearReducer = (state = initialState, action) => {
  switch(action.type) {
    case actions.GET_YEARS:
      return {
        ...state,
        years: action.payload,
        loading: false
      }
    case actions.YEAR_LOADING:
      return {
        ...state,
        loading: true
      }
    default:
      return state
  }
}

export default yearReducer;