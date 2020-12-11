import axios from 'axios';
import * as actions from './types';
import {returnMessage} from './messageActions';
import {setContentLoading} from './contentActions';

export const getYears = (order_number) => (dispatch) => {

  const action = 'year';
  dispatch(setContentLoading(action));

  axios
    .get(`/api/year/${order_number}`)
    .then(res => {
      dispatch({
        type: actions.GET_YEARS,
        payload: res.data
      })
    })
    .catch(err => {
      dispatch(returnMessage(err.response.data, err.response.status))
    });
}
