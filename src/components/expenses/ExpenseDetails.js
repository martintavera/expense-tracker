import React, {Fragment} from 'react';
import {useDispatch} from 'react-redux';
import moment from 'moment';
import {deleteExpense} from '../../actions/expenseActions';

const ExpenseDetails = ({title, expenses}) => {

  const dispatch = useDispatch();

  let contentLoaded = '';

  if(expenses.length > 0) {
    contentLoaded = (
      <Fragment>
        <tbody>
          {expenses.map(({_id, description_text, expense_number, expense_date}) => (
            <tr key={_id} className="hover:bg-gray-100">
              <td className="text-left py-2 px-4 border-b border-gray-500">{description_text}</td>
              <td className="text-left py-2 px-4 border-b border-gray-500">${parseFloat(expense_number).toFixed(2)}</td>
              <td className="text-left py-2 px-4 border-b border-gray-500">{moment(expense_date).format('MM/DD/YYYY')}</td>
              <td className="text-left py-2 px-4 border-b border-gray-500"><button className="text-gray-200 font-bold py-1 px-3 rounded text-xs bg-red-500 hover:bg-red-700 outline-none focus:outline-none" onClick={() => dispatch(deleteExpense(_id))}>Delete</button></td>
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

  return (
    <div>
      <div className="mx-auto">
        {title}
        <div className="bg-white shadow-md rounded my-4">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="text-left py-3 px-5 bg-blue-500 font-bold uppercase text-sm text-white border-blue-800">Store / Description</th>
                <th className="text-left py-3 px-5 bg-blue-500 font-bold uppercase text-sm text-white border-blue-800">Expense ($)</th>
                <th className="text-left py-3 px-5 bg-blue-500 font-bold uppercase text-sm text-white border-blue-800">Expense Date</th>
                <th className="text-left py-3 px-5 bg-blue-500 font-bold uppercase text-sm text-white border-blue-800">&nbsp;</th>
              </tr>
            </thead>
            {contentLoaded}
          </table>
        </div>
      </div>
    </div>
  )
}

export default ExpenseDetails;