import React, {useEffect,useState} from 'react';
import {useDispatch} from 'react-redux';
import {updateIncome} from '../../actions/incomeActions';

const MonthlyView = ({view_method, year_number, user_id, income}) => {

  const [isMonthlyView, setMonthlyView] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    if(income.length){
      for(let i=0; i < income.length; i++){

        setMonthlyView(setPrevState => 
          [
            ...setPrevState, 
            {
              "index" : i,
              "id" : income[i]._id, 
              [`income_number_${i}`] : income[i].income_number,
              "month_name" : income[i].month_name
            }
          ]
        )
      }
    }
  },[income])

  const onChange = (index) => (e) => {
    const value = e.target.value === "" ? 0 : e.target.value;
    let inputName = e.target.name;
    let newArr = [...isMonthlyView]; //Return old array
    newArr[index][inputName] = parseFloat(value).toFixed(2); //Find input name and replace old value with new value
    setMonthlyView(newArr);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const newIncome = {
      view_method : view_method,
      year_number : year_number,
      user_id : user_id,
      income : isMonthlyView
    }

    //Attempt to update income
    dispatch(updateIncome(newIncome));
  }

  return (
  <div>
    {income.map(({_id,income_number,month_name},index) => (
      <div key={_id} className="flex justify-center mb-4">
        <div className="w-full text-center">
          <label className="block uppercase tracking-wide text-black text-sm font-bold">{month_name}</label>
        </div>
        <div className="w-full">
          <input type="number" className="block appearance-none w-full bg-white border border-gray-400 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-gray-700" name={`income_number_${index}`} placeholder="Enter monthly income" defaultValue={parseFloat(income_number).toFixed(2)} onChange={onChange(index)}/>
        </div>
      </div>
    ))}
    <div className="flex justify-center text-center">
      <div className="w-full sm:w-5/6 md:w-4/5">
        <button className="bg-teal-400 text-white hover:bg-teal-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1" type="button" style={{ transition: "all .15s ease" }} onClick={onSubmit}>
          Update
        </button>
      </div>
    </div>
  </div>
  )
}

export default MonthlyView;