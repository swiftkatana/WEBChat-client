import Paths from './path-names'
import { IRoute } from '../interfaces/routes/IRoute'
import ScreenLoginRegister from '../components/screens/LoginRegisterScreen'
import LobyPageScreen from '../components/screens/LobyPageScreen'
import { RelationshipListScreen } from '../components/screens/RelationshipListScreen'

const routes: IRoute[] = [
	{
		name: 'Sign In/Up',
		path: Paths.LOGIN,
		exact: true,
		private: false,
		component: ScreenLoginRegister,
	},
	{
		name: 'Home',
		path: Paths.LOBY,
		exact: true,
		private: true,
		component: LobyPageScreen,
	},
	{
		name: 'Friends',
		path: Paths.FRIENDS,
		exact: true,
		private: true,
		component: RelationshipListScreen,
	},
]

export default routes
