import axios from 'axios';
import * as actions from './types';
import {returnMessage} from './messageActions';
import {setContentLoading} from './contentActions';

export const getAssets = (user_id) => (dispatch) => {

  const action = 'asset';
  dispatch(setContentLoading(action));

  axios
    .get(`/api/asset/${user_id}`)
    .then(res => {
      dispatch({
        type: actions.GET_ASSETS,
        payload: res.data
      })
    })
    .catch(err => {
      dispatch(returnMessage(err.response.data, err.response.status));
    })
}

export const addAsset = (newItem) => (dispatch) => {

  const action = 'asset';
  dispatch(setContentLoading(action));

  axios
    .post('/api/asset',newItem)
    .then(res => {
      dispatch({
        type: actions.ADD_ASSET,
        payload: res.data.asset
      })

      dispatch(returnMessage(res.data, res.status, 'ADD_ASSET_SUCCESS'))

      dispatch({
        type: actions.ADD_ASSET_SUCCESS
      })
    })
    .catch(err => {
      dispatch(returnMessage(err.response.data, err.response.status, 'ADD_ASSET_FAIL'));

      dispatch({
        type: actions.ADD_ASSET_FAIL
      })
    });
}

export const deleteAsset = (id) => (dispatch) => {
  axios
    .delete(`/api/asset/${id}`)
    .then(res => {
      dispatch({
        type: actions.DELETE_ASSET,
        payload: id
      })
    })
    .catch(err => {
      dispatch(returnMessage(err.response.data, err.response.status));
    })
}