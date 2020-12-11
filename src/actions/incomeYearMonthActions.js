import axios from 'axios';
import * as actions from './types';
import {returnMessage} from './messageActions';
import {setContentLoading} from './contentActions';

export const getincomeYearMonth = (year_number,month_name,user_id) => (dispatch) => {

  const action = 'year_month';
  dispatch(setContentLoading(action));

  axios
    .get(`/api/incomeYearMonth/${year_number}/${month_name}/${user_id}`)
    .then(res => {
      dispatch({
        type: actions.GET_YEAR_MONTH_INCOME,
        payload: res.data
      })
    })
    .catch(err => {
      dispatch(returnMessage(err.response.data, err.response.status))
    });
}