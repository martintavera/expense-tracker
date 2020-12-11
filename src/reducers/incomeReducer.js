import * as actions from '../actions/types';

const initialState = {
  income: [],
  loading: false
}

const incomeReducer = (state = initialState, action) => {
  switch(action.type) {
    case actions.GET_INCOME:
      return {
        ...state,
        income: action.payload,
        loading: false
      }
    case actions.INCOME_LOADING:
      return {
        ...state,
        loading: true
      }
    case actions.UPDATE_INCOME_SUCCESS:
    case actions.UPDATE_INCOME_FAIL:
      return {
        ...state,
        loading: false
      }
    default:
      return state
  }
}

export default incomeReducer;