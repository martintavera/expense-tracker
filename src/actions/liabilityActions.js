import axios from 'axios';
import * as actions from './types';
import {returnMessage} from './messageActions';
import {setContentLoading} from './contentActions';

export const getLiabilities = (user_id) => (dispatch) => {

  const action = 'liability';
  dispatch(setContentLoading(action));
  
  axios
    .get(`/api/liability/${user_id}`)
    .then(res => {
      dispatch({
        type: actions.GET_LIABILITIES,
        payload: res.data
      })
    })
    .catch(err => {
      dispatch(returnMessage(err.response.data, err.response.status));
    })
}

export const addLiability = (newItem) => (dispatch) => {

  const action = 'liability';
  dispatch(setContentLoading(action));

  axios
    .post('/api/liability',newItem)
    .then(res => {
      dispatch({
        type: actions.ADD_LIABILITY,
        payload: res.data.liability
      })

      dispatch(returnMessage(res.data, res.status, 'ADD_LIABILITY_SUCCESS'))

      dispatch({
        type: actions.ADD_LIABILITY_SUCCESS
      })
    })
    .catch(err => {
      dispatch(returnMessage(err.response.data, err.response.status, 'ADD_LIABILITY_FAIL'));

      dispatch({
        type: actions.ADD_LIABILITY_FAIL
      })
    });
}

export const deleteLiability = (id) => (dispatch) => {
  axios
    .delete(`/api/liability/${id}`)
    .then(res => {
      dispatch({
        type: actions.DELETE_LIABILITY,
        payload: id
      })
    })
    .catch(err => {
      dispatch(returnMessage(err.response.data, err.response.status));
    })
}