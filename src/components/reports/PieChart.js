import React, {Fragment} from 'react';
import {Pie} from 'react-chartjs-2';

const PieChart = ({chartData, title}) => {

  let showPieGrph = '';

  if(chartData.charData){
    showPieGrph = (
      <Fragment>
        <Pie 
          data={chartData.charData}
          options={{
            title: {
              display: true,
              text: title,
              fontSize: 25
            },
            legend: {
              display: true,
              position: 'bottom'
            }
          }}
        />
      </Fragment>
    )
  } else {
    showPieGrph = null
  }

  return (
    <div>
      {showPieGrph}
    </div>
  )
}

export default PieChart;