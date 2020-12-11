import React, {useEffect, useState} from 'react';
import BarChart from './BarChart';
import PieChart from './PieChart';

const ChartData = ({year, month, category, expense}) => {

  let filter_name = '';
  let title_name = '';

  if(year === 0 && month === 'All' && category === 'All'){ //No filter
    filter_name = 'year_number';
    title_name = 'Expenses'
  } else if(year !== 0 && month === 'All' && category === 'All'){ //Year only
    filter_name = 'month_name';
    title_name = `${year} Expenses`;
  } else if(year === 0 && month !== 'All' && category === 'All'){ //Month only
    filter_name = 'category_name';
    title_name = `${month} Expenses`;
  } else if(year === 0 && month === 'All' && category !== 'All'){ //Category only
    filter_name = '_id';
    title_name = `${category} Expenses`;
  } else if(year !== 0 && month !== 'All' && category === 'All'){ //Year and month only
    filter_name = 'category_name';
    title_name = `${year} ${month} Expenses`;
  } else if(year !== 0 && month === 'All' && category !== 'All'){ //Year and category only
    filter_name = '_id';
    title_name = `${year} Expenses (${category})`;
  } else if(year === 0 && month !== 'All' && category !== 'All'){ //Month and category only
    filter_name = '_id';
    title_name = `${month} Expenses (${category})`;
  } else {
    filter_name = '_id';
    title_name = `${year} ${month} Expenses (${category})`;
  }

  const [isChartData, setChartData] = useState({});

  useEffect(() => {

    const dataLabelArr = [];
    const dataSetArr = [];
    const dataColorArr = [];
    const bckColArr = ['#49F5B0','#4256FF','#E665B4','#FFB25E','#E3F542','#FF482E','#C55EFF','#10F5F3','#F5C711','#CCE7FE'];

    if(expense.length){

      for(let i=0; i < expense.length; i++){
        dataLabelArr.push(`${expense[i][filter_name]}`);
        if(expense[i].expense_number){
          dataSetArr.push(parseFloat(expense[i].expense_number).toFixed(2));
          const intRdmNr = parseInt(Math.floor(Math.random() * 10));
          dataColorArr.push(bckColArr[intRdmNr]);
        } else {
          if(expense[i].expenses.length){
            dataSetArr.push(parseFloat(expense[i].expenses[0].expense_number).toFixed(2));
          } else {
            dataSetArr.push(parseFloat(0).toFixed(2));
          }
        }
      }

      const objBckGrdCol = filter_name === '_id' ? dataColorArr : '#F52220';

      setChartData(setPrevState => { 
        return {
          ...setPrevState,
          charData: {
            labels : dataLabelArr,
            datasets: [{
              label: 'Expenses',
              data: dataSetArr,
              backgroundColor: objBckGrdCol,
              borderWidth: 1,
              borderColor: '#777',
              hoverBorderWidth: 3,
              hoverBorderColor: '#000'
            }]
          }
        }
      })
    }
  },[expense,filter_name])

  return (
    <div>
      {filter_name !== '_id' ? <BarChart chartData={isChartData} title={title_name}/> : <PieChart chartData={isChartData} title={title_name}/>}
    </div>
  )
}

export default ChartData;