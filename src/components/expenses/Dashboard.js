import React, {Fragment, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getincomeYearMonth} from '../../actions/incomeYearMonthActions';
import {getBudgetByCategory} from '../../actions/budgetByCategoryActions';

const Dashboard = ({year, month, category, user_id, expenses, loading_expenses}) => {

  const dispatch = useDispatch();
  const {incomeYearMonth} = useSelector(state => state.incomeYearMonth);
  const {budgetByCategory} = useSelector(state => state.budgetByCategory);

  useEffect(() => {
    
    if(user_id){
      //Get income
      dispatch(getincomeYearMonth(year,encodeURI(month),user_id));

      //Get budget by category
      if(year !== 0 && month !== 'none' && category !== 'none'){
        dispatch(getBudgetByCategory(year,encodeURI(month),encodeURI(category),user_id))
      }
    }

  },[dispatch, year, month, category,user_id])

  const totalIncome = incomeYearMonth.reduce((accu, income) => {
    return accu + income.income_number;
  }, 0);

  const totalBudget = budgetByCategory.reduce((accu, budget) => {
    return accu + budget.budget_number;
  }, 0);

  const sumExpenses = expenses.reduce((accu, expenses) => {
    return accu + expenses.expense_number;
  }, 0);

  let difference = 0;
  let savingPercent = 0;

  if(year !== 0 && month !== 'none' && category !== 'none'){
    difference = (totalBudget - sumExpenses);
    savingPercent = parseFloat((difference / totalBudget) * 100).toFixed(2);
  } else {
    difference = (totalIncome - sumExpenses);
    savingPercent = parseFloat((difference / totalIncome) * 100).toFixed(2);
  }

  //Account for 0/0
  savingPercent = savingPercent === 'NaN' ? 100 : savingPercent;

  //Acount for number/0
  savingPercent = savingPercent === '-Infinity' ? 0 : savingPercent;

  let incomeText = '';
  let expenseText = '';
  let diffText = '';
  let BckClasses = '';

  if(loading_expenses === true){
    incomeText = (<Fragment>&nbsp;</Fragment>);
    expenseText = (<Fragment>&nbsp;</Fragment>);
    diffText = (<Fragment>&nbsp;</Fragment>);
    BckClasses = "flex-1 text-white text-center bg-gray-500 px-5 py-5 m-3 rounded";
  } else {
    if(year !== 0 && month !== 'none' && category !== 'none'){
      incomeText = (
        <Fragment>
          Budget: ${parseFloat(totalBudget).toFixed(2)}
        </Fragment>
      )
    } else {
      incomeText = (
        <Fragment>
          Income: ${parseFloat(totalIncome).toFixed(2)}
        </Fragment>
      )
    }

    expenseText = (
      <Fragment>
        Expenses: ${parseFloat(sumExpenses).toFixed(2)}
      </Fragment>
    )

    if(parseInt(savingPercent) >= 30){
      BckClasses = "flex-1 text-white text-center bg-green-600 px-5 py-5 m-3 rounded";
    } else if(parseInt(savingPercent) <= 10){
      BckClasses = "flex-1 text-white text-center bg-red-700 px-5 py-5 m-3 rounded";
    } else {
      BckClasses = "flex-1 text-white text-center bg-yellow-500 px-5 py-5 m-3 rounded";
    }
    
    //Account for negative value
    savingPercent = savingPercent < 0 ? `(${Math.abs(savingPercent)})`: savingPercent;

    diffText = (
      <Fragment>
        ${parseFloat(difference).toFixed(2)} - {savingPercent}%
      </Fragment>
    )

  }

  return (
    <div className="container mx-auto sm:mb-4 md:mb-1">
      <div className="md:flex w-full">
        <div className="flex-1 text-white text-center bg-gray-500 px-5 py-5 m-3 rounded">
          <div className="lg:flex">
            <div className="uppercase tracking-wide text-sm font-bold">{incomeText}</div>
          </div>
        </div>
        <div className="flex-1 text-white text-center bg-gray-600 px-5 py-5 m-3 rounded">
          <div className="lg:flex">
            <div className="uppercase tracking-wide text-sm font-bold">{expenseText}</div>
          </div>
        </div>
        <div className={BckClasses}>
          <div className="lg:flex">
            <div className="uppercase tracking-wide text-sm font-bold">{diffText}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;