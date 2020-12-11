import {useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {loadUser} from '../actions/authActions'

const GetUser = () => {
  
  let user = {
    id: null,
    first_name: "",
    last_name: "",
    email: "",
    register_date: ""
  }
  const auth = useSelector(state => state.auth);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  },[dispatch])

  if(auth.user){
     user = {
      id: auth.user._id,
      first_name: auth.user.first_name,
      last_name: auth.user.last_name,
      email: auth.user.email,
      register_date: auth.user.register_date
    }
  }

  return user;
}

export default GetUser;