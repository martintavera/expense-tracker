import React from 'react';
import {Link} from 'react-router-dom';
import Logout from '../logout/Logout';

const AppNavBar = () => {
  return (
    <nav className="flex items-center justify-between flex-wrap bg-teal-400 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <Link to="/dashboard" className="font-semibold text-xl tracking-tight">Expense Tracker</Link>
      </div>
      <div className="block lg:hidden">
        <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
          <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
        </button>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
          <Link to="/dashboard/income" className="block mt-4 lg:inline-block lg:mt-0 text-teal-100 hover:text-white mr-8">
            Income
          </Link>
          <Link to="/dashboard/categories" className="block mt-4 lg:inline-block lg:mt-0 text-teal-100 hover:text-white mr-8">
            Categories
          </Link>
          <Link to="/dashboard/budget" className="block mt-4 lg:inline-block lg:mt-0 text-teal-100 hover:text-white mr-8">
            Budget
          </Link>
          <Link to="/dashboard/expenses" className="block mt-4 lg:inline-block lg:mt-0 text-teal-100 hover:text-white mr-8">
            Log Expenses
          </Link>
          <Link to="/dashboard/reports" className="block mt-4 lg:inline-block lg:mt-0 text-teal-100 hover:text-white mr-8">
            Reports
          </Link>
          <Link to="/dashboard/networth" className="block mt-4 lg:inline-block lg:mt-0 text-teal-100 hover:text-white">
            Networth
          </Link>
        </div>
        <div>
          <Logout/>
        </div>
      </div>
    </nav>
  )
}

export default AppNavBar;