import React, {useEffect, useState, Fragment} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {addAsset} from '../../actions/assetActions';
import {addLiability} from '../../actions/liabilityActions';
import Alert from '../alert/Alert';

const Item = ({component_type, user_id}) => {

  const dispatch = useDispatch();
  const message = useSelector(state => state.message);

  //Set item object state
  const [isItem, setItem] = useState(
    {
      description_text : "",
      item_number : -1.00,
      message: null,
      state: null
    }
  )

  useEffect(() => {
    //check for added item
    if(message.id === 'ADD_ASSET_FAIL' || message.id === 'ADD_ASSET_SUCCESS' | message.id === 'ADD_LIABILITY_FAIL' || message.id === 'ADD_LIABILITY_SUCCESS'){
      setItem(prevState => {
        return {
          ...prevState,
          message: message.msg.msg,
          status: message.status
        }
      })
    } else {
      setItem(prevState => {
        return {
          ...prevState, 
          message : null,
          status: null
        }
      })
    }
  },[message])

  const onChange = (e) => {
    const value = e.target.value;
    const inputName = e.target.name;
    setItem(prevState => {
      return {...prevState, [inputName] : value}
    })
  }

  const onSubmit = (e) => {
    e.preventDefault();

    const newItem = {
      description_text : isItem.description_text,
      item_number : isItem.item_number === '' ? -1.00 : parseFloat(isItem.item_number).toFixed(2),
      user_id : user_id
    }

    component_type === 1 ? dispatch(addAsset(newItem)) : dispatch(addLiability(newItem));
  }

  let returnMessage = '';

  if(isItem.message){
    returnMessage = (
      <Fragment>
        <div className="flex justify-center mb-0">
          <div className="w-full px-3">
            <Alert message={isItem.message} status={isItem.status}/>
          </div>
        </div>
      </Fragment>
    )
  } else {
    returnMessage = null;
  }

  //Determine color of button
  let buttonCls = '';

  component_type === 1 ? buttonCls = "bg-blue-500 text-white hover:bg-blue-600 font-bold uppercase text-sm py-3 px-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1" : buttonCls = "bg-orange-400 text-white hover:bg-orange-500 font-bold uppercase text-sm py-3 px-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1";

  return (
    <div>
      <div className="md:flex justify-center md:mb-4 sm:mb-0">
        <div className="w-full md:w-2/5 px-3 mb-2 md:mb-0">
          <input className="block appearance-none w-full bg-white border border-gray-400 text-black py-3 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-700" type="text" placeholder="Enter account/description" name="description_text" onChange={onChange}/>
        </div>
        <div className="w-full md:w-2/5 px-3 mb-2 md:mb-0">
          <input className="block appearance-none w-full bg-white border border-gray-400 text-black py-3 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-700" type="number" placeholder="Enter number (without $)" name="item_number" onChange={onChange}/>
        </div>
        <div className="w-full md:w-1/5 px-3 mb-2 md:mb-0 text-center">
          <button className={buttonCls} type="button" style={{ transition: "all .15s ease" }} onClick={onSubmit}>
            Update
          </button>
        </div>
      </div>
      {returnMessage}
    </div>
  )
}

export default Item;

