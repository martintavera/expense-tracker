import React from 'react';
import {useSelector} from 'react-redux';

const Error404 = ({history}) => {
  const {isAuthenticated} = useSelector(state => state.auth);

  const message = isAuthenticated ? 'Dashboard' : 'Login';
  const URL = isAuthenticated ? '/dashboard' : '/';

  return (
    <div className="container mx-auto md:mt-20 sm:mt-12 mt-8">
      <div className="flex flex-wrap justify-center text-center">
        <div className="text-black">
          <div className="font-bold text-gray-700 xl:text-6xl md:text-4xl sm:text-3xl text-xl">
            404 <span className="lg:mx-4 sm:mx-2 m-0">-</span> We couldn't find this page.
          </div>
          <div className="md:mt-6 mt-3 xl:text-2xl md:text-xl text-sm uppercase font-semibold">
            Take me back to <span className="text-blue-400 cursor-pointer" onClick={() => history.push(URL)}>{message}</span> Page
          </div>
        </div>
      </div>
    </div>
  )
}

export default Error404;