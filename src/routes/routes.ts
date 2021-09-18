import Paths from './path-names'
import { IRoute } from '../interfaces/routes/IRoute'
import ScreenLoginRegister from '../components/screens/LoginRegisterScreen'

const routes: IRoute[] = [
	{
		path: Paths.LOGIN,
		exact: true,
		public: true,
		component: ScreenLoginRegister,
	},
	{
		path: Paths.LOBY,
		exact: true,
		public: false,
		component: ScreenLoginRegister,
	},
]

export default routes
