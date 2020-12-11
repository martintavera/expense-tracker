import * as actions from '../actions/types';

const initialState = {
  categories: [],
  loading: false,
  category_added: false
}

const categoryReducer = (state = initialState, action) => {
  switch(action.type) {
    case actions.GET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
        loading: false,
        category_added: false
      }
    case actions.DELETE_CATEGORY:
      return {
        ...state,
        categories: state.categories.filter(category => category._id !== action.payload),
        category_added: false
      }
    case actions.ADD_CATEGORY:
      return {
        ...state,
        categories: [action.payload, ...state.categories],
        category_added: true
      }
    case actions.CATEGORY_LOADING:
      return {
        ...state,
        loading: true,
        category_added: false
      }
    case actions.ADD_CATEGORY_FAIL:
    case actions.ADDED_CATEGORY_RESET:
      return {
        ...state,
        loading: false,
        category_added: false
      }
    default:
      return state
  }
}

export default categoryReducer;