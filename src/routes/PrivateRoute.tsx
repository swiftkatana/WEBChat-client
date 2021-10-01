import { Redirect, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { IRoute } from '../interfaces/routes/IRoute'
import { userLoggedInSelector } from '../redux/user/userSelector'
import Paths from './path-names'
import history from '../history'

const PrivateRoute = (route: IRoute) => {
	const isLoggedIn = useSelector(userLoggedInSelector)
	if (isLoggedIn) return <Route {...route} />
	else {
		const from = history.location.pathname === Paths.LOGIN ? '/' : history.location.pathname
		return (
			<Redirect
				to={{
					pathname: Paths.LOGIN,
					state: { from },
				}}
			/>
		)
	}
}

export default PrivateRoute
