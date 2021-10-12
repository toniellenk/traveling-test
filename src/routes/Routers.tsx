import React from 'react';
import PropTypes from 'prop-types';
import {Route, RouteProps} from 'react-router-dom';

export interface PrivateRouteProps extends RouteProps {
  // tslint:disable-next-line:no-any
  component: any;
  isSignedIn?: boolean;
}


export default function RouteWrapper(props: PrivateRouteProps) {
  const { component: Component, isSignedIn, ...rest } = props;

  const Default = (
    <Route {...rest} render={(props) => <Component {...props} />} />
  );

  return Default;
}

RouteWrapper.propTypes = {
  isPrivate: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
};

RouteWrapper.defaultProps = {
  isPrivate: false,
};
