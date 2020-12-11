import axios from 'axios';
import * as actions from './types';
import {returnMessage} from './messageActions';
import {setContentLoading} from './contentActions';

export const getBudget = (year_number, month_name, user_id) => (dispatch) => {

  const action = 'budget';
  dispatch(setContentLoading(action));

  axios
    .get(`/api/budget/${year_number}/${month_name}/${user_id}`)
    .then(res => {
      dispatch({
        type: actions.GET_BUDGET,
        payload: res.data
      })
    })
    .catch(err => {
      dispatch(returnMessage(err.response.data, err.response.status));
    })
}

export const addBudget = (newBudget) => (dispatch) => {

  const action = 'budget';
  dispatch(setContentLoading(action));

  axios
    .post('/api/budget',newBudget)
    .then(res => {
      dispatch({
        type: actions.ADD_BUDGET,
        payload: res.data.budget
      })

      dispatch(returnMessage(res.data, res.status, 'ADD_BUDGET_SUCCESS'))

      dispatch({
        type: actions.ADD_BUDGET_SUCCESS
      })
    })
    .catch(err => {
      dispatch(returnMessage(err.response.data, err.response.status, 'ADD_BUDGET_FAIL'));

      dispatch({
        type: actions.ADD_BUDGET_FAIL
      })
    });
}

export const deleteBudget = (id) => (dispatch) => {
  axios
    .delete(`/api/budget/${id}`)
    .then(res => {
      dispatch({
        type: actions.DELETE_BUDGET,
        payload: id
      })
    })
    .catch(err => {
      dispatch(returnMessage(err.response.data, err.response.status));
    })
}