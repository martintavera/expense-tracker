import React, {useEffect, useState} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {addCategory} from '../../actions/categoryActions';
import {addedCategoryReset} from '../../actions/categoryActions';
import {clearMessage} from '../../actions/messageActions';
import GetUser from '../../globalFunctions/GetUser';
import Alert from '../alert/Alert';

const CategoryModal = () => {

  const [isCategoryModal, setCategoryModal] = useState(
    {
      category_name: '',
      show: false,
      message: null,
      status: null
    }
  );

  const user = GetUser();
  const dispatch = useDispatch();
  const message = useSelector(state => state.message);
  const categories = useSelector(state => state.category);

  const toggle = () => {
    //Clear Messages
    dispatch(clearMessage());
    //Reset Added Category Indicator
    dispatch(addedCategoryReset());
    setCategoryModal(prevState => {
      return {...prevState, show : !isCategoryModal.show}
    })
  }

  const onChange = (e) => {
    const value = e.target.value;
    const inputName = e.target.name;
    setCategoryModal(prevState => {
      return {...prevState, [inputName] : value}
    })
  }

  const onSubmit = (e) => {
    e.preventDefault();

    const category = {
      category_name : isCategoryModal.category_name,
      user_id : user.id
    }

    //Attempt to add category
    dispatch(addCategory(category));
  }

  useEffect(() => {
    if(message.id === 'ADD_CATEGORY_FAIL'){
      setCategoryModal(prevState => {
        return {
            ...prevState, 
            message : message.msg.msg,
            status: message.status
        }
      })
    } else {
      setCategoryModal(prevState => {
        return {
            ...prevState, 
            message : null,
            status: null
        }
      })
    }
    if(categories.category_added){
      toggle();
    }
  },[message,categories])

  return (
    <div>
      <button className="bg-teal-400 text-white hover:bg-teal-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1" type="button" style={{ transition: "all .15s ease" }} onClick={toggle}>
        Add Category
      </button>
      {isCategoryModal.show ? (
        <div>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl w-full sm:w-5/6 md:w-4/5">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                  <h3 className="text-xl font-semibold">
                  Add Category
                  </h3>
                  <button className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none" onClick={toggle}>
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">×</span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  {isCategoryModal.message ? <Alert message={isCategoryModal.message} status={isCategoryModal.status} /> : null}
                  <div className="mb-4 leading-relaxed">
                    <label className="text-gray-800 block mb-2 font-semibold">Category Name</label>
                    <input type="text" className="block appearance-none w-full bg-white border border-gray-200 hover:border-gray-400 px-2 py-2 rounded shadow focus:outline-none focus:border-gray-600" name="category_name" placeholder="Enter category name" onChange={onChange}/>
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
                  <button className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-xs outline-none focus:outline-none mr-1 mb-1" type="button" style={{ transition: "all .15s ease" }} onClick={toggle}>
                    Close
                  </button>
                  <button className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-xs px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1" type="button" style={{ transition: "all .15s ease" }} onClick={onSubmit}>
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </div>
      ) : null}
    </div>
  )
}

export default CategoryModal;