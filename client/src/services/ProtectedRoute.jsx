import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = props => {
  const isAllowed = props.verify();

  if (isAllowed && props.render) {
    //console.log(' protected route');
    return <Route path={props.path} render={props.render} />;
  } else if (isAllowed) {
    //console.log('else if in protecte route');
    return <Route path={props.path} component={props.component} />;
  } else {
   // console.log('else in protecte route');
    return <Redirect to={props.redirect} />;
  }
};

export default ProtectedRoute;