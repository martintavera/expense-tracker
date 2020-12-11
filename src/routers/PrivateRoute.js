import React from 'react';
import {connect} from 'react-redux';
import {Route, Redirect} from 'react-router-dom';
import AppNavBar from '../components/navBar/AppNavBar';

export const PrivateRoute = ({isAuthenticated,component: Component,...rest}) => (
    <div>
      <header>
        <AppNavBar/>
      </header>
      <Route {...rest} component={(props) => (
        isAuthenticated ? (<Component {...props}/>) : (<Redirect to="/"/>)
      )}/>
     </div>
  )

const mapStatetoProps = (state) => ({
  isAuthenticated: !!state.auth.isAuthenticated
});

export default connect(mapStatetoProps)(PrivateRoute);