import axios from 'axios';
import * as actions from './types';
//import {tokenConfig} from './authActions';
import {returnMessage} from './messageActions';
import {setContentLoading} from './contentActions';

export const getCategories = (user_id,all_indicator) => (dispatch) => {

  const action = 'category';
  dispatch(setContentLoading(action));

  axios
    .get(`/api/category/${user_id}/${all_indicator}`)
    .then(res => {
      dispatch({
        type: actions.GET_CATEGORIES,
        payload: res.data
      })
    })
    .catch(err => {
      dispatch(returnMessage(err.response.data, err.response.status));
    });
}

export const addCategory = (category) => (dispatch) => {
  axios
    .post('/api/category',category)
    .then(res => {
      dispatch({
        type: actions.ADD_CATEGORY,
        payload: res.data
      })
    })
    .catch(err => {
      dispatch(returnMessage(err.response.data, err.response.status, 'ADD_CATEGORY_FAIL'));

      dispatch({
        type: actions.ADD_CATEGORY_FAIL
      })
    });
}

//Soft delete category
export const deleteCategory = (id) => (dispatch) => { //Could not get tokenConfig to work for some unknown reason, works on the get request
  axios
   .post(`/api/category/${id}`)
   .then(res =>
     dispatch({
       type: actions.DELETE_CATEGORY,
       payload: id
     })
   )
   .catch(err => {
    dispatch(returnMessage(err.response.data, err.response.status));
  });
 }

export const addedCategoryReset = () => {
  return {
    type: actions.ADDED_CATEGORY_RESET
  }
}