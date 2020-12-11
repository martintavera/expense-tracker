import axios from 'axios';
import * as actions from './types';
import {returnMessage} from './messageActions';
import {setContentLoading} from './contentActions';

//Check token & load user
export const loadUser = () => (dispatch, getState) => {
  //User loading
  const action = 'user';
  dispatch(setContentLoading(action));

  axios.get('/api/auth/user', tokenConfig(getState))
    .then(res => dispatch({
      type: actions.USER_LOADED,
      payload: res.data
    }))
    .catch(err => {
      dispatch(returnMessage(err.response.data, err.response.status));
      dispatch({
        type: actions.AUTH_ERROR
      })
    })
}

//Register User
export const register = ({first_name, last_name, email, password}) => (dispatch) => {
  //Headers
  const config = {
    headers: {
      "Content-type" : "application/json"
    }
  }

  //Request Body
  const body = JSON.stringify({first_name, last_name, email, password})

  //POST request
  axios.post('/api/users',body, config)
    .then(res => dispatch({
      type: actions.REGISTER_SUCCESS,
      payload: res.data
    }))
    .catch(err => {
      dispatch(returnMessage(err.response.data, err.response.status, 'REGISTER_FAIL'));
      dispatch({
        type: actions.REGISTER_FAIL
      })
    })
}

//Login User
export const login = ({email, password}) => (dispatch) => {
  //Headers
  const config = {
    headers: {
      "Content-type" : "application/json"
    }
  }

  //Request Body
  const body = JSON.stringify({email, password});
  //POST Request
  axios.post('/api/auth',body, config)
    .then(res => dispatch({
      type: actions.LOGIN_SUCCESS,
      payload: res.data
    }))
    .catch(err => {
      dispatch(returnMessage(err.response.data, err.response.status, 'LOGIN_FAIL'));
      dispatch({
        type: actions.LOGIN_FAIL
      })
    })
}

//Logout User
export const logout = () => {
  return {
    type: actions.LOGOUT_SUCCESS
  }
}

//Setup config/headers and token
export const tokenConfig = (getState) => {
  //Get token from local storage
  const token = getState().auth.token;

  //Headers
  const config = {
    headers: {
      "Content-type" : "application/json"
    }
  }

  //If token, add to headers
  if(token){
    config.headers["x-auth-token"] = token;
  }
  
  return config;
}