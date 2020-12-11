import axios from 'axios';
import * as actions from './types';
import {returnMessage} from './messageActions';
import {setContentLoading} from './contentActions';

export const getIncome = (view_method,year_number,user_id) => (dispatch) => {

  const action = 'income';
  dispatch(setContentLoading(action));

  axios
    .get(`/api/income/${view_method}/${year_number}/${user_id}`)
    .then(res => {
      dispatch({
        type: actions.GET_INCOME,
        payload: res.data
      })
    })
    .catch(err => {
      dispatch(returnMessage(err.response.data, err.response.status))
    });
}

export const updateIncome = (newIncome) => (dispatch) => {

  const action = 'income';
  dispatch(setContentLoading(action));

  axios
    .post('/api/income',newIncome)
    .then(res => {
      dispatch(returnMessage(res.data, res.status, 'UPDATE_INCOME_SUCCESS'))

      dispatch({
        type: actions.UPDATE_INCOME_SUCCESS
      })
    })
    .catch(err => {
      dispatch(returnMessage(err.response.data, err.response.status, 'UPDATE_INCOME_FAIL'))

      dispatch({
        type: actions.UPDATE_INCOME_FAIL
      })
    })
}