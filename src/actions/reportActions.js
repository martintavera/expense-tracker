import axios from 'axios';
import * as actions from './types';
import {returnMessage} from './messageActions';
import {setContentLoading} from './contentActions';

export const getReport = (year_number, month_name, category_name, user_id) => (dispatch) => {

  const action = 'report';
  dispatch(setContentLoading(action));

  axios
    .get(`/api/report/${year_number}/${month_name}/${category_name}/${user_id}`)
    .then(res => {
      dispatch({
        type: actions.GET_REPORT,
        payload: res.data
      })
    })
    .catch(err => {
      dispatch(returnMessage(err.response.data, err.response.status));
    })
}