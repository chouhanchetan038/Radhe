import Cookies from 'js-cookie';
import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types'; // <-- Import PropTypes

const PrivateRoute = ({ children }) => {
  return Cookies.get('accessToken') ? children : <Navigate to="/" />;
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
