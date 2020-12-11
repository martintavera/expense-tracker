import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import {login} from '../../actions/authActions';
import Alert from '../alert/Alert';

const Login = () => {
  const dispatch = useDispatch();
  const [isLogin,setLogin] = useState(
    {
      email: '',
      password: '',
      message: null,
      status: null
    }
  );

  const onChange = (e) => {
    const value = e.target.value;
    const inputName = e.target.name;
    setLogin(prevState => {
      return {...prevState, [inputName] : value}
    })
  }

  const message = useSelector(state => state.message);

  useEffect(() => {
    if(message.id === 'LOGIN_FAIL'){
      setLogin(prevState => {
        return {
          ...prevState, 
          message: message.msg.msg,
          status: message.status
        }
      })
    } else {
      setLogin(prevState => {
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
    const user = {
      email: isLogin.email,
      password: isLogin.password
    }

    //Attemp to login
    dispatch(login(user));
  }

  return (
    <div className="container mx-auto h-full justify-center items-center">
      <h1 className="font-bold mb-6 text-3xl text-center">Expense Tracker</h1>
      <div className="border-teal-400 p-8 border-t-8 bg-white mb-6 rounded-lg shadow-lg">
        {isLogin.message ? <Alert message={isLogin.message} status={isLogin.status}/> : null}
        <div className="mb-4">
          <label className="text-gray-800 block mb-2">Email Address</label>
          <input type="email" className="block appearance-none w-full bg-white border border-gray-200 hover:border-gray-400 px-2 py-2 rounded shadow focus:outline-none focus:border-gray-600" name="email" placeholder="Enter email address" onChange={onChange} />
        </div>
        <div className="mb-4">
          <label className="text-gray-800 block mb-2">Password</label>
          <input type="password" className="block appearance-none w-full bg-white border border-gray-200 hover:border-gray-400 px-2 py-2 rounded shadow focus:outline-none focus:border-gray-600" name="password" placeholder="Enter password" onChange={onChange} />
        </div>
        <div className="flex items-center justify-between">
          <button type="button" className="bg-teal-400 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded outline-none focus:outline-none" onClick={onSubmit}>Login</button>
        </div>
      </div>
      <div className="text-center">
          <p className="text-gray-800 text-sm">Don't have an account? <Link to="/register" className="no-underline text-blue-400 font-bold">Create an Account</Link>.</p>
      </div>
    </div>
  )
}

export default Login;