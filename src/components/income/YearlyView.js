import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {updateIncome} from '../../actions/incomeActions';

const YearlyView = ({view_method, year_number, user_id, income}) => {

  const [isYearlyModal, setYearlyModal] = useState(
    {
      income_number: 0    
    }
  );

  const dispatch = useDispatch();

  const onChange = (e) => {
    const value = e.target.value === "" ? 0 : e.target.value;
    const inputName = e.target.name;
    setYearlyModal(prevState => {
      return {...prevState, [inputName] : value}
    })
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const newIncome = {
      view_method : view_method,
      year_number : year_number,
      user_id : user_id,
      income : parseFloat(isYearlyModal.income_number / 12).toFixed(2)
    }

    //Attempt to update income
    dispatch(updateIncome(newIncome));
  }

  return (
    <div>
      {/*Using year number as unique id so that the data re renders*/}
       {income.map(({_id,total}) => (  
        <div key={_id} className="flex justify-center mb-4">
          <div className="w-full text-center">
            <label className="block uppercase tracking-wide text-black text-sm font-bold">{_id}</label>
          </div>
          <div className="w-full">
            <input type="number" className="block appearance-none w-full bg-white border border-gray-400 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-gray-700" name="income_number" placeholder="Enter yearly income" defaultValue={parseFloat(total).toFixed(2)} onChange={onChange}/>
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

export default YearlyView;