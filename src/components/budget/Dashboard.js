import React, {useEffect, Fragment} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getincomeYearMonth} from '../../actions/incomeYearMonthActions';

const Dashboard = ({year, month, user_id, budget}) => {

  const dispatch = useDispatch();
  const {incomeYearMonth, loading} = useSelector(state => state.incomeYearMonth);

  const budgeData = budget.budget;
  const loadingBudget = budget.loading;

  useEffect(() => {
    //Get income
    if(user_id){
      dispatch(getincomeYearMonth(year,month,user_id));
    }

  },[dispatch, year, month, user_id])

  const totalIncome = incomeYearMonth.reduce((accu, income) => {
    return accu + income.income_number;
  }, 0);

  const totalBudget = budgeData.reduce((accu, budget) => {
    return accu + budget.budget_number;
  }, 0);

  const difference = parseFloat((totalBudget / totalIncome) * 100).toFixed(2);

  let incomeText = '';
  let budgetText = '';
  let diffClasses = '';

  loading === true ?  incomeText = (<Fragment>&nbsp;</Fragment>) : incomeText = (<Fragment>Income: ${parseFloat(totalIncome).toFixed(2)}</Fragment>);

  loadingBudget === true ? budgetText = (<Fragment>&nbsp;</Fragment>) : budgetText = (<Fragment>Budget ${parseFloat(totalBudget).toFixed(2)} - {difference}%</Fragment>)

  if(loadingBudget === true){
    diffClasses = "flex-1 text-white text-center bg-gray-500 px-5 py-8 m-3 rounded";
  } else {
    if(parseInt(difference) < 90){
      diffClasses = "flex-1 text-white text-center bg-green-600 px-5 py-8 m-3 rounded";
    } else if(parseInt(difference) >= 100){
      diffClasses = "flex-1 text-white text-center bg-red-700 px-5 py-8 m-3 rounded";
    } else {
      diffClasses = "flex-1 text-white text-center bg-yellow-500 px-5 py-8 m-3 rounded";
    }
  }
  

  return (
    <div className="container mx-auto sm:mb-4 md:mb-1">
      <div className="md:flex justify-center">
        <div className="w-full lg:w-2/5">
          <div className="flex-1 text-white text-center bg-gray-500 px-5 py-8 m-3 rounded">
            <div className="lg:flex">
              <div className="uppercase tracking-wide text-base font-bold">{incomeText}</div>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-2/5">
          <div className={diffClasses}>
            <div className="lg:flex">
              <div className="uppercase tracking-wide text-base font-bold">{budgetText}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;