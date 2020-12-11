import * as actions from './types';

//RETURN MESSAGE
export const returnMessage = (msg, status, id = null) => {
  return {
    type: actions.GET_RETURN_MESSAGE,
    payload: {msg, status, id}
  };
};

//CLEAR MESSAGE
export const clearMessage = () => {
  return {
    type: actions.CLEAR_RETURN_MESSAGE
  };
};