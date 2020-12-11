import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';
import GetUser from '../../globalFunctions/GetUser';

const Dashboard = () => {
  const user = GetUser();
  const authUser = (
    <Fragment>
      <div className="pt-12 pl-6">
        <div className="font-sans font-semibold text-xl text-teal-900 text-opacity-100">
          Welcome back, {user.first_name}!
        </div>
      </div>
      <div className="pt-12 pl-6">
        <div className="font-sans font-medium text-center text-lg text-teal-800 text-opacity-75">
          What would you like to do?
        </div>
      </div>
      <div className="container mt-5 mx-auto px-2">
        <div className="md:flex">
          <div className="flex-1 text-gray-700 text-center bg-gray-300 px-5 py-5 m-2 rounded">
            <div className="lg:flex lg:items-center">
              <div className="lg:flex-shrink-0">
                <img className="rounded-lg lg:w-64" src="https://images.unsplash.com/photo-1538356343135-65849f66b4a1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="Manage My Income" />
              </div>
              <div className="mt-4 lg:mt-0 lg:ml-6">
                <div className="uppercase tracking-wide text-sm text-indigo-600 font-bold">Manage Income</div>
                <Link to="/dashboard/income" className="block mt-1 text-md leading-tight font-semibold text-gray-900 hover:underline">Add/modify your income</Link>
              </div>
            </div>
          </div>
          <div className="flex-1 text-gray-700 text-center bg-gray-300 px-5 py-5 m-2 rounded">
            <div className="lg:flex lg:items-center">
              <div className="lg:flex-shrink-0">
                <img className="rounded-lg lg:w-64" src="https://images.unsplash.com/photo-1586892477838-2b96e85e0f96?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="Manage Categories" />
              </div>
              <div className="mt-4 lg:mt-0 lg:ml-6">
                <div className="uppercase tracking-wide text-sm text-indigo-600 font-bold">Manage Expense Categories</div>
                <Link to="/dashboard/categories" className="block mt-1 text-md leading-tight font-semibold text-gray-900 hover:underline">Add/modify your expense categories</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="md:flex">
          <div className="flex-1 text-gray-700 text-center bg-gray-300 px-5 py-5 m-2 rounded">
            <div className="lg:flex lg:items-center">
              <div className="lg:flex-shrink-0">
                <img className="rounded-lg lg:w-64" src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="View Budget" />
              </div>
              <div className="mt-4 lg:mt-0 lg:ml-6">
                <div className="uppercase tracking-wide text-sm text-indigo-600 font-bold">Manage Monthly Budget</div>
                <Link to="/dashboard/budget" className="block mt-1 text-md leading-tight font-semibold text-gray-900 hover:underline">Add/modify your monthly budget</Link>
              </div>
            </div>
          </div>
          <div className="flex-1 text-gray-700 text-center bg-gray-300 px-5 py-5 m-2 rounded">
            <div className="lg:flex lg:items-center">
              <div className="lg:flex-shrink-0">
                <img className="rounded-lg lg:w-64" src="https://images.unsplash.com/photo-1560472355-536de3962603?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="Log Monthly Expenses" />
              </div>
              <div className="mt-4 lg:mt-0 lg:ml-6">
                <div className="uppercase tracking-wide text-sm text-indigo-600 font-bold">Log Monthly Expenses</div>
                <Link to="/dashboard/expenses" className="block mt-1 text-md leading-tight font-semibold text-gray-900 hover:underline">Track monthly expenses to stay on track</Link>
              </div>
            </div>
          </div> 
        </div>
        <div className="md:flex">
          <div className="flex-1 text-gray-700 text-center bg-gray-300 px-5 py-5 m-2 rounded">
            <div className="lg:flex lg:items-center">
              <div className="lg:flex-shrink-0">
                <img className="rounded-lg lg:w-64" src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="View Reports" />
              </div>
              <div className="mt-4 lg:mt-0 lg:ml-6">
                <div className="uppercase tracking-wide text-sm text-indigo-600 font-bold">View Reports</div>
                <Link to="/dashboard/reports" className="block mt-1 text-md leading-tight font-semibold text-gray-900 hover:underline">View your monthly/yearly reports</Link>
              </div>
            </div>
          </div>
          <div className="flex-1 text-gray-700 text-center bg-gray-300 px-5 py-5 m-2 rounded">
            <div className="lg:flex lg:items-center">
              <div className="lg:flex-shrink-0">
                <img className="rounded-lg lg:w-64" src="https://images.unsplash.com/photo-1559526324-593bc073d938?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="Track Networth" />
              </div>
              <div className="mt-4 lg:mt-0 lg:ml-6">
                <div className="uppercase tracking-wide text-sm text-indigo-600 font-bold">Track Networth</div>
                <Link to="/dashboard/networth" className="block mt-1 text-md leading-tight font-semibold text-gray-900 hover:underline">Track your networth</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
  return (
    <div>
      {user.first_name !== "" ? authUser : ""}
    </div>
  )
}

export default Dashboard;