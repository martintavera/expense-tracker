import React, {Fragment} from 'react';

const ExpenseSummary = ({title, expenses}) => {

  let contentLoaded = '';

  if(expenses.length > 0) {
    contentLoaded = (
      <Fragment>
        <tbody>
          {expenses.map(({_id, expense_number}) => (
            <tr key={_id} className="hover:bg-gray-100">
              <td className="text-left py-2 px-4 border-b border-gray-500">{_id}</td>
              <td className="text-left py-2 px-4 border-b border-gray-500">${parseFloat(expense_number).toFixed(2)}</td>
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
            <td colSpan="2" className="text-center py-2 px-4 border-b border-gray-500">NO RECORDS FOUND</td>
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
                <th className="text-left py-3 px-5 bg-blue-500 font-bold uppercase text-sm text-white border-blue-800">Category</th>
                <th className="text-left py-3 px-5 bg-blue-500 font-bold uppercase text-sm text-white border-blue-800">Expense ($)</th>
              </tr>
            </thead>
            {contentLoaded}
          </table>
        </div>
      </div>
    </div>
  )
}

export default ExpenseSummary;