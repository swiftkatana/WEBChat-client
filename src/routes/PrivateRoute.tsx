import { Redirect, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { IRoute } from '../interfaces/routes/IRoute'
import { userLoggedInSelector } from '../redux/user/userSelector'
import Paths from './path-names'

const PrivateRoute = (route: IRoute) => {
	const isLoggedIn = useSelector(userLoggedInSelector)
	if (isLoggedIn) return <Route {...route} />
	else return <Redirect to={Paths.LOGIN} />
}

export default PrivateRoute
