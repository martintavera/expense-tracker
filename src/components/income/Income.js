import React, {useEffect, useState, Fragment} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Pulse from '../loading/Pulse';
import YearlyView from './YearlyView';
import MonthlyView from './MonthlyView';
import GetUser from '../../globalFunctions/GetUser';
import {getYears} from '../../actions/yearActions';
import {getIncome} from '../../actions/incomeActions';
import Alert from '../alert/Alert';

const Income = () => {

  const user = GetUser();
  const dispatch = useDispatch();
  const date = new Date();
  const message = useSelector(state => state.message);
  const {income, loading} = useSelector(state => state.income);
  const {years} = useSelector(state => state.year);

  const [isViewMethod, setViewMethod] = useState(
    {
      view_method: 0,
      year: date.getFullYear(),
      message: null,
      status : null
    }
  )

  const onChange = (e) => {
    const value = e.target.value;
    const inputName = e.target.name;
    setViewMethod(prevState => {
      return {...prevState,[inputName] : value}
    })
  }

  useEffect(() => {

    //Get years
    const order_number = -1;
    dispatch(getYears(order_number));

    //Get income of current user
    if(user.id){
      dispatch(getIncome(isViewMethod.view_method,isViewMethod.year,user.id));
    }

    //Get message
    if(message.id === 'UPDATE_INCOME_SUCCESS'){
      setViewMethod(prevState => {
        return {
          ...prevState,
          message : message.msg.msg,
          status : message.status
        }
      })
    } else {
      setViewMethod(prevState => {
        return {
          ...prevState,
          message : null,
          status : null
        }
      })
    }

  },[dispatch,isViewMethod.view_method,isViewMethod.year,user.id,income.length,message])

  const contentLoading = (
    <Fragment>
      <div className="flex justify-center">
        <div className="w-full">
          <Pulse loadAmount={income.length > 1 ? parseInt(income.length / 2) : 1}/>
        </div>
      </div>
    </Fragment>
  )

  const contentLoaded = (
    <Fragment>
        <div className="flex justify-center">
          <div className="w-full sm:w-4/6 md:w-3/5">
            {parseInt(isViewMethod.view_method) === 1 ? <MonthlyView view_method={parseInt(isViewMethod.view_method)} year_number={isViewMethod.year} user_id={user.id} income={income}/> : <YearlyView view_method={parseInt(isViewMethod.view_method)} year_number={isViewMethod.year} user_id={user.id} income={income}/>}
          </div>
        </div>
    </Fragment>
  )

  let returnMessage = '';

  if(isViewMethod.message){
    returnMessage = (
      <Fragment>
        <div className="flex justify-center">
          <div className="w-full">
            <Alert message={isViewMethod.message} status={isViewMethod.status}/>
          </div>
        </div>
      </Fragment>
    )
  } else {
    returnMessage = null;
  }

  return (
    <div>
      <div className="container mx-auto mt-16">
        <div className="flex justify-center mb-10">
          <div className="w-full sm:w-5/6 md:w-4/5">
            {returnMessage}
            <div className="flex justify-center mb-4">
              <div className="w-full mr-4">
                <label className="block uppercase tracking-wide text-black text-md font-bold mb-2">Method</label>
                <div className="relative">
                  <select className="block appearance-none w-full bg-white border border-gray-400 text-black py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-gray-700" name="view_method" onChange={onChange}>
                    <option value="0">Yearly</option>
                    <option value="1">Monthly</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-black">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </div>
                </div>
              </div>
              <div className="w-full ml-4">
                <label className="block uppercase tracking-wide text-black text-md font-bold mb-2">Year</label>
                <div className="relative">
                  <select className="block appearance-none w-full bg-white border border-gray-400 text-black py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-gray-700" name="year" onChange={onChange}>
                    {years.map(({_id,year_number}) => (
                      <option key={_id} value={year_number}>{year_number}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-black">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </div>
                </div>
              </div>
            </div>
            {loading === true ? contentLoading : contentLoaded}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Income;