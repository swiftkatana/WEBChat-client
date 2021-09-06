import Paths from './path-names';
import { IRoute } from 'interface/routes/IRoute';
import FeedbacksScreen from 'screens/Feedbacks';
import LoginRegister from 'components/screens/register-login/LoginRegister';

const routes: IRoute[] = [
  { path: Paths.LOGIN, exact: true, public: true, component: LoginRegister },
  { path: Paths.COMPANY_BUILDER, exact: true, component: CompanyBuilder },
  { path: Paths.MAIN, component: Main, exact: true },
  { path: Paths.ON_BOARDING, exact: true, component: OnBoarding },
  {
    path: Paths.FEEDBACKS,
    exact: true,
    component: FeedbacksScreen,
    public: true, // TODO: remove public
  },
];

export default routes;
