import * as actions from '../actions/types';

const initialState = {
  report: [],
  loading: false
}

const reportReducer = (state = initialState, action) => {
  switch(action.type) {
    case actions.GET_REPORT:
      return {
        ...state,
        report: action.payload,
        loading: false
      }
    case actions.REPORT_LOADING:
      return {
        ...state,
        loading: true
      }
    default:
      return state
  }
}

export default reportReducer;