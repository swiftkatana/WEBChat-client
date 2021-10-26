import React, { FC } from 'react'
import { Router, Route, Redirect, Switch } from 'react-router-dom'
import DrawerPage from './components/screens/DrawerPage'
import { CommunicationArea } from './components/brains/CommunicationArea'
// import { GotACall } from './components/brains/GotACall'
import PrivateRoute from './routes/PrivateRoute'
import routes from './routes/routes'
import history from './history'
import './app.css'
import { SnackBarStack } from 'components/screens/SnackBarStack'
import { ErrorArea } from 'components/brains/ErrorArea'

export const App: FC = () => {
	console.log(document.cookie)

	return (
		<Router history={history}>
			<SnackBarStack>
				<DrawerPage>
					<>
						<ErrorArea />
						<CommunicationArea />
						<Switch>
							{/* <GotACall /> */}
							{routes.map((route, index) =>
								route.private ? (
									<PrivateRoute {...route} key={index} />
								) : (
									<Route {...route} key={index} />
								)
							)}
							<Redirect to='/' />
						</Switch>
					</>
				</DrawerPage>
			</SnackBarStack>
		</Router>
	)
}
