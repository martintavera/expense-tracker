import React from 'react';
import {useDispatch} from 'react-redux';
import {logout} from '../../actions/authActions';
import {clearMessage} from '../../actions/messageActions'; 
const Logout = () => {
  const dispatch = useDispatch();
  const logOutUser = () => {
    dispatch(clearMessage());
    dispatch(logout())
  }
  return (
    <button onClick={logOutUser} className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0 outline-none focus:outline-none">Logout</button>
  )
}

export default Logout;