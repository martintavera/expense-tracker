import * as actions from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: localStorage.getItem('isAuthenticated'),
  user: null,
  loading: false
}

export default function(state = initialState, action){
  switch(action.type){
    case actions.USER_LOADING:
      return {
        ...state,
        loading: true
      }
    case actions.USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload
      }
    case actions.LOGIN_SUCCESS:
    case actions.REGISTER_SUCCESS:
      localStorage.setItem('token',action.payload.token);
      localStorage.setItem('isAuthenticated',action.payload.isAuthenticated);
      return {
        ...state,
        ...action.payload,
        loading: false
      }
    case actions.AUTH_ERROR:
    case actions.LOGIN_FAIL:
    case actions.LOGOUT_SUCCESS:
    case actions.REGISTER_FAIL:
      localStorage.removeItem('token');
      localStorage.removeItem('isAuthenticated');
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        loading: false
      }
    default:
      return state
  }
}