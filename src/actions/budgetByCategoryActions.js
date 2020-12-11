import axios from 'axios';
import * as actions from './types';
import {returnMessage} from './messageActions';
import {setContentLoading} from './contentActions';

export const getBudgetByCategory = (year_number, month_name, category_name, user_id) => (dispatch) => {

  const action = 'budget_by_category';
  dispatch(setContentLoading(action));

  axios
    .get(`/api/budgetByCategory/${year_number}/${month_name}/${category_name}/${user_id}`)
    .then(res => {
      dispatch({
        type: actions.GET_BUDGET_BY_CATEGORY,
        payload: res.data
      })
    })
    .catch(err => {
      dispatch(returnMessage(err.response.data, err.response.status));
    })
}