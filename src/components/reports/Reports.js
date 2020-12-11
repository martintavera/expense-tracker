import React, {useEffect, useState, Fragment} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import GetUser from '../../globalFunctions/GetUser';
import {getYears} from '../../actions/yearActions';
import {getMonths} from '../../actions/monthActions';
import {getCategories} from '../../actions/categoryActions';
import {getReport} from '../../actions/reportActions';
import ChartData from './ChartData';
import Pulse from '../loading/Pulse';

const Reports = () => {

  const user = GetUser();
  const dispatch = useDispatch();
  const year = useSelector(state => state.year);
  const month = useSelector(state => state.month);
  const category = useSelector(state => state.category);
  const {report, loading} = useSelector(state => state.report);

  const [isReport, setReport] = useState(
    {
      year_number: 0,
      month_name: 'All',
      category_name: 'All'
    }
  )

  useEffect(() => {

    //Get years
    const order_number = 1;
    dispatch(getYears(order_number));

    //Get months
    dispatch(getMonths());

    
    if(user.id){
      //Get categories
      const all_indicator = 0;
      dispatch(getCategories(user.id,all_indicator));
      
      //Get report
      dispatch(getReport(isReport.year_number,encodeURI(isReport.month_name),encodeURI(isReport.category_name),user.id));
    }
    

  },[dispatch, isReport.year_number, isReport.month_name, isReport.category_name, user.id])

  const onClickFilter = (text,value) => (e) => {
    e.preventDefault();

    setReport(prevState => {
      return {...prevState, [text] : value}
    })
  }

  const activeBtnCls = "bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-3 mb-2";
  const inactiveBtnCls = "bg-white hover:bg-blue-500 text-black hover:text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-3 mb-2";

  let yearData = "";

  if(year.loading){
    yearData = (
      <Fragment>
        {null}
      </Fragment>
    )
  } else {
    yearData = (
      <Fragment>
        <button className={parseInt(isReport.year_number) === 0 ? activeBtnCls : inactiveBtnCls} type="button" onClick={onClickFilter("year_number",0)}>
          All
        </button>
        {year.years.map(({_id, year_number}) => (
          <button key={_id} className={parseInt(isReport.year_number) === parseInt(year_number) ? activeBtnCls : inactiveBtnCls} type="button" onClick={onClickFilter("year_number",year_number)}>
            {year_number}
          </button>
        ))}
      </Fragment>
    )
  }

  let monthData = "";

  if(month.loading){
    monthData = (
      <Fragment>
        {null}
      </Fragment>
    )
  } else {
    monthData = (
      <Fragment>
        <button className={isReport.month_name === "All" ? activeBtnCls : inactiveBtnCls} type="button" onClick={onClickFilter("month_name","All")}>
          All
        </button>
        {month.months.map(({_id, month_name}) => (
          <button key={_id} className={isReport.month_name === month_name ? activeBtnCls : inactiveBtnCls} type="button" onClick={onClickFilter("month_name",month_name)}>
            {month_name}
          </button>
        ))}
      </Fragment>
    )
  }

  let categoryData = "";

  if(category.loading){
    categoryData = (
      <Fragment>
        {null}
      </Fragment>
    )
  } else {
    categoryData = (
      <Fragment>
        <button className={isReport.category_name === "All" ? activeBtnCls : inactiveBtnCls} type="button" onClick={onClickFilter("category_name","All")}>
          All
        </button>
        {category.categories.map(({_id, category_name}) => (
          <button key={_id} className={isReport.category_name === category_name ? activeBtnCls : inactiveBtnCls} type="button" onClick={onClickFilter("category_name",category_name)}>
            {category_name}
          </button>
        ))}
      </Fragment>
    )
  }
  
  let content = '';
  if(loading){
    content = (
      <Fragment>
        <Pulse loadAmount={3}/>
      </Fragment>
    )
  } else {
    content = (
      <Fragment>
        <ChartData year={parseInt(isReport.year_number)} month={isReport.month_name} category={isReport.category_name} expense={report}/>
      </Fragment>
    )
  }

  return (
    <div className="container mx-auto mt-12">
      <div className="flex flex-wrap w-full mb-4">
        {yearData}
      </div>
      <div className="flex flex-wrap w-full mb-4">
        {monthData}
      </div>
      <div className="flex flex-wrap w-full mb-4">
        {categoryData}
      </div>
      {content}
    </div>
  )
}

export default Reports;