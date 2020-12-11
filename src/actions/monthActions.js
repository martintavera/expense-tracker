import axios from 'axios';
import * as actions from './types';
import {returnMessage} from './messageActions';
import {setContentLoading} from './contentActions';

export const getMonths = () => (dispatch) => {

  const action = 'month';
  dispatch(setContentLoading(action));

  axios
    .get('/api/month/')
    .then(res => {
      dispatch({
        type: actions.GET_MONTHS,
        payload: res.data
      })
    })
    .catch(err => {
      dispatch(returnMessage(err.response.data, err.response.status))
    });
}