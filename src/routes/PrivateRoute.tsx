import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IRoute } from 'interface/routes/IRoute';
import {
  SholdGoToOnBoarding,
  userLoggedInSelector,
} from 'redux/user/user-selector';
import Paths from 'enums/routes/path-names';
import OnBoarding from 'screens/OnBoarding';

const PrivateRoute = (route: IRoute) => {
  const isLoggedIn = useSelector(userLoggedInSelector);
  const seeOnBoarding = useSelector(SholdGoToOnBoarding);
  if (isLoggedIn && seeOnBoarding) return <OnBoarding />;
  return isLoggedIn ? <Route {...route} /> : <Redirect to={Paths.LOGIN} />;
};

export default PrivateRoute;
