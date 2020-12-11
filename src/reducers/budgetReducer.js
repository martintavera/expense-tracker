import * as actions from '../actions/types';

const initialState = {
  budget: [],
  loading: false
}

const budgetReducer = (state = initialState, action) => {
  switch(action.type) {
    case actions.GET_BUDGET:
      return {
        ...state,
        budget: action.payload,
        loading: false
      }
    case actions.ADD_BUDGET:
      return {
        ...state,
        budget: action.payload,
        loading: false
      }
    case actions.DELETE_BUDGET:
      return {
        ...state,
        budget: state.budget.filter(budget => budget._id !== action.payload)
      }
    case actions.BUDGET_LOADING:
      return {
        ...state,
        loading: true
      }
    case actions.ADD_BUDGET_SUCCESS:
    case actions.ADD_BUDGET_FAIL:
      return {
        ...state,
        loading: false
      }
    default:
      return state
  }
}

export default budgetReducer;