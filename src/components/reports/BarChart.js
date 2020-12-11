import React, {Fragment}  from 'react';
import {Bar} from 'react-chartjs-2';

const BarChart = ({chartData, title}) => {

  let showBarGph = '';

  if(chartData.charData){
    showBarGph = (
      <Fragment>
        <Bar 
          data={chartData.charData}
          options={{
            title: {
              display: true,
              text: title,
              fontSize: 25
            },
            legend: {
              display: true,
              position: 'right'
            }
          }}
        />
      </Fragment>
    )
  } else {
    showBarGph = null
  }

  return (
    <div>
      {showBarGph}
    </div>
  )
}

export default BarChart;