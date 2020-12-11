import React from 'react';
import {useDispatch} from 'react-redux';
import {clearMessage} from '../../actions/messageActions';

const Alert = ({message, status}) => {

  const dispatch = useDispatch();

  let classes = '';
  let msgHeader = '';
  let msgText = '';

  if(parseInt(status) === 200){
    classes = "bg-green-100 border-t-4 border-green-500 rounded-b text-green-900 px-4 py-3 shadow-md mb-5";
    msgHeader = 'Success!';
    msgText = message;
  } else {
    classes = "bg-red-100 border-t-4 border-red-500 rounded-b text-red-900 px-4 py-3 shadow-md mb-5";
    msgHeader = 'Error!';
    msgText = message;
  }

  const onSubmit = (e) => {
    e.preventDefault();

    //Clear Messages
    dispatch(clearMessage());
  }

  return (
    <div className={classes} role="alert">
      <div className="w-full">
        <div className="flex">
          <div className="w-full">
            <span className="font-bold">{msgHeader}</span><br/>
            <span className="text-sm">{msgText}</span>
          </div>
          <div className="w-full">
            <button className="float-right outline-none focus:outline-none h-8 w-8 rounded-full flex justify-center border-green-900 items-center text-green-900 font-bold" onClick={onSubmit}>X</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Alert;