import * as actions from '../actions/types';

const initialState = {
  asset: [],
  loading: false
}

const assetReducer = (state = initialState, action) => {
  switch(action.type) {
    case actions.GET_ASSETS:
      return {
        ...state,
        asset: action.payload,
        loading: false
      }
    case actions.ADD_ASSET:
      return {
        ...state,
        asset: action.payload,
        loading: false
      }
    case actions.DELETE_ASSET:
      return {
        ...state,
        asset: state.asset.filter(asset => asset._id !== action.payload)
      }
    case actions.ASSET_LOADING:
      return {
        ...state,
        loading: true
      }
    case actions.ADD_ASSET_SUCCESS:
    case actions.ADD_ASSET_FAIL:
      return {
        ...state,
        loading: false
      }
    default:
      return state
  }
}

export default assetReducer;