import React from 'react';
import {
  Route as ReactDOMRoute,
  RouteProps as ReactDOMRouteProps,
  Redirect,
} from 'react-router-dom';

import { useAuth } from '../hooks/auth';

interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { user } = useAuth();

  console.log(user, isPrivate);
  return (
    <ReactDOMRoute
      {...rest}
      render={location => {
        // If is private route and user is logged in or if is not provate and user is not logged in
        return isPrivate === !!user ? (
          <Component />
        ) : (
          // If is private and user is not logged in, send to login page, else send to dashboard
          <Redirect
            to={{
              pathname: isPrivate ? '/' : 'dashboard',
              // this will make sure history is kept
              state: { from: `''+${location}` },
            }}
          />
        );
      }}
    />
  );
};

export default Route;
