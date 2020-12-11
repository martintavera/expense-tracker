import React, {useEffect, useState, Fragment} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Pulse from '../loading/Pulse';
import {clearMessage} from '../../actions/messageActions';
import {addBudget, deleteBudget} from '../../actions/budgetActions';
import Alert from '../alert/Alert';

const Report = ({year, month, category, budget_number, user_id, budget}) => {

  const dispatch = useDispatch();
  const message = useSelector(state => state.message);

  const budgeData = budget.budget;
  const loading = budget.loading;

  //Set message
  const [isReport, setReport] = useState(
    {
      message: null,
      status: null
    }
  )

  useEffect(() => {
    //Add expense
    if(message.id === 'ADD_BUDGET_FAIL' || message.id === 'ADD_BUDGET_SUCCESS'){
      setReport(prevState => {
        return {
          ...prevState,
          message : message.msg.msg,
          status: message.status
        }
      })
    } else {
      setReport(prevState => {
        return {
          ...prevState, 
          message : null,
          status: null
        }
      })
    }
  },[message])

  const onSubmit = (e) => {
    e.preventDefault();

    //Clear Messages
    dispatch(clearMessage());

    const newBudget = {
      year_number : parseInt(year),
      month_name : month,
      category_name : category === '' ? 'none' : category,
      budget_number : budget_number === '' ? -1.00 : parseFloat(budget_number).toFixed(2),
      user_id : user_id
    }

    //Add new budget
    dispatch(addBudget(newBudget));
  }

  const contentLoading = (
    <Pulse loadAmount={budgeData.length > 1 ? parseInt(budgeData.length / 2) : 1}/>
  )

  const reportTitle = `${month} ${year} Budget`;

  let contentLoaded = '';

  if(budgeData.length > 0){
    contentLoaded = (
      <Fragment>
        <tbody>
          {budgeData.map(({_id, category_name, budget_number}) => (
            <tr key={_id} className="hover:bg-gray-100">
              <td className="text-left py-2 px-4 border-b border-gray-500">{category_name}</td>
              <td className="text-left py-2 px-4 border-b border-gray-500">${parseFloat(budget_number).toFixed(2)}</td>
              <td className="text-left py-2 px-4 border-b border-gray-500">
                <button className="text-gray-200 font-bold py-1 px-3 rounded text-xs bg-red-500 hover:bg-red-700 outline-none focus:outline-none" onClick={() => dispatch(deleteBudget(_id))}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Fragment>
    )
  } else {
    contentLoaded = (
      <Fragment>
        <tbody>
          <tr className="hover:bg-gray-100">
            <td colSpan="4" className="text-center py-2 px-4 border-b border-gray-500">NO RECORDS FOUND</td>
          </tr>
        </tbody>
      </Fragment>
    )
  }

  let returnMessage = '';

  if(isReport.message){
    returnMessage = (
      <Fragment>
        <div className="w-full mb-4 md:mb-0">
          <Alert message={isReport.message} status={isReport.status}/>
        </div>
      </Fragment>
    )
  } else {
    returnMessage = null
  }

  const displayReport = (
    <Fragment>
      <div className="flex justify-center mb-2">
        <div className="w-full">
          <button className="float-right bg-teal-400 text-white hover:bg-teal-600 font-bold uppercase text-sm px-6 py-4 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1" type="button" style={{ transition: "all .15s ease" }} onClick={onSubmit}>
            Update
          </button>
        </div>
      </div>
      {returnMessage}
      <div className="mx-auto">
        <h1 className="font-bold text-2xl text-center">{reportTitle}</h1>
        <div className="bg-white shadow-md rounded my-4">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="text-left py-3 px-5 bg-blue-500 font-bold uppercase text-sm text-white border-blue-800">Store / Description</th>
                <th className="text-left py-3 px-5 bg-blue-500 font-bold uppercase text-sm text-white border-blue-800">Budget ($)</th>
                <th className="text-left py-3 px-5 bg-blue-500 font-bold uppercase text-sm text-white border-blue-800">&nbsp;</th>
              </tr>
            </thead>
            {contentLoaded}
          </table>
        </div>
      </div>
    </Fragment>
  )

  return (
    <div>
      {loading === true ? contentLoading : displayReport}
    </div>
  )
}

export default Report;