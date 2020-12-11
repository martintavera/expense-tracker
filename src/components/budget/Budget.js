import React, {useEffect, useState, Fragment} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import GetUser from '../../globalFunctions/GetUser';
import {getYears} from '../../actions/yearActions';
import {getMonths} from '../../actions/monthActions';
import {getCategories} from '../../actions/categoryActions';
import {getBudget} from '../../actions/budgetActions';
import Dashboard from './Dashboard';
import Report from './Report';

const Budget = () => {

  const user = GetUser();
  const dispatch = useDispatch();
  const {years} = useSelector(state => state.year);
  const {months} = useSelector(state => state.month); 
  const {categories} = useSelector(state => state.category);
  const budget = useSelector(state => state.budget);

  //Set budget object
  const [isBudget, setBudget] = useState(
    {
      year_number : 0,
      month_name : 'none',
      category_name : 'none',
      budget_number : -1.00
    }
  )

  useEffect(() => {

    //Get years
    const order_number = -1;
    dispatch(getYears(order_number));

    //Get Months
    dispatch(getMonths());

    //Get user categories
    if(user.id){
      const all_indicator = 1;
      dispatch(getCategories(user.id,all_indicator));
    }

    //Get budget
    if(parseInt(isBudget.year_number) !== 0 && isBudget.month_name !== 'none'){
    dispatch(getBudget(isBudget.year_number,isBudget.month_name,user.id))
    }
  }, [dispatch, user.id, isBudget.year_number, isBudget.month_name])

  const onChange = (e) => {
    const value = e.target.value;
    const inputName = e.target.name;
    setBudget(prevState => {
      return {...prevState,[inputName] : value}
    })
  }

  const dashboard = (
    <Fragment>
      <Dashboard year={parseInt(isBudget.year_number)} month={isBudget.month_name} user_id={user.id} budget={budget}/>
    </Fragment>
  )

  const report = (
    <Fragment>
      <div className="flex justify-center mb-0">
          <div className="w-full lg:w-4/5 px-3">
            <Report year={parseInt(isBudget.year_number)} month={isBudget.month_name} category={isBudget.category_name} budget_number={isBudget.budget_number} user_id={user.id} budget={budget}/>
          </div>
        </div>
    </Fragment>
  )

  return (
    <div>
      <div className="container mx-auto mt-16">
        {parseInt(isBudget.year_number) !== 0 && isBudget.month_name !== 'none' ? dashboard : null}
        <div className="md:flex justify-center md:mb-4 sm:mb-0">
          <div className="w-full lg:w-2/5 md:w-1/2 px-3 mb-2 md:mb-0">
            <div className="relative">
              <select className="block appearance-none w-full bg-white border border-gray-400 text-black py-4 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-700" name="year_number" onChange={onChange}>
                <option value="0">Select a Year</option>
                {years.map(({_id,year_number}) => (
                  <option key={_id} value={year_number}>{year_number}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-2/5 md:w-1/2 px-3 mb-2 md:mb-0">
            <div className="relative">
              <select className="block appearance-none w-full bg-white border border-gray-400 text-black py-4 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-700" name="month_name" onChange={onChange}>
                <option value="none">Select a Month</option>
                {months.map(({_id,month_name}) => (
                  <option key={_id} value={month_name}>{month_name}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </div>
        </div>
        <div className="md:flex justify-center md:mb-4 sm:mb-0">
          <div className="w-full lg:w-2/5 md:w-1/2 px-3 mb-2 md:mb-0">
            <div className="relative">
              <select className="block appearance-none w-full bg-white border border-gray-400 text-black py-4 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-700" name="category_name" onChange={onChange}>
                <option value="none">Select a Category</option>
                {categories.map(({_id, category_name}) => (
                  <option key={_id} value={category_name}>{category_name}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-2/5 md:w-1/2 px-3 mb-2 md:mb-0">
            <input className="block appearance-none w-full bg-white border border-gray-400 text-black py-4 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-700" type="number" placeholder="Enter budget (without $)" name="budget_number" onChange={onChange}/>
          </div>
        </div>
        {parseInt(isBudget.year_number) !== 0 && isBudget.month_name !== 'none' ? report : null}
      </div>
    </div>
  )
}

export default Budget;