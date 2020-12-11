import axios from 'axios';
import * as actions from './types';
import {returnMessage} from './messageActions';
import {setContentLoading} from './contentActions';

export const getExpenses = (year_number,month_name,category_name,user_id) => (dispatch) => {
  
  const action = 'expense';
  dispatch(setContentLoading(action));

  axios
    .get(`/api/expense/${year_number}/${month_name}/${category_name}/${user_id}`)
    .then(res => {
      dispatch({
        type: actions.GET_EXPENSES,
        payload: res.data
      })
    })
    .catch(err => {
      dispatch(returnMessage(err.response.data, err.response.status));
    });
}

export const addExpense = (newExpense) => (dispatch) => {
  axios
    .post('/api/expense',newExpense)
    .then(res => {
      dispatch({
        type: actions.ADD_EXPENSE,
        payload: res.data
      })
    })
    .catch(err => {
      dispatch(returnMessage(err.response.data, err.response.status, 'ADD_EXPENSE_FAIL'));

      dispatch({
        type: actions.ADD_EXPENSE_FAIL
      })
    });
}

export const deleteExpense = (id) => (dispatch) => {
  axios
    .delete(`/api/expense/${id}`)
    .then(res => {
      dispatch({
        type: actions.DELETE_EXPENSE,
        payload: id
      })
    })
    .catch(err => {
      dispatch(returnMessage(err.response.data, err.response.status));
    })
}