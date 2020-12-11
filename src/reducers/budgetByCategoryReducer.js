import * as actions from '../actions/types';

const initialState = {
  budgetByCategory: [],
  loading: false
}

const budgetByCategoryReducer = (state = initialState, action) => {
  switch(action.type) {
    case actions.GET_BUDGET_BY_CATEGORY:
      return {
        ...state,
        budgetByCategory: action.payload,
        loading: false
      }
    case actions.BUDGET_BY_CATEGORY_LOADING:
      return {
        ...state,
        loading: true
      }
    default:
      return state
  }
}

export default budgetByCategoryReducer;