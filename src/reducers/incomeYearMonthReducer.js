import * as actions from '../actions/types';

const initialState = {
  incomeYearMonth : [],
  loading: false
}

const incomeYearMonthReducer = (state = initialState, action) => {
  switch(action.type) {
    case actions.GET_YEAR_MONTH_INCOME:
      return {
        ...state,
        incomeYearMonth: action.payload,
        loading: false
      }
    case actions.YEAR_MONTH_LOADING:
      return {
        ...state,
        loading: true
      }
    default:
      return state
  }
}

export default incomeYearMonthReducer;