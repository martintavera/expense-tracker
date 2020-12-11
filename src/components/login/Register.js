import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import {register} from '../../actions/authActions';
import Alert from '../alert/Alert';

const Register = () => {
  const dispatch = useDispatch();
  const [isRegister,setRegister] = useState(
    {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      message: null,
      status: null
    }
  )

  const onChange = (e) => {
    const value = e.target.value;
    const inputName = e.target.name;
    setRegister(prevState => {
      return {...prevState, [inputName] : value}
    })
  }

  const message = useSelector(state => state.message);

  useEffect(() => {
    if(message.id === 'REGISTER_FAIL'){
      setRegister(prevState => {
        return {
          ...prevState, 
          message: message.msg.msg,
          status: message.status
        }
      })
    } else {
      setRegister(prevState => {
        return {
          ...prevState, 
          message: null,
          status: null
        }
      })
    }
  }, [message])
  
  const onSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      first_name: isRegister.first_name,
      last_name: isRegister.last_name,
      email: isRegister.email,
      password: isRegister.password
    }

    dispatch(register(newUser));
  }
  return (
    <div className="container mx-auto h-full justify-center items-center">
        <h1 className="font-bold mb-6 text-3xl text-center">Register</h1>
        <div className="flex justify-center">
          <div className="border-teal-400 p-8 border-t-8 bg-white mb-6 rounded-lg shadow-lg w-3/5">
          {isRegister.message ? <Alert message={isRegister.message} status={isRegister.status}/> : null}
            <div className="mb-4">
              <label className="text-gray-800 block mb-2">First Name</label>
              <input type="text" className="block appearance-none w-full bg-white border border-gray-200 hover:border-gray-400 px-2 py-2 rounded shadow focus:outline-none focus:border-gray-600" name="first_name" placeholder="Enter first name" onChange={onChange}></input>
            </div>
            <div className="mb-4">
              <label className="text-gray-800 block mb-2">Last Name</label>
              <input type="text" className="block appearance-none w-full bg-white border border-gray-200 hover:border-gray-400 px-2 py-2 rounded shadow focus:outline-none focus:border-gray-600" name="last_name" placeholder="Enter last name" onChange={onChange}></input>
            </div>
            <div className="mb-4">
              <label className="text-gray-800 block mb-2">Email Address</label>
              <input type="email" className="block appearance-none w-full bg-white border border-gray-200 hover:border-gray-400 px-2 py-2 rounded shadow focus:outline-none focus:border-gray-600" name="email" placeholder="Enter email address" onChange={onChange}></input>
            </div>
            <div className="mb-10">
              <label className="text-gray-800 block mb-2">Password</label>
              <input type="password" className="block appearance-none w-full bg-white border border-gray-200 hover:border-gray-400 px-2 py-2 rounded shadow focus:outline-none focus:border-gray-600" name="password" placeholder="Enter password" onChange={onChange}></input>
            </div>
            <div className="flex justify-center">
              <button type="button" className="bg-teal-400 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded" onClick={onSubmit}>Sign Up!</button>
            </div>
          </div>
        </div>
        <div className="text-center"><p className="text-gray-800 text-sm"><Link to="/" className="no-underline text-blue-400 font-bold">Return to Main</Link></p></div>
    </div>
  )
}

export default Register