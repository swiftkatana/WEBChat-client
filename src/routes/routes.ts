import Paths from './path-names'
import { IRoute } from '../interfaces/routes/IRoute'
import ScreenLoginRegister from '../components/screens/register-login/LoginRegister'

const routes: IRoute[] = [
	{
		path: Paths.LOGIN,
		exact: true,
		public: true,
		component: ScreenLoginRegister,
	},
]

export default routes
