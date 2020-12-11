import React, {useEffect, useState, Fragment} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import GetUser from '../../globalFunctions/GetUser';
import {getYears} from '../../actions/yearActions';
import {getMonths} from '../../actions/monthActions';
import {getCategories} from '../../actions/categoryActions';
import {getExpenses} from '../../actions/expenseActions';
import {addExpense} from '../../actions/expenseActions';
import {clearMessage} from '../../actions/messageActions';
import Pulse from '../loading/Pulse';
import Dashboard from './Dashboard';
import ExpenseSummary from './ExpenseSummary';
import ExpenseDetails from './ExpenseDetails';
import Alert from '../alert/Alert';

const Expenses = () => {

  const user = GetUser();
  const dispatch = useDispatch();
  const message = useSelector(state => state.message);
  const {years} = useSelector(state => state.year);
  const {months} = useSelector(state => state.month); 
  const {categories} = useSelector(state => state.category);
  const {expenses, loading} = useSelector(state => state.expense);

  //Set expense object
  const [isExpenses, setExpenses] = useState(
    {
      year_number : 0,
      month_name : 'none',
      category_name : 'none',
      description_text : '',
      expense_number : -1.00,
      expense_date : moment().toDate(),
      message: null,
      status: null
    }
  )

  useEffect(() => {

    //Get years
    const order_number = -1;
    dispatch(getYears(order_number));

    //Get Months
    dispatch(getMonths());

    //Get user categories and expenses
    if(user.id){
      const all_indicator = 1;
      dispatch(getCategories(user.id,all_indicator));

      dispatch(getExpenses(isExpenses.year_number,encodeURI(isExpenses.month_name),encodeURI(isExpenses.category_name),user.id));
    }

    //Add expense
    if(message.id === 'ADD_EXPENSE_FAIL'){
      setExpenses(prevState => {
        return {
            ...prevState, 
            message : message.msg.msg,
            status: message.status
          }
      })
    } else {
      setExpenses(prevState => {
        return {
            ...prevState, 
            message : null,
            status: null
        }
      })
    }

  },[dispatch, user.id, isExpenses.year_number, isExpenses.month_name, isExpenses.category_name, expenses.length, message])

  const onChange = (e) => {
    const value = e.target.value;
    const inputName = e.target.name;
    setExpenses(prevState => {
      return {...prevState,[inputName] : value}
    })
  }

  const onSubmit = (e) => {
    e.preventDefault();

    //Clear Messages
    dispatch(clearMessage());

    const newExpense = {
      year_number : parseInt(isExpenses.year_number),
      month_name : isExpenses.month_name === '' ? 'none' : isExpenses.month_name,
      category_name : isExpenses.category_name === '' ? 'none' : isExpenses.category_name,
      description_text : isExpenses.description_text,
      expense_number : isExpenses.expense_number === '' ? -1.00 : parseFloat(isExpenses.expense_number).toFixed(2),
      expense_date : isExpenses.expense_date,
      user_id : user.id
    }

    //Attempt to add expense
    dispatch(addExpense(newExpense));
  }

  const contentLoading = (
    <Fragment>
      <div className="flex justify-center">
        <div className="w-full">
          <Pulse loadAmount={expenses.length > 1 ? parseInt(expenses.length / 2) : 1}/>
        </div>
      </div>
    </Fragment>
  )

  //Create title
  let expenseTitle = '';

  if(parseInt(isExpenses.year_number) === 0 && isExpenses.month_name === 'none' && isExpenses.category_name === 'none') { //No filters
    expenseTitle = 'All Expenses';
  } else if(parseInt(isExpenses.year_number) !== 0 && isExpenses.month_name === 'none' && isExpenses.category_name === 'none') { //Year only
    expenseTitle = `${isExpenses.year_number} Expenses`;
  } else if(parseInt(isExpenses.year_number) === 0 && isExpenses.month_name !== 'none' && isExpenses.category_name === 'none') { //Month only
    expenseTitle = `${isExpenses.month_name} Expenses`;
  } else if(parseInt(isExpenses.year_number) === 0 && isExpenses.month_name === 'none' && isExpenses.category_name !== 'none') { //Category only
    expenseTitle = `${isExpenses.category_name} Expenses`;
  } else if(parseInt(isExpenses.year_number) !== 0 && isExpenses.month_name !== 'none' && isExpenses.category_name === 'none') { //Year and Month only
    expenseTitle = `${isExpenses.year_number} ${isExpenses.month_name} Expenses`;
  } else if(parseInt(isExpenses.year_number) !== 0 && isExpenses.month_name === 'none' && isExpenses.category_name !== 'none') { //Year and Category only
    expenseTitle = `${isExpenses.year_number} Expenses (${isExpenses.category_name})`;
  } else if(parseInt(isExpenses.year_number) === 0 && isExpenses.month_name !== 'none' && isExpenses.category_name !== 'none') { //Month and Category only
    expenseTitle = `${isExpenses.month_name} Expenses (${isExpenses.category_name})`;
  } else { //All
    expenseTitle = `${isExpenses.year_number} ${isExpenses.month_name} Expenses (${isExpenses.category_name})`;
  }

  //Create table title
  const tableTitle = (
    <Fragment>
      <h1 className="font-bold text-2xl text-center">{expenseTitle}</h1>
    </Fragment>
  )

  let contentLoaded = '';

  if(parseInt(isExpenses.year_number) !== 0 && isExpenses.month_name !== 'none' && isExpenses.category_name !== 'none'){
    contentLoaded = (
      <Fragment>
        <ExpenseDetails title={tableTitle} expenses={expenses}/>
      </Fragment>
    )
  } else {
    contentLoaded = (
      <Fragment>
        <ExpenseSummary title={tableTitle} expenses={expenses}/>
      </Fragment>
    )
  }

  return (
    <div>
      <div className="container mx-auto mt-16">
        <Dashboard year={parseInt(isExpenses.year_number)} month={isExpenses.month_name} category={isExpenses.category_name} user_id={user.id} expenses={expenses} loading_expenses={loading}/>
        <div className="flex justify-center mb-4">
          <div className="w-full px-3">
            <button className="float-right rounded-full h-12 w-12 flex items-center bg-teal-400 justify-center text-l text-white shadow hover:shadow-lg outline-none focus:outline-none" type="button" onClick={onSubmit}>
              Add
            </button>
          </div>
        </div>
        <div className="w-full px-3 mb-4 md:mb-0">
          {isExpenses.message ? <Alert message={isExpenses.message} status={isExpenses.status}/> : null}
        </div>
        <div className="md:flex justify-center md:mb-4 sm:mb-0">
          <div className="w-full md:w-1/3 px-3 mb-2 md:mb-0">
            <div className="relative">
              <select className="block appearance-none w-full bg-white border border-gray-400 text-black py-3 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-700" name="year_number" onChange={onChange}>
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
          <div className="w-full md:w-1/3 px-3 mb-2 md:mb-0">
            <div className="relative">
              <select className="block appearance-none w-full bg-white border border-gray-400 text-black py-3 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-700" name="month_name" onChange={onChange}>
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
          <div className="w-full md:w-1/3 px-3 mb-2 md:mb-0">
            <div className="relative">
              <select className="block appearance-none w-full bg-white border border-gray-400 text-black py-3 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-700" name="category_name" onChange={onChange}>
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
        </div>
        <div className="md:flex justify-center md:mb-4 sm:mb-0">
          <div className="w-full md:w-1/3 px-3 mb-2 md:mb-0">
            <input className="block appearance-none w-full bg-white border border-gray-400 text-black py-3 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-700" type="text" placeholder="Enter store/description" name="description_text" onChange={onChange} />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-2 md:mb-0">
            <input className="block appearance-none w-full bg-white border border-gray-400 text-black py-3 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-700" type="number" placeholder="Enter expense (without $)" name="expense_number" onChange={onChange} />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-2 md:mb-0">
            <DatePicker 
              selected={isExpenses.expense_date} 
              onChange={
                (date) => {setExpenses(prevState => {
                  return {...prevState, expense_date: date}
                  })}
              }
              className="block appearance-none w-full bg-white border border-gray-400 text-black py-3 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-700"
              placeholderText="Select a date"
            />
          </div>
        </div>
        <div className="flex justify-center mb-0">
          <div className="w-full px-3">
            {loading === true ? contentLoading : contentLoaded}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Expenses;