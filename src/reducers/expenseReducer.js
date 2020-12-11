import * as actions from '../actions/types';

const initialState = {
  expenses: [],
  loading: false
}

const expenseReducer = (state = initialState, action) => {
  switch(action.type) {
    case actions.GET_EXPENSES:
      return {
        ...state,
        expenses: action.payload,
        loading: false
      }
    case actions.DELETE_EXPENSE:
      return {
        ...state,
        expenses: state.expenses.filter(expense => expense._id !== action.payload)
      }
    case actions.ADD_EXPENSE:
      return {
        ...state,
        expenses: [action.payload, ...state.expenses]
      }
    case actions.EXPENSE_LOADING:
      return {
        ...state,
        loading: true
      }
    case actions.ADD_EXPENSE_FAIL:
      return {
        ...state,
        loading: false
      }
    default:
      return state
  }
}

export default expenseReducer;